import { Link } from 'react-router-dom';
import './PracticeExams.css';

export default function PracticeExams({
    lesson = {},
    progress = [],
}) {
    const maxScore = progress?.[0]?.score;
    const isLocked = progress?.length == 0;
    const isPassed = maxScore >= 50;
    return (
        <div className='practice-exams-container'>
            <div className='header'>
                <div className='title'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-trophy' />
                    </div>
                    <div>
                        <h2>Bài kiểm tra</h2>
                        <p>Kiểm tra kiến ​​thức bạn đã học</p>
                    </div>
                </div>
            </div>
            <div className={`exam ${isLocked ? 'locked' : ''} ${isPassed ? 'passed' : ''}`}>
                <div className='glow'></div>
                <div className='exam-card'>
                    {!isLocked && (
                        <div className={`score ${isPassed ? 'score-passed' : ''}`}>
                            <i className='fa-solid fa-trophy' />
                            <span>{maxScore || 0}%</span>
                        </div>
                    )}
                    <div className='stats'>
                        <div className='stat'>
                            <i className='fa-regular fa-question-circle blue' />
                            <div>
                                <p className='label'>Câu hỏi</p>
                                <p className='value'>{lesson?.questions?.length}</p>
                            </div>
                        </div>
                        <div className='stat'>
                            <i className='fa-regular fa-clock purple' />
                            <div>
                                <p className='label'>Thời gian trung bình</p>
                                <p className='value'>~{(lesson?.questions?.length * 10 / 60 || 0)?.toFixed(0)} mins</p>
                            </div>
                        </div>
                        <div className='stat'>
                            <i className='fa-solid fa-bullseye green' />
                            <div>
                                <p className='label'>Điểm đậu</p>
                                <p className='value'>{50}%</p>
                            </div>
                        </div>
                    </div>
                    {isLocked ? (
                        <div className='locked-box'>
                            <i className='fa-solid fa-book-open' />
                            <span>Hoàn thành các phần lý thuyết để mở khóa</span>
                        </div>
                    ) : (
                        <Link to={`./quiz/${progress?.[0]?.id}`}>
                            <button className='start-button'>
                                Bắt đầu bài kiểm tra
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}