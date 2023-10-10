"use client";

import { useEffect, useState } from "react";
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
import MultiSelect from "@/components/multiselect";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import AddFieldsPanel from "./add-fields-panel";
import {
  convertMediaBlockToBase64,
  fileToBase64,
  getFileType,
  mapMediaBlocks,
} from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { NewsSendData } from "../schema";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { homeBaseUrl } from "../../../nav";

const NewsForm = ({ parsed }: { parsed?: News }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCover, setSelectedCover] = useState<boolean>(false);
  const [tags, setTags] = useState([]);

  // console.log(parsed);

  let defaultValues: z.infer<typeof formSchema> = {
    name: parsed?.name ?? "",
    desc: parsed?.desc ?? "",
    tags: parsed?.tags ? parsed?.tags.join(",") : "",
    media_blocks: parsed?.media_blocks
      ? mapMediaBlocks(parsed?.media_blocks)
      : [],
  };

  if (!parsed?.img) {
    defaultValues.cover = {} as File;
  }

  useEffect(() => {
    async function getTags() {
      try {
        const res = await axios.post("/api/news/tags/get");
        const { status, content } = res.data;

        if (status !== 200) {
          throw new Error("Failed to fetch tags");
        }

        const { tags: fetchedTags } = content;

        const tagObjects = fetchedTags.map((tag: Tag) => {
          return { label: tag.name, value: tag.tag_id };
        });

        setTags(tagObjects);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    getTags();
  }, []);

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
    const { tags, media_blocks, cover, ...restValues } = values;

    try {
      const mediaBlocksWithBase64 = await Promise.all(
        media_blocks.map(convertMediaBlockToBase64)
      );

      let sendData: NewsSendData = {
        tags: tags.split(","),
        media_blocks: mediaBlocksWithBase64,
        news_id: parsed?.news_id,
        ...restValues,
      };

      if (cover) {
        try {
          const base64String = await fileToBase64(cover);
          sendData.img_base_base64 = base64String as string;
          sendData.img_ext = getFileType(cover.type);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }

      console.log(sendData);

      const res = await axios.post(
        `/api/news/${parsed ? "update" : "add"}`,
        sendData
      );

      // console.log("Response:", res.data);

      const { status } = res.data;

      if (status !== 200) {
        throw new Error(`Error ${parsed ? "updating" : "adding"} single news`);
      }

      toast({
        variant: "success",
        title: `Новость ${parsed ? "обновлена" : "добавлена"} успешно!`,
      });

      router.push(`${homeBaseUrl}/news`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Ошибка при  ${parsed ? "обновлении" : "добавлении"} новости`,
      });
    } finally {
      router.refresh();
      return;
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
                <FormLabel className="mb-5">Название</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {tags.length > 0 ? (
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">Тэги</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={tags}
                      onValueChange={field.onChange}
                      label="тэги"
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="text-[12px] font-medium mb-5">
              Загрузка тэгов ...
            </div>
          )}

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Описание</FormLabel>
                <FormControl>
                  <Textarea rows={13} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {parsed?.img && !selectedCover ? (
            <div className="flex flex-col space-y-2">
              <span className="block text-[12px] font-medium uppercase ">
                Обложка
              </span>
              <Image
                src={`${parsed.img}`}
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
          <AddFieldsPanel name="новость" append={append} />
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

export default NewsForm;
