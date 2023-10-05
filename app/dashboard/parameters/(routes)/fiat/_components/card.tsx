"use client";

import ModalDelete from "@/components/modal-delete";
import ModalPost from "@/components/modal-post";
import FiatForm from "./fiat-form";
import { Button } from "@/components/ui/button";

const Card = ({ card }: { card: Fiat }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[300px] w-full">
        <div className="flex flex-col gap-[7px]">
          <span className="card__title text-[15px] leading-4 font-semibold">
            {card?.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{card?.fiat_id}</span>
      </div>

      <div className="flex gap-ten items-center">
        <ModalPost Form={FiatForm} title="Изменить фиат" card={card}>
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10"
          >
            <span>Редактировать</span>
          </Button>
        </ModalPost>
        <ModalDelete
          id={card?.fiat_id}
          apiUrl="/api/fiat/delete"
          what="фиат"
          messages={{
            error: "фиата",
            success: "Фиат",
          }}
        />
      </div>
    </div>
  );
};

export default Card;
