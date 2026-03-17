// import { Trophy, FileText, Clock, Target, BookOpen, PlayCircle } from 'lucide-react';
// import { Button } from '../components/ui/Button';

import './PracticeExams.css';

export default function PracticeExams({
    lesson = {},
    progress = false,
}) {
    // ==FIX==
    const isLocked = progress;
    const isPassed = progress;
    return (
        <div className='practice-exams-container'>
            <div className='header'>
                <div className='title'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-trophy' />
                    </div>
                    <div>
                        <h2>Practice Exams</h2>
                        <p>Test your learned knowledge</p>
                    </div>
                </div>
            </div>
            <div className={`exam ${isLocked ? 'locked' : ''} ${isPassed ? 'passed' : ''}`}>
                <div className='glow'></div>
                <div className='exam-card'>
                    {isPassed && (
                        <div className='score'>
                            {/* ==FIX== */}
                            <i className='fa-solid fa-trophy' />
                            <span>{0}%</span>
                        </div>
                    )}
                    <div className='stats'>
                        <div className='stat'>
                            <i className='fa-regular fa-question-circle blue' />
                            <div>
                                <p className='label'>Questions</p>
                                <p className='value'>{lesson?.questions?.length}</p>
                            </div>
                        </div>
                        <div className='stat'>
                            <i className='fa-regular fa-clock purple' />
                            <div>
                                <p className='label'>Average duration</p>
                                <p className='value'>~{(lesson?.questions?.length * 10 / 60 || 0)?.toFixed(0)} mins</p>
                            </div>
                        </div>
                        {/* ==FIX== */}
                        <div className='stat'>
                            <i className='fa-solid fa-bullseye green' />
                            <div>
                                <p className='label'>Pass Score</p>
                                <p className='value'>{80}%</p>
                            </div>
                        </div>
                    </div>
                    {isLocked ? (
                        <div className='locked-box'>
                            <i className='fa-solid fa-book-open' />
                            <span>
                                Complete theory sections to unlock
                            </span>
                        </div>
                    ) : (
                        <button
                            variant={isPassed ? 'secondary' : 'primary'}
                            className='start-button'
                        >
                            {/* <PlayCircle className='btn-icon' /> */}
                            {progress
                                ? 'Retake Exam'
                                : 'Start Exam'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}