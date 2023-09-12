import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../../constants";
const MAX_FILE_SIZE = 3000000;

const promoFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название промо материала",
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
  file: z
    .any()
    .refine((file) => file?.name, "Файл не выбран")
    .refine(
      (file) => file?.size < MAX_FILE_SIZE,
      `Максимальный размер файла ${MAX_FILE_SIZE / 1000000} MB.`
    ),
});

export default promoFormSchema;