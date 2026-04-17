import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

import './ExamSessionDetail.css';

export default function ExamSessionDetail() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const location = useLocation();

    const examId = Params?.examId;
    console.log('examId', examId);
    const sessionId = Params?.sessionId;
    console.log('sessionId', sessionId);
    const ExamOrSituation = location.state;
    console.log('ExamOrSituation', ExamOrSituation);

    const [ThisSession, setThisSession] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                if (user) {
                    if (ExamOrSituation == 'exam') {
                        const ThisExamSessionResponse = await fetchData(`ExamSessions/${sessionId}`, token);
                        console.log('ThisExamSessionResponse', ThisExamSessionResponse);
                        setThisSession(ThisExamSessionResponse);
                    } else if (ExamOrSituation == 'situation') {
                        const ThisSimulationSessionResponse = await fetchData(`SimulationSessions/${sessionId}`, token);
                        console.log('ThisSimulationSessionResponse', ThisSimulationSessionResponse);
                        setThisSession(ThisSimulationSessionResponse);
                    }
                }
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    console.log('ThisSession', ThisSession);

    const correctCount = ThisSession?.exam?.examQuestions?.filter(examQuestion => {
        const question = examQuestion.question;
        const correctAnswers = question.answers?.filter(a => a.isCorrect) || [];
        const myAnswers = ThisSession?.examDetails;
        const isSelectedCorrect = correctAnswers.every(correct => myAnswers?.some(ans => ans.answer?.id == correct.id));
        return isSelectedCorrect;
    }).length || 0;
    console.log('correctCount', correctCount);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='exam-session-detail-container'>
            <StarsBackground />
            <HeadingComponent
                title={'CHI TIẾT BÀI THI'}
                titlePosition={'center'}
                back={'Quay lại'}
            />
            <div className='container'>
                <div className='overal'>
                    <div className='item count'>
                        <div className='value'>{correctCount || 0}/{ThisSession?.exam?.examQuestions?.length || 0}</div>
                        <div>Trả lời đúng</div>
                    </div>
                    <div className='item score'>
                        <div className='value'>{ThisSession?.score || 0}%</div>
                        <div>Làm bài chính xác</div>
                    </div>
                    <div className='item duration'>
                        <div className='value'>{(ThisSession?.totalDuration || 0)?.toFixed(0)}s</div>
                        <div>Thời gian làm bài</div>
                    </div>
                </div>
                <div className='detail'>
                    <h2>Chi tiết đáp án</h2>
                    <div className='list-question'>
                        {ThisSession?.exam?.examQuestions?.map((examQuestion, qIndex) => {
                            const question = examQuestion.question;

                            const correctAnswers = question.answers?.filter(a => a.isCorrect) || [];
                            const myAnswers = ThisSession?.examDetails;
                            const isSelectedCorrect = correctAnswers.every(correct => myAnswers?.some(ans => ans.answer?.id == correct.id));

                            return (
                                <div
                                    key={qIndex}
                                    className={`question-item ${isSelectedCorrect ? 'correct-question' : 'incorrect-question'}`}
                                >
                                    <h3>
                                        <span>Câu hỏi {qIndex + 1}</span>
                                        <i className={`fa-regular fa-${isSelectedCorrect ? 'check-circle' : 'xmark-circle'}`} />
                                    </h3>
                                    <p>{question.content}</p>
                                    <div className='list-answer'>
                                        {question.answers?.map((answer) => {
                                            const isSelected = ThisSession?.examDetails?.some(detail => detail.answerId == answer.id);
                                            const isAnswerCorrect = answer.isCorrect;

                                            return (
                                                <div
                                                    key={answer.id}
                                                    className={`
                                                    answer-item
                                                    ${isSelected ? 'selected' : ''}
                                                    ${isAnswerCorrect ? 'correct-answer' : ''}
                                                `}
                                                >
                                                    <div>{answer.content}</div>
                                                    {isAnswerCorrect ?
                                                        <div className='tag-correct'>
                                                            <i className={'fa-regular fa-check-circle'} />
                                                            <span>{isSelected ? 'Trả lời chính xác' : 'Đáp án đúng'}</span>
                                                        </div>
                                                        :
                                                        (isSelected &&
                                                            <div className='tag-selected'>
                                                                <i className={'fa-regular fa-xmark-circle'} />
                                                                <span>Đáp án của bạn</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
