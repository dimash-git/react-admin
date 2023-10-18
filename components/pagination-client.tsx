"use client";

import ChevronRight from "@/public/icons/chevron-right.svg";
import ChevronLeft from "@/public/icons/chevron-left.svg";
import { cn } from "@/lib/utils";

const Pagination = ({
  active,
  setActive,
  postsCount,
  postsPerPage,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  postsCount: number;
  postsPerPage: number;
}) => {
  const pages = Math.ceil(postsCount / postsPerPage);

  const step = 2;
  const numsToShow = step * 2 + 1;

  let start = 2;
  let startArrayNum = start;
  let startDots = false;
  let endDots = false;

  startDots = active > step + start ? true : false;
  endDots = pages > active + step + 1 ? true : false;

  if (active > start && active != start + 1) {
    startArrayNum = active - step;
  }
  if (pages < active + step + 1) {
    startArrayNum = pages - numsToShow;
  }

  return (
    <div className="flex gap-ten">
      {/* Nav Previous */}
      <button
        type="button"
        onClick={() => {
          if (active > 1) setActive(active - 1);
        }}
        className={cn(
          "flex items-center transition py-[5px] px-ten rounded-[5px]",
          active == 1
            ? "bg-[#455580] opacity-40 hover:cursor-not-allowed"
            : "bg-[#455580] hover:bg-thBlue"
        )}
      >
        <ChevronLeft />
      </button>
      <ul className="flex gap-ten">
        {pages > numsToShow + start ? (
          <>
            <li
              onClick={() => setActive(1)}
              className={cn(
                "cursor-pointer flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                active == 1 ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              1
            </li>

            {startDots && (
              <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
                ...
              </li>
            )}

            {Array.from({ length: numsToShow }).map((_, idx) => (
              <li
                onClick={() => setActive(idx + startArrayNum)}
                key={idx}
                className={cn(
                  "cursor-pointer flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                  active == idx + startArrayNum ? "bg-thBlue" : "bg-[#455580]"
                )}
              >
                {idx + startArrayNum}
              </li>
            ))}

            {endDots && (
              <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
                ...
              </li>
            )}

            <li
              onClick={() => setActive(pages)}
              className={cn(
                "cursor-pointer flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                active == pages ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              {pages}
            </li>
          </>
        ) : (
          <>
            {Array.from({ length: pages }).map((_, idx) => (
              <li
                onClick={() => setActive(idx + 1)}
                key={idx}
                className={cn(
                  "cursor-pointer flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                  active == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
                )}
              >
                {idx + 1}
              </li>
            ))}
          </>
        )}
      </ul>

      {/* Nav Next */}
      <button
        type="button"
        onClick={() => {
          if (active < pages) setActive(active + 1);
        }}
        className={cn(
          "flex items-center transition py-[5px] px-ten rounded-[5px]",
          active == pages
            ? "bg-[#455580] opacity-40 hover:cursor-not-allowed"
            : "bg-[#455580] hover:bg-thBlue"
        )}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
