import { useState } from 'react';
import FlipCard from './FlipCard';
import ListGridButton from './ListGridButton';

import './FlashCard.css';

export default function FlashCard({
    list = [],
    mark = [],
}) {
    const [selectedQuestionId, setSelectedQuestionId] = useState(list?.[0]?.id);

    return (
        <div className='flash-card-container container'>
            <ListGridButton
                list={list}
                mark={mark}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
                myAnswers={[]}
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
