import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import './Question.css';

export default function Question({
    selectedQuestion = {},
}) {
    const [count, setCount] = useState(0);

    return (
        <div className='question-container'>
            <div className='questions'>
                <div className='question-item'>
                    <div className='index'><b>Câu hỏi {selectedQuestion.index}: </b>{selectedQuestion?.content}</div>
                    <div className='answers'>
                        {selectedQuestion?.answers?.map((answer, qIndex) => (
                            <div key={answer.id} className='answer-item'>
                                {qIndex + 1}. {answer.content}
                                {/* <div className='content'>{qIndex + 1}. {answer.content}</div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProgressBar current={count} total={15} />
            <button onClick={() => setCount(p => p + 1)}>UP</button>
            <button onClick={() => setCount(p => p - 1)}>DOWN</button>
        </div>
    )
}
