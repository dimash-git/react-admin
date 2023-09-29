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
import { useContext } from "react";
import { PassportContext } from "./passport-provider";
import { processBaseUrl } from "../../../nav";

const formSchema = z.object({
  reason: z.string().min(3, {
    message: "Введите название",
  }),
});

const PassportForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: Passport;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { passport } = useContext(PassportContext);

  const defaultValues = {
    reason: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(`/api/passport/refuse`, {
      ...values,
      id: passport?.user_id,
    });

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при отказе на верификацию`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Верификация отказана!`,
    });

    setOpen(false);

    router.push(`${processBaseUrl}/passport`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>Причина отказа</FormLabel>
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
              variant="destructive"
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full text-[12px]"
            >
              Отказать
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PassportForm;
