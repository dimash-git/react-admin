"use client";

import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { cn, dateToUnix } from "@/lib/utils";

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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import formSchema from "./schema";
import { ru } from "date-fns/locale";

const UserMlmForm = ({ parsed }: { parsed?: UserMlm }) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  const defaultValues = {
    personal_sales: parsed?.personal_sales ?? 0,
    team_sales: parsed?.team_sales ?? 0,
    personal_registry: parsed?.personal_registry ?? 0,
    team_registry: parsed?.team_registry ?? 0,
    qualification_level: parsed?.qualification_level ?? 0,
    // career_closing_date: parsed?.career_closing_date
    //   ? new Date(parsed.career_closing_date * 1000)
    //   : new Date(),
    career_closing_date: new Date(),
    qw_create_date: parsed?.quick_start?.create_date
      ? new Date(parsed.quick_start.create_date * 1000)
      : new Date(),
    qw_expired_date: parsed?.quick_start?.expired_date
      ? new Date(parsed.quick_start.expired_date * 1000)
      : new Date(Date.now() + 24 * 3600 * 1000),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      career_closing_date,
      qw_create_date,
      qw_expired_date,
      ...restValues
    } = values;
    try {
      let sendData = {
        user_id: parsed?.user_id,
        quick_start: {
          create_date: dateToUnix(qw_create_date),
          expired_date: dateToUnix(qw_expired_date),
        },
        career_closing_date: dateToUnix(career_closing_date),
        ...restValues,
      };
      console.log(qw_create_date, qw_expired_date);
      console.log(sendData);

      const res = await axios.post("/api/user/mlm", sendData);

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating mlm info for user");
      }

      toast({
        variant: "success",
        title: "Млм данные обновлены успешно!",
      });
      router.back();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении млм данных",
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
            name="personal_sales"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Персональный продажи</FormLabel>
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
              <FormItem className="space-y-[10px]">
                <FormLabel>Командные продажи</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personal_registry"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Персональные регистрации</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="team_registry"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Командные регистрации</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualification_level"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Уровень квалификации</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="career_closing_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5"> Дата завершения карьеры</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="inputLike"
                          size="inputLike"
                          className={cn(
                            "w-full pl-3 text-left h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ru })
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-[23px] font-bold leading-6">Быстрый старт</div>

          <FormField
            control={form.control}
            name="qw_create_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5"> Дата начала</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="inputLike"
                          size="inputLike"
                          className={cn(
                            "w-full pl-3 text-left h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ru })
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qw_expired_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5"> Дата завершения</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="inputLike"
                          size="inputLike"
                          className={cn(
                            "w-full pl-3 text-left h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ru })
                          ) : (
                            <span>Выберите дату</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
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
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserMlmForm;
