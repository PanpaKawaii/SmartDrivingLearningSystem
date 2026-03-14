import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { questionLessons } from '../../../mocks/DataSample';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './LearningLesson.css';
import TheorySections from './TheorySections';
import PracticeExams from './PracticeExams';
import ProgressOverview from './ProgressOverview';

export default function LicenseLessonDetail() {
    const { user } = useAuth();

    const Params = useParams();
    const questionChapterId = Params?.chapterId;
    console.log('questionChapterId', questionChapterId);
    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);

    const { licenseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [theorySections, setTheorySections] = useState([]);
    const [exams, setExams] = useState([]);
    const [progress, setProgress] = useState(null);
    const [selectedTheory, setSelectedTheory] = useState(null);

    const [ThisQuestionLesson, setThisQuestionLesson] = useState(null);
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

                const QuestionLessonResponse = questionLessons.find(ql => ql.questionChapterId == questionChapterId);
                console.log('QuestionLessonResponse', QuestionLessonResponse);

                setThisQuestionLesson(QuestionLessonResponse);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const markTheoryComplete = async () => {
        // const sessionId = getSessionId()
        // try {
        //     const { error } =
        //         await supabase
        //             .from('user_license_progress')
        //             .upsert(
        //                 {
        //                     session_id: sessionId,
        //                     lesson_id: lessonId,
        //                     theory_completed: true,
        //                     updated_at: new Date().toISOString()
        //                 },
        //                 {
        //                     onConflict: 'session_id,lesson_id'
        //                 }
        //             )
        //     if (error) throw error
        //     await loadData()
        // }
        // catch (error) {
        //     console.error('Error updating progress:', error)
        // }
    };

    const startExam = examId => {
        // navigate(`/licenses/${licenseId}/lessons/${lessonId}/exam/${examId}`)
    };

    if (loading) return <div><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><StarsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='learning-lesson-container container'>
            <StarsBackground />
            <div className='content'>
                <Link
                    to={`/driving-license/${drivingLicenseId}`}
                    className='back-button'
                    state={questionChapterId}
                >
                    <i className='fa-solid fa-arrow-left' />
                    <span>Back to Lessons</span>
                </Link>

                <div className='header'>
                    <h1>{ThisQuestionLesson?.name}</h1>
                    <p>{ThisQuestionLesson?.description}</p>
                </div>

                <div className='content-grid'>
                    <div className='main-content'>
                        {/* Theory Sections */}
                        <TheorySections
                            theorySections={''}
                            selectedTheory={''}
                            setSelectedTheory={''}
                            progress={''}
                            markTheoryComplete={''}
                        />

                        {/* Practice Exams */}
                        <PracticeExams
                            exams={[]}
                            progress={''}
                            startExam={''}
                        />
                    </div>

                    {/* Progress Overview */}
                    <ProgressOverview progress={{}} />
                </div>
            </div>
        </div>
    )
}