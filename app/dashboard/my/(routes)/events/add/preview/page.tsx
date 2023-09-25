"use client";

import { EventContext } from "@/app/dashboard/my/(routes)/events/_components/event-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  cn,
  dateToUnix,
  fileToBase64,
  getFileType,
  readableDate,
  unixToReadableDate,
} from "@/lib/utils";
import PostArrowLeft from "@/public/icons/post-arrow-left.svg";
import axios from "axios";
// import { revalidateTag } from "next/cache";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useContext } from "react";

const EventPreviewPage = () => {
  const { event } = useContext(EventContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { name, desc, date, type } = event;
    const formData = {
      name,
      desc,
      timestamp: dateToUnix(date),
      is_online: type == "online" ? true : false,
      img_data_base64: "",
      img_type: "",
    };

    if (event?.image) {
      const { image } = event;
      try {
        const base64String = await fileToBase64(image);
        formData.img_data_base64 = base64String as string;
      } catch (error: any) {
        console.error("Publish error: ", error.message);
      }

      formData.img_type = getFileType(image.type);
    }

    console.log("Publish:", formData);

    const res = await axios.post("/api/event/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении мероприятия!",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Мероприятие добавлено успешно!",
    });
    // revalidateTag("events");
    router.refresh();
    router.push("/dashboard/my/events");
  };

  return (
    <div className="flex flex-col space-y-[30px]">
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black">
        Предпросмотр
      </div>
      <div>
        <div className="event__header">
          <div className="flex justify-start gap-[6px] text-[10px] font-medium">
            <div>{readableDate(event?.date)}</div>
            <div
              className={cn(
                event?.type == "online" ? "text-thGreen" : "text-thOrange"
              )}
            >
              {event?.type == "online" ? "Онлайн" : "Оффлайн"}
            </div>
          </div>
          <div className="event__name text-[40px] font-bold mt-[5px]">
            {event?.name}
          </div>
        </div>
        <div className="event__description my-[20px] text-[15px] font-medium">
          <p>{event?.desc}</p>
        </div>
        <div className="event__cover">
          {event?.image && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(event.image as File)}
              className="w-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="event__controls flex items-center justify-between">
        <button
          type="button"
          className="flex items-center text-[20px] text-thBlue hover:text-gray-300 transition"
          onClick={() => router.back()}
        >
          <PostArrowLeft /> Назад
        </button>
        <Button variant="formSubmit" type="button" onClick={handlePublish}>
          Опубликовать
        </Button>
      </div>
    </div>
  );
};

export default EventPreviewPage;
