import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BACKEND_URL } from "@/lib/serverConstants";
import { retrieveApiKey } from "@/lib/serverUtils";
import WalletIcon from "@/public/icons/wallet.svg";
import { getServerSession } from "next-auth";
import WalletAction from "./wallet-action";

const WalletSection = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const response = await fetch(BACKEND_URL + "/academy/get_academy_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({}),
    next: { tags: ["academy"] },
  });

  if (!response.ok) {
    return <div>Ошибка: Не удалось загрузить информацию об Академии</div>;
  }

  const { content } = await response.json();

  const {
    academy_info,
  }: {
    academy_info: {
      login: string;
      password: string;
      url: string;
    };
  } = content;

  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-twenty w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">Кошельки</span>
        <WalletIcon />
      </div>

      <div className="flex flex-col space-y-[30px]">
        <div className="flex flex-col">
          <span className="block text-[12px] uppercase font-medium">
            кошелек trc-20
          </span>
          <div className="text-[15px] font-bold">{academy_info?.login}</div>
        </div>

        <div className="flex flex-col">
          <span className="block text-[12px] uppercase font-medium">
            кошелек bep-20
          </span>
          <div className="text-[15px] font-bold">{academy_info?.password}</div>
        </div>

        <div className="flex flex-col">
          <span className="block text-[12px] uppercase font-medium">
            API key bscscan
          </span>
          <div className="text-[15px] font-bold">{academy_info?.url}</div>
        </div>
        <WalletAction />
      </div>
    </div>
  );
};

export default WalletSection;
