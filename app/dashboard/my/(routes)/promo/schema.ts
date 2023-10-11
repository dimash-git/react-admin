import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import * as z from "zod";

const promoFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название промо материала",
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
  file: z.optional(
    z
      .any()
      .refine((file) => file?.name, "Файл не выбран")
      .refine(
        (file) => file?.size < MAX_FILE_SIZE,
        `Максимальный размер файла ${MAX_FILE_SIZE / 1000000} MB.`
      )
  ),
});

export interface PromoSendData {
  promo_id?: string;
  name: string;
  img_data_base64?: string;
  img_data_type?: string;
  file_data_base64?: string;
  file_data_type?: string;
}

export default promoFormSchema;
