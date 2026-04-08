import { useMemo } from 'react';

import './ProgressBar.css';

export default function ProgressBar({
    current,
    total,
    showValue = false,
    height = '20px',
}) {
    const percent = useMemo(() => {
        if (total === 0) return 0;
        return Math.min(100, Math.max(0, Math.round((current / total) * 100))) || 0;
    }, [current, total]);

    return (
        <div className='progress-bar-container'>
            <div className='bar' style={{ height: height }}>
                <div className='fill' style={{ width: `${percent}%` }} />
                <div className='lost' style={{ width: `${100 - percent}%` }} />
                <div className='light' style={{ left: `${percent}%` }} />
                {showValue && <div className='label'>{percent}%</div>}
            </div>
        </div>
    )
}
