import Link from "next/link";

interface SectionLink {
  to: string;
  name: string;
  icon: React.FC;
}

const NavSection = ({ section }: { section: any }) => {
  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-twenty w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">{section?.name}</span>
        {section?.icon && <section.icon />}
      </div>

      {section?.cats ? (
        <div className="flex flex-col space-y-[20px]">
          {section?.cats.map((cat: any, idx: number) => (
            <div key={idx}>
              <span className="text-[12px] font-medium mb-ten uppercase block">
                {cat?.name}
              </span>
              <div className="flex flex-col space-y-[10px]">
                {cat.links.map((link: SectionLink, idx: number) => (
                  <Link
                    key={idx}
                    className="p-ten rounded-[5px] bg-[#2D3D5299] flex items-center justify-between transition hover:bg-[#2D3D5299]/90"
                    href={link?.to}
                  >
                    <span className="text-[16px] font-bold">{link?.name} </span>
                    {link?.icon && <link.icon />}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-[10px]">
          {section?.links.map((link: SectionLink, idx: number) => (
            <Link
              key={idx}
              className="p-ten rounded-[5px] bg-[#2D3D5299] flex items-center justify-between transition hover:bg-[#2D3D5299]/90"
              href={link?.to}
            >
              <span className="text-[16px] font-bold">{link?.name} </span>
              {link?.icon && <link.icon />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavSection;
