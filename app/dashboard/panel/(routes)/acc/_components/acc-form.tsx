"use client";

import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

import axios from "axios";
import { useRouter } from "next/navigation";
import { panelBaseUrl } from "../../../nav";
import MultiSelect from "@/components/multiselect";

const AccForm = ({ parsed }: { parsed: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function getFavorites() {
      const res = await axios.post("/api/acc/favorites/get");
      const { status, content } = res.data;
      if (status != 200) return;
      // console.log(res.data);

      const { favorites } = content;
      setFavorites(favorites);
    }

    // getFavorites();
  }, []);

  const defaultValues = {
    login: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/acc/${parsed ? "update" : "add"}`,
      values
    );

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "success",
        title: `Ошибка при ${parsed ? "обновлении" : "добавлении"} аккаунта`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `Аккаунт ${parsed ? "обновлена" : "добавлена"} успешно!`,
    });

    router.refresh();
    router.push(`${panelBaseUrl}/acc`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Логин</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Пароль</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ga_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Google secret qr code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_blocked"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Заблокирован ли аккаунт</FormLabel>
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
          {blocks && (
            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-5">доступ к блокам</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите блок" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {blocks.length > 0 &&
                          blocks.map((block, idx) => (
                            <SelectItem
                              key={idx}
                              value={block}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {block}
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
            name="favorites"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5 capitalize text-[12px]">
                  Выбранные
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={favorites}
                    onValueChange={field.onChange}
                    label="тэги"
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default AccForm;
