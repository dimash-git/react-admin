import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Breadcrumbs from "@/components/breadcrumbs";
import EventCard from "./_components/card";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { homeTabs } from "../../nav";

const EventsPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = PAGE_SIZE;
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

  const data = await response.json();
  // console.log(data);
  const { status, content } = data;

  if (status.code != 200) return <div>Ошибка загрузки списка</div>;
  const { events, count }: { events: Evt[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.events} />
      <div className="flex flex-col space-y-[30px]">
        {events.map((event, idx) => (
          <EventCard key={idx} card={event} />
        ))}
      </div>
      {count > 0 && (
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize}
        />
      )}
    </div>
  );
};

export default EventsPage;
