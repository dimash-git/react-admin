import NavSection from "@/components/nav-section";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import {
  events,
  marketing,
  news,
  products,
  promo,
  support,
} from "@/constants/home/sections";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-ten mt-[22px] max-w-[1280px] w-full mx-auto flex space-x-[30px]">
        <Sidebar />
        <div className="flex gap-[30px] w-full">
          <div className="max-w-[615px] w-full">
            <NavSection section={events} />
            <NavSection section={promo} />
            <div className="flex space-x-[30px]">
              <NavSection section={news} />
              <NavSection section={products} />
            </div>
          </div>
          <div className="max-w-[400px] w-full">
            <NavSection section={marketing} />
            <NavSection section={support} />
          </div>
        </div>
      </main>
    </>
  );
}
