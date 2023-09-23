"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import newsFormSchema from "../schema";
import { fileToBase64, getFileFromUrl, getFileType } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import MultiSelect from "@/components/multiselect";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "../../../constants";

const NewsForm = ({ parsed }: { parsed?: News }) => {
  const [tags, setTags] = useState([]);

  const router = useRouter();

  console.log("parsed", parsed);

  const defaultValues = {
    name: parsed?.name ?? "",
    tags: parsed?.tags ? parsed?.tags.join(",") : "",
    url: parsed?.url ?? "",
    desc: parsed?.desc ?? "",
    // image: parsed?.img_url ? getFileFromUrl(parsed?.img_url) : News?.image,
  };

  useEffect(() => {
    (async function getTags() {
      const res = await axios.post("/api/tags/get");
      if (res.data.status != 200) return;
      const { tags: tagsParsed } = res.data.content;
      // console.log("tags fetched: ", tagsParsed);
      const formatted = tagsParsed.map((tag: Tags) => {
        return { label: tag.name, value: tag.tag_id };
      });

      setTags(formatted);
    })();
  }, []);

  const form = useForm<z.infer<typeof newsFormSchema>>({
    resolver: zodResolver(newsFormSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof newsFormSchema>) {
    const { name, tags, desc } = values;
    console.log(values);
    const formData = {
      name,
      tags: tags.split(","),
      desc,
      img_base_base64: "",
      img_ext: "",
    };

    if (values?.image) {
      const { image } = values;
      try {
        const base64String = await fileToBase64(image);
        formData.img_base_base64 = base64String as string;
        formData.img_ext = getFileType(image.type);
      } catch (error: any) {
        console.error("Publish error: ", error.message);
      }
    }
    const res = await axios.post("/api/news/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "success",
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
          {/* <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Тэг</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тэг..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.length > 0 &&
                        tags.map((tag, idx) => (
                          <SelectItem
                            className="text-white hover:text-black"
                            key={idx}
                            value={tag?.tag_id.toString()}
                          >
                            {tag?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <div className="space-y-2">
            <div className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[12px] font-medium uppercase">
              Краткое описание
            </div>
            <Input
              className="mt-0"
              placeholder="Краткое описание"
              disabled
              value={form.getValues("desc")}
            />
          </div> */}
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
