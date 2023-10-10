import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { p2pBaseUrl } from "@/app/dashboard/p2p/nav";
import Chat from "../../_components/chat";
import ModalPost from "@/components/modal-post";
import ComplaintForm from "../../_components/complaint-form";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/p2p_complain/get_complain",
    {
      complain_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const { content, status } = res.data;

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  const { complain: complaint }: { complain: Complaint } = content;
  // console.log(complaint);
  // backend wrong name for single complaint

  const [orderOwner, offerOwner] = [
    { name: "Владелец ордера", id: complaint?.user_order_owner_id },
    { name: "Владелец оффера", id: complaint?.user_offer_owner_id },
  ];

  return (
    <>
      <Breadcrumbs customLabel={`ID жалобы: ${id}`} slice={2} />
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Пользователь подавший жалобу
        </span>
        <span className="font-bold text-[20px] leading-4">
          {complaint?.complain_owner_id == orderOwner.id
            ? orderOwner.name
            : offerOwner.name}
        </span>
      </div>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Пользователь получивший жалобу
        </span>
        <span className="font-bold text-[20px] leading-4">
          {complaint?.complain_owner_id == orderOwner.id
            ? offerOwner.name
            : orderOwner.name}
        </span>
      </div>
      <Chat messages={complaint?.messages} users={[orderOwner, offerOwner]} />
      <div className="flex gap-ten">
        <Button variant="form" type="button" asChild>
          <Link href={`${p2pBaseUrl}/complaints`} className="mt-[2px]">
            Отмена
          </Link>
        </Button>
        <ModalPost
          card={complaint}
          Form={ComplaintForm}
          title={`Жалоба: ${complaint?.complain_id}`}
          maxWidth="max-w-[520px]"
        >
          <Button asChild variant="formSubmit">
            <span>Принять решение</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default ViewPage;
