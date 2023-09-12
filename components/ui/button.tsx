import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[5px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Custom added by me
        default:
          "bg-thBlue text-[thGray] text-[12px] leading-[14px] font-bold hover:bg-thBlue/80",
        destructive: "bg-thRed text-white hover:bg-thRed/80",
        submit:
          "bg-thBlue hover:bg-thBlue/80 py-ten text-[16px] font-bold text-gray",
        modal: "bg-[#455580] hover:bg-[#455580]/80 text-[16px] font-bold",
        form: "bg-[#455580] hover:bg-[#455580]/80 text-[12px] font-bold",
        formSubmit: "bg-thBlue hover:bg-thBlue/80 text-[12px] font-bold",
        inputLike:
          "border-[#455580] border-[1px] rounded-ten text-[15px] font-semibold #8F9297 text-[#8F9297]",
      },
      size: {
        // Custom added by me
        default: "h-[25px] py-[5px] px-5", // card edit
        sm: "h-[25px] py-[5px] px-ten", // card remove
        md: "px-10 py-ten",
        lg: "h-10 py-ten px-10", // modal
        inputLike: "p-ten",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
