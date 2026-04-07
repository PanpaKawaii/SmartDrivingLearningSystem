// import { answers, questions } from '../../../mocks/DataSample';
// import { QUIZ_DATA } from '../../../mocks/QUIZ_DATA';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ListGridButton from '../FlashCard/ListGridButton';

import './CoreLearning.css';

export default function CoreLearning() {
    const { user } = useAuth();

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
    const [myAnswers, setMyAnswers] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const questionQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                    status: 1,
                });
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                console.log('QuestionResponse', QuestionResponse);
                const QuestionItems = QuestionResponse?.items;

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                    };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                setQUESTIONs(QuestionsAnswers);
                setSelectedQuestionId(QuestionsAnswers?.[0]?.id);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    const selectedQuestion = QUESTIONs.find(q => q.id == selectedQuestionId);

    const index = QUESTIONs.findIndex(q => q.id == selectedQuestionId);
    const firstThreeWithIndexMiddle = QUESTIONs.slice(Math.max(0, index - 1), Math.min(QUESTIONs.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    const toggleAnswerInMyAnswers = (questionId, answerId, answerIsCorrect) => {
        setMyAnswers(prev => {
            const index = prev.findIndex(
                item => item.questionId == questionId
            );

            if (index == -1) {
                return [
                    ...prev,
                    {
                        questionId: questionId,
                        answers: [{ answerId: answerId, isCorrect: answerIsCorrect }]
                    }
                ];
            }

            const current = prev[index];
            const isExist = current.answers.some(
                a => a.answerId == answerId
            );
            const isMultiple = selectedQuestion?.correctAnswer > 1;

            const newAnswers = isExist ?
                current.answers.filter(a => a.answerId !== answerId)
                : (isMultiple ?
                    [...current.answers, { answerId: answerId, isCorrect: answerIsCorrect }]
                    : [{ answerId: answerId, isCorrect: answerIsCorrect }]
                );

            if (newAnswers.length == 0) {
                return prev.filter((_, i) => i !== index);
            }

            return prev.map((item, i) =>
                i == index
                    ? { ...item, answers: newAnswers }
                    : item
            );
        });
    };

    const getAnswerStatus = (question, answer, myAnswers) => {
        const userAnswer = myAnswers.find(item => item.questionId == question.id);
        const selectedAnswerIds = userAnswer?.answers.map(a => a.answerId) || [];

        const isSelected = selectedAnswerIds.includes(answer.id);
        const isCorrect = answer.isCorrect == true;
        const isFull = selectedAnswerIds.length == question.correctAnswer;

        if (!isSelected) return '';
        if (isCorrect && isFull) return 'btn-correct';
        if (!isCorrect && isFull) return 'btn-incorrect';
        if (isCorrect && !isFull) return 'btn-correct-missing';
        if (!isCorrect && !isFull) return 'btn-incorrect-missing';

        return '';
    };

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='core-learning-container'>
            <StarsBackground />
            <div className='container'>
                <ListGridButton
                    list={QUESTIONs}
                    selectedQuestionId={selectedQuestionId}
                    setSelectedQuestionId={setSelectedQuestionId}
                    myAnswers={myAnswers}
                    column={6}
                />
                {selectedQuestion && (
                    <div className='question-card'>
                        <div className='card'>
                            <div className='title'>
                                <div className='index'>Câu hỏi {index + 1}: </div>
                                <div className='index-content'>{selectedQuestion?.content}</div>
                            </div>
                            <div className='grid-answer'>
                                {selectedQuestion?.answers?.map((answer, aIndex) => (
                                    <button
                                        key={answer.id}
                                        className={`${getAnswerStatus(selectedQuestion, answer, myAnswers)}`}
                                        style={{ animationDelay: `${aIndex * 0.1}s` }}
                                        onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id, answer.isCorrect)}
                                    >
                                        {aIndex + 1}. {answer.content}
                                    </button>
                                ))}
                            </div>
                            <div className={`explanation ${selectedQuestion?.explanation ? '' : 'no-explanation'}`}>
                                {selectedQuestion?.explanation ? 'Giải thích: ' + selectedQuestion?.explanation : 'Không có giải thích'}
                            </div>
                        </div>
                        <div className='btns'>
                            <button className='btn-left' onClick={() => handleMoveCard('left')}>Câu trước</button>
                            <button className='btn-right' onClick={() => handleMoveCard('right')}>Câu sau</button>
                        </div>
                    </div>
                )}

                {/* <div>
                    {[...Array(600)].map((_, i) => (
                        <div key={i} style={{ color: '#000' }}>
                            {QUIZ_DATA[i + 1]?.answers?.map((a, j) => (
                                <div key={j}>
                                    <div>{a.correct === true ? 1 : 0}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}
