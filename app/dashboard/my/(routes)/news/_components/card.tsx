import CardActions from "./card-actions";
import Image from "next/image";
import { unixToReadableDate } from "@/lib/utils";

const NewsCard = ({ card }: { card: News }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[300px] w-full">
        <div className="card__cover w-[94px] h-[50px] bg-[#2D3D52]">
          <Image
            src={`${card?.img}`}
            alt={card.name}
            width={94}
            height={50}
            className="max-w-none h-full"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <span className="card__title text-[15px] leading-4 font-semibold">
            {card?.name}
          </span>
          <span className="card__date text-[10px]">
            {unixToReadableDate(card?.timestamp)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{card?.news_id}</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardActions id={card?.news_id} />
      </div>
    </div>
  );
};

export default NewsCard;
