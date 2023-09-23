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

import MarketingFormSchema from "../schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "../../../constants";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import Image from "next/image";
import { MarketingContext } from "./marketing-provider";

interface DefValues {
  name: string;
  desc: string;
  image?: null;
}

const MarketingForm = ({ parsed }: { parsed?: Marketing }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSwitchOn, setSwitchOn] = useState<boolean>(false);
  const { setMarketing } = useContext(MarketingContext);

  let defaultValues: DefValues = {
    name: parsed?.name ?? "",
    desc: parsed?.desc ?? "",
  };

  if (!parsed?.img_url) {
    defaultValues.image = null;
  }

  const form = useForm<z.infer<typeof MarketingFormSchema>>({
    resolver: zodResolver(MarketingFormSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof MarketingFormSchema>) {
    if (parsed) {
      console.log(parsed.marketing_id);

      const res = await axios.post("/api/marketing/update", {
        ...values,
        marketing_id: parsed.marketing_id,
      });
      const { status } = res.data;
      if (status != 200) {
        toast({
          variant: "success",
          title: "Ошибка при обновлении маркетинг продукта!",
        });
        return;
      }

      toast({
        variant: "success",
        title: "Маркетинг продукт обновлен успешно!",
      });

      router.refresh();
      router.push(`${homeBaseUrl}/marketing`);
      return;
    }

    const { name, desc, image } = values;
    setMarketing({
      name,
      desc,
      image,
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
          {parsed?.img_url && !isSwitchOn ? (
            <>
              <Image
                src={`${parsed?.img_url}`}
                width={200}
                height={100}
                alt={parsed?.name}
                className="w-[200px] h-[100px] object-cover cursor-not-allowed"
                onClick={() => setSwitchOn(true)}
              />
            </>
          ) : (
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

export default MarketingForm;
