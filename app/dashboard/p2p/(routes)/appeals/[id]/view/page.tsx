import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  AppealContactItem,
  AppealOrderItem,
} from "../../_components/appeal-view";
import AppealCommentsForm from "../../_components/appeal-comments-form";

import EmailIcon from "@/public/icons/email.svg";
import TgIcon from "@/public/icons/telegram.svg";
import PhoneIcon from "@/public/icons/phone.svg";

import { unixToReadableDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AppealCloseModal from "../../_components/appeal-close-modal";
import AppealCloseForm from "../../_components/appeal-close-form";
import Link from "next/link";
import { p2pBaseUrl } from "@/app/dashboard/p2p/nav";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/p2p_appeal/get_appeal",
    {
      appeal_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const { content, status } = res.data;

  // console.log(res.data);

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  const { appeals: appeal }: { appeals: Appeal } = content;
  // backend wrong name for single appeal

  const viewItems = [
    { label: "Владелец оффера id", value: appeal?.user_offer_owner_id },
    { label: "Владелец ордера id", value: appeal?.user_order_owner_id },
    { label: "id оффера", value: appeal?.offer_id },
    { label: "id ордера", value: appeal?.order_id },
    { label: "id апелляции", value: appeal?.appeal_id },
    { label: "id владельца апелляции", value: appeal?.appeal_owner_id },
  ];

  const orderContactItems = [
    {
      icon: EmailIcon,
      value: appeal?.order_contact?.email,
    },
    {
      icon: PhoneIcon,
      value: appeal?.order_contact?.phone,
    },
    {
      icon: TgIcon,
      value: appeal?.order_contact?.telegram,
    },
  ];

  const offerContactItems = [
    {
      icon: EmailIcon,
      value: appeal?.offer_contact?.email,
    },
    {
      icon: PhoneIcon,
      value: appeal?.offer_contact?.phone,
    },
    {
      icon: TgIcon,
      value: appeal?.offer_contact?.telegram,
    },
  ];

  return (
    <>
      <Breadcrumbs customLabel={`ID апелляции: ${id}`} slice={2} />

      <div className="grid grid-cols-2 gap-y-[30px]">
        {viewItems?.map((item, idx) => (
          <AppealOrderItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
      <AppealOrderItem
        label="Причина подачи апелляции"
        value={appeal?.reason}
      />
      <AppealOrderItem
        label="Пояснение от создателя апелляции"
        value={appeal?.description}
      />
      {/* MediaFiles */}
      {/* <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Приложения
        </span>
        <div className="inline-flex w-max items-center px-[15px] py-[5px] gap-x-[10px] text-[12px] font-bold bg-[#4555804D] rounded-[5px]">
          <MediaPhotoIcon />
          screenshot.jpg
        </div>
      </div> */}
      <AppealCommentsForm
        comments={appeal?.comments ?? ""}
        id={appeal?.appeal_id}
      />
      <AppealOrderItem
        label="дата создания апелляции"
        value={
          appeal?.create_timestamp
            ? unixToReadableDate(appeal.create_timestamp)
            : ""
        }
      />
      <div className="grid grid-cols-2">
        <div className="flex flex-col space-y-5">
          <span className="font-medium text-[12px] leading-3 uppercase">
            Контакты владельца ордера
          </span>
          <div className="flex flex-col space-y-[10px]">
            {orderContactItems.map((contact, idx) =>
              contact.value ? (
                <AppealContactItem
                  key={idx}
                  Icon={contact.icon}
                  value={contact.value}
                />
              ) : null
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <span className="font-medium text-[12px] leading-3 uppercase">
            Контакты владельца оффера
          </span>
          <div className="flex flex-col space-y-[10px]">
            {offerContactItems.map((contact, idx) =>
              contact.value ? (
                <AppealContactItem
                  key={idx}
                  Icon={contact.icon}
                  value={contact.value}
                />
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-[10px] items-center">
        <Button variant="form" type="button" asChild>
          <Link href={`${p2pBaseUrl}/appeals`} className="mt-[2px]">
            Отмена
          </Link>
        </Button>
        <AppealCloseModal
          Form={AppealCloseForm}
          title={`Закрыть апелляцию ${appeal?.appeal_id}`}
          maxWidth="max-w-[520px]"
          parsed={appeal}
        >
          <Button asChild variant="formSubmit">
            <span>Закрыть аппеляцию</span>
          </Button>
        </AppealCloseModal>
      </div>
    </>
  );
};

export default ViewPage;
