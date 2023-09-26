import * as z from "zod";

const tagFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название",
  }),
  team_sales: z.coerce
    .number({
      required_error: "Продажи обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  personal_sales: z.coerce
    .number({
      required_error: "Продажи обязательны",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  percent: z.coerce
    .number({
      required_error: "Процент обязателен",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  matching: z.coerce
    .number({
      required_error: "Мэтчинг обязателен",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
  is_automatic_upgrade: z.boolean({
    required_error: "Обязателен",
    invalid_type_error: "Должен быть boolean",
  }),
  robot_count: z.coerce
    .number({
      required_error: "Кол-во роботов обязателен",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Цифра должна быть не отрицательной" }),
});

export default tagFormSchema;
