import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import SelectedChapter from './SelectedChapter';

import './ChapterLesson.css';

export default function ChapterLesson() {
    const { user, logout, refreshNewToken } = useAuth();

    const Params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);
    const questionChapterId = location.state;
    console.log('questionChapterId', questionChapterId);

    const [ThisDrivingLicense, setThisDrivingLicense] = useState(null);
    const [QUESTIONCHAPTERs, setQUESTIONCHAPTERs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedChapterId, setSelectedChapterId] = useState(questionChapterId || '');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || 'no-user';
            try {
                let LessonProgressResponse = [];
                const questionChapterQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    drivingLicenseId: drivingLicenseId,
                    status: 1,
                });
                const questionLessonQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ThisDrivingLicenseResponse = await fetchData(`DrivingLicenses/${drivingLicenseId}`, token);
                const QuestionChapterResponse = await fetchData(`QuestionChapters?${questionChapterQuery.toString()}`, token);
                const QuestionLessonResponse = await fetchData(`QuestionLessons?${questionLessonQuery.toString()}`, token);
                console.log('ThisDrivingLicenseResponse', ThisDrivingLicenseResponse);
                console.log('QuestionChapterResponse', QuestionChapterResponse);
                console.log('QuestionLessonResponse', QuestionLessonResponse);
                const QuestionChapterItems = QuestionChapterResponse?.items;
                const QuestionLessonItems = QuestionLessonResponse?.items;

                if (user) {
                    const lessonProgressQuery = new URLSearchParams({
                        status: 1,
                    });
                    LessonProgressResponse = await fetchData(`LessonProgresses/user/${userId}?${lessonProgressQuery}`, token);
                    console.log('LessonProgressResponse', LessonProgressResponse);
                }

                const QuestionLessons = QuestionLessonItems.map(ql => ({
                    ...ql,
                    lessonProgresses: LessonProgressResponse.filter(lp => lp.questionLessonId == ql.id),
                }));
                console.log('QuestionLessons', QuestionLessons);

                const QuestionChapters = QuestionChapterItems.map(qc => ({
                    ...qc,
                    questionLessons: QuestionLessons.filter(ql => ql.questionChapterId == qc.id),
                    drivingLicense: ThisDrivingLicenseResponse || null,
                }));
                console.log('QuestionChapters', QuestionChapters);

                setQUESTIONCHAPTERs(QuestionChapters);
                setThisDrivingLicense(ThisDrivingLicenseResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) {
                    const refreshResult = await refreshNewToken(user);
                    if (refreshResult?.message == 'Logout') {
                        logout();
                        navigate('./', { state: { openLogin: 'true' } });
                    }
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='chapter-lesson-container'>
            <div
                className='hero'
                style={{ backgroundImage: `url(${'https://media.wired.com/photos/592675f6cefba457b079a0cd/3:2/w_2560%2Cc_limit/SCG003S-FRONTTA.jpg'})` }}
            >
                <div className='overlay'></div>
                <div className='overlay-blue'></div>
                <div className='content'>
                    <Link to='/driving-license' className='back-btn'>
                        <i className='fa-solid fa-chevron-left' />
                        <span>Quay lại</span>
                    </Link>
                    <h1>{ThisDrivingLicense?.name}</h1>
                    <p>{ThisDrivingLicense?.description}</p>
                </div>
            </div>
            <div className='container'>
                <div className='section-header'>
                    <h2>Các chương của khóa học</h2>
                    <p>Hoàn thành các bài học và vượt qua các kỳ thi để tiến bộ.</p>
                </div>

                <div className='chapter-tabs'>
                    <button
                        className={`tab ${selectedChapterId == '' ? 'active' : ''}`}
                        onClick={() => setSelectedChapterId('')}
                    >
                        Tất cả các chương
                    </button>
                    {QUESTIONCHAPTERs.map((chapter, index_chapter) => {
                        const lesson = chapter.questionLessons?.length || 0;
                        const completed = chapter.questionLessons?.filter(ql => ql.lessonProgresses?.some(lp => Number(lp.score) >= 50))?.length || 0;
                        return (
                            <button
                                key={index_chapter}
                                className={`tab ${selectedChapterId == chapter.id ? 'active' : ''}`}
                                onClick={() => setSelectedChapterId(chapter.id)}
                            >
                                <div>{chapter.name}</div>
                                <div className='progress'>({completed}/{lesson})</div>
                            </button>
                        )
                    })}
                </div>

                {selectedChapterId == '' && (
                    <div className='chapter-grid'>
                        {QUESTIONCHAPTERs?.sort((a, b) => a.index - b.index)?.map((chapter, index_chapter) => {
                            const lesson = chapter.questionLessons?.length || 0;
                            const completed = chapter.questionLessons?.filter(ql => ql.lessonProgresses?.some(lp => Number(lp.score) >= 50))?.length || 0;
                            const progress = lesson > 0 ? (completed / lesson) * 100 : 0;
                            return (
                                <div
                                    key={index_chapter}
                                    className='chapter-card'
                                    style={{ animationDelay: `${index_chapter * 0.1}s` }}
                                    onClick={() => setSelectedChapterId(chapter.id)}
                                >
                                    <div className='card'>
                                        <div className='card-header'>
                                            <div className='header-detail'>
                                                <div className='icon-box'>
                                                    <i className='fa-solid fa-graduation-cap' />
                                                </div>
                                                <div className='card-title'>
                                                    <h3>{chapter.name}</h3>
                                                    <p>{lesson} lessons</p>
                                                </div>
                                            </div>
                                            <i className='fa-solid fa-chevron-right right' />
                                        </div>
                                        <div className='detail'>
                                            <div className='item'>
                                                <i className='fa-solid fa-book-open' />
                                                <span>{lesson} Lessons</span>
                                            </div>
                                            <div className='item'>
                                                <i className='fa-regular fa-check-circle' />
                                                <span>{completed} Completed</span>
                                            </div>
                                        </div>
                                        <div className='progress'>
                                            <div className='progress-label'>
                                                <span>Progress</span>
                                                <span className='value'>{(progress).toFixed(0)}%</span>
                                            </div>
                                            <div className='progress-bar'>
                                                <div
                                                    className='progress-fill'
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className='card-bottom'>
                                            <div>View lessons</div>
                                            <i className='fa-solid fa-arrow-right' />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <SelectedChapter
                    QUESTIONCHAPTERs={QUESTIONCHAPTERs}
                    selectedChapterId={selectedChapterId}
                />
            </div>
        </div>
    )
}