"use client";

import React, { useContext } from "react";

import ExpandIcon from "@/public/icons/expand.svg";
import { processBreadcrumbs } from "@/app/dashboard/processes/nav";
import Breadcrumbs from "@/components/breadcrumbs";
import { PassportContext } from "../../_components/passport-provider";

import Image from "next/image";
import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import PassportForm from "../../_components/passport-form";
import ModalApprove from "@/components/modal-approve";

const cat = "passport";
const lastBread = processBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/processes/${cat}/`;

const breadcrumbs = [...processBreadcrumbs[cat], lastBread] ?? [];

const EditPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { passport } = useContext(PassportContext);
  console.log(passport);

  return (
    <>
      <Breadcrumbs bd={[...breadcrumbs, { name: `ID: ${id}` }]} />
      <div className="grid grid-cols-2 gap-x-[30px]">
        <div className="flex flex-col gap-[30px]">
          <span className="text-[20px] font-medium">Главный разворот</span>
          <div className="rounded-[10px] overflow-hidden relative">
            {passport?.user_id ? (
              <Image
                src={passport?.passport_main}
                alt={`Front: ${id}`}
                height={300}
                width={500}
                className="max-h-[300px] w-full object-fill"
              />
            ) : (
              <div className="h-[300px] w-full bg-[#101316]"></div>
            )}
            <button className="absolute left-[10px] bottom-[10px] px-[15px] py-[5px] text-[#0072FF] hover:text-[#a5c0e2] transition flex items-center gap-[10px] bg-[#4555804D] rounded-[5px]">
              На весь экран <ExpandIcon />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <span className="text-[20px] font-medium">Прописка</span>
          <div className="rounded-[10px] overflow-hidden relative">
            {passport?.user_id ? (
              <Image
                src={passport?.passport_living}
                alt={`Back: ${id}`}
                height={300}
                width={500}
                className="max-h-[300px] w-full object-fill"
              />
            ) : (
              <div className="h-[300px] w-full bg-[#101316]"></div>
            )}
            <button className="absolute left-[10px] bottom-[10px] px-[15px] py-[5px] text-[#0072FF] hover:text-[#a5c0e2] transition flex items-center gap-[10px] bg-[#4555804D] rounded-[5px]">
              На весь экран <ExpandIcon />
            </button>
          </div>
        </div>
      </div>

      {/* APPROVE, DECLINE */}
      <div className="flex items-center gap-x-[10px]">
        <ModalApprove
          apiUrl="/api/passport/approve"
          messages={{ error: "верификацию", success: "Верификация" }}
          what="верификацию"
          id={id}
        >
          <Button asChild type="button" variant="formSubmit">
            <span>Одобрить</span>
          </Button>
        </ModalApprove>
        <ModalPost
          Form={PassportForm}
          title="Отказать в  верификации паспорта"
          maxWidth="max-w-[369px]"
        >
          <Button
            asChild
            variant="destructive"
            className="text-[12px] font-bold"
          >
            <span>Отказать</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default EditPage;
