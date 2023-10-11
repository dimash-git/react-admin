"use client";

import { useContext } from "react";

import PostArrowLeft from "@/public/icons/post-arrow-left.svg";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { homeBaseUrl } from "@/app/dashboard/my/nav";
import {
  convertMediaBlockToBase64,
  fileToBase64,
  getFileType,
} from "@/lib/utils";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { MarketingContext } from "../../_components/marketing-provider";
import { MarketingSendData } from "../../schema";

const PreviewPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { marketing } = useContext(MarketingContext);

  const handlePublish = async () => {
    const { cover, media_blocks, ...restValues } = marketing;

    try {
      const mediaBlocksWithBase64 = await Promise.all(
        media_blocks.map(convertMediaBlockToBase64)
      );

      let sendData: MarketingSendData = {
        ...restValues,
        media_blocks: mediaBlocksWithBase64,
      };

      if (cover) {
        const base64String = await fileToBase64(cover);
        sendData.img_data_base64 = base64String as string;
        sendData.img_type = getFileType(cover.type);
      }

      const res = await axios.post("/api/marketing/add", sendData);

      console.log("Response:", res.data);

      const { status } = res.data;

      if (status != 200) {
        throw new Error("Error posting marketing");
      }

      toast({
        variant: "success",
        title: "Маркетинг продукт добавлен успешно!",
      });

      router.push(`${homeBaseUrl}/marketing`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении маркетинг продукта",
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
          <div className="preview__name text-[40px] leading-[40px] font-bold mb-5">
            {marketing?.name}
          </div>
        </div>
        <div className="preview__cover overflow-hidden rounded-[10px] max-h-[337px]">
          {marketing?.cover && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(marketing.cover)}
              className="w-full object-cover max-h-[238px] rounded-[10px]"
            />
          )}
        </div>
        <p className="preview__description my-[20px] text-[15px] font-medium">
          {marketing?.desc}
        </p>
        <div className="preview__media_block flex flex-col space-y-[30px]">
          {marketing?.media_blocks &&
            marketing?.media_blocks.map((block, idx) => (
              <div key={idx} className="flex flex-col space-y-[20px]">
                {block?.head_line && (
                  <h3 className="text-[18px] font-semibold">
                    {block?.head_line}
                  </h3>
                )}
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

export default PreviewPage;
