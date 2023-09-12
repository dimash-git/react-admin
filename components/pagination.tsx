import React from "react";
import ChevronRight from "@/public/icons/chevron-right.svg";
import ChevronLeft from "@/public/icons/chevron-left.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Pagination = ({
  pageSize,
  count,
  currPage,
}: {
  pageSize: number;
  count: number;
  currPage: number;
}) => {
  const pages = Math.ceil(count / pageSize);

  return (
    <div className="flex gap-ten">
      <Link
        href={currPage == 1 ? "#" : `?page=${currPage - 1}`}
        className="flex items-center transition hover:bg-thBlue py-[5px] px-ten bg-[#455580] rounded-[5px]"
      >
        <ChevronLeft />
      </Link>
      <ul className="flex gap-ten">
        {pages <= 5 ? (
          Array.from({ length: pages }).map((_, idx) => (
            <Link
              href={`?page=${idx + 1}`}
              key={idx}
              className={cn(
                "flex items-center transition hover:bg-thBlue cursor-pointer text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                currPage == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              {idx + 1}
            </Link>
          ))
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Link
                href={`?page=${idx + 1}`}
                key={idx}
                className="flex items-center transition hover:bg-thBlue cursor-pointer text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]"
              >
                {idx + 1}
              </Link>
            ))}
            <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
              ...
            </li>
            <Link
              href={`?page=${pages}`}
              className="flex items-center  transition hover:bg-thBlue cursor-pointer text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]"
            >
              {pages}
            </Link>
          </>
        )}
      </ul>
      <Link
        href={currPage == pages ? "#" : `?page=${currPage + 1}`}
        className="flex items-center transition hover:bg-thBlue py-[5px] px-ten bg-[#455580] rounded-[5px]"
      >
        <ChevronRight />
      </Link>
    </div>
  );
};

export default Pagination;
