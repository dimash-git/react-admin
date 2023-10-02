import Image from "next/image";
import CardAction from "@/components/card-action";

const Card = ({ card }: { card: SupportCat }) => {
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
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{card?.category_id}</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardAction
          id={card?.category_id}
          apiUrl="/api/support/cats/delete"
          messages={{
            error: "Ошибка при удалении категории!",
            success: "Категория успешно удалена",
          }}
        >
          <h4 className="text-md font-semibold">Удалить категорию</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить категорию?
          </p>
        </CardAction>
      </div>
    </div>
  );
};

export default Card;
