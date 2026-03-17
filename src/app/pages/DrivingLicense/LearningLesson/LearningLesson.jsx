import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { fetchData } from '../../../mocks/CallingAPI';
// import { putData } from '../../../mocks/CallingAPI';
import { lessonProgresses, questionLessons, questions } from '../../../../mocks/DataSample';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import LessonContent from './LessonContent';
import PracticeExams from './PracticeExams';
import ProgressOverview from './ProgressOverview';

import './LearningLesson.css';

export default function LearningLesson() {
    const { user } = useAuth();

    const Params = useParams();
    const questionChapterId = Params?.chapterId;
    console.log('questionChapterId', questionChapterId);
    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);

    const { licenseId, lessonId } = useParams();
    const [progress, setProgress] = useState(null);
    const [lessonProgressList, setLessonProgressList] = useState(lessonProgresses);

    const [ThisQuestionLesson, setThisQuestionLesson] = useState(null);
    const [LESSONPROGRESSes, setLESSONPROGRESSes] = useState([]);
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
                const QuestionResponse = [...questions];
                console.log('QuestionResponse', QuestionResponse);
                const QuestionLessonResponse = questionLessons.find(ql => ql.id == lessonId);
                console.log('QuestionLessonResponse', QuestionLessonResponse);

                const QuestionLesson = {
                    ...QuestionLessonResponse,
                    questions: QuestionResponse.filter(q => q.questionLessonId == QuestionLessonResponse.id),
                };
                console.log('QuestionLesson', QuestionLesson);

                setThisQuestionLesson(QuestionLesson);

                // ==FIX==
                const userId = 1;
                const LessonProgressResponse = [...lessonProgresses];
                const LessonProgress = LessonProgressResponse.filter(lp => lp.questionLessonId == lessonId && lp.userId == userId)?.sort((a, b) => (b?.score) - (a?.score));
                console.log('LessonProgress', LessonProgress);
                setLESSONPROGRESSes(LessonProgress);

                // ==FIX==
                const currentUserId = Number(user?.id || 1);
                const currentLessonId = Number(QuestionLessonResponse?.id || lessonId);
                const currentProgress = lessonProgressList.find(
                    lp => Number(lp.userId) === currentUserId && Number(lp.questionLessonId) === currentLessonId,
                );
                console.log('setProgress', {
                    lesson_progress_id: currentProgress?.id || null,
                    status: currentProgress?.status || 0,
                    theory_completed: Number(currentProgress?.status || 0) === 1,
                });

                setProgress({
                    lesson_progress_id: currentProgress?.id || null,
                    status: currentProgress?.status || 0,
                    theory_completed: Number(currentProgress?.status || 0) === 1,
                });
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            };
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

                <div className='lesson-header'>
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

                        <PracticeExams
                            lesson={ThisQuestionLesson}
                            progress={LESSONPROGRESSes}
                        />
                    </div>

                    <ProgressOverview progress={LESSONPROGRESSes} />
                </div>
            </div>
        </div>
    )
}