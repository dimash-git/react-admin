"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import eventFormSchema from "../schema";
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
import { cn, dateToUnix, getFileFromUrl } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useContext } from "react";
import { EventContext } from "@/components/providers/event-provider";
import { useRouter } from "next/navigation";

const EventForm = ({ event }: { event?: _Event }) => {
  const { event: eventState, setEvent } = useContext(EventContext);
  // console.log("Event from form", event);

  const router = useRouter();

  const defaultValues = {
    name: event?.name ?? eventState?.name,
    desc: event?.desc ?? eventState?.desc,
    // type: (event?.is_online ? "online" : "offline") ?? eventState?.type
    type: ((event?.is_online ? "online" : "offline") ??
      eventState?.type) as EventType,
    date:
      eventState?.date ??
      new Date(event?.timestamp ? event?.timestamp * 1000 : Date.now()),
    // image: event?.img_url ? getFileFromUrl(event?.img_url) : eventState?.image,
    // form image field should be always File type
    // 1st case: event data fetched from server, it has url as img_url
    // 2nd case: event data gotten from state manipulation
  };

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { name, desc, type, date, image } = values;
    setEvent({
      name,
      desc,
      type,
      date,
      image,
    });
    router.push("add/preview");
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
            name="desc"
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
                      <SelectTrigger
                        className={
                          field.value == "online"
                            ? "text-thGreen"
                            : "text-thOrange"
                        }
                      >
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
            name="image"
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
            <Button variant="form" onClick={() => router.back()}>
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

export default EventForm;
