import ChevronRight from "@/public/icons/chevron-right.svg";
import ChevronLeft from "@/public/icons/chevron-left.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Pagination = ({
  postsPerPage,
  postsCount,
  active,
}: {
  postsPerPage: number;
  postsCount: number;
  active: number;
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
      <Link
        href={active == 1 ? "#" : `?page=${active - 1}`}
        className={cn(
          "flex items-center transition py-[5px] px-ten rounded-[5px]",
          active == 1
            ? "bg-[#455580] opacity-40 hover:cursor-not-allowed"
            : "bg-[#455580] hover:bg-thBlue"
        )}
      >
        <ChevronLeft />
      </Link>
      <ul className="flex gap-ten">
        {pages > numsToShow + step ? (
          <>
            <Link
              href="?page=1"
              className={cn(
                "flex items-center transition hover:bg-thBlue cursor-pointer text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                active == 1 ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              1
            </Link>

            {startDots && (
              <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
                ...
              </li>
            )}

            {Array.from({ length: numsToShow }).map((_, idx) => (
              <Link
                href={`?page=${idx + 1}`}
                key={idx}
                className={cn(
                  "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                  active == idx + startArrayNum ? "bg-thBlue" : "bg-[#455580]"
                )}
              >
                {idx + startArrayNum}
              </Link>
            ))}

            {endDots && (
              <li className="flex items-center text-[16px] font-bold leading-4 py-[5px] px-ten bg-[#455580] rounded-[5px]">
                ...
              </li>
            )}

            <Link
              href={`?page=${pages}`}
              className={cn(
                "flex items-center transition hover:bg-thBlue cursor-pointer text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                active == pages ? "bg-thBlue" : "bg-[#455580]"
              )}
            >
              {pages}
            </Link>
          </>
        ) : (
          <>
            {Array.from({ length: pages }).map((_, idx) => (
              <Link
                href={`?page=${idx + 1}`}
                key={idx}
                className={cn(
                  "flex items-center transition hover:bg-thBlue text-[16px] font-bold leading-4 py-[5px] px-ten rounded-[5px]",
                  active == idx + 1 ? "bg-thBlue" : "bg-[#455580]"
                )}
              >
                {idx + 1}
              </Link>
            ))}
          </>
        )}
      </ul>
      <Link
        href={active == pages ? "#" : `?page=${active + 1}`}
        className={cn(
          "flex items-center transition py-[5px] px-ten rounded-[5px]",
          active == pages
            ? "bg-[#455580] opacity-40 hover:cursor-not-allowed"
            : "bg-[#455580] hover:bg-thBlue"
        )}
      >
        <ChevronRight />
      </Link>
    </div>
  );
};

export default Pagination;
