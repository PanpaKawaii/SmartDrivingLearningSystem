import { useState } from "react";
import "./DataTable.css";

export default function DataTable({
  title,
  subtitle,
  columns,
  data,
  actions,
  pageSize = 10,
  loading = false,
  serverPagination = null,
  onPageChange,
  contextBadge = [],
}) {
  const [page, setPage] = useState(1);

  const filtered = data;

  const isServerPagination = Boolean(serverPagination);
  const currentPage = isServerPagination
    ? Number(serverPagination?.page || 1)
    : page;
  const currentPageSize = isServerPagination
    ? Number(serverPagination?.pageSize || pageSize)
    : pageSize;
  const totalPages = isServerPagination
    ? Number(serverPagination?.totalPages || 1)
    : Math.max(1, Math.ceil(filtered.length / currentPageSize));

  const paged = isServerPagination
    ? data
    : filtered.slice(
        (currentPage - 1) * currentPageSize,
        currentPage * currentPageSize,
      );

  const paginationStart = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4),
  );
  const paginationButtons = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => paginationStart + i,
  );

  const goToPage = (nextPage) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage));
    if (isServerPagination) {
      if (onPageChange) onPageChange(clamped);
      return;
    }
    setPage(clamped);
  };


  const hasBadge = Array.isArray(contextBadge) && contextBadge.length > 0;

  return (
    <div className="ins-data-table-wrapper">
      <div className="ins-data-table-header">
        <div>
          <div className="ins-data-table-title">{title}</div>
          {subtitle && (
            <div className="ins-data-table-subtitle">{subtitle}</div>
          )}
        </div>
        <div className="ins-data-table-actions">
          {actions}
        </div>
      </div>

      {hasBadge && (
        <div className="ins-data-table-badge-row">
          <div className="ins-context-badge">
            <i className="fa-solid fa-filter" />
            Đang lọc theo:&nbsp;
            {contextBadge.map((badge, index) => (
              <button key={index} className="ins-badge-clear" onClick={badge.onClear}>
                <i className="fa-solid fa-xmark" /> {badge.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <table className="ins-data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={col.width ? { width: col.width } : {}}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="ins-data-table-state-cell"
              >
                <i
                  className="fa-solid fa-spinner fa-spin"
                  style={{ marginRight: 8 }}
                />
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : paged.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="ins-data-table-state-cell"
              >
                <i
                  className="fa-regular fa-folder-open"
                  style={{ marginRight: 8, opacity: 0.5 }}
                />
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            paged.map((row, rIdx) => (
              <tr key={rIdx}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx}>
                    {col.render
                      ? col.render(
                          row[col.key],
                          row,
                          rIdx,
                          currentPage,
                          currentPageSize,
                        )
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="ins-data-table-footer">
        <div className="ins-data-table-info">
          {loading
            ? "Dang tai du lieu..."
            : `Trang ${currentPage}/${totalPages}`}
        </div>
        <div className="ins-data-table-pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={loading || currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          {paginationButtons.map((p) => (
            <button
              key={p}
              className={currentPage === p ? "active" : ""}
              disabled={loading}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={loading || currentPage === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
