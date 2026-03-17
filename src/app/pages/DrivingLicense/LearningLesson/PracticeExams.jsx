// import { Trophy, FileText, Clock, Target, BookOpen, PlayCircle } from 'lucide-react';
// import { Button } from '../components/ui/Button';

import './PracticeExams.css';

export default function PracticeExams({
    exams = [],
    progress = '',
    startExam = '',
}) {
    // if (exams.length === 0) return null
    return (
        <div className='practice-exams-container'>
            <div className='header'>
                <div className='title'>
                    <div className='icon-box'>
                        {/* <Trophy className='icon' /> */}
                    </div>
                    <div>
                        <h2>Practice Exams</h2>
                        <p>
                            {exams.length} exam{exams.length > 1 ? 's' : ''} available
                        </p>
                    </div>
                </div>
            </div>
            <div className='exam-list'>
                {exams.map((exam, index) => {
                    const isLocked = !progress?.theory_completed
                    const isPassed =
                        progress?.exam_completed &&
                        (progress?.exam_score || 0) >= exam.passing_score
                    return (
                        <ExamCard
                            key={exam.id}
                            exam={exam}
                            index={index}
                            isLocked={isLocked}
                            isPassed={isPassed}
                            progress={progress}
                            startExam={startExam}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function ExamCard({
    exam,
    index,
    isLocked,
    isPassed,
    progress,
    startExam
}) {
    return (
        <div
            className={`exam ${isLocked ? 'locked' : ''} ${isPassed ? 'passed' : ''}`}
        >
            <div className='glow'></div>
            <div className='exam-card'>
                <div className='top'>
                    <div className='info'>
                        <div className='title-row'>
                            <div className={`number ${isPassed ? 'passed' : ''}`}>
                                {index + 1}
                            </div>
                            <h3>{exam.title}</h3>
                        </div>
                        <p className='description'>
                            {exam.description}
                        </p>
                    </div>
                    {isPassed && (
                        <div className='score'>
                            {/* <Trophy className='icon' /> */}
                            <span>{progress?.exam_score}%</span>
                        </div>
                    )}
                </div>
                <div className='stats'>
                    <div className='stat'>
                        {/* <FileText className='icon blue' /> */}
                        <div>
                            <p className='label'>Questions</p>
                            <p className='value'>{exam.question_count}</p>
                        </div>
                    </div>
                    <div className='stat'>
                        {/* <Clock className='icon purple' /> */}
                        <div>
                            <p className='label'>Duration</p>
                            <p className='value'>{exam.duration_minutes} min</p>
                        </div>
                    </div>
                    <div className='stat'>
                        {/* <Target className='icon green' /> */}
                        <div>
                            <p className='label'>Pass Score</p>
                            <p className='value'>{exam.passing_score}%</p>
                        </div>
                    </div>
                </div>
                <div className='action'>
                    {isLocked ? (
                        <div className='locked-box'>
                            {/* <BookOpen className='icon' /> */}
                            <span>
                                Complete theory sections to unlock
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={() => startExam(exam.id)}
                            variant={isPassed ? 'secondary' : 'primary'}
                            className='start-button'
                        >
                            {/* <PlayCircle className='btn-icon' /> */}
                            {progress?.exam_completed
                                ? 'Retake Exam'
                                : 'Start Exam'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}