"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  user_id: z.string().min(6, {
    message: "Введите id пользователя",
  }),
  sum: z.coerce
    .number({
      required_error: "Сумма обязательна",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  desc: z.string().min(10, {
    message: "Введите комментарий",
  }),
});

const TranForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: any;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    user_id: "",
    sum: 0,
    desc: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/transaction/${
        parsed?.type === "decrease" ? "decrease" : "increase"
      }`,
      values
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при ${
          parsed?.type === "decrease" ? "списании" : "начислении"
        } средств!`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Средства ${
        parsed?.type === "decrease" ? "списаны" : "начислены"
      } успешно!`,
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
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">ID пользователя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Сумма</FormLabel>
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
              <FormItem className="space-y-5">
                <FormLabel>Комментарий</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
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
              Отправить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TranForm;
