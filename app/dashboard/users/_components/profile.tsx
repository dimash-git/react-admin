"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = ({ id, login }: { id: string; login: string }) => {
  const [user, setUser] = useState<UserMain | undefined>();

  useEffect(() => {
    const getMainInfo = async () => {
      try {
        const res = await axios.post("/api/user/main/get", { user_id: id });

        const { status, content } = res.data;
        if (status != 200) {
          throw new Error("Error getting Main Info");
        }

        const { main_info } = content;
        setUser(main_info);
      } catch (error) {
        console.error(error);
      }
    };
    getMainInfo();
  }, [id]);
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px] max-w-[180px] w-full">
        <span className="text-[10px] uppercase">ID пользователя</span>
        <span className="text-[10px] uppercase">{id}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[130px] w-full">
        <span className="text-[10px] uppercase">Логин</span>
        <span className="text-[10px] uppercase">{login}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[140px] w-full">
        {user ? (
          <>
            <span className="text-[10px] uppercase">Телефон</span>
            <span className="text-[10px] uppercase">{user?.user_phone}</span>
          </>
        ) : (
          <>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[60%]"></div>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[90%]"></div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        {user ? (
          <>
            <span className="text-[10px] uppercase">Почта</span>
            <span className="text-[10px] uppercase">
              {user?.user_email.slice(0, 20)} ...
            </span>
          </>
        ) : (
          <>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[60%]"></div>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[90%]"></div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-[7px] max-w-[110px] w-full">
        {user ? (
          <>
            <span className="text-[10px] uppercase">Баланс</span>
            <span className="text-[10px] uppercase">{user?.balance} USDT</span>
          </>
        ) : (
          <>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[60%]"></div>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[90%]"></div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        {user ? (
          <>
            <span className="text-[10px] uppercase">
              Подтвержден ли аккаунт
            </span>
            <span className="text-[10px] uppercase">
              {user?.user_is_confirmed ? "Да" : "Нет"}
            </span>
          </>
        ) : (
          <>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[80%]"></div>
            <div className="bg-[#2D3D52] h-[15px] animate-pulse w-[30%]"></div>
          </>
        )}
      </div>

      <div className="flex gap-ten items-center">
        <Button variant="formSubmit" type="button" asChild>
          <Link href={`users/${id}/main`}>Посмотреть</Link>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
