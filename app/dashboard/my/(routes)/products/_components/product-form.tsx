"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import formSchema from "../schema";

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

import { ProductContext } from "./products-provider";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductValues {
  name: string;
  desc: string;
  advantages: string[];
  products?: {
    product_id: string;
  }[];
  image?: null;
  price: number;
  is_pack: boolean;
  is_robot: boolean;
  discount?: number;
  cat?: string;
}

const ProductForm = ({ parsed }: { parsed?: Product }) => {
  const router = useRouter();
  const [isSwitchOn, setSwitchOn] = useState<boolean>(false);
  const [cats, setCats] = useState<ProductCat[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { setProduct } = useContext(ProductContext);

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

  console.log(parsed);

  let defaultValues: ProductValues = {
    name: parsed?.name ?? "",
    desc: parsed?.description ?? "",
    advantages: parsed?.advantages ?? [" "],
    products: [{ product_id: "" }],
    price: parsed?.price ?? 100,
    is_robot: parsed?.is_robot ?? false,
    is_pack: parsed?.is_pack ?? false,
    discount: parsed?.discount ?? 0,
  };

  if (!parsed?.img) {
    defaultValues.image = null;
  }

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
  // console.log(isPack);

  const {
    fields: prods,
    append: prodsAppend,
    remove: prodsRemove,
  } = useFieldArray({
    control: form.control,
    name: "products",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setProduct(values);

    const {
      name,
      desc,
      advantages,
      image,
      price,
      is_pack,
      is_robot,
      products,
      discount,
      cat,
    } = values;

    setProduct({
      name,
      image,
      desc,
      advantages,
      price,
      is_pack,
      is_robot,
      products,
      discount,
      cat,
    });

    router.push("add/preview");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
          {parsed?.img && !isSwitchOn ? (
            <>
              <Image
                src={`${parsed?.img}`}
                width={200}
                height={100}
                alt={parsed?.name}
                className="w-[200px] h-[100px] object-cover cursor-not-allowed"
                onClick={() => setSwitchOn(true)}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="image"
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
          {cats && (
            <FormField
              control={form.control}
              name="cat"
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
                          cats.map((cat, index) => (
                            <SelectItem
                              key={index}
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
            name="desc"
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
              {advs.map((adv, index) => (
                <div className="flex gap-5 items-center" key={adv.id}>
                  <span className="w-[10px]">{index + 1}</span>
                  <FormField
                    control={form.control}
                    name={`advantages.${index}`}
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

          {isPack && (
            <div className="fields--products">
              <div className="text-[12px] font-medium uppercase mb-5">
                Название продуктов
              </div>
              <div className="flex flex-col space-y-5">
                {prods.map((prod, index) => (
                  <div className="flex gap-5 items-center" key={prod.id}>
                    <span className="w-[10px]">{index + 1}</span>
                    <FormField
                      control={form.control}
                      name={`products.${index}.product_id`}
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
                                  products.map((product, index) => (
                                    <SelectItem
                                      key={index}
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
