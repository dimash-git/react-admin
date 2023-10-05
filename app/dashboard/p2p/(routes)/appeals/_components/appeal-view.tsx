export const AppealOrderItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col space-y-[10px]">
      <span className="font-medium text-[12px] leading-3 uppercase">
        {label}
      </span>
      <span className="font-bold text-[20px] leading-4">{value}</span>
    </div>
  );
};

export const AppealContactItem = ({
  Icon,
  value,
}: {
  Icon: React.FC;
  value: string;
}) => {
  return (
    <div className="flex flex-col space-y-[10px]">
      <div className="inline-flex w-max items-center px-[15px] py-[5px] gap-x-[10px] text-[12px] font-bold bg-[#4555804D] rounded-[5px]">
        <Icon />
        {value}
      </div>
    </div>
  );
};
