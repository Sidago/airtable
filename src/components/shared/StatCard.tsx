"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface StatCardProps {
  label: string | ReactNode;
  count: number;
  duration?: number; // animation duration in ms
  className?: string;
  labelClassName?: string;
  countClassName?: string;
}

export default function StatCard({
  label,
  count,
  duration = 800,
  className = "bg-white border border-gray-200 shadow rounded p-4",
  labelClassName = "text-sm text-gray-500",
  countClassName = "text-2xl font-semibold text-gray-900",
}: StatCardProps) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = count;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const value = Math.floor(progress * (end - start) + start);
      setDisplayCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [count, duration]);

  return (
    <div className={className}>
      {label && typeof label === "string" ? (
        <p className={labelClassName}>{label}</p>
      ) : (
        label
      )}
      <p className={countClassName}>{displayCount}</p>
    </div>
  );
}
