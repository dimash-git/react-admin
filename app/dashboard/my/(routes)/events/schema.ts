import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../../constants";
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
});

export default eventFormSchema;
