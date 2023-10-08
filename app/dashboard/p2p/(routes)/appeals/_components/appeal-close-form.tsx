"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import MultiSelect from "@/components/multiselect";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  msg_offer: z.string().min(3, {
    message: "Введите сообщение",
  }),
  msg_order: z.string().min(3, {
    message: "Введите сообщение",
  }),
  user_id_p2p_ban: z.string().optional(),
  appeal_status: z.string({ required_error: "Статус обязателен" }),
});

const AppealCloseForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: Appeal;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<any>([]);

  const statusList = [
    {
      label: "Отменен",
      value: "cancelled",
    },
    {
      label: "Закрыт",
      value: "closed",
    },
    {
      label: "Отозван",
      value: "rejected",
    },
    {
      label: "Просрочен",
      value: "expired",
    },
  ];

  useEffect(() => {
    if (parsed)
      setUsers([
        {
          label: "Владелец оффера",
          value: parsed.user_offer_owner_id,
        },
        {
          label: "Владелец ордера",
          value: parsed.user_order_owner_id,
        },
      ]);
  }, [parsed]);

  const defaultValues = {
    msg_offer: "",
    msg_order: "",
    appeal_status: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/p2p/appeal/close", {
        ...values,
        id: parsed?.appeal_id,
      });

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status !== 200) {
        throw new Error("Error updating appeal");
      }

      toast({
        variant: "success",
        title: "Аппеляция закрыта успешно!",
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при закрытии аппеляции",
      });
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {parsed && (
            <FormField
              control={form.control}
              name="user_id_p2p_ban"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel>User Id в бан</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={users}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {statusList && (
            <FormField
              control={form.control}
              name="appeal_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">Категория</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusList.length > 0 &&
                          statusList.map((status, idx) => (
                            <SelectItem
                              key={idx}
                              value={status.value}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="msg_offer"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>уведомление владельцу ОФФЕРА</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="msg_order"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>уведомление владельцу ордера</FormLabel>
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
              className="w-full h-10 text-[16px]"
            >
              Отмена
            </Button>
            <Button
              variant="formSubmit"
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full h-10 text-[16px]"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AppealCloseForm;
