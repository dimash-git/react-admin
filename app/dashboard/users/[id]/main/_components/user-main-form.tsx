"use client";

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

import { useRouter } from "next/navigation";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название",
  }),
});

const UserMainForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: Bank;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    name: parsed?.name ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/bank/${parsed ? "update" : "add"}`,
      parsed ? { ...values, id: parsed.bank_id } : values
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при ${parsed?.name ? "обновлении" : "добавлении"} банк`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Банк ${parsed?.name ? "обновлен" : "добавлен"} успешно!`,
    });

    setOpen(false);
    router.refresh();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>название банка</FormLabel>
                <FormControl>
                  <Input {...field} />
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
              className="w-full"
            >
              Отмена
            </Button>
            <Button
              variant="formSubmit"
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserMainForm;
