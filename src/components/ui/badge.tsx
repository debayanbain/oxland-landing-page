import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-indigo/15 bg-secondary px-3.5 py-1.5 text-xs font-semibold text-brand-indigo",
        className
      )}
      {...props}
    />
  );
}
