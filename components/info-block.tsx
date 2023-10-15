function InfoBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col space-y-[10px]">
      <span className="font-medium text-[12px] leading-3 uppercase">
        {title}
      </span>
      <span className="font-bold text-[20px] leading-4">{content}</span>
    </div>
  );
}

export default InfoBlock;
