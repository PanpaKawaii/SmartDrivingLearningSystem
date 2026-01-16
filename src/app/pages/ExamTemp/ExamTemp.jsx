import { useState } from 'react';
import { answers, questions } from '../../../mocks/DataSample.js';
import Answer from './Answer';
import Question from './Question';

import './ExamTemp.css';

export default function ExamTemp() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);
    const [selectedQuestionId, setSelectedQuestionId] = useState(questions?.[0]?.id);

    const [myAnswers, setMyAnswers] = useState([]);
    const handleSelectAnswer = (questionId, answerId) => {
        setMyAnswers(prev => {
            const question = questions.find(q => q.id === questionId);
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
            const isSelected = current.answers.some(
                a => a.answerId === answerId
            );

            let newAnswers = [];
            if (isSelected) {
                newAnswers = current.answers.filter(
                    a => a.answerId !== answerId
                );
            } else {
                if (question?.type === 'multiple') {
                    newAnswers = [...current.answers, { answerId }];
                } else {
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

            return prev.map((item, i) =>
                i === index ? newItem : item
            );
        });
    };
    console.log('myAnswers', myAnswers);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);
    const selectedQuestion = QuestionsAnswers.find(q => q.id === selectedQuestionId);
    console.log('selectedQuestion', selectedQuestion);

    return (
        <div className='exam-temp-container'>
            <Question
                QuestionsAnswers={QuestionsAnswers}
                selectedQuestion={selectedQuestion}
                myAnswers={myAnswers}
            />
            <Answer
                QuestionsAnswers={QuestionsAnswers}
                myAnswers={myAnswers}
                setSelectedQuestionId={setSelectedQuestionId}
                selectedQuestionId={selectedQuestionId}
                handleSelectAnswer={handleSelectAnswer}
            />
        </div>
    )
}
