"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import formSchema, { UserMainSendData } from "./schema";

const UserMainForm = ({ parsed }: { parsed?: UserMain }) => {
  const router = useRouter();
  const { toast } = useToast();

  let defaultValues: z.infer<typeof formSchema> = {
    user_login: parsed?.user_login ?? "",
    user_phone: parsed?.user_phone ?? "",
    user_email: parsed?.user_email ?? "",
    user_is_confirmed: parsed?.user_is_confirmed ?? false,
    user_is_passed_academy: parsed?.user_is_passed_academy ?? false,
  };

  if (parsed?.parent_id) {
    defaultValues.parent_id = parsed.parent_id;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!parsed) return;

    try {
      let sendData: UserMainSendData = {
        user_id: parsed.user_id,
        ...values,
      };
      console.log(sendData);
      const res = await axios.post("/api/user/main", sendData);

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating main info for user");
      }

      toast({
        variant: "success",
        title: "Основные данные обновлены успешно!",
      });
      router.back();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении основных данных",
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
            name="user_login"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_phone"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>телефон</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_is_confirmed"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Подтвержден ли аккаунт</FormLabel>
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
          />
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>id родителя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_is_passed_academy"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Пройдена академия</FormLabel>
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
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserMainForm;
