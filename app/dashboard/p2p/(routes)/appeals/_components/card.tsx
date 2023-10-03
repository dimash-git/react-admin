"use client";

import { unixToReadableDate } from "@/lib/utils";
import Link from "next/link";
import { p2pBaseUrl } from "../../../nav";
import { Button } from "@/components/ui/button";
import PinIcon from "@/public/icons/pin.svg";

const Card = ({ card }: { card: Appeal }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex items-center space-x-[20px] max-w-[280px] w-full">
        {card?.is_fixed && <PinIcon />}
        <div className="flex flex-col gap-[7px]">
          <span className="text-[10px] uppercase">ID апелляции</span>
          <span className="text-[15px] uppercase">{card?.appeal_id}</span>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[120px] w-full">
        <span className="text-[10px] uppercase">ID пользователя</span>
        <span className="text-[10px] uppercase">{card?.user_id}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[120px] w-full">
        <span className="text-[10px] uppercase">логин пользователя</span>
        <span className="text-[10px] uppercase">{card?.user_login}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[90px] w-full">
        <span className="text-[10px] uppercase">дата создания</span>
        <span className="text-[10px] uppercase">
          {card?.create_timestamp && unixToReadableDate(card.create_timestamp)}
        </span>
      </div>

      <div className="flex gap-ten items-center">
        <Button asChild variant="formSubmit" type="button">
          <Link href={`${p2pBaseUrl}/appeals/${card?.appeal_id}/view`}>
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
