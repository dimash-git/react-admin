import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";
import EventCard from "./_components/card";
import { myTabs } from "../../constants";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/serverConstants";

const bdEvents = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    name: "Мероприятия",
  },
];

const EventsPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = 3;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  const response = await fetch(BACKEND_URL + "/event/get_events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error("Error Loading Events");
  }

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Events");
  }

  const { events, count }: { events: _Event[]; count: number } = content;
  // const res = await axiosBack.post(
  //   "/event/get_events",
  //   {
  //     skip,
  //     limit: pageSize,
  //   },
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // );

  // // console.log(res.data);

  // if (res.data.status.code != 200) return <>Error Loading Evens</>;

  // const { events, count }: { events: Event[]; count: number } =
  //   res.data.content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={bdEvents} />
      <Tabs links={myTabs.events} />
      <div className="flex flex-col space-y-[30px]">
        {events.map((event, idx) => (
          <EventCard key={idx} card={event} />
        ))}
      </div>
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default EventsPage;
