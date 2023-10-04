"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

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
import { mlmBaseUrl } from "../nav";
import { Checkbox } from "@/components/ui/checkbox";

const MlmForm = ({ parsed }: { parsed?: Mlm }) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    name: parsed?.name ?? "",
    team_sales: parsed?.team_sales ?? 0,
    personal_sales: parsed?.personal_sales ?? 0,
    percent: parsed?.percent ?? 0,
    matching: parsed?.matching ?? 0,
    is_automatic_upgrade: parsed?.is_automatic_upgrade ?? false,
    robot_count: parsed?.robot_count ?? 0,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/mlm/${parsed ? "update" : "add"}`,
      parsed ? { ...values, id: parsed.qualification_id } : values
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при ${
          parsed?.name ? "обновлении" : "добавлении"
        } квалификации!`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Квалификация ${
        parsed?.name ? "обновлена" : "добавлена"
      } успешно!`,
    });

    router.refresh();
    router.push(`${mlmBaseUrl}`);
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
                <FormLabel className="mb-5">название квалификации</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team_sales"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Командные продажи </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personal_sales"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">персональные продажи </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Процент</FormLabel>
                <div className="flex relative w-full">
                  <span className="absolute top-[10px] right-[10px] text-[15px] font-semibold">
                    %
                  </span>
                  <FormControl>
                    <Input {...field} className="pr-12" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matching"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Матчинг</FormLabel>
                <div className="flex relative w-full">
                  <span className="absolute top-[10px] right-[10px] text-[15px] font-semibold">
                    %
                  </span>
                  <FormControl>
                    <Input {...field} className="pr-12" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_automatic_upgrade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">ручной перевод</FormLabel>
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
            name="robot_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">количество роботов</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
              Сохранить изменения
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MlmForm;
