import TagsForm from "../_components/tag-form";
import Breadcrumbs from "@/components/breadcrumbs";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать тэг" />
      <TagsForm />
    </div>
  );
};

export default AddPage;
