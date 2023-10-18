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
  parent_id: z
    .string()
    .min(3, {
      message: "Введите id родителя",
    })
    .optional(),
});

export interface UserMainSendData {
  user_id: string;
  user_login: string;
  user_phone: string;
  user_email: string;
  user_is_confirmed: boolean;
  user_is_passed_academy: boolean;
  parent_id?: string;
  logo_base64?: string;
  logo_type?: string;
}

export default userMainFormSchema;
