const MyRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-5 bg-thDark rounded-[20px] flex flex-col space-y-[30px] w-full">
      {children}
    </div>
  );
};

export default MyRoutesLayout;
