import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import { normalizeDetailResponse, normalizeListResponse } from '../../../../lib/apiResponseHelpers';
import { lessonProgresses, questionLessons as sampleQuestionLessons, questions as sampleQuestions } from '../../../../mocks/DataSample';
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
    const [dataSourceInfo, setDataSourceInfo] = useState({
        lesson: 'api',
        apiQuestions: 0,
        sampleQuestions: 0,
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

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                let apiLessonDetail = null;
                try {
                    const QuestionLessonRawResponse = await fetchData(`api/questionlessons/${questionLessonId}`, token);
                    apiLessonDetail = normalizeDetailResponse(QuestionLessonRawResponse);
                } catch (lessonDetailError) {
                    console.warn('Failed to fetch lesson detail from API, fallback to DataSample.', lessonDetailError);
                }

                const questionQuery = new URLSearchParams({
                    lessonId: String(questionLessonId),
                    page: '1',
                    pageSize: '500',
                });

                let apiQuestions = [];
                try {
                    const QuestionResponseRaw = await fetchData(`api/questions?${questionQuery.toString()}`, token);
                    apiQuestions = normalizeListResponse(QuestionResponseRaw);
                } catch (questionError) {
                    console.warn('Failed to fetch questions from API, fallback to DataSample.', questionError);
                }

                const sampleLesson = sampleQuestionLessons.find((lesson) => String(lesson.id) === String(questionLessonId)) || null;
                const sampleQuestionList = sampleQuestions.filter(
                    (question) => String(question.questionLessonId) === String(questionLessonId),
                );

                const mergedQuestions = mergeWithSource(apiQuestions, sampleQuestionList);
                const questionLessonDetail = apiLessonDetail
                    ? { ...apiLessonDetail, dataSource: 'api' }
                    : (sampleLesson ? { ...sampleLesson, dataSource: 'sample' } : null);

                console.log('QuestionResponse', apiQuestions);
                console.log('QuestionLessonResponse', questionLessonDetail);
                const LessonProgressResponse = [...lessonProgresses];
                console.log('LessonProgressResponse', LessonProgressResponse);

                const QuestionLesson = questionLessonDetail ? {
                    ...questionLessonDetail,
                    questions: mergedQuestions,
                } : null;
                console.log('QuestionLesson', QuestionLesson);
                setThisQuestionLesson(QuestionLesson);

                setDataSourceInfo({
                    lesson: questionLessonDetail?.dataSource || 'api',
                    apiQuestions: apiQuestions.length,
                    sampleQuestions: mergedQuestions.filter((item) => item.dataSource === 'sample').length,
                });

                if (!QuestionLesson) {
                    setError('Error');
                    return;
                }

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
                    <p className='data-source-note'>
                        Demo data sources - Lesson: {dataSourceInfo.lesson === 'sample' ? 'DataSample' : 'API'}, Questions(API/DataSample): {dataSourceInfo.apiQuestions}/{dataSourceInfo.sampleQuestions}
                    </p>
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