import CardAction from "@/components/card-action";
import Image from "next/image";

const Card = ({ item }: { item: Product }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[300px] w-full">
        <div className="card__cover w-[94px] h-[50px] bg-[#2D3D52]">
          <Image
            src={`${item?.img}`}
            alt={item.name}
            width={94}
            height={50}
            className="max-w-none h-full"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <span className="card__title text-[15px] leading-4 font-semibold">
            {item?.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">Пакет продуктов</span>
        <span className="text-[10px] uppercase">
          {item?.is_pack ? "Да" : "Нет"}
        </span>
      </div>
      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{item?.product_id}</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardAction
          id={item?.product_id}
          apiUrl="/api/product/delete"
          messages={{
            error: "Ошибка при удалении продукта",
            success: "Продукт успешно удален!",
          }}
        >
          <h4 className="text-md font-semibold">Удалить продукт</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить продукт?
          </p>
        </CardAction>
      </div>
    </div>
  );
};

export default Card;
