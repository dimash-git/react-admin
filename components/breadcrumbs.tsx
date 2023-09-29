"use client";

import { urlSegments as schema } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = ({
  customLabel,
  slice,
}: {
  customLabel?: string;
  slice?: number;
}) => {
  const pathname = usePathname();

  let segments = pathname.split("/").filter((segment) => segment !== ""); // Split the URL by "/" and remove empty segments
  const breadcrumbs = [];

  if (slice && slice > 0) {
    segments = segments.slice(0, -1);
  }

  // Ignore the first segment (e.g., "dashboard")
  for (let i = 1; i < segments.length; i++) {
    const slug = segments[i];
    const schemaEntry = schema.find((entry) => entry.slug === slug);

    if (schemaEntry) {
      breadcrumbs.push(schemaEntry);
    } else {
      // If there's no matching schema entry, use the slug as the name
      breadcrumbs.push({ slug, name: slug });
    }
  }

  // Optionally change the last segment if the prop is provided
  if (customLabel && breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1] = {
      ...breadcrumbs[breadcrumbs.length - 1],
      name: customLabel,
    };
  }

  return (
    <div className="flex items-center gap-[5px]">
      {breadcrumbs.map((bdLink, idx) => (
        <div key={idx} className="flex items-center gap-[5px]">
          <Link
            href={`/${segments.slice(0, idx + 2).join("/")}`}
            className={cn(
              "uppercase text-[10px] font-medium",
              idx !== breadcrumbs.length - 1
                ? "transition text-[#8F9297] hover:text-[#d0d4da]"
                : null
            )}
          >
            {bdLink.name}
          </Link>
          {idx !== breadcrumbs.length - 1 && (
            <span className="h-[12px] w-[1px] bg-[#8F9297] block"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
