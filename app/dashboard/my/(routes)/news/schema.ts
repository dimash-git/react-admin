import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import * as z from "zod";

const newsFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название",
  }),
  tags: z.string({
    required_error: "Тэг обязателен",
  }),
  desc: z.string().min(10, {
    message: "Введите описание",
  }),
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
      media_url: z.optional(z.string()),
    })
  ),
});

export interface NewsSendData {
  news_id?: string;
  name: string;
  tags: string[];
  desc: string;
  img_base_base64?: string;
  img_ext?: string;
  media_blocks: {
    text?: string;
    media?: {
      data_type: string;
      data_base64: string;
    };
    media_url?: string;
  }[];
}

export default newsFormSchema;
