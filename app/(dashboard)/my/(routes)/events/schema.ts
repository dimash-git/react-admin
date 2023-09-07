import * as z from "zod";

const eventFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название мероприятия",
  }),
  description: z
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
});

export default eventFormSchema;
