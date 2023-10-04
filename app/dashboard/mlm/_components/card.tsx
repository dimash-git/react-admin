"use client";

import CardAction from "@/components/card-action";

const Card = ({ card }: { card: MlmList }) => {
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
        <span className="text-[10px] uppercase">{card?.qualification_id}</span>
      </div>

      <div className="flex gap-ten items-center">
        <CardAction
          id={card?.qualification_id}
          apiUrl="/api/mlm/delete"
          messages={{
            error: "Ошибка при удалении квалификации!",
            success: "Квалификация успешно удалена",
          }}
        >
          <h4 className="text-md font-semibold">Удалить квалификацию</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить квалификацию?
          </p>
        </CardAction>
      </div>
    </div>
  );
};

export default Card;
