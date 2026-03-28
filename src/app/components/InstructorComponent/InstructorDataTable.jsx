import { useState } from 'react';
import './InstructorDataTable.css';

export default function InstructorDataTable({
    title, subtitle, columns, data, actions, onSearch, pageSize = 10
}) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const filtered = data.filter((row) =>
        columns.some((col) => {
            const val = row[col.key];
            return val && String(val).toLowerCase().includes(search.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        setPage(1);
        if (onSearch) onSearch(val);
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
                    {paged.length === 0 ? (
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
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className='ins-data-table-footer'>
                <div className='ins-data-table-info'>
                    Hiển thị {paged.length} trong tổng số {filtered.length} kết quả
                </div>
                <div className='ins-data-table-pagination'>
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                        <i className='fa-solid fa-chevron-left'></i>
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={page === p ? 'active' : ''}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
