"use client";

import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PostArrowLeft from "@/public/icons/post-arrow-left.svg";
import {
  cn,
  convertMediaBlockToBase64,
  dateToUnix,
  fileToBase64,
  getFileType,
  readableDate,
} from "@/lib/utils";
import { EventContext } from "@/app/dashboard/my/(routes)/events/_components/event-provider";
import { homeBaseUrl } from "@/app/dashboard/my/nav";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EventSendData } from "../../schema";

const EventPreviewPage = () => {
  const { event } = useContext(EventContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { date, type, cover, media_blocks, ...restEvent } = event;

    try {
      const mediaBlocksWithBase64 = await Promise.all(
        media_blocks.map(convertMediaBlockToBase64)
      );

      let sendData: EventSendData = {
        timestamp: dateToUnix(date),
        is_online: type == "online" ? true : false,
        media_blocks: mediaBlocksWithBase64,
        ...restEvent,
      };

      if (cover) {
        const base64String = await fileToBase64(cover);
        sendData.img_data_base64 = base64String as string;
        sendData.img_type = getFileType(cover.type);
      }

      const res = await axios.post("/api/event/add", sendData);

      // console.log("Response:", res.data);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error uploading post");
      }

      toast({
        variant: "success",
        title: "Мероприятие добавлено успешно!",
      });
      router.push(`${homeBaseUrl}/events`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении мероприятия!",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col space-y-[30px]">
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black">
        Предпросмотр
      </div>
      <div>
        <div className="preview__header">
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
          <div className="preview__name text-[40px] font-bold mt-[5px]">
            {event?.name}
          </div>
        </div>
        <p className="preview__description my-[20px] text-[15px] font-medium">
          {event?.desc}
        </p>
        <div className="preview__cover mb-[20px]">
          {event?.cover && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(event.cover)}
              className="w-full object-cover max-h-[238px] rounded-[10px]"
            />
          )}
        </div>
        <div className="preview__media_block flex flex-col space-y-[30px]">
          {event?.media_blocks &&
            event?.media_blocks.map((block, idx) => (
              <div key={idx} className="flex flex-col space-y-[20px]">
                {block?.text && (
                  <p className="text-[15px] font-medium">{block?.text}</p>
                )}
                {block?.media && (
                  <Image
                    width={400}
                    height={200}
                    alt="Image"
                    src={URL.createObjectURL(block.media)}
                    className="w-full object-cover max-h-[200px] rounded-[10px]"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="preview__controls flex items-center justify-between">
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
