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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  market: z.string().min(2, {
    message: "Введите название",
  }),
  name: z.string().min(2, {
    message: "Введите название",
  }),
  is_euro: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  is_dollar: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
});

const SymbolsForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: Symbol;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    market: parsed?.market ?? "",
    name: parsed?.name ?? "",
    is_euro: parsed?.is_euro ?? false,
    is_dollar: parsed?.is_dollar ?? false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/symbol/${parsed ? "update" : "add"}`,
      parsed ? { ...values, id: parsed.symbol_id } : values
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при ${
          parsed?.name ? "обновлении" : "добавлении"
        } символа`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Символ ${parsed?.name ? "обновлен" : "добавлен"} успешно!`,
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
            name="market"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>название рынка</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>название символа</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_euro"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Евро</FormLabel>
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
            name="is_dollar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Доллар</FormLabel>
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

export default SymbolsForm;
