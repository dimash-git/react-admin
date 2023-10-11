"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
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
import { useToast } from "@/components/ui/use-toast";

import { homeBaseUrl } from "@/app/dashboard/my/nav";
import { fileToBase64, getFileType } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { QuestionCatSendData } from "../schema";

const CatsForm = ({ parsed }: { parsed?: QuestionCat }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSwitchOn, setSwitchOn] = useState<boolean>(false);

  let defaultValues: z.infer<typeof formSchema> = {
    name: parsed?.name ?? "",
  };

  if (!parsed?.img) {
    defaultValues.icon = {} as File;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { icon, ...restValues } = values;

    try {
      let sendData: QuestionCatSendData = {
        ...restValues,
      };

      if (icon) {
        const base64String = await fileToBase64(icon);
        sendData.data_base64 = base64String as string;
        sendData.data_type = getFileType(icon.type);
      }

      const res = await axios.post(
        `/api/support/cats/${parsed ? "update" : "add"}`,
        parsed ? { ...sendData, category_id: parsed.category_id } : sendData
      );

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating a category");
      }

      toast({
        variant: "success",
        title: `Категория ${parsed?.name ? "обновлена" : "добавлена"} успешно!`,
      });

      router.push(`${homeBaseUrl}/support/cats`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: `Ошибка при ${
          parsed?.name ? "обновлении" : "добавлении"
        } категории!`,
      });
    } finally {
      router.refresh();
    }
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
                <FormLabel className="mb-5">Название категории</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {parsed?.img && !isSwitchOn ? (
            <Image
              src={`${parsed?.img}`}
              width={200}
              height={100}
              alt={parsed?.name}
              className="w-[200px] h-[100px] object-cover rounded-[5px] cursor-not-allowed"
              onClick={() => setSwitchOn(true)}
            />
          ) : (
            <FormField
              control={form.control}
              name="icon"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel className="mb-5">Иконка</FormLabel>
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

export default CatsForm;
