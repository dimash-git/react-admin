"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

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
import { fileToBase64, getFileType } from "@/lib/utils";

import axios from "axios";
import { useRouter } from "next/navigation";
import { homeBaseUrl } from "../../../nav";

interface _FormData {
  name: string;
  tags: string[];
  desc: string;
  img_base_base64?: string;
  img_ext?: string;
}

const NewsForm = ({ parsed }: { parsed?: News }) => {
  const [tags, setTags] = useState([]);

  const router = useRouter();

  // console.log("parsed", parsed);

  const defaultValues = {
    name: parsed?.name ?? "",
    desc: parsed?.desc ?? "",
    tags: parsed?.tags ? parsed?.tags.join(",") : "",
    excerpt: "",
    url: parsed?.url ?? "",
    // image: parsed?.img_url ? getFileFromUrl(parsed?.img_url) : News?.image,
  };

  useEffect(() => {
    (async function getTags() {
      const res = await axios.post("/api/news/tags/get");
      if (res.data.status != 200) return;
      const { tags: tagsParsed } = res.data.content;
      // console.log("tags fetched: ", tagsParsed);
      const formatted = tagsParsed.map((tag: Tags) => {
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

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, tags, desc, image } = values;

    let formData: _FormData = {
      name,
      tags: tags.split(","),
      desc,
    };

    if (image) {
      try {
        const base64String = await fileToBase64(image);
        formData.img_base_base64 = base64String as string;
        formData.img_ext = getFileType(image.type);
      } catch (error: any) {
        console.error("Error: ", error.message);
      }
    }

    const res = await axios.post("/api/news/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении новости!",
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Краткое описание</FormLabel>
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
                <FormLabel className="mb-5">Текст</FormLabel>
                <FormControl>
                  <Textarea rows={13} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
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
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                  Видео (вставьте ссылку на видео)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
