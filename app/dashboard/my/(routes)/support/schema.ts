import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../../nav";
const MAX_FILE_SIZE = 1000000;

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
