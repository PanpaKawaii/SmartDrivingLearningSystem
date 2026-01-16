import { useState } from 'react';
import { answers, questions } from '../../../mocks/DataSample';
import ListGridButton from '../FlashCard/ListGridButton';
import './CoreLearning.css';

export default function CoreLearning() {
    const [QUESTIONs, setQUESTIONs] = useState(questions || []);
    const [ANSWERs, setANSWERs] = useState(answers || []);

    const QuestionsAnswers = QUESTIONs.map((q, i) => {
        const relatedAnswers = ANSWERs.filter(a => a.questionId === q.id);
        return { ...q, answers: relatedAnswers, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);

    return (
        <div className='core-learning'>
            <ListGridButton
                list={QuestionsAnswers}
                column={6}
            />
        </div>
    )
}
