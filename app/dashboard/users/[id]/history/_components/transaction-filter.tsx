"use client";

import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";
import { cn, dateToUnix } from "@/lib/utils";
import { statuses, types } from "./records";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formSchema = z.object({
  from: z
    .date({
      invalid_type_error: "Это не дата!",
    })
    .optional(),
  to: z
    .date({
      invalid_type_error: "Это не дата!",
    })
    .optional(),
  type: z
    .enum([
      "buy",
      "withdrawal",
      "transfer_p2p",
      "frozen_p2p",
      "mlm_percent",
      "mlm_matching",
      "other",
    ])
    .optional(),
  status: z.enum(["success", "process", "cancelled"]).optional(),
});

const TransactionFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sevenDaysAgo = useMemo(() => {
    return new Date(Date.now() - 7 * 24 * 3600 * 1000);
  }, []);

  const defaultValues: z.infer<typeof formSchema> = {
    // from: sevenDaysAgo,
    // to: new Date(),
    // type: "buy",
    // status: "success",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { from, to, type, status } = values;

    let redirectUrl = "";
    if (from) redirectUrl += `?f=${dateToUnix(from)}`;
    if (to) redirectUrl += `&t=${dateToUnix(to)}`;
    if (type) redirectUrl += `&type=${type}`;
    if (status) redirectUrl += `&status=${status}`;

    router.push(pathname + redirectUrl);
  }

  const { isLoading, isSubmitting } = form.formState;
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-[10px]"
        >
          <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-5">Начало</FormLabel>
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
                          locale={ru}
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
              name="to"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-5">Конец</FormLabel>
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
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-5">Тип</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {types &&
                          Object.keys(types).map((key, idx) => (
                            <SelectItem
                              key={idx}
                              value={key}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {types[key as keyof typeof types]}
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
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-5">Статус</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses &&
                          Object.keys(statuses).map((key, idx) => (
                            <SelectItem
                              key={idx}
                              value={key}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {statuses[key as keyof typeof statuses]}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-ten">
            <Button
              variant="formSubmit"
              type="submit"
              size="md"
              className="text-[16px]"
              disabled={isLoading || isSubmitting}
            >
              Поиск
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TransactionFilter;
