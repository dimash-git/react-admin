"use client";

import ModalPost from "@/components/modal-post";
import ModalApprove from "@/components/modal-approve";
import { Button } from "@/components/ui/button";
import WithdrawalForm from "./withdrawal-form";

const Card = ({ card }: { card: WithdrawalInvoice }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px] max-w-[90px] w-full">
        <span className="text-[10px] uppercase">Сеть </span>
        <span className="text-[10px] uppercase">{card?.network}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[250px] w-full">
        <span className="text-[10px] uppercase">Кошелек</span>
        <span className="text-[10px] uppercase">
          {card?.wallet.length > 30
            ? card?.wallet.slice(0, 30) + " ..."
            : card?.wallet}
        </span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[220px] w-full">
        <span className="text-[10px] uppercase">ID пользователя</span>
        <span className="text-[10px] uppercase">
          {card?.invoice_id.length > 30
            ? card?.invoice_id.slice(0, 30) + " ..."
            : card?.invoice_id}
        </span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[180px] w-full">
        <span className="text-[10px] uppercase">CУММА</span>
        <span className="text-[15px] font-semibold uppercase">
          {card?.sum} USDT
        </span>
      </div>

      <div className="flex gap-ten items-center">
        <ModalApprove
          apiUrl="/api/withdrawal/approve"
          messages={{ error: "выводе", success: "Вывод" }}
          what="вывод"
          id={card?.invoice_id}
        >
          <Button asChild type="button" variant="formSubmit">
            <span>Одобрить</span>
          </Button>
        </ModalApprove>
        <ModalPost
          Form={WithdrawalForm}
          title="Отказать в выводе средств"
          maxWidth="max-w-[369px]"
          card={card}
        >
          <Button
            asChild
            variant="destructive"
            className="text-[12px] font-bold"
          >
            <span>Отказать</span>
          </Button>
        </ModalPost>
      </div>
    </div>
  );
};

export default Card;
