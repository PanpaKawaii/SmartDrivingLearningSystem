import React from 'react';

export default function FilterBar({
    searchOptions = [],
    selectOptions = [],
    onSearch,
    onReset
}) {
    const handleSearchKeyDown = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();
        if (onSearch) {
            onSearch();
        }
    };

    return (
        <div className='ins-filter-bar' style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {searchOptions.map((opt, index) => (
                <input
                    key={index}
                    className='ins-input'
                    placeholder={opt.placeholder || 'Tìm kiếm...'}
                    value={opt.value}
                    onChange={(e) => opt.onChange(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
            ))}
            
            {selectOptions.map((opt, index) => (
                <select
                    key={index}
                    className='ins-select'
                    value={opt.value}
                    onChange={(e) => opt.onChange(e.target.value)}
                    disabled={opt.disabled}
                >
                    <option value="">{opt.placeholder || 'Tất cả'}</option>
                    {(opt.options || []).map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            ))}

            <button className='ins-btn-search' onClick={onSearch}>
                <i className="fa-solid fa-magnifying-glass"></i> Lọc
            </button>
            {onReset && (
                <button className='ins-btn-reset' title="Đặt lại bộ lọc" onClick={onReset}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            )}
        </div>
    );
}
