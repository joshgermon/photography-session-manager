"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { Button as RACButton } from "react-aria-components";
import type { ButtonProps as RACButtonProps } from "react-aria-components";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white text-sm hover:bg-primary-hover border border-base-800",
        destructive: "bg-danger hover:bg-danger-hover",
        outline:
          "border border-input bg-surface shadow-sm hover:bg-accent hover:text-accent-foreground hover:bg-base-900",
        ghost: "bg-none hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = VariantProps<typeof buttonVariants> & RACButtonProps;

export type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  className?: string;
  children?: React.ReactNode;
};

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <RACButton
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </RACButton>
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
