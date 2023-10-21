"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CredsContext } from "@/app/(auth)/creds-provider";
import axios from "axios";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Введите код",
  }),
});

const TwoFAPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { creds } = useContext(CredsContext);

  const [message, setMessage] = useState<string>("");
  const [timer, setTimer] = useState(60);

  const sendCode = useCallback(
    () => async () => {
      try {
        const res = await axios.post("/api/auth/step_one", {
          login: creds?.login,
          type: creds?.type,
        });
        const { status, content } = res.data;

        if (status != 200) {
          throw new Error("Error sending code");
        }

        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    [creds]
  );

  useEffect(() => {
    if (!creds) return;

    if (!creds?.type) router.push("/sign-in");

    if (creds?.type == "google") {
      setMessage("Ведите код подтверждения из приложения Google Authenticator");
    }

    if (creds?.type == "phone") {
      setMessage("На ваш номер телефона отправлен код для аутентификации");
      sendCode();
    }
  }, [creds, sendCode, router]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimer = useCallback(() => {
    // Clear the previous interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimer(60);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current!); // Clear the interval when the timer reaches 0 or less
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear the interval when the component unmounts
      }
    };
  }, []);

  const handleResend = useCallback(() => {
    sendCode();
    startTimer();
  }, [sendCode, startTimer]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { code } = values;
    console.log({
      redirect: false,
      login: creds?.login,
      password: creds?.password,
      type: creds?.type,
      code,
    });

    const res = await signIn("credentials", {
      redirect: false,
      login: creds?.login,
      password: creds?.password,
      type: creds?.type,
      code,
    });

    if (res?.error) {
      console.log(res.error);
      toast({
        variant: "destructive",
        title: "Произошла ошибка при входе.",
      });
    } else {
      toast({
        variant: "success",
        title: "Вход выполнен успешно!",
      });
      router.push("/dashboard/my");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="max-w-[300px] w-full text-[14px] font-medium mx-auto text-center">
          {message}
        </div>
        <div className="flex flex-col space-y-[10px]">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Код" {...field} variant="auth" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {creds?.type === "phone" &&
            (timer != 0 ? (
              <span className="text-[#8F9297] text-[14px] font-medium">
                Отправить повторно через {timer} секунд
              </span>
            ) : (
              <span
                onClick={handleResend}
                className="cursor-pointer text-[#8F9297] hover:text-[#9ea6b3] transition-all text-[14px] font-medium"
              >
                Отправить смс
              </span>
            ))}
        </div>

        <Button
          variant="submit"
          type="submit"
          size="md"
          className="w-full"
          disabled={isLoading || isSubmitting}
        >
          Вход
        </Button>
      </form>
    </Form>
  );
};

export default TwoFAPage;
