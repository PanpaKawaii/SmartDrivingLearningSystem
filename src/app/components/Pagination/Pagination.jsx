import { useEffect } from 'react';

import './Pagination.css';

export default function Pagination({
    currentPage = 1,
    totalPages = 0,
    onPageChange = () => { },
}) {
    useEffect(() => {
        if (currentPage > totalPages) goToLast();
    }, [totalPages]);

    const goToFirst = () => onPageChange(1);
    const goToLast = () => onPageChange(Math.max(1, totalPages));
    const goToPrev = () => onPageChange(Math.min(totalPages, (Math.max(currentPage - 1, 1))));
    const goToNext = () => onPageChange(Math.min(currentPage + 1, 1));

    // Hiển thị tối đa 3 trang
    const getPageNumbers = () => {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage === 1) return [1, 2, 3];
        if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
        return [currentPage - 1, currentPage, currentPage + 1];
    };

    return (
        <div className='pagination-container'>
            <button className='btn' onClick={goToFirst} disabled={currentPage === 1}>
                ⏮ First
            </button>
            <button className='btn' onClick={goToPrev} disabled={currentPage === 1}>
                ◀ Prev
            </button>

            {getPageNumbers().map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`btn ${num === currentPage ? 'active' : ''}`}
                >
                    {num}
                </button>
            ))}

            <button className='btn' onClick={goToNext} disabled={currentPage >= totalPages}>
                Next ▶
            </button>
            <button className='btn' onClick={goToLast} disabled={currentPage >= totalPages}>
                Last ⏭
            </button>
        </div>
    )
}
