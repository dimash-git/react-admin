import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeBreadcrumbs, homeTabs } from "../../../constants";
import NewsForm from "../_components/news-form";

const cat = "news";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const EventAddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать новость" }]} />
      <Tabs links={homeTabs.news} />
      <NewsForm />
    </div>
  );
};

export default EventAddPage;
