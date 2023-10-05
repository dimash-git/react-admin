"use client";

import { useEffect, useState } from "react";
import CrossCircleIcon from "@/public/icons/cross-circle.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { NewsSendData, NewsValues } from "../schema";

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

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { homeBaseUrl } from "../../../nav";

const NewsForm = ({ parsed }: { parsed?: News }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCover, setSelectedCover] = useState<boolean>(false);
  const [tags, setTags] = useState([]);

  console.log(parsed);

  let defaultValues: NewsValues = {
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
    (async function getTags() {
      const res = await axios.post("/api/news/tags/get");
      if (res.data.status != 200) return;
      const { tags: tagsParsed } = res.data.content;
      // console.log("tags fetched: ", tagsParsed);
      const formatted = tagsParsed.map((tag: NewsTag) => {
        return { label: tag.name, value: tag.tag_id };
      });

      setTags(formatted);
    })();
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

    const mediaBlocksWithBase64 = await Promise.all(
      media_blocks.map(convertMediaBlockToBase64)
    );

    let formData: NewsSendData = {
      tags: tags.split(","),
      media_blocks: mediaBlocksWithBase64,
      ...restValues,
    };

    if (cover) {
      try {
        const base64String = await fileToBase64(cover);
        formData.img_base_base64 = base64String as string;
        formData.img_ext = getFileType(cover.type);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }

    const res = await axios.post("/api/news/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении новости",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Новость добавлено успешно!",
    });

    router.refresh();
    router.push(`${homeBaseUrl}/news`);
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
                    byLabel={true}
                  />
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

                {field.media &&
                  (parsed?.media_blocks[idx]?.media?.url ? (
                    <div className="flex flex-col space-y-2">
                      <span className="block text-[12px] font-medium uppercase ">
                        Медиафайл
                      </span>
                      <Image
                        src={`${parsed.media_blocks[idx]?.media?.url}`}
                        width={200}
                        height={100}
                        alt={parsed?.name}
                        className="w-[200px] h-[100px] object-cover rounded-[5px]"
                      />
                    </div>
                  ) : (
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
                  ))}
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
