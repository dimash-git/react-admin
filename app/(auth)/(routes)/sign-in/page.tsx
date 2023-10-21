"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CredsContext } from "../../creds-provider";

const formSchema = z.object({
  login: z.string().min(3, {
    message: "Заполните логин или почту",
  }),
  password: z.string().min(4, { message: "Заполните пароль" }),
});

const SignInPage = () => {
  const router = useRouter();
  const { creds, setCreds } = useContext(CredsContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "admin",
      password: "admin",
    },
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { login, password } = values;
    setCreds({
      ...creds,
      login,
      password,
    });

    router.push("/sign-in/2fa");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="login"
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

        <div className="flex gap-2">
          <Button
            variant="submit"
            size="md"
            type="submit"
            className="w-full"
            disabled={isLoading || isSubmitting}
            onClick={() => {
              setCreds({ ...creds, type: "google" });
            }}
          >
            GA
          </Button>
          <Button
            variant="submit"
            size="md"
            type="submit"
            className="w-full"
            disabled={isLoading || isSubmitting}
            onClick={() => {
              setCreds({ ...creds, type: "phone" });
            }}
          >
            SMS
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInPage;
