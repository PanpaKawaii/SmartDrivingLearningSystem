import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import { normalizeDetailResponse } from '../../../../lib/apiResponseHelpers';
import { lessonProgresses } from '../../../../mocks/DataSample';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const QuestionLessonRawResponse = await fetchData(`api/questionlessons/${questionLessonId}`, token);
                const QuestionLessonResponse = normalizeDetailResponse(QuestionLessonRawResponse);

                const questionQuery = new URLSearchParams({
                    lessonId: String(questionLessonId),
                    page: '1',
                    pageSize: '500',
                });
                const QuestionResponseRaw = await fetchData(`api/questions?${questionQuery.toString()}`, token);
                const QuestionResponse = Array.isArray(QuestionResponseRaw) ? QuestionResponseRaw : [];
                console.log('QuestionResponse', QuestionResponse);
                console.log('QuestionLessonResponse', QuestionLessonResponse);
                const LessonProgressResponse = [...lessonProgresses];
                console.log('LessonProgressResponse', LessonProgressResponse);

                const QuestionLesson = QuestionLessonResponse ? {
                    ...QuestionLessonResponse,
                    questions: QuestionResponse,
                } : null;
                console.log('QuestionLesson', QuestionLesson);
                setThisQuestionLesson(QuestionLesson);

                // ==FIX==
                const userId = 1;
                const LessonProgress = LessonProgressResponse.filter(lp => lp.questionLessonId == questionLessonId && lp.userId == userId)?.sort((a, b) => (b?.score) - (a?.score));
                console.log('LessonProgress', LessonProgress);
                setLESSONPROGRESSes(LessonProgress);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, questionLessonId, questionChapterId, drivingLicenseId, user?.id]);

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