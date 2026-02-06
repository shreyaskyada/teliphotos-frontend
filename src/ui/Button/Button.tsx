"use client";
import * as React from "react";
import { useCallback, useState } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@teliphotos/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "w-full font-semibold transition-all duration-300 rounded-full inline-flex items-center justify-center relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        linkText: "text-primary underline-offset-4 hover:underline",
        time: "bg-primary text-primary-foreground hover:bg-primary/90", 
        gradient:
          "bg-primary text-primary-foreground hover:bg-primary/90", // Fallback to primary to remove gradients
        delete: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  buttonChildWrapperClasses?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoadingButton?: boolean;
  disableRipple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      startIcon,
      endIcon,
      size,
      disabled = false,
      loading = false,
      asChild = false,
      type = "button",
      children,
      buttonChildWrapperClasses = "",
      isLoadingButton = false,
      onClick,
      disableRipple = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [createNewRipple, setCreateNewRipple] = useState(true);

    function getContrastYIQ(rgb: string) {
      // Parse rgb/rgba into numbers
      const match = rgb.match(/\d+/g);
      if (!match) return "light";
      const [r, g, b] = match.map(Number);

      // Standard luminance calculation
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "light" : "dark";
    }

    const createRipple = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!createNewRipple || variant === "linkText" || variant === "link")
          return;

        const buttonEl = event.currentTarget;
        const rect = buttonEl.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        // Get actual computed colors
        const styles = window.getComputedStyle(buttonEl);
        const textColor = styles.color;

        // Decide ripple base color depending on background brightness
        const rippleBase = textColor.replace(
          ")",
          getContrastYIQ(textColor) === "dark" ? ", 0.5)" : ", 1)"
        );

        const ripple = document.createElement("span");
        ripple.style.cssText = `
        pointer-events: none;
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 800ms linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.5;
        background: radial-gradient(circle, ${rippleBase} 0%, transparent 100%);
      `;

        buttonEl.appendChild(ripple);

        setCreateNewRipple(false);
        ripple.addEventListener("animationend", () => {
          ripple.remove();
          setCreateNewRipple(true);
        });
      },
      [createNewRipple, variant]
    );

    const renderLoader = () => <span className="spinner-border"></span>;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant: variant, size, className }),
          "relative overflow-hidden"
        )}
        type={type}
        disabled={disabled || loading}
        ref={ref}
        onClick={(e) => {
          if (!disableRipple) {
            createRipple(e);
          }
          onClick?.(e);
        }}
        {...props}
      >
        {loading
          ? startIcon
            ? // If startIcon exists, replace it with the loader
              renderLoader()
            : // If startIcon is absent, show loader before the text
              !endIcon && <>{renderLoader()}</>
          : startIcon && <>{startIcon}</>}

        {isLoadingButton ? (
          renderLoader()
        ) : (
          <div
            className={cn("flex items-center gap-1", buttonChildWrapperClasses)}
          >
            {children}
          </div>
        )}

        {loading && endIcon ? renderLoader() : endIcon && <>{endIcon}</>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
