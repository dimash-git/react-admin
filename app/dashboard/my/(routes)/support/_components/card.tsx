import CardAction from "./card-action";

const Card = ({ card }: { card: Question }) => {
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[260px] w-full">
        <div className="flex flex-col gap-[7px]">
          <span className="card__title text-[15px] leading-4 font-semibold">
            {card?.question}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">Категория</span>
        <span className="text-[10px] uppercase">{card?.category_id}</span>
      </div>

      <div className="flex flex-col gap-[7px] max-w-[169px] w-full">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">{card?.question_id}</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardAction
          id={card?.question_id}
          apiUrl="/api/support/delete"
          messages={{
            error: "Ошибка при удалении короткого вопроса",
            success: "Короткий вопрос успешно удален!",
          }}
        >
          <h4 className="text-md font-semibold">Удалить короткий вопрос</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить короткий вопрос?
          </p>
        </CardAction>
      </div>
    </div>
  );
};

export default Card;
