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
import { homeBaseUrl } from "@/app/dashboard/my/constants";

const PromoPreviewPage = () => {
  const { promo } = useContext(PromoContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { name } = promo;
    const formData = {
      name,
      img_data_base64: "",
      img_data_type: "",
      file_data_base64: "",
      file_data_type: "",
    };

    if (promo?.image) {
      const { image } = promo;
      try {
        const base64String = await fileToBase64(image);
        formData.img_data_base64 = base64String as string;
        formData.img_data_type = getFileType(image.type);
      } catch (error: any) {
        console.error("Publish error: ", error.message);
      }
    }

    if (promo?.file) {
      const { file } = promo;
      try {
        const base64String = await fileToBase64(file);
        formData.file_data_base64 = base64String as string;
        formData.file_data_type = getFileType(file.type);
      } catch (error: any) {
        console.error("Publish error: ", error.message);
      }
    }

    console.log("Publish:", formData);

    const res = await axios.post("/api/promo/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "success",
        title: "Ошибка при добавлении промо материала!",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Промо материал добавлено успешно!",
    });

    router.refresh();
    router.push(`${homeBaseUrl}/promo`);
  };

  return (
    <div className="flex flex-col space-y-[30px]">
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black">
        Предпросмотр
      </div>
      <div>
        <div className="event__header">
          <div className="event__name text-[40px] font-bold mt-[5px]">
            {promo?.name}
          </div>
        </div>

        <div className="event__cover">
          {promo?.image && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(promo.image as File)}
              className="w-full object-cover"
            />
          )}
        </div>
      </div>
      <div>
        <Button
          variant="formSubmit"
          type="button"
          onClick={() =>
            window.open(URL.createObjectURL(promo.file as File), "_blank")
          }
        >
          Скачать презентацию
        </Button>
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

export default PromoPreviewPage;
