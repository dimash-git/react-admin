import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeBreadcrumbs, homeTabs } from "../../../constants";
import Form from "../_components/news-form";

const cat = "news";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать новость" }]} />
      <Tabs links={homeTabs.news} />
      <Form />
    </div>
  );
};

export default AddPage;
