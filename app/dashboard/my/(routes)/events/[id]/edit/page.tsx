import Breadcrumbs from "@/components/breadcrumbs";

import EventForm from "../../_components/event-form";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
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

  // console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Event</>;

  const { event } = res.data.content;
  // let image;
  // if (event?.img_url) {
  //   getFileFromUrl(event?.img_url).then((file) => {
  //     image = file;
  //   });
  // }
  // console.log("file", image);

  // const formData: EventForm = {
  //   name: event?.name,
  //   description: event?.desc,
  //   type: event?.is_online ? "online" : "offline",
  //   date: event?.timestamp && new Date(event?.timestamp * 1000),
  //   image: {} as File,
  // };
  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <EventForm parsed={event} />
    </>
  );
};

export default EditPage;
