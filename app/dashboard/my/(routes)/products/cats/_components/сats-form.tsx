"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

import axios from "axios";
import { useRouter } from "next/navigation";
import { homeBaseUrl } from "@/app/dashboard/my/nav";

const CatsForm = ({ parsed }: { parsed?: QuestionCat }) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    name: parsed?.name ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name } = values;

    const res = await axios.post(
      `/api/product/cats/${parsed ? "update" : "add"}`,
      { name, category_id: parsed?.category_id }
    );

    console.log("Response:", res.data);

    const { status } = res.data;

    if (status != 200) {
      toast({
        variant: "success",
        title: `Ошибка при ${
          parsed?.name ? "обновлении" : "добавлении"
        } категории!`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Категория ${parsed?.name ? "обновлена" : "добавлена"} успешно!`,
    });

    router.refresh();
    router.push(`${homeBaseUrl}/products/cats`);
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
