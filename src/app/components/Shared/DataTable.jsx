import { useState } from 'react';
import './DataTable.css';

export default function DataTable({
    title,
    subtitle,
    columns,
    data,
    actions,
    onSearch,
    pageSize = 10,
    loading = false,
    serverPagination = null,
    onPageChange,
}) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filtered = data.filter((row) =>
        columns.some((col) => {
            const val = row[col.key];
            return val && String(val).toLowerCase().includes(search.toLowerCase());
        })
    );

    const isServerPagination = Boolean(serverPagination);
    const currentPage = isServerPagination ? Number(serverPagination?.page || 1) : page;
    const currentPageSize = isServerPagination ? Number(serverPagination?.pageSize || pageSize) : pageSize;
    const totalPages = isServerPagination
        ? Number(serverPagination?.totalPages || 1)
        : Math.max(1, Math.ceil(filtered.length / currentPageSize));
    const totalCount = isServerPagination ? Number(serverPagination?.totalCount || 0) : filtered.length;

    const paged = isServerPagination
        ? data
        : filtered.slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize);

    const paginationStart = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const paginationButtons = Array.from(
        { length: Math.min(totalPages, 5) },
        (_, i) => paginationStart + i,
    );

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        setPage(1);
        if (onSearch) onSearch(val);
    };

    const goToPage = (nextPage) => {
        const clamped = Math.max(1, Math.min(totalPages, nextPage));
        if (isServerPagination) {
            if (onPageChange) onPageChange(clamped);
            return;
        }
        setPage(clamped);
    };

    return (
        <div className='ins-data-table-wrapper'>
            <div className='ins-data-table-header'>
                <div>
                    <div className='ins-data-table-title'>{title}</div>
                    {subtitle && <div className='ins-data-table-subtitle'>{subtitle}</div>}
                </div>
                <div className='ins-data-table-actions'>
                    <div className='ins-data-table-search'>
                        <i className='fa-solid fa-magnifying-glass search-icon'></i>
                        <input
                            type='text'
                            placeholder='Tìm kiếm...'
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    {actions}
                </div>
            </div>

            <table className='ins-data-table'>
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
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px', color: 'var(--ins-on-surface-variant)' }}>
                                Dang tai du lieu...
                            </td>
                        </tr>
                    ) : paged.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px', color: 'var(--ins-on-surface-variant)' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        paged.map((row, rIdx) => (
                            <tr key={rIdx}>
                                {columns.map((col, cIdx) => (
                                    <td key={cIdx}>
                                        {col.render ? col.render(row[col.key], row, rIdx, currentPage, currentPageSize) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className='ins-data-table-footer'>
                <div className='ins-data-table-info'>
                    {loading
                        ? 'Dang tai du lieu...'
                        : `Trang ${currentPage}/${totalPages}`}
                </div>
                <div className='ins-data-table-pagination'>
                    <button onClick={() => goToPage(currentPage - 1)} disabled={loading || currentPage === 1}>
                        <i className='fa-solid fa-chevron-left'></i>
                    </button>
                    {paginationButtons.map((p) => (
                        <button
                            key={p}
                            className={currentPage === p ? 'active' : ''}
                            disabled={loading}
                            onClick={() => goToPage(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={loading || currentPage === totalPages}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
