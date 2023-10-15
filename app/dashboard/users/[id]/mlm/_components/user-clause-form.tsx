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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  is_clause_enable: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
});

const UserClauseForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  const defaultValues = { is_clause_enable: parsed ?? false };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      user_id: pathname.split("/").slice(-2, -1)[0],
    });

    try {
      const res = await axios.post("/api/user/mlm/clause", {
        ...values,
        user_id: pathname.split("/").slice(-2, -1)[0],
      });

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error updating mlm clause info for user");
      }

      toast({
        variant: "success",
        title: "Параметры клаузы обновлены успешно!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при обновлении параметр клаузы",
      });
    } finally {
      router.refresh();
      setOpen(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          <FormField
            control={form.control}
            name="is_clause_enable"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Включить</FormLabel>
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

export default UserClauseForm;
