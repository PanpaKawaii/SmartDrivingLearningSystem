import { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import './Question.css';

export default function Question({
    selectedQuestion = {},
    myAnswers = [],
}) {
    const [count, setCount] = useState(0);

    return (
        <div className='question-container'>
            <div className='questions'>
                <div className='question-item'>
                    <div className='index'><b>Câu hỏi {selectedQuestion.index}: </b>{selectedQuestion?.content}</div>
                    <div className='answers'>
                        {selectedQuestion?.answers?.map((answer, aIndex) => (
                            <div key={answer.id} className='answer-item'>
                                <div>{aIndex + 1}. {answer.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProgressBar current={count} total={15} />
            <button onClick={() => setCount(p => p + 1)}>UP</button>
            <button onClick={() => setCount(p => p - 1)}>DOWN</button>

            <div className='my-answers'>
                {myAnswers.map((question, qIndex) => (
                    <div key={question.id} className='question-item'>
                        <div>QID: {question.questionId}</div>
                        <div className='answers'>
                            {question.answers?.map((a, aIndex) => (
                                <div key={a.answerId} className='answer-item'>
                                    <div>---AID: {a.answerId}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
