"use client";

import { Button } from "@/components/ui/button";
import { unixToReadableDate } from "@/lib/utils";
import Link from "next/link";
import { p2pBaseUrl } from "../../../nav";

const Card = ({ card }: { card: ComplaintList }) => {
  console.log(card);

  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px] max-w-[320px] w-full">
        <span className="text-[10px] uppercase">ID жалобы</span>
        <span className="text-[15px] uppercase">{card?.complain_id}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">дата создания</span>
        <span className="text-[10px] uppercase">
          {card?.create_timestamp && unixToReadableDate(card?.create_timestamp)}
        </span>
      </div>

      <div className="flex gap-ten items-center">
        <Button asChild variant="formSubmit" type="button">
          <Link href={`${p2pBaseUrl}/complaints/${card?.complain_id}/view`}>
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
