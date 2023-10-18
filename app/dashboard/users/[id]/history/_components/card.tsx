import { unixToReadableDate } from "@/lib/utils";
import { statuses, types } from "./records";

const Card = ({ card }: { card: Transaction }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex flex-col gap-[7px] max-w-[100px] w-full">
        <span className="text-[10px] uppercase">Тип</span>
        <span className="text-[10px] uppercase">{types[card?.type]}</span>
      </div>
      <div className="flex flex-col gap-[7px] w-full">
        <span className="text-[10px] uppercase">Id транзакции</span>
        <span className="text-[10px] uppercase">
          {card?.transactions_id.slice(0, 20)} ...
        </span>
      </div>
      <div className="flex flex-col gap-[7px] w-full">
        <span className="text-[10px] uppercase">Статус</span>
        <span className="text-[10px] uppercase">{statuses[card?.status]}</span>
      </div>
      <div className="flex flex-col gap-[7px] max-w-[110px] w-full">
        <span className="text-[10px] uppercase">Сумма</span>
        <span className="text-[10px] uppercase">{card?.sum}$</span>
      </div>
      <div className="flex flex-col gap-[7px] max-w-[110px] w-full">
        <span className="text-[10px] uppercase">Дата создания</span>
        <span className="text-[10px] uppercase">
          {card?.timestamp && unixToReadableDate(card.timestamp)}
        </span>
      </div>
      <div className="flex flex-col gap-[7px] w-full">
        <span className="text-[10px] uppercase">Кому перевод</span>
        <span className="text-[10px] uppercase">{card?.to_}</span>
      </div>
      <div className="flex flex-col gap-[7px] w-full">
        <span className="text-[10px] uppercase">От кого перевод</span>
        <span className="text-[10px] uppercase">{card?.from_}</span>
      </div>
    </div>
  );
};

export default Card;
