"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabItem {
  to: string;
  slug: string;
  name: string;
}

const Tabs = ({ links }: { links: TabItem[] }) => {
  const pathname = usePathname();
  const lastPath = pathname.split("/").pop();

  return (
    <div className="flex items-center justify-between max-h-[58px] h-full p-ten gap-[10px] rounded-[20px]  uppercase font-medium text-[15px] leading-4 bg-[#2D3D52]">
      {links.map((link, idx) => (
        <Link
          href={link.to}
          className={cn(
            "w-full text-center rounded-[20px] py-ten px-[30px] transition",
            link.slug === lastPath
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

export default Tabs;
