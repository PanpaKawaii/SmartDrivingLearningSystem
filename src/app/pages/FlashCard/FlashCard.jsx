import { useState } from 'react';
import FlipCard from './FlipCard';
import ListGridButton from './ListGridButton';

import './FlashCard.css';

export default function FlashCard({
    list = [],
}) {
    const [selectedQuestionId, setSelectedQuestionId] = useState(list?.[0]?.id);
    // const selectedQuestion = list.find(q => q.id === selectedQuestionId);
    // console.log('selectedQuestion', selectedQuestion);

    return (
        <div className='flash-card-container container'>
            <ListGridButton
                list={list}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
                column={4}
            />
            <FlipCard
                list={list}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
            />
        </div>
    )
}
