import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateUUID } from 'three/src/math/MathUtils.js';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './LearningProgress.css';

const listDrivingLicense = [
    {
        id: generateUUID(), name: 'A1', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A2', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A3', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A4', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A5', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
    {
        id: generateUUID(), name: 'A6', description: 'Description of A1', questionChapters: [
            {
                id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                    { id: generateUUID(), name: 'Lesson 9', },
                    { id: generateUUID(), name: 'Lesson 10', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                    { id: generateUUID(), name: 'Lesson 7', },
                    { id: generateUUID(), name: 'Lesson 8', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                    { id: generateUUID(), name: 'Lesson 5', },
                    { id: generateUUID(), name: 'Lesson 6', },
                ],
            },
            {
                id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
                    { id: generateUUID(), name: 'Lesson 1', },
                    { id: generateUUID(), name: 'Lesson 2', },
                    { id: generateUUID(), name: 'Lesson 3', },
                    { id: generateUUID(), name: 'Lesson 4', },
                ],
            },
        ],
    },
];

const listQuestionChapter = [
    {
        id: generateUUID(), name: 'Chapter 1', description: 'Description of Chapter 1', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', },
            { id: generateUUID(), name: 'Lesson 2', },
            { id: generateUUID(), name: 'Lesson 3', },
            { id: generateUUID(), name: 'Lesson 4', },
            { id: generateUUID(), name: 'Lesson 5', },
            { id: generateUUID(), name: 'Lesson 6', },
            { id: generateUUID(), name: 'Lesson 7', },
            { id: generateUUID(), name: 'Lesson 8', },
            { id: generateUUID(), name: 'Lesson 9', },
            { id: generateUUID(), name: 'Lesson 10', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 2', description: 'Description of Chapter 2', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', },
            { id: generateUUID(), name: 'Lesson 2', },
            { id: generateUUID(), name: 'Lesson 3', },
            { id: generateUUID(), name: 'Lesson 4', },
            { id: generateUUID(), name: 'Lesson 5', },
            { id: generateUUID(), name: 'Lesson 6', },
            { id: generateUUID(), name: 'Lesson 7', },
            { id: generateUUID(), name: 'Lesson 8', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 3', description: 'Description of Chapter 3', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', },
            { id: generateUUID(), name: 'Lesson 2', },
            { id: generateUUID(), name: 'Lesson 3', },
            { id: generateUUID(), name: 'Lesson 4', },
            { id: generateUUID(), name: 'Lesson 5', },
            { id: generateUUID(), name: 'Lesson 6', },
        ],
    },
    {
        id: generateUUID(), name: 'Chapter 4', description: 'Description of Chapter 4', questionLessons: [
            { id: generateUUID(), name: 'Lesson 1', },
            { id: generateUUID(), name: 'Lesson 2', },
            { id: generateUUID(), name: 'Lesson 3', },
            { id: generateUUID(), name: 'Lesson 4', },
        ],
    },
];

export default function LearningProgress() {
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
                // setLICENSEs(LicenseResponse);
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

    if (loading) return <div><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><StarsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='learning-progress-container'>
            <StarsBackground />
            <div className='left'></div>
            <div className='center'>
                <div className='list-chapter'>
                    {/* {ThisDrivingLicense?.questionChapters?.map((chapter, index_chapter) => ( */}
                    {QUESTIONCHAPTERs?.map((chapter, index_chapter) => (
                        <div key={index_chapter} className='chapter-item'>
                            <div className='chapter-header'>
                                <div>{chapter.id}</div>
                                <h2>{chapter.name}</h2>
                                <div>{chapter.description}</div>
                            </div>
                            <div className='list-lesson'>
                                {chapter?.questionLessons?.map((lesson, index_lesson) => (
                                    <div key={index_lesson} className='lesson-item' onClick={() => setSelectedLessonId(p => p === lesson.id ? '' : lesson.id)}>
                                        <div>{index_lesson + 1}</div>
                                        {lesson.id === selectedLessonId &&
                                            <div className='popup-lesson'>
                                                <div className='triangle'></div>
                                                <h3 className='name'>{lesson.name}</h3>
                                                <div className='links'>
                                                    <Link to={`${lesson.id}/theory`}>
                                                        <button>THEORY</button>
                                                    </Link>
                                                    <Link to={`${chapter.id}/lesson/${lesson.id}}/list-exam`}>
                                                        <button>EXAM</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='right'></div>
        </div>
    )
}
