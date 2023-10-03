import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import * as z from "zod";
const MAX_FILE_SIZE = 3000000;

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
  cat: z.string({ required_error: "Категория обязательна" }),
  name: z.string().min(3, {
    message: "Введите название",
  }),
  desc: z.string().min(10, {
    message: "Описание должно быть больше 10 символов.",
  }),
  price: z.coerce
    .number({
      required_error: "Цена обязательна",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  discount: z.coerce
    .number({
      invalid_type_error: "Должна быть цифра",
    })
    .optional(),
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

export interface ProductValues {
  name: string;
  desc: string;
  advantages: string[];
  products?: {
    product_id: string;
  }[];
  cover?: File;
  price: number;
  is_pack: boolean;
  is_robot: boolean;
  discount?: number;
  cat?: string;
}

export default productFormSchema;
