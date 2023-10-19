"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { panelBaseUrl } from "../../../nav";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

const AccForm = ({ parsed }: { parsed?: any }) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    login: "",
    password: "",
    google_secret: "",
    phone: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `/api/acc/${parsed ? "update" : "add"}`,
        values
      );

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error posting Admin User");
      }
      toast({
        variant: "success",
        title: `Аккаунт ${parsed ? "обновлена" : "добавлена"} успешно!`,
      });
      router.push(`${panelBaseUrl}/acc`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "success",
        title: `Ошибка при ${parsed ? "обновлении" : "добавлении"} аккаунта`,
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
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Логин</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Пароль</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Телефон</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="google_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Google secret qr code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="is_blocked"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Заблокирован ли аккаунт</FormLabel>
                <div className="flex items-center gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <span className="text-[12px] font-semibold">
                    {field.value ? "Да" : "Нет"}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* {blocks && (
            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">доступ к блокам</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите блок" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {blocks.length > 0 &&
                          blocks.map((block, idx) => (
                            <SelectItem
                              key={idx}
                              value={block}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {block}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}

          {/* <FormField
            control={form.control}
            name="favorites"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5 capitalize text-[12px]">
                  Выбранные
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={favorites}
                    onValueChange={field.onChange}
                    label="тэги"
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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

export default AccForm;
