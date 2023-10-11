"use client";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { homeBaseUrl } from "@/app/dashboard/my/nav";
import axios from "axios";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const QuestionForm = ({ parsed }: { parsed?: Question }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [cats, setCats] = useState<QuestionCat[]>([]);

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
    answer: parsed?.answer ?? "",
    cat: parsed?.category_id ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `/api/support/${parsed ? "update" : "add"}`,
        parsed ? { ...values, question_id: parsed.question_id } : values
      );

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating question");
      }

      toast({
        variant: "success",
        title: `Короткий вопрос ${parsed ? "обновлен" : "добавлен"} успешно!`,
      });

      router.push(`${homeBaseUrl}/support`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "success",
        title: `Ошибка при ${
          parsed ? "обновлении" : "добавлении"
        } короткого вопроса!`,
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
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Ответ</FormLabel>
                <FormControl>
                  <Textarea rows={7} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {cats.length > 0 ? (
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
          ) : (
            <div className="text-[12px] font-medium mb-5">
              Загрузка категорий ...
            </div>
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

export default QuestionForm;
