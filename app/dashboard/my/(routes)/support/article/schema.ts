import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import * as z from "zod";

const MAX_FILE_SIZE = 1000000;

const formSchema = z.object({
  question: z.string().min(3, {
    message: "Введите название вопроса",
  }),
  cat: z.string({ required_error: "Категория обязательна" }),
  media_blocks: z.array(
    z.object({
      media: z.optional(
        z
          .any()
          .refine((file) => file?.name, "Файл не выбран")
          .refine(
            (file) => file?.size < MAX_FILE_SIZE,
            `Максимальный размер файла ${MAX_FILE_SIZE / 1000000} MB.`
          )
      ),
      text: z.optional(z.string()),
    })
  ),
});

export default formSchema;
