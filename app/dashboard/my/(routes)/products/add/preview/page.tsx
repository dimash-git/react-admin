"use client";

import { useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Container from "@/components/container";

import PostArrowLeft from "@/public/icons/post-arrow-left.svg";
import AdvIcon from "@/public/icons/adv.svg";
import { cn, fileToBase64, getFileType } from "@/lib/utils";
import { homeBaseUrl } from "@/app/dashboard/my/nav";

import { ProductContext } from "../../_components/products-provider";
import { ProductSendData } from "../../schema";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-[20px] bg-thDark p-5 space-y-5">
      <div className="w-full h-[263px] bg-[#2D3D52] rounded-[5px] animate-pulse"></div>

      <div className="flex flex-col space-y-[10px]">
        <div className="bg-[#2D3D52] h-[11px] w-[108px] animate-pulse"></div>
        <div className="bg-[#2D3D52] h-[23px] w-[208px] animate-pulse"></div>
      </div>

      <div className="bg-[#2D3D52] h-[73px] animate-pulse"></div>

      <div className="grid grid-cols-2 gap-[10px]">
        <div className="bg-[#2D3D52] h-9 animate-pulse"></div>
        <div className="bg-[#2D3D52] h-9 animate-pulse"></div>
        <div className="bg-[#2D3D52] h-9 animate-pulse"></div>
        <div className="bg-[#2D3D52] h-9 animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          <div className="bg-[#455580] h-[25px] w-[194px] rounded-[5px] animate-pulse"></div>
          <div className="bg-[#0072FF] h-[25px] w-[127px] rounded-[5px] animate-pulse"></div>
        </div>
        <div className="bg-[#2D3D52] h-[30px] w-16 animate-pulse"></div>
      </div>
    </div>
  );
};

const PreviewPage = () => {
  const { product } = useContext(ProductContext);
  const { toast } = useToast();
  const router = useRouter();

  const { cover, price, discount, ...restProduct } = product;

  const handlePublish = async () => {
    try {
      let sendData: ProductSendData = {
        ...restProduct,
        price: price.toString(),
        discount: discount.toString(),
      };
      if (cover) {
        const base64String = await fileToBase64(cover);
        sendData.img_base64 = base64String as string;
        sendData.img_type = getFileType(cover.type);
      }

      const res = await axios.post("/api/product/add", sendData);

      console.log("Response:", res.data);

      const { status } = res.data;
      if (status !== 200) {
        throw new Error("Error updating product");
      }

      toast({
        variant: "success",
        title: "Продукт добавлен успешно!",
      });

      router.push(`${homeBaseUrl}/products`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка при добавлении продукта!",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <Container variant="productPreview">
      <div className="bg-thYellow rounded-ten font-bold text-[16px] leading-4 p-ten text-black w-full h-10 flex items-center mb-[30px]">
        Предпросмотр
      </div>
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px]">
        {/* Card */}
        <div className="flex flex-col rounded-[20px] bg-thDark p-5 h-full justify-between">
          <div>
            <div className="card__cover relative">
              {product?.cover && (
                <Image
                  width={400}
                  height={263}
                  alt="Image"
                  src={URL.createObjectURL(product.cover)}
                  className="w-full rounded-[5px] h-[263px] object-cover"
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
            <div className="card__description my-5 text-[15px] font-medium">
              <div className="text-[#8F9297] uppercase text-[10px]">
                Торговая системы
              </div>
              <div className="my-[10px] text-[20px] font-bold">
                {product?.name}
              </div>
              <p className="text-[15px] font-medium">{product?.description}</p>
            </div>
          </div>
          <div>
            <div className="my-5 grid grid-cols-2 gap-y-5">
              {product?.advantages &&
                product.advantages.map((adv, index) => (
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
                    <p className="text-[15px] font-bold">{adv}</p>
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
        </div>

        {/* Card Skeleton */}
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>

      <div className="flex justify-center">
        <div className="card__controls flex items-center justify-between bg-[#455580] max-w-[385px] w-full rounded-[10px] mt-10">
          <div className="px-8 py-[10px]">
            <button
              type="button"
              className="flex items-center text-[16px] text-thBlue hover:text-gray-300 transition"
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
    </Container>
  );
};

export default PreviewPage;
