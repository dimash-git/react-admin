import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../nav";
import NewsForm from "../_components/news-form";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать новость" />
      <Tabs links={homeTabs.news} />
      <NewsForm />
    </div>
  );
};

export default AddPage;
