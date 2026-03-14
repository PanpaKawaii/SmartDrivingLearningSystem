import { Link } from 'react-router-dom';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';

import './SelectedChapter.css';

export default function SelectedChapter({
    QUESTIONCHAPTERs = [],
    selectedChapterId = '',
}) {
    return (
        <div className='selected-chapter-container'>
            {QUESTIONCHAPTERs
                .filter(c => c.id == selectedChapterId)
                .map(chapter => {
                    const lesson = chapter.questionLessons?.length || 0;
                    const completed = 0 || 0; // ==FIX==
                    return (
                        <div key={chapter.name} className='chapter'>
                            <div className='header'>
                                <div className='icon-box'>
                                    <i className='fa-solid fa-graduation-cap' />
                                </div>
                                <div className='chapter-info'>
                                    <h2>{chapter.name}</h2>
                                    <p>{completed} of {lesson} completed</p>
                                </div>
                            </div>

                            {chapter.questionLessons.length == 0 ? (
                                <EmptyNotification
                                    name={'No Lessons Available'}
                                    description={'Lessons for this chapter are coming soon.'}
                                />
                            ) : (
                                <div className='lesson-grid'>
                                    {chapter.questionLessons?.map((lesson, index_lesson) => (
                                        <Link
                                            key={index_lesson}
                                            to={`./chapter/${selectedChapterId}/lesson/${lesson.id}`}
                                            className='lesson-link'
                                            style={{ animationDelay: `${index_lesson * 0.1}s` }}
                                        >
                                            <div className='lesson-card'>
                                                <div className='lesson-row'>
                                                    <div className='lesson-number'>
                                                        <div
                                                            className={
                                                                lesson.isCompleted
                                                                    ? 'number completed'
                                                                    : 'number' // ==FIX==
                                                            }
                                                        >
                                                            {index_lesson + 1}
                                                        </div>
                                                    </div>

                                                    <div className='lesson-content'>
                                                        <div className='lesson-header'>
                                                            <div className='lesson-text'>
                                                                <h3>{lesson.name}</h3>
                                                                <p className='description'>
                                                                    {lesson.description}
                                                                </p>
                                                                <div className='lesson-meta'>
                                                                    <div className='detail'>
                                                                        <div className='item'>
                                                                            <i className='fa-solid fa-book-open' />
                                                                            <span>Lessons</span>
                                                                        </div>
                                                                        <div className='item'>
                                                                            <i className='fa-regular fa-file-lines' />
                                                                            <span>Exam</span>
                                                                        </div>
                                                                        {lesson.exam_score !== undefined &&
                                                                            lesson.exam_score !== null && (
                                                                                <div className='score'>
                                                                                    {/* ==FIX== */}
                                                                                    Score: {lesson.exam_score || 0}%
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {lesson.isCompleted ? ( // ==FIX==
                                                                <i className='fa-regular fa-check-circle status done' />
                                                            ) : (
                                                                <i className='fa-regular fa-circle status' />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <i className='fa-solid fa-chevron-right right' />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
        </div>
    )
}
