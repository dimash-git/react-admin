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

import formSchema from "../schema";
import { fileToBase64, getFileType } from "@/lib/utils";
import { homeBaseUrl } from "@/app/dashboard/my/nav";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface DefValues {
  name: string;
  icon?: null;
}

const CatsForm = ({ parsed }: { parsed?: SupportCat }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSwitchOn, setSwitchOn] = useState<boolean>(false);

  let defaultValues: DefValues = {
    name: parsed?.name ?? "",
  };

  if (!parsed?.img) {
    defaultValues.icon = null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, icon } = values;

    let formData = {
      name,
      category_id: parsed?.category_id ?? "",
      data_type: "",
      data_base64: "",
    };

    if (icon) {
      try {
        const base64String = await fileToBase64(icon);
        formData.data_base64 = base64String as string;
        formData.data_type = getFileType(icon.type);
      } catch (error: any) {
        console.error("Get icon base64 error: ", error.message);
      }
    }

    const res = await axios.post(
      `/api/support/cats/${parsed ? "update" : "add"}`,
      formData
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
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
    router.push(`${homeBaseUrl}/support/cats`);
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

          {parsed?.img && !isSwitchOn ? (
            <Image
              src={`${parsed?.img}`}
              width={200}
              height={100}
              alt={parsed?.name}
              className="w-[200px] h-[100px] object-cover cursor-not-allowed"
              onClick={() => setSwitchOn(true)}
            />
          ) : (
            <FormField
              control={form.control}
              name="icon"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel className="mb-5">Иконка</FormLabel>
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

export default CatsForm;
