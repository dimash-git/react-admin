import TIcon from "@/public/icons/field-t.svg";
import PhotoIcon from "@/public/icons/field-photo.svg";
import VideoIcon from "@/public/icons/field-video.svg";

const AddFieldsButton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="uppercase text-[12px] leading-4 font-medium text-white tracking-[0.36px]">
        вы можете добавить текст, фото или видео в маркетинг продукт
      </div>
      <div className="flex gap-[1px] mt-[30px]">
        <button
          type="button"
          className="py-ten bg-[#2D3D52] rounded-l-[5px] w-[93px] flex justify-center hover:bg-[#455e7e] transition"
        >
          <TIcon />
        </button>
        <button
          type="button"
          className="py-ten bg-[#2D3D52] w-[93px] flex justify-center hover:bg-[#455e7e] transition"
        >
          <PhotoIcon />
        </button>
        <button
          type="button"
          className="py-ten bg-[#2D3D52] rounded-r-[5px] w-[93px] flex justify-center hover:bg-[#455e7e] transition"
        >
          <VideoIcon />
        </button>
      </div>
    </div>
  );
};

export default AddFieldsButton;
