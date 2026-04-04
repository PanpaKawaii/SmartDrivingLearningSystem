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
    const { user } = useAuth();

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
    const [errorFunction, setErrorFunction] = useState(null);

    // ==FIX== LessonProgress
    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                const questionQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                });
                const ThisQuestionLessonResponse = await fetchData(`QuestionLessons/${questionLessonId}`, token);
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                // const LessonProgressResponse = await fetchData(`LessonProgresses/user/${userId}`, token);
                console.log('ThisQuestionLessonResponse', ThisQuestionLessonResponse);
                console.log('QuestionResponse', QuestionResponse);
                // console.log('LessonProgressResponse', LessonProgressResponse);
                const QuestionItems = QuestionResponse?.items;
                // const LessonProgressItems = LessonProgressResponse?.items;

                const QuestionLesson = {
                    ...ThisQuestionLessonResponse,
                    questions: QuestionItems.filter(q => q.questionLessonId == questionLessonId),
                };
                console.log('QuestionLesson', QuestionLesson);
                setThisQuestionLesson(QuestionLesson);

                // const LessonProgress = LessonProgressItems.filter(lp => lp.questionLessonId == questionLessonId)?.sort((a, b) => (b?.score) - (a?.score));
                // console.log('LessonProgress', LessonProgress);
                // setLESSONPROGRESSes(LessonProgress);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.id]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
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
                            lesson={ThisQuestionLesson}
                            progress={LESSONPROGRESSes}
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