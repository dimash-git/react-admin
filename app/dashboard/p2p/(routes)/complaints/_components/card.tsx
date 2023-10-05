"use client";

import CountriesForm from "./complaint-form";
import ModalDelete from "@/components/modal-delete";
import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import { unixToReadableDate } from "@/lib/utils";
import Link from "next/link";
import { p2pBaseUrl } from "../../../nav";

const Card = ({ card }: { card: ComplaintList }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px]">
        <span className="text-[10px] uppercase">ID апелляции</span>
        <span className="text-[15px] uppercase">{card?.complaint_id}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">дата создания</span>
        <span className="text-[10px] uppercase">
          {card?.create_timestamp && unixToReadableDate(card?.create_timestamp)}
        </span>
      </div>

      <div className="flex gap-ten items-center">
        <Button asChild variant="formSubmit" type="button">
          <Link href={`${p2pBaseUrl}/appeals/${card?.complaint_id}/view`}>
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
