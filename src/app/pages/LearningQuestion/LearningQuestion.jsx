import { useState } from 'react';
import { answers, questions } from '../../../mocks/DataSample';
import FlashCard from '../FlashCard/FlashCard';

import './LearningQuestion.css';

export default function LearningQuestion() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);

    return (
        <div className='learning-question-container'>
            <FlashCard list={QuestionsAnswers} />
        </div>
    )
}
