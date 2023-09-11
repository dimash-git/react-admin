"use client";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const handleClick = async () => {
    try {
      // const res = await axios.get("/api/auth/leave");
      // if (res.data.status == 200) {
      //   signOut({ callbackUrl: "/sign-in" });
      //   toast({
      //     variant: "success",
      //     title: "Выход выполнен успешно!",
      //   });
      // }
      signOut({ callbackUrl: "/sign-in" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Произошла ошибка при выходе.",
      });
    }
  };
  return (
    <nav className="flex justify-between bg-thDark py-2 px-ten">
      <Image src="/logo.svg" width={194} height={46} alt="Logo" />
      <div className="flex items-center gap-5">
        <span className="block text-[13px] font-bold uppercase">
          Имя админа
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="bg-thBlue hover:bg-thBlue/80 transition">
                ИА
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer transition">
              <button onClick={handleClick}>Выйти</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
