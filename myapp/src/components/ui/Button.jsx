import React from "react";
import { cn } from "../../lib/utils";

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        "bg-primary text-white hover:bg-primary-dark dark:bg-primary dark:text-text-dark dark:hover:bg-primary-dark",
        "sm:px-4 sm:py-2 sm:text-base",
        "px-3 py-1.5 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
