import * as z from "zod";

const userMlmFormSchema = z.object({
  personal_sales: z.coerce.number({
    required_error: "Продажи обязательны",
    invalid_type_error: "Должна быть цифра",
  }),
  team_sales: z.coerce.number({
    required_error: "Продажи обязательны",
    invalid_type_error: "Должна быть цифра",
  }),
  personal_registry: z.coerce.number({
    required_error: "Регистрация обязательны",
    invalid_type_error: "Должна быть цифра",
  }),
  team_registry: z.coerce.number({
    required_error: "Регистрация обязательны",
    invalid_type_error: "Должна быть цифра",
  }),
  qualification_level: z.coerce.number({
    required_error: "Уровень квалификации обязателен",
    invalid_type_error: "Должна быть цифра",
  }),
  career_closing_date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
  qw_create_date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
  qw_expired_date: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
});

export default userMlmFormSchema;
