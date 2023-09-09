"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import eventFormSchema from "./schema";
import { format } from "date-fns";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const text = `Мероприятие более чем на 100 человек, с after-party на яхте Radisson!

На нашем мероприятии вы увидите:

- Новый кабинет и сайт компании
- Новую партнёрскую программу
- Уникальную разработку не имеющую аналогов на рынке
- Подведем итоги промоушена на 3.000.000р
- Поделимся планами и новостями компании

А также вы получите возможность поучаствовать в розыгрыше подарков от компании, вкусно покушаем, будет шоу программа, фото/видео съёмка, и многое другое! 🤩🤩🤩`;

const EventForm = () => {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "Москва",
      description: text,
      type: "offline",
      file: {} as File,
    },
  });
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <FormLabel className="mb-5">Название мероприятия</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Описание мероприятия</FormLabel>
                <FormControl>
                  <Textarea rows={13} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">тип мероприятия</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип мероприятия" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="text-thOrange" value="offline">
                        Оффлайн
                      </SelectItem>
                      <SelectItem className="text-thGreen" value="online">
                        Онлайн
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                   Дата проведения мероприятия
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="inputLike"
                          size="inputLike"
                          className={cn(
                            "w-full pl-3 text-left",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
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
            name="file"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel className="mb-5">Описание мероприятия</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    // spreading value is important cause you do not want default value change
                    onChange={(e) => {
                      if (!e.target.files) return;
                      field.onChange(e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-ten">
            <Button variant="form">Отмена</Button>
            <Button
              variant="form"
              type="submit"
              className="bg-thBlue hover:bg-thBlue/80"
            >
              Сохранить изменения
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
