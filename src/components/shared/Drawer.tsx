"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  className?: string;
  closeOnBackdropClick?: boolean;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  direction = "right",
  width = "w-80",
  height = "h-80",
  className = "",
  closeOnBackdropClick = true,
}: DrawerProps) {
  /* ✅ SAFE: no effect, no warning */
  const [mounted] = useState(() => typeof window !== "undefined");
  const startRef = useRef<number | null>(null);

  /* ESC key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      window.dispatchEvent(new Event("drawer:closed"));
    }
  }, [isOpen]);

  /* Swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    startRef.current =
      direction === "left" || direction === "right"
        ? e.touches[0].clientX
        : e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startRef.current === null) return;

    const end =
      direction === "left" || direction === "right"
        ? e.changedTouches[0].clientX
        : e.changedTouches[0].clientY;

    const diff = end - startRef.current;

    if (
      (direction === "right" && diff > 80) ||
      (direction === "left" && diff < -80) ||
      (direction === "bottom" && diff < -80) ||
      (direction === "top" && diff > 80)
    ) {
      onClose();
    }

    startRef.current = null;
  };

  /* 🔒 Prevent hydration mismatch */
  if (!mounted) return null;

  const map = {
    left: {
      pos: "top-0 left-0 h-full",
      open: "translate-x-0",
      close: "-translate-x-full",
    },
    right: {
      pos: "top-0 right-0 h-full",
      open: "translate-x-0",
      close: "translate-x-full",
    },
    top: {
      pos: "top-0 left-0 w-full",
      open: "translate-y-0",
      close: "-translate-y-full",
    },
    bottom: {
      pos: "bottom-0 left-0 w-full",
      open: "translate-y-0",
      close: "translate-y-full",
    },
  };

  const cfg = map[direction];

  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeOnBackdropClick ? onClose : undefined}
        />
      )}

      <div
        className={`
          fixed z-50 bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${cfg.pos}
          ${isOpen ? cfg.open : cfg.close}
          ${width} ${height} ${className}
        `}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
