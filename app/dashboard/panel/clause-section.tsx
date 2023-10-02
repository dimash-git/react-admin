import React from "react";
import InsectIcon from "@/public/icons/insect.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";

import Link from "next/link";
import { panelBaseUrl } from "./nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ClauseSection = () => {
  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-[20px] w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">Клауза</span>
        <InsectIcon />
      </div>

      <div className="flex flex-col space-y-[10px]">
        <Button
          variant="formSubmit"
          size="md"
          className={cn(
            "text-[16px] h-10",
            true ? "bg-[#1D8427] hover:bg-[#1D8427]/80" : null
          )}
        >
          Включить
        </Button>
        <Link
          className="p-ten rounded-[5px] bg-[#2D3D5299] flex items-center justify-between transition hover:bg-[#2D3D5299]/90"
          href={`${panelBaseUrl}/clause-settings`}
        >
          <span className="text-[16px] font-bold">Настройки</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ClauseSection;
