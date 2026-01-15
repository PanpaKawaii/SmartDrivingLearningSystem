import { useState } from 'react';
import './FlipCard.css';

export default function FlipCard({
    list = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
    selectedQuestion = {},
}) {
    const [selectedCardId, setSelectedCardId] = useState('');
    const handleSelectCardId = (cardId) => {
        setSelectedCardId(prev => {
            return prev === cardId ? '' : cardId;
        });
    };
    const index = list.findIndex(q => q.id === selectedQuestionId);
    const firstThreeWithIndexMiddle = list.slice(Math.max(0, index - 1), Math.min(list.length, index + 2));
    // console.log('firstThreeWithIndexMiddle', firstThreeWithIndexMiddle);

    return (
        <div className='flip-card-container'>
            {/* <button className='btn' onClick={() => setIndex(p => Math.max(0, p - 1))}>LEFT</button> */}
            <button className='btn' onClick={() => setSelectedQuestionId(firstThreeWithIndexMiddle?.[0]?.id)}>LEFT</button>
            {/* {firstThreeWithIndexMiddle.map((question, qIndex) => ( */}
            {/* <div className={`card`} onClick={() => handleSelectCardId(selectedQuestionId)}>
                <div className={`face front ${selectedQuestionId == selectedCardId ? 'flipped' : ''}`}>
                    <div className='content'>
                        {selectedQuestion?.content}
                    </div>
                </div>
                <div className={`face back ${selectedQuestionId == selectedCardId ? 'flipped' : ''}`}>
                    <div className='content'>
                        {(selectedQuestion?.answers?.filter(a => a.isCorrect === true))?.map((answer) => (
                            <div key={answer.id}>
                                <div>{answer.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* ))} */}

            {list.map((question, qIndex) => (
                <div key={question.id} className={`card ${question.id == selectedQuestionId ? 'middle' : (qIndex > index ? 'right' : 'left')}`} onClick={() => handleSelectCardId(question.id)}>
                    <div className={`face front ${selectedQuestionId == selectedCardId ? 'flipped' : ''}`}>
                        <div className='content'>
                            {question?.content}
                        </div>
                    </div>
                    <div className={`face back ${selectedQuestionId == selectedCardId ? 'flipped' : ''}`}>
                        <div className='content'>
                            {(question?.answers?.filter(a => a.isCorrect === true))?.map((answer) => (
                                <div key={answer.id}>
                                    <div>{answer.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            {/* <button className='btn' onClick={() => setIndex(p => Math.min(list.length - 1, p + 1))}>RIGHT</button> */}
            <button className='btn' onClick={() => setSelectedQuestionId(firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id)}>RIGHT</button>

            {/* <div>Length: {(selectedQuestion?.answers?.filter(a => a.isCorrect === true))?.length}</div>
            <div>{selectedQuestion?.answers?.[0]?.content || 'none'} - {selectedQuestion?.answers?.[0]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[1]?.content || 'none'} - {selectedQuestion?.answers?.[1]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[2]?.content || 'none'} - {selectedQuestion?.answers?.[2]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[3]?.content || 'none'} - {selectedQuestion?.answers?.[3]?.isCorrect === true ? 'true' : 'false'}</div> */}
        </div>
    )
}
