import * as z from "zod";

const userMlmFormSchema = z.object({
  personal_sales: z
    .number({
      required_error: "Продажи обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  team_sales: z
    .number({
      required_error: "Продажи обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  personal_registry: z
    .number({
      required_error: "Регистрация обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  team_registry: z
    .number({
      required_error: "Регистрация обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  qualification_level: z
    .number({
      required_error: "Уровень квалификации обязателен",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  career_closing: z.date({
    required_error: "Пожалуйста выберите дату и время",
    invalid_type_error: "Это не дата!",
  }),
});

export default userMlmFormSchema;
