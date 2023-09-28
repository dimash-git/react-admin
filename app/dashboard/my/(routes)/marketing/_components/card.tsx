import CardAction from "@/components/card-action";
import Image from "next/image";

const Card = ({ card }: { card: Marketing }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[300px] w-full">
        <div className="card__cover w-[94px] h-[50px] bg-[#2D3D52]">
          <Image
            src={`${card?.img_url}`}
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
            {card?.desc && card?.desc.slice(0, 40) + " ..."}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{card?.marketing_id}</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardAction
          id={card?.marketing_id}
          apiUrl="/api/marketing/delete"
          messages={{
            error: "Ошибка при удалении маркетинг продукта!",
            success: "Маркетинг продукт успешно удален",
          }}
        >
          <h4 className="text-md font-semibold">Удалить маркетинг продукт</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить маркетинг продукт?
          </p>
        </CardAction>
      </div>
    </div>
  );
};

export default Card;
