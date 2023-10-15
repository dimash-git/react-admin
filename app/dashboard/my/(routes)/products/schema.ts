import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import * as z from "zod";

const productFormSchema = z.object({
  cover: z.optional(
    z
      .any()
      .refine((file) => file?.name, "Файл не выбран")
      .refine(
        (file) => file?.size < MAX_FILE_SIZE,
        `Максимальный размер файла ${MAX_FILE_SIZE / 1000000} MB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Только файлы в формате .jpg, .jpeg, .png and .webp принимаются."
      )
  ),
  category_id: z.string({ required_error: "Категория обязательна" }),
  name: z.string().min(3, {
    message: "Введите название",
  }),
  description: z.string().min(10, {
    message: "Описание должно быть больше 10 символов.",
  }),
  price: z.coerce.number({
    required_error: "Цена обязательна",
    invalid_type_error: "Должна быть цифра",
  }),
  discount: z.coerce.number({
    invalid_type_error: "Должна быть цифра",
  }),
  advantages: z.array(z.string()),
  products: z
    .array(
      z.object({
        product_id: z.string(),
      })
    )
    .optional(),
  is_robot: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  is_pack: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
});

export interface ProductSendData {
  product_id?: string; // for updated only
  category_id: string;
  img_base64?: string;
  img_type?: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  is_pack: boolean;
  is_robot: boolean;
  advantages: string[];
  pack_product_json?: [
    {
      product_id: string;
      count: number;
    }[]
  ];
}

export default productFormSchema;
