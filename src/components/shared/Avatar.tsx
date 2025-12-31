"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "custom";
type AvatarShape = "rounded" | "rounded-full" | "pill" | "custom";
type AvatarStatus = "online" | "offline" | "busy" | "away";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: React.ReactNode;

  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  statusColor?: string;
  statusSize?: number;

  className?: string;
  style?: React.CSSProperties;
  border?: string;

  initialsClassName?: string; 

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

// Map Tailwind size to numeric pixels for <Image />
const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  custom: 40, // default custom size, override via className/style
};

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  rounded: "rounded",
  "rounded-full": "rounded-full",
  pill: "rounded-full px-2",
  custom: "",
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

export default function Avatar({
  src,
  alt = "Avatar",
  initials,
  icon,
  size = "md",
  shape = "rounded-full",
  status,
  statusColor,
  statusSize = 10,
  className,
  style,
  border,
  initialsClassName, // new
  onClick,
  onMouseEnter,
  onMouseLeave,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const pixelSize = SIZE_MAP[size];

  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center overflow-hidden",
        SHAPE_CLASSES[shape],
        border,
        className
      )}
      style={{
        width: pixelSize,
        height: pixelSize,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {src && !imgError ? (
        <Image
          src={src}
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          className={clsx("object-cover w-full h-full", SHAPE_CLASSES[shape])}
          onError={() => setImgError(true)}
        />
      ) : initials ? (
        <span
          className={clsx(
            "flex items-center justify-center w-full h-full bg-gray-300 text-white font-medium",
            initialsClassName // <-- Apply custom initials classes here
          )}
        >
          {initials}
        </span>
      ) : (
        icon
      )}

      {status && (
        <span
          className={clsx(
            "absolute rounded-full border-2 border-white",
            statusColor || STATUS_COLORS[status]
          )}
          style={{
            width: statusSize,
            height: statusSize,
            bottom: 0,
            right: 0,
          }}
        />
      )}
    </div>
  );
}
