import { Link } from 'react-router-dom';
import EmptyNotification from '../../../components/EmptyNotification/EmptyNotification';

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
                    const completed = chapter.questionLessons?.filter(ql => ql.lessonProgresses?.some(lp => Number(lp.score) >= 50))?.length || 0;
                    return (
                        <div key={chapter.name} className='chapter'>
                            <div className='header'>
                                <div className='icon-box'>
                                    <i className='fa-solid fa-graduation-cap' />
                                </div>
                                <div className='chapter-info'>
                                    <h2>{chapter.name}</h2>
                                    <p>{completed} trong {lesson} đã hoàn thành</p>
                                </div>
                            </div>

                            {chapter.questionLessons.length == 0 ? (
                                <EmptyNotification
                                    name={'Không có bài học nào'}
                                    description={'Các bài học của chương này sẽ được đăng tải sớm.'}
                                />
                            ) : (
                                <div className='lesson-grid'>
                                    {chapter.questionLessons?.sort((a, b) => a.index - b.index)?.map((lesson, index_lesson) => (
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
                                                                lesson.lessonProgresses?.some(lp => Number(lp.score) >= 50)
                                                                    ? 'number completed'
                                                                    : 'number'
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
                                                                            <span>Bài học</span>
                                                                        </div>
                                                                        <div className='item'>
                                                                            <i className='fa-regular fa-file-lines' />
                                                                            <span>Bài kiểm tra</span>
                                                                        </div>
                                                                        {lesson.lessonProgresses?.[0]?.score !== undefined &&
                                                                            lesson.lessonProgresses?.[0]?.score !== null && (
                                                                                <div className='score'>
                                                                                    Score: {lesson.lessonProgresses?.[0]?.score || 0}%
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {lesson.lessonProgresses?.some(lp => Number(lp.score) >= 50) ? (
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
