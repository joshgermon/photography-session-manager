"use client";

import * as React from "react";
import { Label as RACLabel } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium text-base-300 pb-2 block leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export const Label = React.forwardRef<
  React.ElementRef<typeof RACLabel>,
  React.ComponentPropsWithoutRef<typeof RACLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <RACLabel ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = "Label";
