import Image from "next/image";

import AdvIcon from "@/public/icons/adv.svg";
import ModalDelete from "@/components/modal-delete";
import InfoBlock from "@/components/info-block";

const BoughtProductCard = ({ product }: { product: UserBought }) => {
  return (
    <div className="flex flex-col rounded-[20px] bg-[#2D3D52] p-5 space-y-[20px]">
      <div className="card__cover relative">
        {product?.img_uri && (
          <Image
            width={400}
            height={263}
            alt="Image"
            src={product.img_uri}
            className="w-full rounded-[5px] h-[263px] object-cover"
          />
        )}
      </div>
      <div className="card__description flex flex-col space-y-[10px] text-[15px] font-medium">
        <span className="uppercase text-[10px] font-medium text-[#EAECEF]">
          ID продукта: {product?.product_id}
        </span>
        <div className="text-[#8F9297] uppercase text-[10px]">
          Торговая системы
        </div>
        <div className="text-[20px] leading-5 font-bold">{product?.name}</div>
        <p className="text-[15px] leading-4 font-medium">
          {product?.description}
        </p>
      </div>
      <div className="card__advantages grid grid-cols-2 gap-y-5 gap-x-[10px]">
        {product?.advantage &&
          product.advantage.map((adv, idx) => (
            <div className="flex gap-ten items-center" key={idx}>
              <div className="shrink-0">
                <AdvIcon />
              </div>
              <p className="text-[15px] font-bold">{adv}</p>
            </div>
          ))}
      </div>
      <InfoBlock
        title="Скидка"
        content={product?.discount ? String(product.discount) + "%" : "-"}
      />
      <InfoBlock
        title="Переводит ли менеджера на клиента"
        content={product?.is_robot ? "Да" : "Нет"}
      />
      <InfoBlock
        title="Пакетный ли продукт"
        content={product?.is_robot ? "Да" : "Нет"}
      />
      <div className="flex flex-col space-y-[10px]">
        <span className="uppercase text-[10px] font-medium text-[#EAECEF]">
          ID купленого продукта
        </span>
        <span className="uppercase text-[10px] font-medium text-[#EAECEF]">
          {product?.bought_product_id}
        </span>
      </div>

      <div>
        <ModalDelete
          id={product?.bought_product_id}
          apiUrl="/api/user/bought/delete"
          what="продукт"
          messages={{
            error: "продукта",
            success: "Продукт",
          }}
          btn={true}
        />
      </div>
    </div>
  );
};

export default BoughtProductCard;
