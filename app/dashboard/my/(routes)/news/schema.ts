import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import * as z from "zod";
const MAX_FILE_SIZE = 3000000;

const newsFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название",
  }),
  tags: z.string({
    required_error: "Тэг обязателен",
  }),
  excerpt: z.string({
    required_error: "Введите краткое описание",
  }),
  desc: z.string().min(10, {
    message: "Введите текст",
  }),
  image: z
    .any()
    .refine((file) => file?.name, "Файл не выбран")
    .refine(
      (file) => file?.size < MAX_FILE_SIZE,
      `Максимальный размер файла ${MAX_FILE_SIZE / 1000000} MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Только файлы в формате .jpg, .jpeg, .png and .webp принимаются."
    ),
  url: z.string().url({
    message: "Данный текст не является ссылкой",
  }),
});

export default newsFormSchema;
