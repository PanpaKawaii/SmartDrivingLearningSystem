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
    const [selectedQuestionId, setSelectedQuestionId] = useState(QuestionsAnswers?.[0]?.id);
    const selectedQuestion = QuestionsAnswers.find(q => q.id === selectedQuestionId);
    console.log('selectedQuestion', selectedQuestion);

    const index = QuestionsAnswers.findIndex(q => q.id === selectedQuestionId);
    const firstThreeWithIndexMiddle = QuestionsAnswers.slice(Math.max(0, index - 1), Math.min(QuestionsAnswers.length, index + 2));

    const handleMoveCard = (direction) => {
        setSelectedQuestionId(direction == 'left' ? firstThreeWithIndexMiddle?.[0]?.id : firstThreeWithIndexMiddle?.[firstThreeWithIndexMiddle.length - 1]?.id);
    };

    return (
        <div className='core-learning-container container'>
            <ListGridButton
                list={QuestionsAnswers}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
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
                            <button key={answer.id} className='btn'>
                                {aIndex + 1}. {answer.content}
                            </button>
                        ))}
                    </div>
                    <div className='explanation'>Giải thích: </div>
                </div>
                <div className='btns'>
                    <button className='btn' onClick={() => handleMoveCard('left')}><i className='fa-solid fa-arrow-left'></i></button>
                    <button className='btn' onClick={() => handleMoveCard('right')}><i className='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>
        </div>
    )
}
