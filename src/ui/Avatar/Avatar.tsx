import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@telephotos/utils/utils";
import * as React from "react";
import { getInitials } from "./utils";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  name?: string;
  src?: string;
  status?: "online" | "offline" | "away" | "busy";
  initialsLength?: 1 | 2;
  alt?: string;
  statusLabel?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "soft" | "ring" | "glow";
}

// Telegram-style color palette - clean, vibrant, consistent
const telegramColors = [
  "#FF885E", // Orange
  "#FF516A", // Red
  "#915FB5", // Purple
  "#38A3D8", // Blue
  "#4A9EE2", // Light Blue
  "#34C76A", // Green
  "#FFCD6A", // Yellow
  "#7B68E5", // Violet
  "#FF5FA2", // Pink
  "#3FC5F0", // Cyan
  "#00D448", // Bright Green
  "#B548C6", // Magenta
  "#2481CC", // Dark Blue
  "#E15759", // Coral
  "#FF8F00", // Amber
  "#607B8B", // Steel Blue
];

// Generate consistent color based on name hash (Telegram's approach)
const getTelegramColorForName = (name: string | undefined) => {
  if (!name) return telegramColors[0];

  // Simple hash function similar to Telegram
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % telegramColors.length;
  return telegramColors[index];
};

const sizeClasses = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-14 w-14 text-xl",
};

const statusSizes = {
  xs: "h-2 w-2",
  sm: "h-2.5 w-2.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const statusColors = {
  online: "bg-emerald-500 shadow-emerald-500/30",
  offline: "bg-slate-500 shadow-slate-500/30",
  away: "bg-amber-500 shadow-amber-500/30",
  busy: "bg-red-500 shadow-red-500/30",
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      name,
      src,
      status,
      initialsLength = 2,
      alt,
      statusLabel,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const initials = name ? getInitials(name, initialsLength) : "?";
    const backgroundColor = getTelegramColorForName(name);

    const variantClasses = {
      default: "shadow-sm hover:shadow-md", // Minimal shadows like Telegram
      soft: "shadow-sm hover:shadow-md ring-1 ring-white/10",
      ring: "ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-500/30 hover:ring-purple-500/50",
      glow: "shadow-md hover:shadow-lg",
    };

    const getStatusLabel = () => {
      if (statusLabel) return statusLabel;
      switch (status) {
        case "online":
          return "Online";
        case "offline":
          return "Offline";
        case "away":
          return "Away";
        case "busy":
          return "Busy";
        default:
          return "";
      }
    };

    return (
      <div className="relative inline-block">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
          {...props}
        >
          {src ? (
            <AvatarPrimitive.Image
              className="h-full w-full object-cover transition-all duration-200"
              src={src}
              alt={alt || name || "User avatar"}
            />
          ) : (
            <AvatarPrimitive.Fallback
              className={cn(
                "flex h-full w-full items-center justify-center rounded-full font-medium text-white select-none",
                "transition-all duration-200 hover:brightness-110"
              )}
              style={{
                backgroundColor: backgroundColor,
              }}
              aria-label={alt || name || "User avatar"}
              role="img"
            >
              <span className="font-normal tracking-normal leading-none">
                {initials}
              </span>
            </AvatarPrimitive.Fallback>
          )}
        </AvatarPrimitive.Root>

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-slate-800 transition-all duration-200",
              statusSizes[size],
              statusColors[status],
              "shadow-sm"
            )}
            aria-label={getStatusLabel()}
            title={getStatusLabel()}
            role="status"
          >
            <span className="sr-only">{getStatusLabel()}</span>
          </span>
        )}

        {/* Simple pulse for online status - Telegram style */}
        {status === "online" && (
          <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-pulse" />
        )}
      </div>
    );
  }
);

Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar, type AvatarProps };
