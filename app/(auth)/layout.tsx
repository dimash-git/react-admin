import Image from "next/image";
import { CredsProvider } from "./creds-provider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[394px] w-full rounded-ten bg-thDark p-5">
        <h1 className="uppercase text-blue text-center mb-5 text-[23px] font-bold">
          Admin Panel
        </h1>
        <div className="flex justify-center mb-5">
          <Image width={251} height={249} src="/logo-auth.png" alt="Logo" />
        </div>
        <h3 className="text-20 text-gray text-center pb-[10px] mb-5 block border-b-[1px] border-b-[#0072FF]">
          Вход
        </h3>
        <CredsProvider>{children}</CredsProvider>
      </div>
    </div>
  );
};

export default AuthLayout;
