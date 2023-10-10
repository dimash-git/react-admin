import Breadcrumbs from "@/components/breadcrumbs";

import EventForm from "../../_components/event-form";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/event/get_event",
    {
      event_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const { status, content } = res.data;
  // console.log(content);

  if (status.code != 200) return <div>Ошибка загрузки поста</div>;

  const { event } = content;

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <EventForm parsed={event} />
    </>
  );
};

export default EditPage;
