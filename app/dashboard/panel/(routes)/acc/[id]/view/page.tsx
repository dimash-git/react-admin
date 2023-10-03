import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { panelBaseUrl } from "@/app/dashboard/panel/nav";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  // const res = await axiosBack.post(
  //   "/p2p_appeal/get_appeal",
  //   {
  //     appeal_id: id,
  //   },
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // );
  // console.log(res.data);

  // const { content, status } = res.data;

  // // console.log(res.data);

  // if (status.code != 200) return <>Ошибка загрузки поста</>;

  // // const { qualification } = content;

  return (
    <>
      <Breadcrumbs customLabel="аккаунт администратора" slice={2} />
      <div className="flex flex-col space-y-[30px]">
        <div className="flex flex-col space-y-[10px]">
          <div className="uppercase text-[12px] leading-3 font-medium">
            логин
          </div>
          <div className="text-[20px] font-bold leading-5">Иван</div>
        </div>
        <div className="flex flex-col space-y-[10px]">
          <div className="uppercase text-[12px] leading-3 font-medium">
            пароль
          </div>
          <div className="text-[20px] font-bold leading-5">********</div>
        </div>
        <div className="flex flex-col space-y-[10px]">
          <div className="uppercase text-[12px] leading-3 font-medium">
            заблокирован ли аккаунт
          </div>
          <div className="text-[20px] font-bold leading-5">Нет</div>
        </div>
        <div className="flex flex-col space-y-[10px]">
          <div className="uppercase text-[12px] leading-3 font-medium">
            заблокирован ли аккаунт
          </div>
          <div className="text-[20px] font-bold leading-5">Нет</div>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="uppercase text-[12px] font-medium">
            доступ к блокам
          </div>
          <div className="flex items-center space-x-[10px]">
            <span className="px-[10px] py-[5px] text-[10px] leading-3 font-bold bg-[#455580] rounded-[10px]">
              Уведомления
            </span>
            <span className="px-[10px] py-[5px] text-[10px] leading-3 font-bold bg-[#455580] rounded-[10px]">
              Уведомления
            </span>
            <span className="px-[10px] py-[5px] text-[10px] leading-3 font-bold bg-[#455580] rounded-[10px]">
              Уведомления
            </span>
          </div>
        </div>
        <Button
          asChild
          type="button"
          variant="formSubmit"
          className="max-w-[130px]"
        >
          <Link href={`${panelBaseUrl}/acc/${id}/edit`}>Редактировать</Link>
        </Button>
      </div>
    </>
  );
};

export default ViewPage;
