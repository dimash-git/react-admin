"use client";

import { useContext, useState } from "react";
import CrossCircleIcon from "@/public/icons/cross-circle.svg";

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
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { MarketingSendData } from "../schema";

import axios from "axios";
import { homeBaseUrl } from "../../../nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MarketingContext } from "./marketing-provider";
import AddFieldsPanel from "./add-fields-panel";
import {
  convertMediaBlockToBase64,
  fileToBase64,
  getFileType,
  mapMediaBlocks,
} from "@/lib/utils";

const MarketingForm = ({ parsed }: { parsed?: Marketing }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { marketing, setMarketing } = useContext(MarketingContext);
  const [selectedCover, setSelectedCover] = useState<boolean>(false);

  // console.log(parsed);

  /* START */
  let defaultValues: z.infer<typeof formSchema> = {
    name: parsed?.name ?? marketing?.name ?? "",
    desc: parsed?.desc ?? marketing?.desc ?? "",
    media_blocks: parsed?.media_blocks
      ? mapMediaBlocks(parsed?.media_blocks)
      : marketing?.media_blocks ?? [],
  };

  if (!parsed?.img_url) {
    defaultValues.cover = {} as File;
  }
  if (marketing?.cover) {
    defaultValues.cover = marketing?.cover;
  }
  /* END */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "media_blocks",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (parsed) {
      const { cover, media_blocks, ...restValues } = values;

      try {
        const mediaBlocksWithBase64 = await Promise.all(
          media_blocks.map(convertMediaBlockToBase64)
        );

        const sendData: MarketingSendData = {
          ...restValues,
          media_blocks: mediaBlocksWithBase64,
          marketing_id: parsed.marketing_id,
        };

        if (cover) {
          const base64String = await fileToBase64(cover);
          sendData.img_data_base64 = base64String as string;
          sendData.img_type = getFileType(cover.type);
        }

        const res = await axios.post("/api/marketing/update", sendData);

        const { status } = res.data;
        if (status !== 200) {
          throw new Error("Error updating marketing product");
        }

        toast({
          variant: "success",
          title: "Маркетинг продукт обновлен успешно!",
        });

        router.push(`${homeBaseUrl}/marketing`);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Ошибка при обновлении маркетинг продукта",
        });
      } finally {
        router.refresh();
        return;
      }
    }

    setMarketing(values);
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
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Описание</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
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
                src={`${parsed.img_url}`}
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
          {fields.map((field, idx) => (
            <div className="relative" key={field.id}>
              <span
                onClick={() => {
                  if (fields.length > 0) remove(idx);
                }}
                className="text-thRed absolute right-0 top-0 hover:text-thRed/80 transition cursor-pointer"
              >
                <CrossCircleIcon />
              </span>
              <div className="flex flex-col space-y-[30px]">
                {field.text && (
                  <>
                    <div className="flex gap-5 items-center">
                      <FormField
                        control={form.control}
                        name={`media_blocks.${idx}.head_line`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="mb-5">Хедлайн</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-5 items-center">
                      <FormField
                        control={form.control}
                        name={`media_blocks.${idx}.text`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="mb-5">Текст</FormLabel>
                            <FormControl>
                              <Textarea rows={8} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {field.media && (
                  <div className="flex gap-5 items-center">
                    <FormField
                      control={form.control}
                      name={`media_blocks.${idx}.media`}
                      render={({ field: { value, ...field } }) => (
                        <FormItem className="w-full">
                          <FormLabel className="mb-5">Медиафайл</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...field}
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
                  </div>
                )}
                {field?.media_url && (
                  <div className="flex flex-col space-y-2">
                    <span className="block text-[12px] font-medium uppercase ">
                      Медиафайл
                    </span>
                    <Image
                      src={`${field.media_url}`}
                      width={200}
                      height={100}
                      alt={`Медиафайл - ${idx + 1}`}
                      className="w-[200px] h-[100px] object-cover rounded-[5px]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <AddFieldsPanel name="маркетинг продукт" append={append} />

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

export default MarketingForm;
