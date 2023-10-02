import * as z from "zod";

const clauseSettingsFormSchema = z.object({
  percent: z.coerce
    .number({
      required_error: "Процент обязателен",
      invalid_type_error: "Должна быть цифра",
    })
    .positive({ message: "Процент должен быть не отрицательный" }),
  level: z.string(),
  term: z.string({
    required_error: "Введите срок дейсвтия",
  }),
});

export default clauseSettingsFormSchema;
