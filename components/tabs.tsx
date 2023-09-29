"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabLink {
  to: string;
  slug: string;
  name: string;
}

const Tabs = ({ links }: { links: TabLink[] }) => {
  const pathname = usePathname();
  const lastPath = pathname.split("/").pop();

  return (
    <div className="p-ten gap-[10px] rounded-twenty bg-[#2D3D52] max-h-[58px] h-full uppercase text-[15px] leading-4 font-medium flex items-center justify-between">
      {links.map((link, idx) => (
        <Link
          href={link.to}
          className={cn(
            "w-full text-center rounded-twenty py-ten px-[30px] transition",
            link.slug === lastPath
              ? "bg-thBlue hover:bg-thBlue/80"
              : "hover:bg-slate-500"
          )}
          key={idx}
        >
          {link.name}
        </Link>
      ))}
      {/* <Link
        href=""
        className="bg-thBlue hover:bg-thBlue/80 transition w-full text-center rounded-twenty py-ten px-[30px]"
      >
        все мероприятия
      </Link>
      <Link
        href="/dashboard/my/events/add"
        className="transition w-full text-center rounded-twenty py-ten px-[30px] hover:bg-slate-500"
      >
        Создать мероприятие
      </Link> */}
    </div>
  );
};

export default Tabs;
