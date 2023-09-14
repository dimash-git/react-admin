import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

interface BdLink {
  to?: string | undefined;
  name: string;
}

const Breadcrumbs = ({ bd }: { bd: BdLink[] }) => {
  return (
    <div className="flex items-center gap-[5px]">
      {bd.map((bdLink, idx) => (
        <div key={idx} className="flex items-center gap-[5px]">
          <Link
            key={idx}
            href={bdLink?.to ?? ""}
            className={cn(
              "uppercase text-[10px] font-medium",
              idx != bd.length - 1
                ? "transition text-[#8F9297] hover:text-[#d0d4da]"
                : null
            )}
          >
            {bdLink?.name}
          </Link>
          {idx != bd.length - 1 && (
            <span className="h-[12px] w-[1px] bg-[#8F9297] block"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
