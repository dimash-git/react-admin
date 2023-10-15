export const ContactBlock = ({
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
