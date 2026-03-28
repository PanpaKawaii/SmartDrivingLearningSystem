import './InstructorStatsCard.css';

export default function InstructorStatsCard({ icon, iconColor = 'blue', value, label, trend, trendDir }) {
    return (
        <div className='ins-stats-card'>
            <div className='stats-card-header'>
                <div className={`stats-card-icon ${iconColor}`}>
                    <i className={icon}></i>
                </div>
                {trend && (
                    <span className={`stats-card-trend ${trendDir || 'up'}`}>
                        <i className={`fa-solid fa-arrow-${trendDir === 'down' ? 'down' : 'up'}`}></i>
                        {trend}
                    </span>
                )}
            </div>
            <div className='stats-card-value'>{value}</div>
            <div className='stats-card-label'>{label}</div>
        </div>
    );
}
