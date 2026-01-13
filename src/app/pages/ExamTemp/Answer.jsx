import Timer from '../../components/Timer';
import './Answer.css';

export default function Answer({
    QuestionsAnswers = [],
    myAnswers = [],
    setSelectedQuestionId = () => { },
    selectedQuestionId = '',
    handleSelectAnswer = () => { },
}) {
    const isAnswerSelected = (questionId, answerId) => {
        const item = myAnswers.find(i => i.questionId === questionId);
        return item
            ? item.answers.some(a => a.answerId === answerId)
            : false;
    };

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
                                    <div key={answer.id} className={`answer-item`}>
                                        <button className={`btn ${isAnswerSelected(question.id, answer.id) ? 'selected' : ''}`} onClick={() => handleSelectAnswer(question.id, answer.id)}>{aIndex + 1}</button>
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
