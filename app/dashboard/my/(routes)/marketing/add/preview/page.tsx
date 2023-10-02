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

interface _FormData {
  name: string;
  desc: string;
  img_data_base64?: string;
  img_type?: string;
  media_blocks: {
    head_line?: string;
    text?: string;
    media?: {
      data_type: string;
      data_base64: string;
    };
  }[];
}

const PreviewPage = () => {
  const { marketing } = useContext(MarketingContext);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    const { name, desc, cover, media_blocks } = marketing;

    const mediaBlocksWithBase64 = await Promise.all(
      media_blocks.map(convertMediaBlockToBase64)
    );

    let formData: _FormData = {
      name,
      desc,
      media_blocks: mediaBlocksWithBase64,
    };

    if (cover) {
      try {
        const base64String = await fileToBase64(cover);
        formData.img_data_base64 = base64String as string;
        formData.img_type = getFileType(cover.type);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    // console.log("fields:", formData);

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
