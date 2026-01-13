import Timer from '../../components/Timer';
import './Answer.css';

export default function Answer({
    QuestionsAnswers = [],
    setSelectedQuestionId = () => { },
    selectedQuestionId = '',
}) {
    return (
        <div className='answer-container'>
            <div className='content'>
                <div className='time'>
                    <div className='title'>THỜI GIAN THI CÒN LẠI:</div>
                    <Timer
                        initialTime={108}
                        // showStartButton={true}
                        // showPauseButton={true}
                        // showRestartButton={true}
                        onFinish={() => console.log('Hết giờ!')}
                        timelines={[
                            { time: 10, action: () => console.log('Còn 10 giây!'), },
                            { time: 5, action: () => console.log('Sắp hết giờ!'), },
                        ]}
                        color={'#007bff'}
                    />
                </div>

                <div className='questions'>
                    {QuestionsAnswers.map((question, qIndex) => (
                        <div key={question.id} className={`question-item ${selectedQuestionId === question.id ? 'selected' : ''}`} onClick={() => setSelectedQuestionId(question.id)}>
                            <div className='index'>{qIndex + 1}</div>
                            <div className='answers'>
                                {question.answers?.map((answer, aIndex) => (
                                    <div key={answer.id} className='answer-item'>
                                        <button className={`btn ${false ? 'btn-yellow' : ''}`}>{aIndex + 1}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className='btn btn-end'>KẾT THÚC</button>
            </div>
        </div>
    )
}
