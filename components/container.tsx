import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const containerVariants = cva("flex flex-col w-full", {
  variants: {
    variant: {
      default: "bg-thDark p-5 rounded-[20px] space-y-[30px]",
      productPreview: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariants({ variant }))}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
