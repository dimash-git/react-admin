import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import EventForm from "../../_components/event-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let event: Evt;

  try {
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
    if (status.code !== 200) {
      throw new Error("Error Loading Event");
    }

    event = content.event;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <EventForm parsed={event} />
    </>
  );
};

export default EditPage;
