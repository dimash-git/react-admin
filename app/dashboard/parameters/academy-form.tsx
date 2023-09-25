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

import { useRouter } from "next/navigation";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  login: z.string().min(3, {
    message: "Введите логин",
  }),
  password: z.string().min(8, {
    message: "Введите пароль длиной минимум 8 символов",
  }),
  url: z.string().url({
    message: "Данный текст не является ссылкой",
  }),
});

const AcademyForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    login: "",
    password: "",
    url: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/api/academy/update", values);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении академии",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Академия обновлена успешно!",
    });

    setOpen(false);
    router.refresh();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="space-y-5">
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
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>Ссылка</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-ten w-full justify-between">
            <Button
              variant="form"
              type="button"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Отмена
            </Button>
            <Button
              variant="formSubmit"
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AcademyForm;
