"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { PassportContext } from "./passport-provider";

const Card = ({ card }: { card: Passport }) => {
  const { setPassport } = useContext(PassportContext);

  const handleUpdate = () => {
    setPassport(card);
  };

  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID пользователя</span>
        <span className="text-[10px] uppercase">{card?.user_id}</span>
      </div>

      <div className="flex gap-ten items-center">
        <Button variant="formSubmit" type="button" asChild>
          <Link href={`passport/${card?.user_id}/view`} onClick={handleUpdate}>
            Посмотреть документы
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
