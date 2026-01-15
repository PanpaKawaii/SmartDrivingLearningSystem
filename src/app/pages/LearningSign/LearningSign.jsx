import FlashCard from '../FlashCard/FlashCard';
import { questions, answers } from '../../../mocks/DataSample';

import './LearningSign.css';
import { useState } from 'react';

export default function LearningSign() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);

    return (
        <div className='learning-sign-container'>
            <FlashCard list={QuestionsAnswers} />
        </div>
    )
}
