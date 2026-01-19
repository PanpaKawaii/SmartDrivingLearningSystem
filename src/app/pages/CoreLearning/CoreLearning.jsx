import { useState } from 'react';
import { answers, questions } from '../../../mocks/DataSample';
import ListGridButton from '../FlashCard/ListGridButton';

import './CoreLearning.css';

export default function CoreLearning() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);
    const [myAnswers, setMyAnswers] = useState([]);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    });
    // const QuestionsAnswers = [];
    console.log('QuestionsAnswers', QuestionsAnswers);
    const [selectedQuestionId, setSelectedQuestionId] = useState(QuestionsAnswers?.[0]?.id);
    const selectedQuestion = QuestionsAnswers.find(q => q.id === selectedQuestionId);
    console.log('selectedQuestion', selectedQuestion);

    const index = QuestionsAnswers.findIndex(q => q.id === selectedQuestionId);
    const firstThreeWithIndexMiddle = QuestionsAnswers.slice(Math.max(0, index - 1), Math.min(QuestionsAnswers.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    const toggleAnswerInMyAnswers = (questionId, answerId) => {
        setMyAnswers(prev => {
            console.log('prev');
            const index = prev.findIndex(
                item => item.questionId === questionId
            );

            // Chưa có question → thêm mới
            if (index === -1) {
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
                a => a.answerId === answerId
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
            if (newAnswers.length === 0) {
                return prev.filter((_, i) => i !== index);
            }

            // Update question hiện tại
            return prev.map((item, i) =>
                i === index
                    ? { ...item, answers: newAnswers }
                    : item
            );
        });
    };

    const getAnswerStatus = (question, answer, myAnswers) => {
        const userAnswer = myAnswers.find(item => item.questionId === question.id);
        const selectedAnswerIds = userAnswer?.answers.map(a => a.answerId) || [];

        const isSelected = selectedAnswerIds.includes(answer.id);
        const isCorrect = answer.isCorrect === true;
        const isFull = selectedAnswerIds.length === question.correctAnswer;

        // Không phải đáp án được chọn → không gán class
        if (!isSelected) return '';
        if (isCorrect && isFull) return 'btn-correct';
        if (!isCorrect && isFull) return 'btn-incorrect';
        if (isCorrect && !isFull) return 'btn-correct-missing';
        if (!isCorrect && !isFull) return 'btn-incorrect-missing';

        return '';
    };

    console.log('myAnswers', myAnswers);

    return (
        <div className='core-learning-container container'>
            <ListGridButton
                list={QuestionsAnswers}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
                myAnswers={myAnswers}
                column={6}
            />
            <div className='question-card'>
                <div className='card'>
                    <div className='title'>
                        <div className='index'>Câu hỏi {selectedQuestion?.index}: </div>
                        <div className='index-content'>{selectedQuestion?.content}</div>
                    </div>
                    <div className='grid-answer'>
                        {selectedQuestion?.answers?.map((answer, aIndex) => (
                            <button key={answer.id} className={`btn ${getAnswerStatus(selectedQuestion, answer, myAnswers)}`} onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id)}>
                                {aIndex + 1}. {answer.content}
                            </button>
                        ))}
                    </div>
                    <div className={`explanation no-explanation`}>Giải thích: {selectedQuestion?.explanation || 'Không có giải thích'}</div>
                </div>
                <div className='btns'>
                    <button className='btn' onClick={() => handleMoveCard('left')}><i className='fa-solid fa-arrow-left'></i></button>
                    <button className='btn' onClick={() => handleMoveCard('right')}><i className='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>
        </div>
    )
}
