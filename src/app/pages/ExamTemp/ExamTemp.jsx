import Answer from './Answer';
import Question from './Question';
import { questions, answers } from '../../../mocks/DataSample.js';

import './ExamTemp.css';
import { useState } from 'react';

export default function ExamTemp() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);
    const [selectedQuestionId, setSelectedQuestionId] = useState(questions?.[0]?.id);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);
    const selectedQuestion = QuestionsAnswers.find(q => q.id === selectedQuestionId);

    return (
        <div className='exam-temp-container'>
            <Question selectedQuestion={selectedQuestion} />
            <Answer QuestionsAnswers={QuestionsAnswers} setSelectedQuestionId={setSelectedQuestionId} selectedQuestionId={selectedQuestionId} />
        </div>
    )
}
