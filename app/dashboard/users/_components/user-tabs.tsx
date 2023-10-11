"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  to: string;
  slug: string;
  name: string;
}

const UserTabs = ({ links }: { links: TabItem[] }) => {
  const pathname = usePathname();
  const rootPathname = pathname.split("/").slice(0, 4).join("/");

  return (
    <div className="grid grid-cols-5 p-ten gap-y-[10px] gap-x-[5px] rounded-[20px] uppercase font-medium text-[14px] leading-4 bg-[#2D3D52]">
      {links.map((link, idx) => (
        <Link
          href={rootPathname + link.to}
          className={cn(
            "flex items-center justify-center text-center rounded-[10px] py-[10px] px-[5px] transition h-[50px]",
            pathname.includes(link.slug)
              ? "bg-thBlue hover:bg-thBlue/80"
              : "hover:bg-slate-500"
          )}
          key={idx}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default UserTabs;
