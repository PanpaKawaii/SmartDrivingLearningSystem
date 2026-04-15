import './ProgressOverview.css';

export default function ProgressOverview({
    progress,
}) {
    const maxScore = progress?.[0]?.score;
    const isLocked = progress?.length == 0;
    const isPassed = maxScore >= 50;    
    return (
        <div className='progress-overview-container'>
            <h3>Tổng quan tiến độ</h3>
            <div className='progress-list'>
                <ProgressItem
                    icon={<i className='fa-solid fa-book-open' />}
                    title='Lý thuyết'
                    completed={!isLocked}
                    text={
                        !isLocked
                            ? 'Hoàn thành'
                            : 'Chưa hoàn thành'
                    }
                />
                <ProgressItem
                    icon={<i className='fa-solid fa-file-lines' />}
                    title='Bài kiểm tra'
                    completed={isPassed}
                    text={
                        isPassed
                            ? `Điểm: ${maxScore}%`
                            : 'Chưa hoàn thành'
                    }
                />
            </div>
            {!isLocked && isPassed && (
                <div className='lesson-complete'>
                    <div className='complete-box'>
                        <div className='complete-title'>
                            <i className='fa-regular fa-check-circle' />
                            <span>Bài học hoàn tất!</span>
                        </div>
                        <p>
                            Tuyệt vời! Bạn đã hoàn thành tất cả các yêu cầu của bài học này.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

const ProgressItem = ({
    icon,
    title,
    text,
    completed,
}) => {
    return (
        <div className='progress-item'>
            <div className={`icon-box ${completed ? 'completed' : ''}`}>
                {icon}
            </div>
            <div className='text'>
                <p className='title'>{title}</p>
                <p className='desc'>{text}</p>
            </div>
        </div>
    )
}