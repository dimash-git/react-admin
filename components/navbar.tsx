import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-thDark py-2 px-ten">
      <Image src="/logo.svg" width={194} height={46} alt="Logo" />
      <div className="flex items-center gap-5">
        <span className="block text-[13px] font-bold uppercase">
          Имя админа
        </span>
        <Avatar>
          <AvatarFallback className="bg-thBlue">ИА</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
