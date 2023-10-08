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
import { Textarea } from "@/components/ui/textarea";
import { p2pBaseUrl } from "../../../nav";

const formSchema = z.object({
  decision: z.string().min(3, {
    message: "Введите ваше решение",
  }),
});

const ComplaintForm = ({
  setOpen,
  parsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: Complaint;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    decision: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/p2p/complaint/save", {
        ...values,
        id: parsed?.complain_id,
      });

      // console.log("Response:", res.data);
      const { status } = res.data;
      if (status !== 200) {
        throw new Error("Error saving decision for complaint");
      }

      toast({
        variant: "success",
        title: "Решение сохранено успешно",
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка при сохранении решения",
      });
    } finally {
      router.refresh();
      router.push(`${p2pBaseUrl}/complaints`);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="decision"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>Ваше решение</FormLabel>
                <FormControl>
                  <Textarea rows={7} {...field} />
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

export default ComplaintForm;
