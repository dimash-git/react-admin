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

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { PromoContext } from "./promo-provider";
import promoFormSchema from "../schema";
import { getFileFromUrl } from "@/lib/utils";

const PromoForm = ({ parsed }: { parsed?: Promo }) => {
  const { promo, setPromo } = useContext(PromoContext);

  const router = useRouter();

  const defaultValues = {
    name: parsed?.name ?? promo?.name,
    // image: parsed?.img_url ? getFileFromUrl(parsed?.img_url) : promo?.image,
    // file: parsed?.file_url ? getFileFromUrl(parsed?.file_url) : promo?.file,
  };

  const form = useForm<z.infer<typeof promoFormSchema>>({
    resolver: zodResolver(promoFormSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof promoFormSchema>) {
    const { name, image, file } = values;
    console.log(values);

    setPromo({
      name,
      image,
      file,
    });
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
            name="file"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel className="mb-5">Файл</FormLabel>
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
          <div className="flex gap-ten">
            <Button variant="form" onClick={() => router.back()}>
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

export default PromoForm;
