import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { phoneRegex } from "@/lib/utils";
import * as z from "zod";

const userMainFormSchema = z.object({
  user_login: z.string().min(3, {
    message: "Введите логин",
  }),
  user_phone: z
    .string({
      required_error: "Номер телефона обязателен",
    })
    .min(7, {
      message: "Введите номер телефона",
    })
    .regex(phoneRegex, "Не корректный номер телефона"),
  user_email: z
    .string({
      required_error: "Почта обязательна",
    })
    .min(4, {
      message: "Введите почту",
    })
    .email("Это не валидная почта"),
  user_is_confirmed: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  user_is_passed_academy: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
  parent_id: z.string().min(3, {
    message: "Введите id родителя",
  }),
  user_logo: z.optional(
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

export default userMainFormSchema;
