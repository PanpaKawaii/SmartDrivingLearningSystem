import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import ListGridButton from '../../FlashCard/ListGridButton';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar';

import './LessonQuiz.css';

export default function LessonQuiz() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const Params = useParams();
    const questionLessonId = Params?.lessonId;
    console.log('questionLessonId', questionLessonId);

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState(QUESTIONs?.[0]?.id);
    const [myAnswers, setMyAnswers] = useState([]);
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
                const questionQuery = new URLSearchParams({
                    lessonId: String(questionLessonId),
                    page: '1',
                    pageSize: '500',
                });
                const QuestionRawResponse = await fetchData(`/questions?${questionQuery.toString()}`, token);
                const QuestionResponse = Array.isArray(QuestionRawResponse) ? QuestionRawResponse : [];
                console.log('QuestionResponse', QuestionResponse);

                const QuestionsAnswers = QuestionResponse.map((q, i) => {
                    const relatedAnswers = q.answers || q.questionAnswers || q.options || [];
                    return { ...q, answers: relatedAnswers, index: i + 1 };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                setQUESTIONs(QuestionsAnswers);
                setSelectedQuestionId(QuestionsAnswers?.[0]?.id);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [questionLessonId, refresh, user?.id, user?.token]);

    const selectedQuestion = QUESTIONs.find(q => q.id == selectedQuestionId);
    console.log('selectedQuestion', selectedQuestion);

    const index = QUESTIONs.findIndex(q => q.id == selectedQuestionId);
    const firstThreeWithIndexMiddle = QUESTIONs.slice(Math.max(0, index - 1), Math.min(QUESTIONs.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    const handleEndQuiz = () => {
        navigate('/');
    };

    const toggleAnswerInMyAnswers = (questionId, answerId) => {
        setMyAnswers(prev => {
            console.log('prev');
            const index = prev.findIndex(
                item => item.questionId == questionId
            );

            // Chưa có question → thêm mới
            if (index == -1) {
                return [
                    ...prev,
                    {
                        questionId: questionId,
                        answers: [{ answerId: answerId }]
                    }
                ];
            }

            const current = prev[index];
            const isExist = current.answers.some(
                a => a.answerId == answerId
            );
            const isMultiple = selectedQuestion?.correctAnswer > 1;
            console.log('isMultiple', isMultiple);

            // Không phải dạng multiple → thay thế luôn

            const newAnswers = isExist ?
                current.answers.filter(a => a.answerId !== answerId)
                : (isMultiple ?
                    [...current.answers, { answerId: answerId }]
                    : [{ answerId: answerId }]
                );

            // Không còn đáp án → xóa question
            if (newAnswers.length == 0) {
                return prev.filter((_, i) => i !== index);
            }

            // Update question hiện tại
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

        // Không phải đáp án được chọn → không gán class
        if (!isSelected) return '';
        if (isCorrect && isFull) return 'btn-correct';
        if (!isCorrect && isFull) return 'btn-incorrect';
        if (isCorrect && !isFull) return 'btn-correct-missing';
        if (!isCorrect && !isFull) return 'btn-incorrect-missing';

        return '';
    };

    console.log('myAnswers', myAnswers);

    if (loading) return <div><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><StarsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='lesson-quiz-container'>
            <StarsBackground />
            <div className='container'>
                <ListGridButton
                    list={QUESTIONs}
                    selectedQuestionId={selectedQuestionId}
                    setSelectedQuestionId={setSelectedQuestionId}
                    myAnswers={myAnswers}
                    column={2}
                />
                {selectedQuestion && (
                    <div className='question-card'>
                        <div className='top'>
                            <div className='text'>
                                Câu hỏi {index + 1} trong số {QUESTIONs?.length} câu hỏi
                            </div>
                            {/* <div className='bar'>
                                <div
                                    className='fill'
                                    style={{
                                        width: `${((index + 1) / QUESTIONs?.length) * 100}%`
                                    }}
                                ></div>
                            </div> */}
                            <ProgressBar current={myAnswers?.filter(q => q.answers)?.length || 0} total={QUESTIONs?.length || 1} showValue={false} height={'8px'} />
                        </div>

                        <div className='card'>
                            <div className='title'>
                                <div className='index'>Câu hỏi {selectedQuestion?.index}: </div>
                                <div className='index-content'>{selectedQuestion?.content}</div>
                            </div>
                            <div className='grid-answer'>
                                {selectedQuestion?.answers?.map((answer, aIndex) => (
                                    <button
                                        key={answer.id}
                                        className={`${getAnswerStatus(selectedQuestion, answer, myAnswers)}`}
                                        style={{ animationDelay: `${aIndex * 0.1}s` }}
                                        onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id)}
                                        disabled={myAnswers.some(a => a.questionId == selectedQuestionId)}
                                    >
                                        {aIndex + 1}. {answer.content}
                                    </button>
                                ))}
                            </div>
                            <div className={`explanation no-explanation`}>Giải thích: {selectedQuestion?.explanation || 'Không có giải thích'}</div>
                        </div>
                        <div className='btns'>
                            <button className='btn-left' onClick={() => handleMoveCard('left')}>Câu trước</button>
                            {index < QUESTIONs.length - 1 ?
                                <button className='btn-right' onClick={() => handleMoveCard('right')}>Câu sau</button>
                                :
                                <button className='btn-end' onClick={() => handleEndQuiz()}>Kết thúc</button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}