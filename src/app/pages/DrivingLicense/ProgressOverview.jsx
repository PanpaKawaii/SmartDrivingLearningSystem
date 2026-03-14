// import { BookOpen, CheckCircle2, FileText } from 'lucide-react'

import './ProgressOverview.css';

export default function ProgressOverview({
    progress,
}) {
    return (
        <div className='progress-overview-container'>
            <h3>Progress Overview</h3>
            <div className='progress-list'>
                <ProgressItem
                    icon={<i className='fa-solid fa-book-open' />}
                    title='Theory'
                    completed={progress?.theory_completed}
                    text={
                        progress?.theory_completed
                            ? 'Completed'
                            : 'Not started'
                    }
                />
                <ProgressItem
                    icon={<i className='fa-solid fa-file-lines' />}
                    title='Exam'
                    completed={progress?.exam_completed}
                    text={
                        progress?.exam_completed
                            ? `Score: ${progress.exam_score}%`
                            : 'Not started'
                    }
                />
            </div>
            {progress?.theory_completed &&
                progress?.exam_completed && (
                    <div className='lesson-complete'>
                        <div className='complete-box'>
                            <div className='complete-title'>
                                <CheckCircle2 className='icon' />
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