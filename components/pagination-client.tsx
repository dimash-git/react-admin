"use client";

import ChevronRight from "@/public/icons/chevron-right.svg";
import ChevronLeft from "@/public/icons/chevron-left.svg";
import { cn } from "@/lib/utils";

const Pagination = ({
  pageSize,
  page,
  count,
  setPage,
}: {
  pageSize: number;
  page: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pages = Math.ceil(count / pageSize);
  const half = Math.floor(pages / 2);
  const pagesArray = Array.from({ length: pages });

  return (
    <div className="flex gap-ten">
      {/* Nav Previous */}
      <button
        type="button"
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
        className="flex items-center transition hover:bg-thBlue py-[5px] px-ten bg-[#455580] rounded-[5px]"
      >
        <ChevronLeft />
      </button>

      <ul className="flex gap-ten">
        {pages <= 5 ? (
          Array.from({ length: pages }).map((_, idx) => (
            <button
              type="button"
              onClick={() => setPage(idx + 1)}
              key={idx}
              className={cn(
                "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                page == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              {idx + 1}
            </button>
          ))
        ) : (
          <>
            {pagesArray.map((_, idx) => {
              if (idx + 1 > page + 2) {
                return (
                  <button
                    type="button"
                    onClick={() => setPage(idx + 1)}
                    key={idx}
                    className={cn(
                      "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                      page == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              }
            })}
            {/* {Array.from({ length: 4 }).map((_, idx) => (
              <button
                type="button"
                onClick={() => setPage(idx + 1)}
                key={idx}
                className={cn(
                  "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                  page == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
                )}
              >
                {idx + 1}
              </button>
            ))} */}
            {/* <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
              ...
            </li>
            <button
              type="button"
              onClick={() => setPage(pages)}
              className={cn(
                "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                page == pages ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              {pages}
            </button> */}
          </>
        )}
      </ul>

      {/* Nav Next */}
      <button
        type="button"
        onClick={() => {
          if (page < pages) setPage(page + 1);
        }}
        className="flex items-center transition hover:bg-thBlue py-[5px] px-ten bg-[#455580] rounded-[5px]"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
