import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventForm from "../../_components/event-form";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bdEvents = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    to: "/dashboard/my/events",
    name: "Мероприятия",
  },
];

const text = `Мероприятие более чем на 100 человек, с after-party на яхте Radisson!

На нашем мероприятии вы увидите:

- Новый кабинет и сайт компании
- Новую партнёрскую программу
- Уникальную разработку не имеющую аналогов на рынке
- Подведем итоги промоушена на 3.000.000р
- Поделимся планами и новостями компании

А также вы получите возможность поучаствовать в розыгрыше подарков от компании, вкусно покушаем, будет шоу программа, фото/видео съёмка, и многое другое! 🤩🤩🤩`;

const SingleEventEditPage = async ({ params }: { params: { id: string } }) => {
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
    <div>
      <Breadcrumbs bd={[...bdEvents, { name: `${id} - Редактирование` }]} />
      <EventForm event={event} />
    </div>
  );
};

export default SingleEventEditPage;
