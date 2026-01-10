/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode, useState, useEffect } from "react";
import clsx from "clsx";

export interface TableColumn<T = any> {
  label: string | ReactNode;
  key: keyof T;
  width?: number;
  onSort?: () => void;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  rowClassName?: string;
  cellClassName?: string;
  tableClassName?: string;
  emptyMessage?: string;
  stickyHeader?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

export default function Table<T>({
  data,
  columns,
  pagination = false,
  pageSize = 5,
  selectable = false,
  rowClassName = "",
  cellClassName = "px-4 py-2 text-sm text-left border-b border-gray-200",
  tableClassName = "min-w-full border-collapse",
  emptyMessage = "No data available",
  stickyHeader = true,
  onRowClick,
}: TableProps<T>) {
  // --- STATE ---
  // Initialize column widths from props or default
  const [colWidths, setColWidths] = useState<number[]>([]);
  
  // Use a Record for row heights to avoid "NaN" or "undefined" errors when data changes
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});
  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Sync column widths if columns prop changes
  useEffect(() => {
    setColWidths(columns.map((c) => c.width || 150));
  }, [columns]);

  // --- DATA LOGIC ---
  const startIndex = pagination ? (currentPage - 1) * pageSize : 0;
  const pageData = pagination
    ? data.slice(startIndex, startIndex + pageSize)
    : data;
  const totalPages = Math.ceil(data.length / pageSize);

  // --- COLUMN RESIZE HANDLER ---
  const startColResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = colWidths[index];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(50, startWidth + delta);
      setColWidths((prev) => {
        const copy = [...prev];
        copy[index] = newWidth;
        return copy;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // --- ROW RESIZE HANDLER ---
  const startRowResize = (globalIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    // Fallback to 48 if no custom height exists yet
    const startHeight = rowHeights[globalIndex] || 48;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientY - startY;
      const newHeight = Math.max(32, startHeight + delta);
      setRowHeights((prev) => ({
        ...prev,
        [globalIndex]: newHeight,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // --- SELECTION HELPERS ---
  const toggleRow = (index: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === pageData.length) {
      setSelectedRows(new Set());
    } else {
      const allIndexes = pageData.map((_, i) =>
        pagination ? startIndex + i : i
      );
      setSelectedRows(new Set(allIndexes));
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="relative w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-custom">
        <table className={clsx("border-collapse w-max min-w-full", tableClassName)}>
          <thead className={clsx(stickyHeader && "sticky top-0 bg-gray-50 z-20", "border-b border-gray-200")}>
            <tr>
              {selectable && (
                <th className={clsx(cellClassName, "w-12")}>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={clsx("relative font-semibold text-left group select-none", cellClassName, col.className)}
                  style={{ width: colWidths[i] || 150 }}
                >
                  <div className="truncate">{col.label}</div>
                  <div
                    onMouseDown={(e) => startColResize(i, e)}
                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {pageData.length === 0 ? (
              <tr>
                <td
                  className={clsx(cellClassName, "text-center py-10")}
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, rowIndex) => {
                const globalIndex = pagination ? startIndex + rowIndex : rowIndex;
                const isSelected = selectedRows.has(globalIndex);

                return (
                  <tr
                    key={globalIndex}
                    className={clsx(
                      "group relative transition-colors hover:bg-gray-50",
                      isSelected && "bg-blue-50",
                      rowClassName
                    )}
                    // FIX: Safe fallback to 48px to prevent NaN errors
                    style={{ height: rowHeights[globalIndex] || 48 }}
                    onClick={() => onRowClick?.(row, globalIndex)}
                  >
                    {selectable && (
                      <td className={clsx(cellClassName, "relative")}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(globalIndex)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}

                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={clsx(cellClassName, "relative truncate")}
                        style={{ width: colWidths[colIndex] || 150 }}
                      >
                        {col.render
                          ? col.render(row, globalIndex)
                          : (row[col.key] as ReactNode)}

                        <div
                          onMouseDown={(e) => startRowResize(globalIndex, e)}
                          className="absolute bottom-0 left-0 w-full h-0.5 cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        />
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 text-sm">
          <div className="text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, data.length)} of {data.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="flex items-center px-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}