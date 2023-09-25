"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn, fileToBase64, getFileType } from "@/lib/utils";
import PostArrowLeft from "@/public/icons/post-arrow-left.svg";
import AdvIcon from "@/public/icons/adv.svg";
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ProductContext } from "../../_components/products-provider";
import { homeBaseUrl } from "@/app/dashboard/my/constants";

interface _FormData {
  cat?: string;
  name: string;
  desc: string;
  img_base64?: string;
  img_type?: string;
  price: number;
  is_pack: boolean;
  is_robot: boolean;
  products?: {
    product_id: string;
  }[];
  discount?: number;
  advantages: {
    text: string;
  }[];
}

const PreviewPage = () => {
  const { product } = useContext(ProductContext);
  const { toast } = useToast();
  const router = useRouter();

  const {
    name,
    desc,
    image,
    advantages,
    price,
    discount,
    is_pack,
    is_robot,
    products,
    cat,
  } = product;

  console.log(product);

  const handlePublish = async () => {
    let formData: _FormData = {
      cat,
      name,
      desc,
      price,
      is_pack,
      is_robot,
      products,
      discount,
      advantages,
    };

    if (image) {
      try {
        const base64String = await fileToBase64(image);
        formData.img_base64 = base64String as string;
        formData.img_type = getFileType(image.type);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    console.log("fields:", formData);

    const res = await axios.post("/api/products/add", formData);

    // console.log("Response:", res.data);

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении продукта!",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Продукт добавлен успешно!",
    });

    router.refresh();
    router.push(`${homeBaseUrl}/product`);
  };

  return (
    <div>
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black">
        Предпросмотр
      </div>
      <div className="mt-[30px] w-[508px] flex flex-col rounded-twenty bg-[#7bace71a] p-5">
        <div className="card__cover relative">
          {product?.image && (
            <Image
              width={400}
              height={238}
              alt="Image"
              src={URL.createObjectURL(product.image as File)}
              className="w-full object-cover rounded-[5px]"
            />
          )}
          <div className="absolute left-[20px] top-[50%] -translate-y-[50%]">
            <div className="text-[20px] leading-5 font-medium">
              Торговая система
            </div>
            <span className="font-bold text-[35px] leading-9">
              {product?.name}
            </span>
          </div>
        </div>
        <div className="card__description mt-5 mb-10 text-[15px] font-medium">
          <div className="text-[#8F9297] uppercase text-[10px]">
            Торговая системы
          </div>
          <div className="my-[10px] text-[20px] font-bold">{product?.name}</div>
          <p className="text-[15px] font-medium">{product?.desc}</p>
        </div>
        <div className="my-5 grid grid-cols-2 gap-y-5">
          {advantages &&
            advantages.map((adv, index) => (
              <div
                className={cn(
                  "flex gap-ten items-center",
                  index % 2 == 0 ? "max-w-[125px] w-full" : null
                )}
                key={index}
              >
                <div className="shrink-0">
                  <AdvIcon />
                </div>
                <p className="text-[15px] font-bold">{adv?.text}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Button
              variant="form"
              type="button"
              className="px-10 cursor-not-allowed"
            >
              Добавить в корзину
            </Button>
            <Button
              variant="formSubmit"
              type="button"
              className="px-10 cursor-not-allowed"
            >
              Купить
            </Button>
          </div>
          <div className="text-[25px] font-bold">{product?.price} $</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="card__controls flex items-center justify-between bg-[#455580] max-w-[385px] w-full rounded-[5px] mt-10">
          <div className="px-8 py-[10px]">
            <button
              type="button"
              className="flex items-center text-[20px] text-thBlue hover:text-gray-300 transition"
              onClick={() => router.back()}
            >
              <PostArrowLeft /> Назад
            </button>
          </div>
          <span className="w-[1px] bg-slate-500 h-full"></span>
          <div className="flex items-center px-5 py-[10px]">
            <Button
              variant="formSubmit"
              type="button"
              onClick={handlePublish}
              className="px-10"
            >
              Добавить продукт
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
