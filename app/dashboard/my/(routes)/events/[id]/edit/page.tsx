import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventForm from "../../_components/event-form";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";

const cat = "events";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}/`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

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
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <EventForm parsed={event} />
    </>
  );
};

export default EditPage;
