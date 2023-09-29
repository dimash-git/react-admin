import EventForm from "../_components/event-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../nav";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать мероприятие" />
      <Tabs links={homeTabs.events} />
      <EventForm />
    </div>
  );
};

export default AddPage;
