"use client";

import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

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

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

const formSchema = z.object({
  reason: z
    .string()
    .min(7, {
      message: "Дайте причину",
    })
    .optional(),
  is_remove: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
});

const UserRemoveForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: UserRemoved;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  let defaultValues: z.infer<typeof formSchema> = {
    is_remove: parsed?.is_remove ?? false,
    reason: parsed?.reason ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { setValue, control, formState } = form;

  const is_remove = useWatch({ control, name: "is_remove" });
  useEffect(() => {
    if (is_remove) {
      setValue("reason", "");
    } else {
      setValue("reason", undefined);
    }
  }, [is_remove, setValue]);

  const { isLoading, isSubmitting } = formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await axios.post("/api/user/remove", {
        ...values,
        user_id: pathname.split("/").slice(-2, -1)[0],
      });

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating remove info for user");
      }

      toast({
        variant: "success",
        title: "Решение обновлено успешно!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении решения",
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
            name="is_remove"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Удалить</FormLabel>
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
          {is_remove && (
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="space-y-[10px]">
                  <FormLabel>Причина</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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

export default UserRemoveForm;
