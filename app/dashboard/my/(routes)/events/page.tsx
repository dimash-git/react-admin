import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";
import EventsCard from "./_components/card";
import { myTabs } from "../../constants";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";

const bdEvents = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    name: "Мероприятия",
  },
];

const EventsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  // console.log("Session,", session);

  const res = await axiosBack.post(
    "/event/get_events",
    {
      skip: 0,
      limit: 9,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  console.log(res.data);

  // if (res.data.status.code != 200) return <>Error Loading Evens</>;

  // const { events }: { events: Event[] } = res.data.content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={bdEvents} />
      <Tabs links={myTabs.events} />
      <div className="flex flex-col space-y-[30px]">
        {/* {events.map((event, idx) => (
          <EventsCard key={idx} card={event} />
        ))} */}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default EventsPage;
