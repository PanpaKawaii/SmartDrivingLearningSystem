import './ProgressOverview.css';

export default function ProgressOverview({
    progress,
}) {
    const maxScore = progress?.[0]?.score;
    const isLocked = progress?.length == 0;
    const isPassed = maxScore >= 50;    
    return (
        <div className='progress-overview-container'>
            <h3>Progress Overview</h3>
            <div className='progress-list'>
                <ProgressItem
                    icon={<i className='fa-solid fa-book-open' />}
                    title='Theory'
                    completed={!isLocked}
                    text={
                        !isLocked
                            ? 'Completed'
                            : 'Not started'
                    }
                />
                <ProgressItem
                    icon={<i className='fa-solid fa-file-lines' />}
                    title='Exam'
                    completed={isPassed}
                    text={
                        isPassed
                            ? `Score: ${maxScore}%`
                            : 'Not started'
                    }
                />
            </div>
            {!isLocked && isPassed && (
                <div className='lesson-complete'>
                    <div className='complete-box'>
                        <div className='complete-title'>
                            <i className='fa-regular fa-check-circle' />
                            <span>Lesson Complete!</span>
                        </div>
                        <p>
                            Great job! You've completed all requirements for this lesson.
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