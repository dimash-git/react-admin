import * as z from "zod";

const accFormSchema = z.object({
  login: z.string().min(3, {
    message: "Введите логин",
  }),
  password: z.string().min(3, {
    message: "Введите пароль",
  }),
  ga_secret: z.string().min(3, {
    message: "Введите google secret",
  }),
  is_blocked: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  block: z.string({ required_error: "Доступ к блокам обязателен" }),
  favorites: z.string({
    required_error: "Разделы обязательны",
  }),
});

export default accFormSchema;
