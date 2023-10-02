"use client";

import ModalDelete from "@/components/modal-delete";
import ModalPost from "@/components/modal-post";
import BankForm from "./bank-form";

const Card = ({ card }: { card: Bank }) => {
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
        <span className="text-[10px] uppercase">{card?.bank_id}</span>
      </div>

      <div className="flex gap-ten items-center">
        <ModalPost Form={BankForm} title="Изменить банк" card={card}>
          <span className="inline-flex items-center justify-center rounded-[5px] text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-thBlue text-[thGray] text-[12px] leading-[14px] font-bold hover:bg-thBlue/80 h-[25px] py-[5px] px-5">
            Редактировать
          </span>
        </ModalPost>
        <ModalDelete
          id={card?.bank_id}
          apiUrl="/api/bank/delete"
          what="банк"
          messages={{
            error: "банка",
            success: "Банк",
          }}
        />
      </div>
    </div>
  );
};

export default Card;
