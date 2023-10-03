import TIcon from "@/public/icons/field-t.svg";
import PhotoIcon from "@/public/icons/field-photo.svg";

const AddFieldsPanel = ({
  name,
  append,
}: {
  name?: string;
  append: (fields: {
    text?: string;
    head_line?: string;
    media?: File | null;
  }) => void;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="uppercase text-[12px] leading-4 font-medium text-white tracking-[0.36px]">
        вы можете добавить текст или фото в {name}
      </div>
      <div className="flex gap-[1px] mt-[30px]">
        <button
          onClick={() =>
            append({
              text: " ",
              head_line: " ",
            })
          }
          type="button"
          className="py-ten bg-[#2D3D52] rounded-l-[5px] w-[93px] flex justify-center hover:bg-[#455e7e] transition"
        >
          <TIcon />
        </button>

        <button
          onClick={() =>
            append({
              media: {} as File,
            })
          }
          type="button"
          className="py-ten bg-[#2D3D52] rounded-r-[5px] w-[93px] flex justify-center hover:bg-[#455e7e] transition"
        >
          <PhotoIcon />
        </button>
      </div>
    </div>
  );
};

export default AddFieldsPanel;
