import ProgressBar from '../../components/ProgressBar';

import './Question.css';

export default function Question({
    QuestionsAnswers = [],
    selectedQuestion = {},
    myAnswers = [],
}) {
    const answeredQuestions = myAnswers?.filter(q => q.answers)?.length || 0;
    console.log('answeredQuestions', answeredQuestions);

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
            <ProgressBar current={myAnswers?.filter(q => q.answers)?.length || 0} total={QuestionsAnswers?.length || 1} />
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
