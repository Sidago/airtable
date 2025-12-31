"use client";

import React from "react";
import clsx from "clsx";

type BadgeStatus = "success" | "error" | "warning" | "info" | "processing";
type BadgeSize = "xs" | "sm" | "md" | "lg" | "custom";
type BadgeRadius = "rounded" | "rounded-md" | "rounded-lg" | "rounded-full" | "pill" | "custom";
type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface BadgeProps {
  count?: number | string;
  max?: number;
  dot?: boolean;
  showZero?: boolean;
  status?: BadgeStatus;
  children?: React.ReactNode;
  standalone?: boolean;

  size?: BadgeSize;
  radius?: BadgeRadius;
  color?: string;
  textColor?: string;
  border?: string;

  placement?: BadgePlacement;
  offset?: [number, number];

  className?: string;
  style?: React.CSSProperties;

  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
}

const STATUS_COLOR: Record<BadgeStatus, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  processing: "bg-blue-500 animate-pulse",
};

const SIZE_CLASS: Record<BadgeSize, string> = {
  xs: "text-[9px] min-w-[12px] h-[12px] px-1",
  sm: "text-[10px] min-w-[14px] h-[14px] px-1",
  md: "text-xs min-w-[18px] h-[18px] px-1.5",
  lg: "text-sm min-w-[22px] h-[22px] px-2",
  custom: "",
};

const RADIUS_CLASS: Record<BadgeRadius, string> = {
  rounded: "rounded",
  "rounded-md": "rounded-md",
  "rounded-lg": "rounded-lg",
  "rounded-full": "rounded-full",
  pill: "rounded-full px-2",
  custom: "",
};

const PLACEMENT_CLASS: Record<BadgePlacement, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
};

export default function Badge({
  count,
  max = 99,
  dot = false,
  showZero = false,
  status,
  children,
  standalone = false,

  size = "md",
  radius = "rounded-full",
  color,
  textColor = "text-white",
  border,

  placement = "top-right",
  offset = [0, 0],

  className,
  style,

  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
}: BadgeProps) {
  const isZero = count === 0 || count === "0";
  const hidden = !dot && !status && count === undefined && !standalone;
  if (hidden || (!showZero && isZero)) return <>{children}</>;

  const displayCount =
    typeof count === "number" && count > max ? `${max}+` : count;

  const badgeNode = (
    <span
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      className={clsx(
        "absolute flex items-center justify-center font-medium leading-none select-none",
        SIZE_CLASS[size],
        RADIUS_CLASS[radius],
        dot && "w-2 h-2 p-0 min-w-0",
        status ? STATUS_COLOR[status] : color || "bg-red-500",
        textColor,
        border,
        PLACEMENT_CLASS[placement],
        className
      )}
      style={{
        marginRight: offset[0],
        marginTop: offset[1],
        ...style,
      }}
    >
      {!dot && !status && displayCount}
    </span>
  );

  if (standalone || !children) {
    return (
      <span className="relative inline-flex">
        {badgeNode}
      </span>
    );
  }

  return (
    <span className="relative inline-flex">
      {children}
      {badgeNode}
    </span>
  );
}
