import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import ListGridButton from '../../FlashCard/ListGridButton';

import './LessonQuiz.css';

export default function LessonQuiz() {
    const { user } = useAuth();

    const Params = useParams();
    const navigate = useNavigate();

    const questionLessonId = Params?.lessonId;
    // console.log('questionLessonId', questionLessonId);
    const lessonProgressId = Params?.progressId;
    // console.log('lessonProgressId', lessonProgressId);

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
                    lessonId: questionLessonId,
                    status: 1,
                });
                const tagQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '200',
                    status: 1,
                });
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                const TagResponse = await fetchData(`Tags?${tagQuery.toString()}`, token);
                console.log('QuestionResponse', QuestionResponse);
                console.log('TagResponse', TagResponse);
                const QuestionItems = QuestionResponse?.items;
                const TagItems = TagResponse?.items;

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                        tags: TagItems.filter(t => q.questionTags?.some(qt => qt.tagId == t.id)),
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
    // console.log('selectedQuestion', selectedQuestion);

    const index = QUESTIONs.findIndex(q => q.id == selectedQuestionId);
    const firstThreeWithIndexMiddle = QUESTIONs.slice(Math.max(0, index - 1), Math.min(QUESTIONs.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    const handleEndQuiz = async () => {
        console.log('QUESTIONs', QUESTIONs);
        console.log('myAnswers', myAnswers);
        const correctCount = myAnswers?.filter(m => m.answers?.some(a => a.isCorrect == true))?.length || 0;
        console.log('correctCount:', correctCount);
        const correctPercent = Number((100 * correctCount / (QUESTIONs?.length || 1))?.toFixed(0));
        console.log('correctPercent:', correctPercent);

        const LessonProgressData = {
            questionLessonId: questionLessonId,
            score: correctPercent,
            status: 1,
        };
        console.log('LessonProgressData:', LessonProgressData);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await putData(`LessonProgresses/${lessonProgressId}`, LessonProgressData, token);
            console.log('result', result);

            navigate('./../..');
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const toggleAnswerInMyAnswers = (questionId, answerId, answerIsCorrect) => {
        setMyAnswers(prev => {
            const index = prev.findIndex(
                item => item.questionId == questionId
            );

            // Chưa có question → thêm mới
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

            // Không phải dạng multiple → thay thế luôn

            const newAnswers = isExist ?
                current.answers.filter(a => a.answerId !== answerId)
                : (isMultiple ?
                    [...current.answers, { answerId: answerId, isCorrect: answerIsCorrect }]
                    : [{ answerId: answerId, isCorrect: answerIsCorrect }]
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

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
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
                            <ProgressBar current={myAnswers?.filter(q => q.answers)?.length || 0} total={QUESTIONs?.length || 1} showValue={false} height={'8px'} />
                        </div>

                        <div className='card'>
                            <div className='title'>
                                <div className='index-tags'>
                                    <div className='index'>Câu hỏi {index + 1}: </div>
                                    <div className='tags'>
                                        {selectedQuestion?.tags?.map((tag, index) => (
                                            <div key={index} className='tag' style={{ backgroundColor: tag.colorCode || '#ccc' }}>{tag.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className='index-content'>{selectedQuestion?.content}</div>
                            </div>
                            <div className='grid-answer'>
                                {selectedQuestion?.answers?.map((answer, aIndex) => (
                                    <button
                                        key={answer.id}
                                        className={`${getAnswerStatus(selectedQuestion, answer, myAnswers)}`}
                                        style={{ animationDelay: `${aIndex * 0.1}s` }}
                                        onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id, answer.isCorrect)}
                                        disabled={myAnswers.some(a => a.questionId == selectedQuestionId)}
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