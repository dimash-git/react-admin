"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CrossCircleIcon from "@/public/icons/cross-circle.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { PromoSendData } from "../schema";

import { PromoContext } from "./promo-provider";
import Image from "next/image";
import { fileToBase64, getFileType } from "@/lib/utils";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "../../../nav";

const PromoForm = ({ parsed }: { parsed?: Promo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCover, setSelectedCover] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<boolean>(false);

  const { promo, setPromo } = useContext(PromoContext);

  /* START */
  let defaultValues: z.infer<typeof formSchema> = {
    name: parsed?.name ?? promo?.name ?? "",
  };
  if (!parsed?.img_url) {
    defaultValues.cover = {} as File;
  }
  if (!parsed?.file_url) {
    defaultValues.file = {} as File;
  }
  /* END */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { cover, file, ...restValues } = values;

    if (parsed) {
      try {
        const sendData: PromoSendData = {
          ...restValues,
          promo_id: parsed.promo_id,
        };
        if (cover) {
          const base64String = await fileToBase64(cover);
          sendData.img_data_base64 = base64String as string;
          sendData.img_data_type = getFileType(cover.type);
        }
        if (file) {
          const base64String = await fileToBase64(file);
          sendData.file_data_base64 = base64String as string;
          sendData.file_data_type = getFileType(file.type);
        }

        const res = await axios.post("/api/promo/update", sendData);

        const { status } = res.data;
        if (status !== 200) {
          throw new Error("Error updating promo");
        }

        toast({
          variant: "success",
          title: "Промо материал обновлен успешно!",
        });
        router.push(`${homeBaseUrl}/promo`);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Ошибка при обновлении промо материала",
        });
      } finally {
        router.refresh();
        return;
      }
    }

    setPromo(values);
    router.push("add/preview");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Название</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {parsed?.img_url && !selectedCover ? (
            <div className="flex flex-col space-y-2">
              <span className="block text-[12px] font-medium uppercase ">
                Обложка
              </span>
              <Image
                src={`${parsed?.img_url}`}
                width={200}
                height={100}
                alt={parsed?.name}
                className="w-[200px] h-[100px] object-cover rounded-[5px] cursor-not-allowed"
                onClick={() => setSelectedCover(true)}
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="cover"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel className="mb-5">Обложка</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      // spreading value is important cause you do not want default value change
                      onChange={(e) => {
                        if (!e.target.files) return;
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {parsed?.file_url && !selectedFile ? (
            <div className="flex items-center gap-x-4">
              <Button
                variant="formSubmit"
                type="button"
                onClick={() => {
                  window.open(parsed.file_url, "_blank");
                }}
              >
                Файл
              </Button>
              <span
                className="text-thRed hover:text-thRed/80 transition cursor-pointer"
                onClick={() => {
                  setSelectedFile(true);
                }}
              >
                <CrossCircleIcon />
              </span>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel className="mb-5">Файл</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      // spreading value is important cause you do not want default value change
                      onChange={(e) => {
                        if (!e.target.files) return;
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-ten">
            <Button variant="form" type="button" onClick={() => router.back()}>
              Отмена
            </Button>
            <Button
              variant="formSubmit"
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              Сохранить изменения
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PromoForm;
