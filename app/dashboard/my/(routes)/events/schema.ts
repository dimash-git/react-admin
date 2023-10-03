import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import * as z from "zod";

const MAX_FILE_SIZE = 3000000;

const eventFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название мероприятия",
  }),
  desc: z
    .string()
    .min(10, {
      message: "Описание должно быть больше 10 символов.",
    })
    .max(1000, {
      message: "Описание должно быть меньше 1000 символов.",
    }),
  type: z.enum(["online", "offline"]),
  date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
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
    })
  ),
});

export interface EventValues {
  name: string;
  desc: string;
  type: EvtType;
  date: Date;
  cover?: File;
  media_blocks: {
    text?: string;
    media?: File;
  }[];
}

export interface EventSendData {
  name: string;
  desc: string;
  timestamp: number;
  is_online: boolean;
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
  event_id?: string;
}

export default eventFormSchema;
