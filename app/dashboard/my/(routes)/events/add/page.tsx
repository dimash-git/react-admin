import EventForm from "../_components/event-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../nav";

const AddPage = () => {
  return (
    <>
      <Breadcrumbs customLabel="Cоздать мероприятие" />
      <Tabs links={homeTabs.events} />
      <EventForm />
    </>
  );
};

export default AddPage;
