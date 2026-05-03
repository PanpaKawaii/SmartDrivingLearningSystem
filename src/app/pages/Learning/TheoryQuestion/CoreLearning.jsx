import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteData, fetchData, postData, putData } from '../../../../mocks/CallingAPI';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import ButtonList from '../../../components/ButtonList/ButtonList';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import Explanation from '../../../components/Explanation/Explanation';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import ReportModal from '../../../components/ReportModal/ReportModal';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import ListGridButton from '../../FlashCard/ListGridButton';

import './CoreLearning.css';

export default function CoreLearning({
    grid = 1,
    questionQuery = '',
    disableAfterAnswer = false,
    endQuizButton = false,
}) {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const navigate = useNavigate();

    const questionLessonId = Params?.lessonId || '';
    // console.log('questionLessonId', questionLessonId);
    const lessonProgressId = Params?.progressId || '';
    // console.log('lessonProgressId', lessonProgressId);

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [mySAVEDQUESTIONs, setMySAVEDQUESTIONs] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
    const [myAnswers, setMyAnswers] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openReport, setOpenReport] = useState(null);

    const dataRef = useRef();

    useEffect(() => {
        const shuffleArray = (arr) => {
            const newArr = [...arr];
            for (let i = newArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return newArr || [];
        };

        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || 'no-user';
            try {
                const tagQuery = new URLSearchParams({
                    status: 1,
                });
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                const TagResponse = await fetchData(`Tags/all?${tagQuery.toString()}`, token);
                console.log('QuestionResponse', QuestionResponse);
                console.log('TagResponse', TagResponse);
                const QuestionItems = QuestionResponse?.items;

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                        // answers: shuffleArray(q.answers),
                        correctAnswer: q.answers?.filter(a => a.isCorrect)?.length,
                        tags: TagResponse.filter(t => q.questionTags?.some(qt => qt.tagId == t.id)),
                    };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                setQUESTIONs(disableAfterAnswer ? shuffleArray(QuestionsAnswers) : QuestionsAnswers);

                const savedQuestionQuery = new URLSearchParams({
                    userId: userId,
                    status: 1,
                });
                const SavedQuestionResponse = await fetchData(`SavedQuestions/all?${savedQuestionQuery.toString()}`, token);
                console.log('SavedQuestionResponse', SavedQuestionResponse);
                setMySAVEDQUESTIONs(SavedQuestionResponse);

                if (user && !disableAfterAnswer) {
                    const learningProgressQuery = new URLSearchParams({
                        userId: userId,
                        status: 1,
                    });
                    const LearningProgressResponse = await fetchData(`LearningProgresses/all?${learningProgressQuery.toString()}`, token);
                    console.log('LearningProgressResponse', LearningProgressResponse);
                    setSelectedQuestionId(p => p ? p : (
                        LearningProgressResponse?.length > 0 ?
                            LearningProgressResponse?.[LearningProgressResponse?.length - 1]?.questionId
                            : QuestionsAnswers?.[0]?.id
                    ));
                } else {
                    setSelectedQuestionId(p => p ? p : QuestionsAnswers?.[0]?.id);
                }
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    useEffect(() => {
        if (user && !disableAfterAnswer) {
            dataRef.current = selectedQuestionId;
        }
    }, [selectedQuestionId]);

    useEffect(() => {
        return () => {
            console.log('RETURN');
            if (user && !disableAfterAnswer) {
                console.log('YES');
                const LearningProgressData = {
                    questionId: dataRef.current,
                };
                console.log('LearningProgressData:', LearningProgressData);
                const token = user?.token || '';
                try {
                    const result = postData('LearningProgresses', LearningProgressData, token);
                    console.log('result', result);
                } catch (error) {
                    console.error('Error', error);
                    // setError(error);
                } finally {
                    // setLoading(false);
                };
            }
        };
    }, []);

    const selectedQuestion = QUESTIONs.find(q => q.id == selectedQuestionId);
    // console.log('selectedQuestion', selectedQuestion);
    const MySavedQuestions = mySAVEDQUESTIONs.map(sq => sq.questionId);
    // console.log('MySavedQuestions', MySavedQuestions);

    const index = QUESTIONs.findIndex(q => q.id == selectedQuestionId);
    const firstThreeWithIndexMiddle = QUESTIONs.slice(Math.max(0, index - 1), Math.min(QUESTIONs.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    const handleEndQuiz = async () => {
        console.log('QUESTIONs', QUESTIONs);
        console.log('myAnswers', myAnswers);
        const correctCount = myAnswers.filter(m => m.answers?.every(a => getAnswerStatus(QUESTIONs.find(q => q.id == m.questionId), QUESTIONs.find(q => q.id == m.questionId)?.answers?.find(qa => qa.id == a.answerId), myAnswers) == 'btn-correct'))?.length || 0;
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
            if (error.status == 401) refreshNewToken(user);
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

    const ToggleMarkQuestion = async (questionId, mark) => {
        const MarkQuestionData = {
            questionId: questionId,
        };
        console.log('MarkQuestionData:', MarkQuestionData);
        console.log('mark:', mark);

        setLoading(true);
        const token = user?.token || '';
        try {
            if (mark != null) await deleteData(`SavedQuestions/${mark?.id}`, token);
            else if (mark == null) await postData('SavedQuestions', MarkQuestionData, token);

            setRefresh(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    console.log('selectedQuestion', selectedQuestion);
    console.log('myAnswers', myAnswers);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error && error.status != 401) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='core-learning-container'>
            <div className='container'>
                <ListGridButton
                    list={QUESTIONs}
                    mark={MySavedQuestions}
                    selectedQuestionId={selectedQuestionId}
                    setSelectedQuestionId={setSelectedQuestionId}
                    myAnswers={myAnswers}
                    column={grid}
                    showSaved={!disableAfterAnswer}
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
                                    <div className='left-detail'>
                                        <div className='tags'>
                                            {selectedQuestion?.tags?.map((tag, index) => (
                                                <div key={index} className='tag' style={{ backgroundColor: tag.colorCode || '#ccc' }}>{tag.name}</div>
                                            ))}
                                        </div>
                                        {user &&
                                            <ButtonList
                                                list={[
                                                    {
                                                        name: 'Báo cáo',
                                                        onToggle: () => setOpenReport({
                                                            simulationId: null,
                                                            forumPostId: null,
                                                            forumCommentId: null,
                                                            questionId: selectedQuestion?.id,
                                                            content: selectedQuestion?.content
                                                        }),
                                                        disabled: false,
                                                    },
                                                    {
                                                        name: MySavedQuestions?.includes(selectedQuestionId) ? 'Bỏ lưu' : 'Lưu',
                                                        onToggle: () => ToggleMarkQuestion(selectedQuestionId, mySAVEDQUESTIONs.find(sq => sq.questionId == selectedQuestionId) || null),
                                                        disabled: loading,
                                                    }
                                                ]}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className='index-content'>{selectedQuestion?.content}</div>
                            </div>
                            <div className='image'>
                                {selectedQuestion?.image && <img src={selectedQuestion?.image || DefaultAvatar} alt='Ảnh minh họa câu hỏi' />}
                            </div>
                            <div className='grid-answer'>
                                {selectedQuestion?.answers?.map((answer, aIndex) => (
                                    <button
                                        key={answer.id}
                                        className={`${getAnswerStatus(selectedQuestion, answer, myAnswers)}`}
                                        style={{ animationDelay: `${aIndex * 0.1}s` }}
                                        onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id, answer.isCorrect)}
                                        disabled={disableAfterAnswer && ((myAnswers.find(item => item.questionId == selectedQuestionId)?.answers.map(a => a.answerId) || []).length == selectedQuestion?.correctAnswer || myAnswers.some(m => m.answers?.find(a => a.answerId == answer.id)))}
                                    >
                                        {aIndex + 1}. {answer.content}
                                    </button>
                                ))}
                            </div>
                            {myAnswers.find(m => m.questionId == selectedQuestionId) &&
                                <Explanation
                                    questionProp={selectedQuestion?.content}
                                    answersProp={selectedQuestion?.answers}
                                    explanation={selectedQuestion?.explanation}
                                />
                            }
                        </div>
                        <div className='btns'>
                            <button className='btn-left' onClick={() => handleMoveCard('left')}>Câu trước</button>
                            {(index < QUESTIONs.length - 1 || !endQuizButton) ?
                                <button className='btn-right' onClick={() => handleMoveCard('right')}>Câu sau</button>
                                :
                                <button className='btn-end' onClick={() => handleEndQuiz()}>Kết thúc</button>
                            }
                        </div>
                    </div>
                )}
            </div>

            {openReport &&
                <PopupContainer onClose={() => setOpenReport(null)} titleName={`Báo cáo câu hỏi`} modalStyle={{}} innerStyle={{ width: 700, scrollbarWidth: 'none' }}>
                    <ReportModal data={openReport} onClose={() => setOpenReport(null)} />
                </PopupContainer>
            }
        </div>
    )
}
