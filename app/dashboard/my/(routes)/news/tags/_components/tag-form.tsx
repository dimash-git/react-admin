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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import TagsFormSchema from "../schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "../../../../nav";

const TagsForm = ({ parsed }: { parsed?: Tags }) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    name: parsed?.name ?? "",
  };

  const form = useForm<z.infer<typeof TagsFormSchema>>({
    resolver: zodResolver(TagsFormSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof TagsFormSchema>) {
    const { name } = values;
    const res = await axios.post("/api/news/tags/add", {
      name,
    });

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при ${parsed?.name ? "обновлении" : "добавлении"} тэга!`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Тэг ${parsed?.name ? "обновлен" : "добавлен"} успешно!`,
    });

    router.refresh();
    router.push(`${homeBaseUrl}/tags`);
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

export default TagsForm;
