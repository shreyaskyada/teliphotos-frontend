import { cn } from "@telephotos/utils/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base
          "w-full min-h-[100px] px-4 py-3 rounded-lg text-sm transition-all duration-200 resize-none",
          // Background + text
          "bg-white/5 text-white placeholder:text-slate-400",
          // Border + shadow
          "border border-slate-700 shadow-sm",
          // Focus styles
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
