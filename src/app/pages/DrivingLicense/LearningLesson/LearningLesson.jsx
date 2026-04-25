import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import LessonContent from './LessonContent';
import PracticeExams from './PracticeExams';
import ProgressOverview from './ProgressOverview';

import './LearningLesson.css';

export default function LearningLesson() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();

    const questionChapterId = Params?.chapterId;
    console.log('questionChapterId', questionChapterId);
    const drivingLicenseId = Params?.licenseId;
    console.log('drivingLicenseId', drivingLicenseId);
    const questionLessonId = Params?.lessonId;
    console.log('questionLessonId', questionLessonId);

    const [ThisQuestionLesson, setThisQuestionLesson] = useState(null);
    const [LESSONPROGRESSes, setLESSONPROGRESSes] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || 'no-user';
            try {
                let LessonProgressResponse = [];
                const questionQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                    lessonId: questionLessonId,
                    status: 1,
                });
                const ThisQuestionLessonResponse = await fetchData(`QuestionLessons/${questionLessonId}`, token);
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                console.log('ThisQuestionLessonResponse', ThisQuestionLessonResponse);
                console.log('QuestionResponse', QuestionResponse);
                const QuestionItems = QuestionResponse?.items;

                if (user) {
                    const lessonProgressQuery = new URLSearchParams({
                        status: 1,
                    });
                    LessonProgressResponse = await fetchData(`LessonProgresses/user/${userId}?${lessonProgressQuery}`, token);
                    console.log('LessonProgressResponse', LessonProgressResponse);
                }

                const QuestionLesson = {
                    ...ThisQuestionLessonResponse,
                    questions: QuestionItems,
                };
                console.log('QuestionLesson', QuestionLesson);
                setThisQuestionLesson(QuestionLesson);

                const LessonProgress = LessonProgressResponse.filter(lp => lp.questionLessonId == questionLessonId)?.sort((a, b) => (b?.score) - (a?.score));
                console.log('LessonProgress', LessonProgress);
                setLESSONPROGRESSes(LessonProgress);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
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
                    <span>Quay lại</span>
                </Link>

                <div className='lesson-header'>
                    <h1>{ThisQuestionLesson?.name}</h1>
                    <p>{ThisQuestionLesson?.description}</p>
                </div>

                <div className='content-grid'>
                    <div className='main-content'>
                        <LessonContent
                            lesson={ThisQuestionLesson}
                            progress={LESSONPROGRESSes}
                            questionLessonId={questionLessonId}
                            setRefreshParent={setRefresh}
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