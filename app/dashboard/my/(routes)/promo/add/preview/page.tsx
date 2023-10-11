"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fileToBase64, getFileType } from "@/lib/utils";
import PostArrowLeft from "@/public/icons/post-arrow-left.svg";
import axios from "axios";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PromoContext } from "../../_components/promo-provider";
import { homeBaseUrl } from "@/app/dashboard/my/nav";
import { PromoSendData } from "../../schema";

const PromoPreviewPage = () => {
  const { promo } = useContext(PromoContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { cover, file, ...restPromo } = promo;

    try {
      const sendData: PromoSendData = {
        ...restPromo,
      };

      if (cover) {
        const base64String = await fileToBase64(cover);
        sendData.img_data_base64 = base64String as string;
        sendData.img_data_type = getFileType(cover.type);
      }
      if (file) {
        const base64String = await fileToBase64(file);
        sendData.file_data_base64 = base64String as string;
        sendData.file_data_type = getFileType(file.type);
      }

      const res = await axios.post("/api/promo/add", sendData);

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error posting promo " + status);
      }

      toast({
        variant: "success",
        title: "Промо материал добавлено успешно!",
      });

      router.push(`${homeBaseUrl}/promo`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении промо материала",
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
          <div className="preview__name text-[40px] font-bold mt-[5px]">
            {promo?.name}
          </div>
        </div>

        <div className="preview__cover">
          {promo?.cover && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(promo.cover)}
              className="w-full object-cover"
            />
          )}
        </div>
      </div>
      <div>
        {promo?.file && (
          <Button
            variant="formSubmit"
            type="button"
            onClick={() =>
              window.open(URL.createObjectURL(promo.file as File), "_blank")
            }
          >
            Скачать презентацию
          </Button>
        )}
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

export default PromoPreviewPage;
