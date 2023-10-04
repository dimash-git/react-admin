import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppealViewItem } from "../../_components/appeal-view";
import MediaPhotoIcon from "@/public/icons/media-photo.svg";
import AppealCommentsForm from "../../_components/appeal-comments-form";
import { unixToReadableDate } from "@/lib/utils";

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

  console.log(res.data);

  const { content, status } = res.data;

  console.log(res.data);

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  const { appeals: appeal }: { appeals: Appeal } = content;
  console.log(appeal.order_contact, appeal.offer_contact);

  // backend wrong name for single appeal

  const viewItems = [
    { label: "Владелец оффера id", value: appeal?.user_offer_owner_id },
    { label: "Владелец ордера id", value: appeal?.user_order_owner_id },
    { label: "id оффера", value: appeal?.offer_id },
    { label: "id ордера", value: appeal?.order_id },
    { label: "id апелляции", value: appeal?.appeal_id },
    { label: "id владельца апелляции", value: appeal?.appeal_owner_id },
  ];

  return (
    <>
      <Breadcrumbs customLabel={`ID апелляции: ${id}`} slice={2} />

      <div className="grid grid-cols-2 gap-y-[30px]">
        {viewItems?.map((item, idx) => (
          <AppealViewItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
      <AppealViewItem label="Причина подачи апелляции" value={appeal?.reason} />
      <AppealViewItem
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
      <AppealViewItem
        label="дата создания апелляции"
        value={
          appeal?.create_timestamp
            ? unixToReadableDate(appeal.create_timestamp)
            : ""
        }
      />
    </>
  );
};

export default ViewPage;
