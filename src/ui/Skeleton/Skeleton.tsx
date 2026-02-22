import { cn } from "@telephotos/utils/utils";
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  // Accessibility props
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-busy"?: boolean;
  "aria-live"?: "polite" | "assertive" | "off";
}

function Skeleton({
  className,
  "aria-label": ariaLabel = "Loading content",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  id,
  role = "status",
  "aria-busy": ariaBusy = true,
  "aria-live": ariaLive = "polite",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-200 dark:bg-slate-800",
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
      role={role}
      aria-busy={ariaBusy}
      aria-live={ariaLive}
      {...props}
    >
      <div
        className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-slate-700"
        aria-hidden="true"
        role="presentation"
      />
    </div>
  );
}

export default Skeleton;
