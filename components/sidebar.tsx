"use client";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { menu } from "@/lib/constants";
import Collapse from "@/public/icons/collapse.svg";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggle } from "@/redux/features/sidebarSlice";
import StyledIcon from "./styled-icon";

const Sidebar = () => {
  const pathname = usePathname();
  const shrinked = useAppSelector((state) => state.sidebar.shrinked);
  // const shrinked = false
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(toggle());
  };
  return (
    <div
      className={cn(
        "p-[15px] rounded-[20px] bg-thDark flex flex-col space-y-[30px] h-max max-w-[185px]",
        inter.className,
        shrinked ? null : "w-full"
      )}
    >
      {/* {shrinked ? "shrinked" : "not shrinked"} */}
      <button
        className="flex gap-4 items-center rounded-[5px] transition hover:text-thBlue"
        onClick={toggleSidebar}
      >
        <StyledIcon
          Icon={Collapse}
          className={cn("transition", shrinked ? "mx-auto rotate-180" : null)}
        />
        <span
          className={cn("font-medium text-[12px]", shrinked ? "hidden" : null)}
        >
          Закрыть
        </span>
      </button>
      {menu.map((menuItem, idx) => (
        <Link
          key={idx}
          className={cn(
            "flex items-center gap-4 rounded-[5px] px-2 py-[6px] transition hover:bg-[#2D3D52] hover:text-thBlue",
            pathname === menuItem.to ? "bg-[#2D3D52] text-thBlue" : null
          )}
          href={menuItem.to}
        >
          <menuItem.icon />
          <span
            className={cn(
              "font-medium text-[12px]",
              shrinked ? "hidden" : null
            )}
          >
            {menuItem.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
