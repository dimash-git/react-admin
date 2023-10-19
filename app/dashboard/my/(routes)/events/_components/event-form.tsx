"use client";

import { useContext, useState } from "react";
import CrossCircleIcon from "@/public/icons/cross-circle.svg";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
  cn,
  convertMediaBlockToBase64,
  dateToUnix,
  fileToBase64,
  getFileType,
  mapMediaBlocks,
} from "@/lib/utils";

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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { EventContext } from "@/app/dashboard/my/(routes)/events/_components/event-provider";
import AddFieldsPanel from "./add-fields-panel";
import { homeBaseUrl } from "../../../nav";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { EventSendData } from "../schema";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const EventForm = ({ parsed }: { parsed?: Evt }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { event, setEvent } = useContext(EventContext);
  const [selectedCover, setSelectedCover] = useState<boolean>(false);

  // console.log(parsed);

  /* START */
  let defaultValues: z.infer<typeof formSchema> = {
    name: parsed?.name ?? event?.name ?? "",
    desc: parsed?.desc ?? event?.desc ?? "",
    type: (parsed?.is_online != null
      ? parsed?.is_online
        ? "online"
        : "offline"
      : event?.type ?? "offline") as EvtType,
    date: parsed?.timestamp
      ? new Date(parsed.timestamp * 1000)
      : event?.date ?? new Date(),
    media_blocks: parsed?.media_blocks
      ? mapMediaBlocks(parsed?.media_blocks)
      : event?.media_blocks ?? [],
  };

  if (!parsed?.img_url) {
    defaultValues.cover = {} as File;
  }
  if (event?.cover) {
    defaultValues.cover = event?.cover;
  }
  /* END */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "media_blocks",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (parsed) {
      const { date, type, media_blocks, cover, ...restValues } = values;
      try {
        const mediaBlocksWithBase64 = await Promise.all(
          media_blocks.map(convertMediaBlockToBase64)
        );
        const sendData: EventSendData = {
          ...restValues,
          timestamp: dateToUnix(date),
          is_online: type == "online" ? true : false,
          media_blocks: mediaBlocksWithBase64,
          event_id: parsed.event_id,
        };

        if (cover) {
          const base64String = await fileToBase64(cover);
          sendData.img_data_base64 = base64String as string;
          sendData.img_type = getFileType(cover.type);
        }
        console.log(sendData);

        const res = await axios.post("/api/event/update", sendData);

        const { status } = res.data;
        if (status !== 200) {
          throw new Error("Error updating event");
        }

        toast({
          variant: "success",
          title: "Мероприятие обновлено успешно!",
        });
        router.push(`${homeBaseUrl}/events`);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Ошибка при обновлении мероприятия",
        });
      } finally {
        router.refresh();
        return;
      }
    }

    setEvent(values);
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
          {parsed?.img_url && !selectedCover ? (
            <div className="flex flex-col space-y-2">
              <span className="block text-[12px] font-medium uppercase ">
                Обложка
              </span>
              <Image
                src={`${parsed?.img_url}`}
                width={200}
                height={100}
                alt={parsed?.name}
                className="w-[200px] h-[100px] object-cover rounded-[5px] cursor-remove"
                onClick={() => setSelectedCover(true)}
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="cover"
              render={({ field: { value, ...field } }) => (
                <FormItem className="space-y-[10px]">
                  <FormLabel>Обложка</FormLabel>
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
          )}

          {fields.map((field, idx) => (
            <div className="relative" key={field.id}>
              <span
                onClick={() => {
                  if (fields.length > 0) remove(idx);
                }}
                className="text-thRed absolute right-0 top-0 hover:text-thRed/80 transition cursor-pointer"
              >
                <CrossCircleIcon />
              </span>
              <div className="flex flex-col space-y-[30px]">
                {field.text && (
                  <div className="flex gap-5 items-center">
                    <FormField
                      control={form.control}
                      name={`media_blocks.${idx}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="mb-5">Текст</FormLabel>
                          <FormControl>
                            <Textarea rows={8} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {field.media && (
                  <div className="flex gap-5 items-center">
                    <FormField
                      control={form.control}
                      name={`media_blocks.${idx}.media`}
                      render={({ field: { value, ...field } }) => (
                        <FormItem className="w-full">
                          <FormLabel className="mb-5">Медиафайл</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...field}
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
                  </div>
                )}
                {field?.media_url && (
                  <div className="flex flex-col space-y-2">
                    <span className="block text-[12px] font-medium uppercase ">
                      Медиафайл
                    </span>
                    <Image
                      src={`${field.media_url}`}
                      width={200}
                      height={100}
                      alt={`Медиафайл - ${idx + 1}`}
                      className="w-[200px] h-[100px] object-cover rounded-[5px]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <AddFieldsPanel name="мероприятие" append={append} />

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

export default EventForm;
