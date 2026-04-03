import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import { drivingLicenses as sampleDrivingLicenses, questionChapters as sampleQuestionChapters, questionLessons as sampleQuestionLessons } from '../../../../mocks/DataSample';
import { normalizeDetailResponse, normalizeListResponse } from '../../../../lib/apiResponseHelpers';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { drivingLicenses, questionChapters, questionLessons } from '../../../../mocks/DataSample';
import SelectedChapter from './SelectedChapter';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';

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
    const [dataSourceInfo, setDataSourceInfo] = useState({
        apiChapters: 0,
        sampleChapters: 0,
        apiLessons: 0,
        sampleLessons: 0,
    });
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mergeWithSource = (apiList, sampleList, idKey = 'id') => {
        const apiWithSource = apiList.map((item) => ({ ...item, dataSource: 'api' }));
        const apiIdSet = new Set(apiWithSource.map((item) => String(item?.[idKey])));
        const sampleWithSource = sampleList
            .filter((item) => !apiIdSet.has(String(item?.[idKey])))
            .map((item) => ({ ...item, dataSource: 'sample' }));
        return [...apiWithSource, ...sampleWithSource];
    };

    const [selectedChapterId, setSelectedChapterId] = useState(questionChapterId || '');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const chapterQuery = new URLSearchParams({
                //     drivingLicenseId: String(drivingLicenseId),
                //     page: '1',
                //     pageSize: '500',
                // });

                // const chapterResponse = await fetchData(`api/questionchapters?${chapterQuery.toString()}`, token);
                // const chapterList = getListFromResponse(chapterResponse);

                // const QuestionChapters = await Promise.all(chapterList.map(async (chapter) => {
                //     const lessonQuery = new URLSearchParams({
                //         questionChapterId: String(chapter.id),
                //         page: '1',
                //         pageSize: '500',
                //     });

                //     const lessonResponse = await fetchData(`api/questionlessons?${lessonQuery.toString()}`, token);
                //     const questionLessons = getListFromResponse(lessonResponse);

                //     return {
                //         ...chapter,
                //         questionLessons,
                //     };
                // }));
                // console.log('QuestionChapters', QuestionChapters);

                // const DrivingLicenseRawResponse = await fetchData(`api/drivinglicenses/${drivingLicenseId}`, token);
                // const DrivingLicenseResponse = normalizeDetailResponse(DrivingLicenseRawResponse);
                // console.log('ThisDrivingLicense', ThisDrivingLicense);

                // setQUESTIONCHAPTERs(QuestionChapters);
                // setThisDrivingLicense(DrivingLicenseResponse);





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

                setDataSourceInfo({
                    apiChapters: apiChapterList.length,
                    sampleChapters: chapterList.filter((chapter) => chapter.dataSource === 'sample').length,
                    apiLessons: apiLessonCount,
                    sampleLessons: sampleLessonCount,
                });

                if (!DrivingLicenseResponse && QuestionChapters.length === 0) {
                    setError('Error');
                }
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [drivingLicenseId, refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
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
                    <p className='data-source-note'>
                        Demo data sources - Chapters(API/DataSample): {dataSourceInfo.apiChapters}/{dataSourceInfo.sampleChapters}, Lessons(API/DataSample): {dataSourceInfo.apiLessons}/{dataSourceInfo.sampleLessons}
                    </p>
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
                                <div className={`data-source-badge-inline ${chapter.dataSource || 'api'}`}>
                                    {chapter.dataSource === 'sample' ? 'DataSample' : 'API'}
                                </div>
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