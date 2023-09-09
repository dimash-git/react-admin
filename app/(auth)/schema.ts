import * as z from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Заполните логин или почту",
  }),
  password: z.string().min(2, { message: "Заполните пароль" }),
  code: z.string().min(2, {
    message: "Введите код подтверждения",
  }),
});

export const smsFormSchema = z.object({
  code: z.string().min(4, {
    message: "Введите код из смс",
  }),
});

export const gaFormSchema = z.object({
  code: z.string().min(6, {
    message: "Введите код из Google Authenticator",
  }),
});
