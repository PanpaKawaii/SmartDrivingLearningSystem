import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../../../mocks/CallingAPI.js';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground.jsx';
import StarsBackground from '../../../../components/StarsBackground/StarsBackground.jsx';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext.jsx';
import Answer from './Answer.jsx';
import Question from './Question.jsx';

import './QuestionExam.css';

export default function QuestionExam() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const navigate = useNavigate();

    const examId = Params?.examId;
    console.log('examId', examId);

    const [ThisExam, setThisExam] = useState(null);
    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFinish, setIsFinish] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(null);

    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [myAnswers, setMyAnswers] = useState([]);
    const [guestSession, setGuestSession] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const ThisExamResponse = await fetchData(`Exams/${examId}`, token);
                console.log('ThisExamResponse', ThisExamResponse);

                const QuestionItems = ThisExamResponse.examQuestions?.map(eq => eq.question);
                console.log('QuestionItems', QuestionItems);

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                        correctAnswer: q.answers?.filter(a => a.isCorrect)?.length,
                    };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                setThisExam(ThisExamResponse);
                setQUESTIONs(QuestionsAnswers);
                setSelectedQuestionId(p => p ? p : QuestionsAnswers?.[0]?.id);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    const handleSelectAnswer = (questionId, answerId) => {
        setMyAnswers(prev => {
            const question = QUESTIONs.find(q => q.id === questionId);
            console.log('question', question);
            const index = prev.findIndex(item => item.questionId === questionId);

            if (index === -1) {
                return [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        questionId,
                        answers: [{ answerId }]
                    }
                ];
            }

            const current = prev[index];
            const isSelected = current.answers.some(a => a.answerId === answerId);

            let newAnswers = [];
            if (isSelected) {
                newAnswers = current.answers.filter(
                    a => a.answerId !== answerId
                );
            } else {
                if (question?.type === 'multiple') {
                    console.log('multiple');
                    newAnswers = [...current.answers, { answerId }];
                } else {
                    console.log('single');
                    newAnswers = [{ answerId }];
                }
            }

            if (newAnswers.length === 0) {
                return prev.filter((_, i) => i !== index);
            }

            const newItem = {
                ...current,
                answers: newAnswers
            };

            return prev.map((item, i) => i === index ? newItem : item);
        });
    };

    console.log('myAnswers', myAnswers);

    const selectedQuestion = QUESTIONs.find(q => q.id == selectedQuestionId);
    console.log('selectedQuestion', selectedQuestion);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='question-exam-container container'>
            <StarsBackground />
            <Question
                QuestionsAnswers={QUESTIONs}
                selectedQuestion={selectedQuestion}
                myAnswers={myAnswers}
                guestSession={guestSession}
            />
            <Answer
                examId={examId}
                QuestionsAnswers={QUESTIONs}
                myAnswers={myAnswers}
                setSelectedQuestionId={setSelectedQuestionId}
                selectedQuestionId={selectedQuestionId}
                handleSelectAnswer={handleSelectAnswer}
                startTime={startTime}
                endTime={endTime}
                setEndTime={setEndTime}
                duration={ThisExam?.duration}
                passScore={ThisExam?.passScore}
                isFinish={isFinish}
                setIsFinish={setIsFinish}
                setGuestSession={setGuestSession}
            />
        </div>
    )
}
