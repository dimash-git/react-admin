"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import formSchema from "./schema";
import { ru } from "date-fns/locale";

const UserPersonalForm = ({ parsed }: { parsed?: UserPersonal }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function getCountries() {
      try {
        const res = await axios.post("/api/country/get");
        const { status, content } = res.data;

        if (status != 200) {
          throw new Error("Error loading Countries");
        }

        const { countries } = content;
        setCountries(countries);
      } catch (error) {
        console.error(error);
      }
    }
    getCountries();
  }, []);

  const defaultValues = {
    first_name: parsed?.first_name ?? "",
    middle_name: parsed?.middle_name ?? "",
    last_name: parsed?.last_name ?? "",
    birthday_date: parsed?.birthday_timestamp
      ? new Date(parsed.birthday_timestamp * 1000)
      : new Date(),
    country: parsed?.country ?? "",
    telegram: parsed?.telegram ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { birthday_date, ...restValues } = values;
    try {
      const res = await axios.post("/api/user/personal", {
        user_id: parsed?.user_id,
        birthday_timestamp: dateToUnix(birthday_date),
        ...restValues,
      });

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating personal info for user");
      }

      toast({
        variant: "success",
        title: "Персональные данные обновлены успешно!",
      });
      router.back();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении персональные данных",
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
            name="first_name"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">День рождения</FormLabel>
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
                        disabled={(date) => date > new Date()}
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

          {countries?.length > 0 ? (
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">Страна</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите страну" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.length > 0 &&
                          countries.map((country, idx) => (
                            <SelectItem
                              key={idx}
                              value={country?.name}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {country?.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="text-[12px] font-medium mb-5">
              Загрузка стран ...
            </div>
          )}
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>телеграм</FormLabel>
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
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserPersonalForm;
