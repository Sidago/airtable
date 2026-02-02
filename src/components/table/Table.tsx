/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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

  // GROUPING
  groupBy?: keyof T | ((row: T) => string);
  collapsibleGroups?: boolean;
  renderGroupHeader?: (groupKey: string, count: number) => ReactNode;
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

  groupBy,
  collapsibleGroups = false,
  renderGroupHeader,
}: TableProps<T>) {
  // --- STATE ---
  const [colWidths, setColWidths] = useState<number[]>([]);
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setColWidths(columns.map((c) => c.width || 150));
  }, [columns]);

  // --- PAGINATION ---
  const startIndex = pagination ? (currentPage - 1) * pageSize : 0;
  const pageData = pagination
    ? data.slice(startIndex, startIndex + pageSize)
    : data;
  const totalPages = Math.ceil(data.length / pageSize);

  // --- GROUPING ---
  const groupedData = useMemo(() => {
    if (!groupBy) return null;

    const fn =
      typeof groupBy === "function"
        ? groupBy
        : (row: T) => {
            const val = row[groupBy];
            // Plain string/number
            if (typeof val === "string" || typeof val === "number")
              return String(val);
            // React element with string children
            if (React.isValidElement(val)) {
              const element = val as React.ReactElement<{
                children?: ReactNode;
              }>;
              if (typeof element.props.children === "string") {
                return element.props.children;
              }
            }
            // Fallback
            return "Others";
          };

    return data.reduce<Record<string, T[]>>((acc, row) => {
      const key = fn(row);
      acc[key] = acc[key] || [];
      acc[key].push(row);
      return acc;
    }, {});
  }, [data, groupBy]);

  const toggleGroup = useCallback((key: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // --- COLUMN RESIZE ---
  const startColResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = colWidths[index];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      setColWidths((prev) => {
        const copy = [...prev];
        copy[index] = Math.max(50, startWidth + delta);
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

  // --- ROW RESIZE ---
  const startRowResize = (globalIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startHeight = rowHeights[globalIndex] || 48;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientY - startY;
      setRowHeights((prev) => ({
        ...prev,
        [globalIndex]: Math.max(32, startHeight + delta),
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // --- SELECTION ---
  const toggleRow = (index: number) => {
    setSelectedRows((prev) => {
      const copy = new Set(prev);
      copy.has(index) ? copy.delete(index) : copy.add(index);
      return copy;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === pageData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(pageData.map((_, i) => startIndex + i)));
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="relative w-full overflow-auto max-h-[calc(100vh-160px)] scrollbar-custom">
        <table
          className={clsx("border-collapse w-max min-w-full", tableClassName)}
        >
          <thead
            className={clsx(
              stickyHeader && "sticky top-0 bg-gray-50 z-20",
              "border-b border-gray-200",
            )}
          >
            <tr>
              {selectable && (
                <th className={clsx(cellClassName, "w-12")}>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === pageData.length &&
                      pageData.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={clsx(
                    "relative font-semibold text-left group select-none",
                    cellClassName,
                    col.className,
                  )}
                  style={{ width: colWidths[i] || 150 }}
                >
                  <div className="truncate">{col.label}</div>
                  <div
                    onMouseDown={(e) => startColResize(i, e)}
                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!groupedData && pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={clsx(cellClassName, "text-center py-10")}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {groupedData
              ? Object.entries(groupedData).map(([groupKey, rows]) => {
                  const isCollapsed = collapsedGroups[groupKey];

                  return (
                    <React.Fragment key={groupKey}>
                      <tr className="bg-gray-100">
                        <td
                          colSpan={columns.length + (selectable ? 1 : 0)}
                          className="px-4 py-2 text-sm font-semibold border-b cursor-pointer"
                          onClick={() =>
                            collapsibleGroups && toggleGroup(groupKey)
                          }
                        >
                          {renderGroupHeader ? (
                            renderGroupHeader(groupKey, rows.length)
                          ) : (
                            <div className="flex items-center gap-2">
                              {collapsibleGroups && (
                                <span>{isCollapsed ? "▶" : "▼"}</span>
                              )}
                              <span>{groupKey}</span>
                              <span className="text-gray-500">
                                ({rows.length})
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>

                      {!isCollapsed &&
                        rows.map((row, rowIndex) => {
                          const globalIndex = startIndex + rowIndex;
                          const isSelected = selectedRows.has(globalIndex);

                          return (
                            <tr
                              key={globalIndex}
                              className={clsx(
                                "group hover:bg-gray-50",
                                isSelected && "bg-blue-50",
                                rowClassName,
                              )}
                              style={{
                                height: rowHeights[globalIndex] || 48,
                              }}
                              onClick={() => onRowClick?.(row, globalIndex)}
                            >
                              {selectable && (
                                <td className={cellClassName}>
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
                                  className={clsx(
                                    cellClassName,
                                    "relative truncate",
                                  )}
                                  style={{ width: colWidths[colIndex] || 150 }}
                                >
                                  {col.render
                                    ? col.render(row, globalIndex)
                                    : (row[col.key] as ReactNode)}

                                  <div
                                    onMouseDown={(e) =>
                                      startRowResize(globalIndex, e)
                                    }
                                    className="absolute bottom-0 left-0 w-full h-0.5 cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  );
                })
              : pageData.map((row, rowIndex) => {
                  const globalIndex = startIndex + rowIndex;
                  const isSelected = selectedRows.has(globalIndex);

                  return (
                    <tr
                      key={globalIndex}
                      className={clsx(
                        "group hover:bg-gray-50",
                        isSelected && "bg-blue-50",
                        rowClassName,
                      )}
                      style={{ height: rowHeights[globalIndex] || 48 }}
                      onClick={() => onRowClick?.(row, globalIndex)}
                    >
                      {selectable && (
                        <td className={cellClassName}>
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
                            className="absolute bottom-0 left-0 w-full h-0.5 cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t bg-white text-sm">
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, data.length)} of {data.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
