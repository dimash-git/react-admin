export const AppealViewItem = ({
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

export const AppealIconItem = ({
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
