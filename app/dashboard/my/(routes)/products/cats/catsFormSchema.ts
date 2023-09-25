import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../../../constants";
const MAX_FILE_SIZE = 1000000;

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название категории",
  }),
  icon: z.optional(
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
});

export default formSchema;
