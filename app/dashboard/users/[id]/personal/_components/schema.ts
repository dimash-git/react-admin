import * as z from "zod";

const userMainFormSchema = z.object({
  first_name: z.string().min(3, {
    message: "Введите Имя",
  }),
  middle_name: z.string().min(3, {
    message: "Введите Отчество",
  }),
  last_name: z.string().min(3, {
    message: "Введите Фамилия",
  }),
  birthday_date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
  country: z.string().min(3, {
    message: "Введите страну",
  }),
  telegram: z.string().min(3, {
    message: "Введите telegram",
  }),
});

export default userMainFormSchema;
