"use client";

import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

import axios from "axios";
import { useRouter } from "next/navigation";

import { panelBaseUrl } from "../../../nav";

const ClauseSettingsForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [levels, setLevels] = useState([]);

  // console.log("parsed", parsed);

  const defaultValues = {
    percent: 0,
    term: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/api/clause/update", values);

    const { status } = res.data;

    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении клаузы",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Клауза обновлена успешно!",
    });

    router.refresh();
    router.push(`${panelBaseUrl}/panel`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          <FormField
            control={form.control}
            name="percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                  Процент продаж одного партнера для включения клаузы
                </FormLabel>
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                  Уровень с которого работает клауза
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите уровень" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.length > 0 &&
                        levels.map((level, idx) => (
                          <SelectItem
                            key={idx}
                            value={level}
                            className="text-white hover:text-black focus:text-black cursor-pointer"
                          >
                            {level}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                  Срок действия клаузы до сгорания средств в месяцах
                </FormLabel>
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

export default ClauseSettingsForm;
