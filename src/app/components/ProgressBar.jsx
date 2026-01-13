import { useMemo } from 'react';
import './ProgressBar.css';

export default function ProgressBar({
    current,
    total,
}) {
    const percent = useMemo(() => {
        if (total === 0) return 0;
        return Math.min(100, Math.max(0, Math.round((current / total) * 100))) || 0;
    }, [current, total]);

    return (
        <div className='progress-bar-container'>
            <div className='bar'>
                <div
                    className='fill'
                    style={{
                        width: `${percent}%`,
                        backgroundColor: `hsl(${percent}, ${100 - ((100 - 77) * percent / 100)}%, ${65 - ((65 - 44) * percent / 100)}%)`
                    }}
                >
                </div>
                <div
                    className='lost'
                    style={{
                        width: `${100 - percent}%`
                    }}
                >
                </div>
                <div
                    className='light'
                    style={{ left: `${percent}%` }}
                />
                <div className='label'>{percent}%</div>
            </div>
        </div>
    )
}
