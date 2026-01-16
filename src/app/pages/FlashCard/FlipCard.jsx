import { useState } from 'react';
import './FlipCard.css';

export default function FlipCard({
    list = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
}) {
    const [selectedCardId, setSelectedCardId] = useState('');
    const handleSelectCardId = (cardId) => {
        setSelectedCardId(prev => {
            return prev === cardId ? '' : cardId;
        });
    };

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
        setSelectedCardId('');
    };

    const index = list.findIndex(q => q.id === selectedQuestionId);
    const firstThreeWithIndexMiddle = list.slice(Math.max(0, index - 1), Math.min(list.length, index + 2));
    // console.log('firstThreeWithIndexMiddle', firstThreeWithIndexMiddle);

    return (
        <div className='flip-card-container'>
            <button className='btn btn-left' onClick={() => handleMoveCard('left')}><i className='fa-solid fa-chevron-left'/></button>
            <div className='cards'>
                {list.map((question, qIndex) => {
                    return (qIndex <= index + 1 && qIndex >= index - 1) && (
                        <div key={question.id} className={`card ${question.id == selectedQuestionId ? 'middle' : (qIndex > index ? 'right' : 'left')}`} onClick={() => handleSelectCardId(question.id)}>
                            <div className={`face front ${question.id == selectedCardId ? 'flipped' : ''}`}>
                                <div className='content'>
                                    {question?.content}
                                </div>
                            </div>
                            <div className={`face back ${question.id == selectedCardId ? 'flipped' : ''}`}>
                                <div className='content'>
                                    {(question?.answers?.filter(a => a.isCorrect === true))?.map((answer) => (
                                        <div key={answer.id}>
                                            <div>{answer.content}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className='btn btn-right' onClick={() => handleMoveCard('right')}><i className='fa-solid fa-chevron-right'/></button>

            {/* <div>Length: {(selectedQuestion?.answers?.filter(a => a.isCorrect === true))?.length}</div>
            <div>{selectedQuestion?.answers?.[0]?.content || 'none'} - {selectedQuestion?.answers?.[0]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[1]?.content || 'none'} - {selectedQuestion?.answers?.[1]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[2]?.content || 'none'} - {selectedQuestion?.answers?.[2]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[3]?.content || 'none'} - {selectedQuestion?.answers?.[3]?.isCorrect === true ? 'true' : 'false'}</div> */}
        </div>
    )
}
