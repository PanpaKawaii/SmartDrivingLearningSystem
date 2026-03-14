import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { drivingLicenses, questionChapters, questionLessons } from '../../../mocks/DataSample';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import SelectedChapter from './SelectedChapter';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';

import './ChapterLesson.css';

export default function ChapterLesson() {
    const { user } = useAuth();

    const Params = useParams();
    const location = useLocation();

    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);
    const questionChapterId = location.state;
    console.log('questionChapterId', questionChapterId);

    const [ThisDrivingLicense, setThisDrivingLicense] = useState(null);
    const [QUESTIONCHAPTERs, setQUESTIONCHAPTERs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

    const [selectedChapterId, setSelectedChapterId] = useState(questionChapterId || '');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const LicenseResponse = await getSheetData('./greenlight_data.xlsx', 'License');
                // console.log('LicenseResponse', LicenseResponse);
                // setDRIVINGLICENSEs(LicenseResponse);
                // const LicenseResponse = await fetchData('licenses', token);
                // console.log('LicenseResponse', LicenseResponse);

                const QuestionChapters = questionChapters.filter(qc => qc.drivingLicenseId == drivingLicenseId).map(qc => ({
                    ...qc,
                    questionLessons: questionLessons.filter(ql => ql.questionChapterId == qc.id),
                    drivingLicense: drivingLicenses.find(dl => dl.id == qc.drivingLicenseId) || null,
                }));
                console.log('QuestionChapters', QuestionChapters);

                const DrivingLicenseResponse = drivingLicenses?.find(d => d.id == drivingLicenseId);
                console.log('ThisDrivingLicense', ThisDrivingLicense);

                setQUESTIONCHAPTERs(QuestionChapters);
                setThisDrivingLicense(DrivingLicenseResponse);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    if (loading) return <div><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><StarsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
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
                        <div>Back to Licenses</div>
                    </Link>
                    <h1>{ThisDrivingLicense?.name}</h1>
                    <p>{ThisDrivingLicense?.description}</p>
                </div>
            </div>

            <div className='container'>
                <div className='section-header'>
                    <h2>Course Chapters</h2>
                    <p>Complete lessons and pass exams to progress</p>
                </div>

                <div className='chapter-tabs'>
                    <button
                        className={`tab ${selectedChapterId == '' ? 'active' : ''}`}
                        onClick={() => setSelectedChapterId('')}
                    >
                        All Chapters
                    </button>
                    {QUESTIONCHAPTERs.map((chapter, index_chapter) => {
                        const lesson = chapter.questionLessons?.length || 0;
                        const completed = 0 || 0; // ==FIX==
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
                        {QUESTIONCHAPTERs.map((chapter, index_chapter) => {
                            const lesson = chapter.questionLessons?.length || 0;
                            const completed = 0 || 0; // ==FIX==
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