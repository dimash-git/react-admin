import * as z from "zod";

const accFormSchema = z.object({
  login: z.string().min(3, {
    message: "Введите логин",
  }),
  password: z.string().min(8, {
    message: "Введите пароль",
  }),
  phone: z.string().min(8, {
    message: "Введите телефон",
  }),
  google_secret: z.string().min(8, {
    message: "Введите google secret",
  }),
});

export default accFormSchema;
