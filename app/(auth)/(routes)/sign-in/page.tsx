"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginFormSchema as formSchema } from "../../schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin",
      password: "admin",
      code: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username: login, password, code } = values;
    try {
      await signIn("credentials", {
        login,
        password,
        code,
        callbackUrl: "/dashboard/my",
      });
      toast({
        variant: "success",
        title: "Вход выполнен успешно!",
      });
    } catch (error) {
      console.log("Sign-in Error", error);
      toast({
        variant: "destructive",
        title: "Произошла ошибка при входе.",
      });
    }
  }
  return (
    <div className="flex flex-col space-y-[20px]">
      <h3 className="text-[20px] text-gray text-center block border-b-[1px] border-b-[#0072FF] pb-5">
        Вход
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[20px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Логин или почта"
                    {...field}
                    variant="auth"
                  />
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
                <FormControl>
                  <Input placeholder="Пароль" {...field} variant="auth" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Код" {...field} variant="auth" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="submit" size="md" type="submit" className="w-full">
            Вход
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
