import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { fetchData } from '../../../mocks/CallingAPI';
// import { putData } from '../../../mocks/CallingAPI';
import { lessonProgresses, questionLessons } from '../../../mocks/DataSample';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './LearningLesson.css';
import LessonContent from './LessonContent';
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
    const [exams, setExams] = useState([]);
    const [progress, setProgress] = useState(null);
    const [lessonProgressList, setLessonProgressList] = useState(lessonProgresses);

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
                // const QuestionLessonResponse = await fetchData(`lessons/${lessonId}`, token);
                const QuestionLessonResponse = questionLessons.find(ql => String (ql.id) === String(lessonId)) || questionLessons.find(ql => String (ql.questionChapterId) === String(questionChapterId));
                console.log('QuestionLessonResponse', QuestionLessonResponse);

                setThisQuestionLesson(QuestionLessonResponse);

                const currentUserId = Number(user?.id || 1);
                const currentLessonId = Number(QuestionLessonResponse?.id || lessonId);
                const currentProgress = lessonProgressList.find(
                    lp => Number(lp.userId) === currentUserId && Number(lp.questionLessonId) === currentLessonId,
                );
                setProgress({
                    lesson_progress_id: currentProgress?.id || null,
                    status: currentProgress?.status || 0,
                    theory_completed: Number(currentProgress?.status || 0) === 1,
                });
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, lessonId, questionChapterId, user?.id, lessonProgressList]);

    const markLessonContentComplete = async () => {
        const currentUserId = Number(user?.id || 1);
        const currentLessonId = Number(ThisQuestionLesson?.id || lessonId);

        // API-ready (enable when backend is available):
        // await putData(`lesson-progress/${currentLessonId}`, { status: 1 }, user?.token || '');

        setLessonProgressList(prev => {
            const existing = prev.find(
                lp => Number(lp.userId) === currentUserId && Number(lp.questionLessonId) === currentLessonId,
            );

            if (existing) {
                return prev.map(lp => (
                    Number(lp.userId) === currentUserId && Number(lp.questionLessonId) === currentLessonId
                        ? { ...lp, status: 1 }
                        : lp
                ));
            }

            return [
                ...prev,
                {
                    id: Date.now(),
                    userId: currentUserId,
                    questionLessonId: currentLessonId,
                    status: 1,
                },
            ];
        });

        setProgress(prev => ({
            ...(prev || {}),
            status: 1,
            theory_completed: true,
        }));
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
                        <LessonContent
                            lessonName={ThisQuestionLesson?.name || ''}
                            lessonContentHtml={ThisQuestionLesson?.content || ''}
                            progress={progress}
                            onMarkLessonContentComplete={markLessonContentComplete}
                        />

                        {/* Practice Exams */}
                        <PracticeExams
                            exams={[]}
                            progress={progress}
                            startExam={startExam}
                        />
                    </div>

                    {/* Progress Overview */}
                    <ProgressOverview progress={progress || {}} />
                </div>
            </div>
        </div>
    )
}