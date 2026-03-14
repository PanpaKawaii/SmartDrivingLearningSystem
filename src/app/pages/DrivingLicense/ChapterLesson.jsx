import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateUUID } from 'three/src/math/MathUtils.js';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import SelectedChapter from './SelectedChapter';

import './ChapterLesson.css';

const listDrivingLicense = [
    {
        id: '0788adcd-48a2-4eb4-85e4-6dcf27889228', name: 'A1', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A2', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A3', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A4', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A5', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
                    { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A6', description: 'Description of A1', questionChapters: [],
    },
];

const listQuestionChapter = [
    {
        id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 9', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 10', description: 'Description of Lesson', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 7', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 8', description: 'Description of Lesson', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 5', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 6', description: 'Description of Lesson', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 2', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 3', description: 'Description of Lesson', },
            { id: generateUUID(), name: 'Lesson 4', description: 'Description of Lesson', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 5', description: 'Description of Chapter 5', questionLessons: [],
    },
];

export default function ChapterLesson() {
    const { user } = useAuth();

    const Params = useParams();
    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);

    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState(listDrivingLicense || []);
    const [QUESTIONCHAPTERs, setQUESTIONCHAPTERs] = useState(listQuestionChapter || []);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

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
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const ThisDrivingLicense = DRIVINGLICENSEs?.find(d => d.id === drivingLicenseId);
    console.log('ThisDrivingLicense', ThisDrivingLicense);

    const [selectedLessonId, setSelectedLessonId] = useState('');
    const [selectedChapterId, setSelectedChapterId] = useState('');

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
                        className={`tab ${selectedChapterId === '' ? 'active' : ''}`}
                        onClick={() => setSelectedChapterId('')}
                    >
                        All Chapters
                    </button>
                    {QUESTIONCHAPTERs.map(chapter => {
                        const lesson = chapter.questionLessons?.length || 0;
                        const completed = 0 || 0; // ==FIX==
                        return (
                            <button
                                key={chapter.name}
                                className={`tab ${selectedChapterId === chapter.id ? 'active' : ''}`}
                                onClick={() => setSelectedChapterId(chapter.id)}
                            >
                                <div>{chapter.name}</div>
                                <div className='progress'>({completed}/{lesson})</div>
                            </button>
                        )
                    })}
                </div>

                {selectedChapterId === '' && (
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