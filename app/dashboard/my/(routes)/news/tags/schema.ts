import * as z from "zod";

const tagFormSchema = z.object({
  name: z.string().min(3, {
    message: "Введите название",
  }),
});

export default tagFormSchema;
