"use client";

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
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MarketingContext } from "../../_components/marketing-provider";
import { homeBaseUrl } from "@/app/dashboard/my/nav";

interface _FormData {
  name: string;
  desc: string;
  img_data_base64?: string;
  img_type?: string;
}

const PreviewPage = () => {
  const { marketing } = useContext(MarketingContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { name, desc, image } = marketing;

    let formData: _FormData = {
      name,
      desc,
    };

    if (image) {
      try {
        const base64String = await fileToBase64(image);
        formData.img_data_base64 = base64String as string;
        formData.img_type = getFileType(image.type);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    console.log("fields:", formData);

    const res = await axios.post("/api/marketing/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "success",
        title: "Ошибка при добавлении маркетинг продукта!",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Маркетинг продукт добавлен успешно!",
    });

    router.refresh();
    router.push(`${homeBaseUrl}/marketing`);
  };

  return (
    <div className="flex flex-col space-y-[30px]">
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black">
        Предпросмотр
      </div>
      <div>
        <div className="event__header">
          <div className="event__name text-[40px] leading-[40px] font-bold mb-5">
            {marketing?.name}
          </div>
        </div>
        <div className="event__cover">
          {marketing?.image && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(marketing.image as File)}
              className="w-full object-cover"
            />
          )}
        </div>
        <div className="event__description my-[20px] text-[15px] font-medium">
          <p>{marketing?.desc}</p>
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

export default PreviewPage;
