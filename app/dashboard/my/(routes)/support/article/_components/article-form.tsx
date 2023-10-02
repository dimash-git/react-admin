"use client";

import { useEffect, useState } from "react";
import CrossCircleIcon from "@/public/icons/cross-circle.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { homeBaseUrl } from "@/app/dashboard/my/nav";
import AddFieldsPanel from "./add-fields-panel";

const ArticleForm = ({ parsed }: { parsed?: Question }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [cats, setCats] = useState<QuestionCat[]>([]);

  const params = useSearchParams();

  useEffect(() => {
    async function getCategories() {
      const res = await axios.post("/api/support/cats/get");
      const { status, content } = res.data;
      if (status != 200) return;
      // console.log(res.data);

      const { categories } = content;
      setCats(categories);
    }

    getCategories();
  }, []);

  const defaultValues = {
    question: parsed?.question ?? "",
  };

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
    const res = await axios.post(
      `/api/support/article/${parsed ? "update" : "add"}`,
      { ...values, question_id: params.get("question_id") }
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "success",
        title: `Ошибка при ${parsed ? "обновлении" : "добавлении"} статьи!`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Статья ${parsed ? "обновлен" : "добавлен"} успешно!`,
    });

    router.refresh();
    router.push(`${homeBaseUrl}/support`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Вопрос</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {cats && (
            <FormField
              control={form.control}
              name="cat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">Категория</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cats.length > 0 &&
                          cats.map((cat, index) => (
                            <SelectItem
                              key={index}
                              value={cat?.category_id}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {cat?.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
              </div>
            </div>
          ))}

          <AddFieldsPanel name="статью" append={append} />

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

export default ArticleForm;
