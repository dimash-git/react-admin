"use client";
import { useContext, useEffect, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema, { ProductSendData } from "../schema";

import { ProductContext } from "./products-provider";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { fileToBase64, getFileType } from "@/lib/utils";
import { homeBaseUrl } from "../../../nav";

const ProductForm = ({ parsed }: { parsed?: Product }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSwitchOn, setSwitchOn] = useState<boolean>(false);
  const [cats, setCats] = useState<ProductCat[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { product, setProduct } = useContext(ProductContext);

  useEffect(() => {
    async function getCategories() {
      const res = await axios.post("/api/product/cats/get");
      const { status, content } = res.data;
      if (status != 200) return;
      // console.log(res.data);

      const { categories } = content;
      setCats(categories);
    }
    async function getProducts() {
      const res = await axios.post("/api/product/get");
      const { status, content } = res.data;
      if (status != 200) return;
      // console.log(res.data);

      const { products } = content;
      setProducts(products);
    }

    getCategories();
    getProducts();
  }, []);

  // console.log(parsed);

  /* START */
  let defaultValues: z.infer<typeof formSchema> = {
    category_id: parsed?.category_id ?? product?.category_id ?? "",
    name: parsed?.name ?? product?.name ?? "",
    description: parsed?.description ?? product?.description ?? "",
    price: parsed?.price ?? product?.price ?? 100,
    discount: parsed?.discount ?? product?.discount ?? 0,
    is_robot: parsed?.is_robot ?? product?.is_robot ?? false,
    is_pack: parsed?.is_pack ?? product?.is_pack ?? false,
    advantages: parsed?.advantages ?? product?.advantages ?? [" "],
    products: parsed?.pack_product_json ??
      product?.products ?? [{ product_id: "" }],
  };

  if (!parsed?.img) {
    defaultValues.cover = {} as File;
  }
  if (product?.cover) {
    defaultValues.cover = product.cover;
  }
  /* END */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isLoading, isSubmitting } = form.formState;

  const {
    fields: advs,
    append: advsAppend,
    remove: advsRemove,
  } = useFieldArray({
    control: form.control,
    name: "advantages",
  });

  const isPack = form.watch("is_pack");

  const {
    fields: prods,
    append: prodsAppend,
    remove: prodsRemove,
  } = useFieldArray({
    control: form.control,
    name: "products",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { price, discount, cover, ...restValues } = values;

    if (parsed) {
      try {
        const sendData: ProductSendData = {
          ...restValues,
          price: price.toString(),
          discount: discount.toString(),
          product_id: parsed.product_id,
        };

        if (cover) {
          const base64String = await fileToBase64(cover);
          sendData.img_base64 = base64String as string;
          sendData.img_type = getFileType(cover.type);
        }
        console.log(sendData);
        const res = await axios.post("/api/product/update", sendData);

        const { status } = res.data;
        if (status !== 200) {
          throw new Error("Error updating product");
        }

        toast({
          variant: "success",
          title: "Продукт обновлен успешно!",
        });
        router.push(`${homeBaseUrl}/products`);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Ошибка при обновлении продукта",
        });
      } finally {
        router.refresh();
        return;
      }
    }
    setProduct(values);
    router.push("add/preview");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          {parsed?.img && !isSwitchOn ? (
            <div className="flex flex-col space-y-2">
              <span className="block text-[12px] font-medium uppercase ">
                Обложка
              </span>
              <Image
                src={`${parsed?.img}`}
                width={200}
                height={100}
                alt={parsed?.name}
                className="w-[200px] h-[100px] object-cover rounded-[5px] cursor-not-allowed"
                onClick={() => setSwitchOn(true)}
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="cover"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel className="mb-5">Обложка</FormLabel>
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
          {cats.length > 0 ? (
            <FormField
              control={form.control}
              name="category_id"
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
                        {cats.length > 0 &&
                          cats.map((cat, idx) => (
                            <SelectItem
                              key={idx}
                              value={cat?.category_id}
                              className="text-white hover:text-black focus:text-black cursor-pointer"
                            >
                              {cat?.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="text-[12px] font-medium mb-5">
              Загрузка категорий ...
            </div>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Название</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Описание</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="fields--advantages">
            <div className="text-[12px] font-medium uppercase mb-5">
              Преимущества
            </div>
            <div className="flex flex-col space-y-5">
              {advs.map((adv, idx) => (
                <div className="flex gap-5 items-center" key={adv.id}>
                  <span className="w-[10px]">{idx + 1}</span>
                  <FormField
                    control={form.control}
                    name={`advantages.${idx}`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5 gap-2">
              <Button
                variant="destructive"
                className="text-[12px]"
                type="button"
                onClick={() => {
                  if (advs.length > 1) advsRemove(advs.length - 1);
                }}
              >
                Убрать поле
              </Button>
              <Button
                variant="form"
                type="button"
                onClick={() => advsAppend(" ")}
              >
                Добавить поле
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Цена</FormLabel>
                <div className="flex relative w-full">
                  <span className="absolute top-[10px] right-[10px] text-[15px] font-semibold">
                    USD
                  </span>
                  <FormControl>
                    <Input {...field} className="pr-12" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Скидка</FormLabel>
                <div className="flex relative w-full">
                  <span className="absolute top-[10px] right-[10px] text-[15px] font-semibold">
                    %
                  </span>
                  <FormControl>
                    <Input {...field} className="pr-12" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_robot"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">
                  Переводит ли менеджера на клиента
                </FormLabel>
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
          <FormField
            control={form.control}
            name="is_pack"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-5">Пакет продуктов</FormLabel>
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

          {isPack && products.length > 0 ? (
            <div className="fields--products">
              <div className="text-[12px] font-medium uppercase mb-5">
                Название продуктов
              </div>
              <div className="flex flex-col space-y-5">
                {prods.map((prod, idx) => (
                  <div className="flex gap-5 items-center" key={prod.id}>
                    <span className="w-[10px]">{idx + 1}</span>
                    <FormField
                      control={form.control}
                      name={`products.${idx}.product_id`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите продукт" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.length > 0 &&
                                  products.map((product, idx) => (
                                    <SelectItem
                                      key={idx}
                                      value={product?.product_id}
                                      className="text-white hover:text-black focus:text-black cursor-pointer"
                                    >
                                      {product?.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-5 gap-2">
                <Button
                  variant="destructive"
                  className="text-[12px]"
                  type="button"
                  onClick={() => {
                    if (prods.length > 1) prodsRemove(prods.length - 1);
                  }}
                >
                  Убрать поле
                </Button>
                <Button
                  variant="form"
                  type="button"
                  onClick={() => prodsAppend({ product_id: "" })}
                >
                  Добавить поле
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-[12px] font-medium mb-5">
              Загрузка продуктов ...
            </div>
          )}

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

export default ProductForm;
