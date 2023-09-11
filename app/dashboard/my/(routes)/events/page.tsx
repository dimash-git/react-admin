import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";
import EventCard from "./_components/card";
import { myTabs } from "../../constants";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";

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
  const session = await getServerSession(authOptions);
  // console.log("Events page session", session);

  console.log(searchParams);

  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);

  const pageSize = 3;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  const res = await axiosBack.post(
    "/event/get_events",
    {
      skip,
      limit: pageSize,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  useRouter;

  // console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Evens</>;

  const { events, count }: { events: Event[]; count: number } =
    res.data.content;

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
