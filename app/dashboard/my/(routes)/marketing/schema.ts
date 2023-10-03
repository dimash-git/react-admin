import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import * as z from "zod";

const MAX_FILE_SIZE = 3000000;

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Введите загаловок",
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
      head_line: z.optional(z.string()),
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

export interface MarketingValues {
  name: string;
  desc: string;
  cover?: File;
  media_blocks: {
    head_line?: string;
    text?: string;
    media?: File;
  }[];
}

export interface MarketingSendData {
  name: string;
  desc: string;
  img_data_base64?: string;
  img_type?: string;
  media_blocks: {
    head_line?: string;
    text?: string;
    media?: {
      data_type: string;
      data_base64: string;
    };
  }[];
}

export default formSchema;
