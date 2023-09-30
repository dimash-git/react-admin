import * as z from "zod";

const formSchema = z.object({
  question: z.string().min(3, {
    message: "Введите вопрос",
  }),
  answer: z.string().min(10, {
    message: "Введите ответ",
  }),
  cat: z.string({ required_error: "Категория обязательна" }),
});

export default formSchema;
