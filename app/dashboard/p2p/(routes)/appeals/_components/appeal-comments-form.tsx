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

const formSchema = z.object({
  comments: z.string().min(10, {
    message: "Введите название",
  }),
});

const AppealCommentsForm = ({
  comments,
  id,
}: {
  comments?: string;
  id: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    comments,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/appeal/comments/save", {
        ...values,
        id,
      });

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error saving comments for appeal");
      }

      toast({
        variant: "success",
        title: "Комментарии сохранены успешно!",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при сохранении комментариев",
      });
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel>Комментарии</FormLabel>
                <FormControl>
                  <Textarea rows={7} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-ten w-full justify-between">
            <Button
              variant="formSubmit"
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              Сохранить Комментарии
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AppealCommentsForm;
