import { Link } from 'react-router-dom';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

import './Question.css';

export default function Question({
    QuestionsAnswers = [],
    selectedQuestion = {},
    myAnswers = [],
    guestSession = {},
}) {
    const { user } = useAuth();

    // const answeredQuestions = myAnswers?.filter(q => q.answers)?.length || 0;
    // console.log('answeredQuestions', answeredQuestions);
    console.log('QuestionsAnswers', QuestionsAnswers);
    console.log('guestSession', guestSession);
    console.log('myAnswers', myAnswers);

    const correctCount = QuestionsAnswers?.filter(question => {
        const correctAnswers = question.answers?.filter(a => a.isCorrect) || [];
        console.log('correctAnswers', correctAnswers);
        const isSelectedCorrect = correctAnswers.every(correct => myAnswers?.find(m => m.questionId == question.id)?.answers?.some(ans => ans?.answerId == correct.id));
        return isSelectedCorrect;
    }).length || 0;
    // console.log('correctCount', correctCount);

    return (
        <div className='question-container'>
            <div className='questions'>
                <div className='question-item'>
                    <h2><b>Câu hỏi {selectedQuestion.index}: </b>{selectedQuestion?.content}</h2>
                    <div className='answers'>
                        {selectedQuestion?.answers?.map((answer, aIndex) => (
                            <div key={answer.id} className='answer-item'>{aIndex + 1}. {answer.content}</div>
                        ))}
                    </div>
                </div>
            </div>
            <ProgressBar current={myAnswers?.filter(q => q.answers)?.length || 0} total={QuestionsAnswers?.length || 1} showValue={true} height={'20px'} />
            {guestSession && !user &&
                <>
                    <div className='overal'>
                        <div className='item count'>
                            <div className='value'>{correctCount || 0}/{QuestionsAnswers?.length || 0}</div>
                            <div>Trả lời đúng</div>
                        </div>
                        <div className='item score'>
                            <div className='value'>{guestSession?.score || 0}%</div>
                            <div>Làm bài chính xác</div>
                        </div>
                        <div className='item duration'>
                            <div className='value'>{(guestSession?.totalDuration || 0)?.toFixed(0)}s</div>
                            <div>Thời gian làm bài</div>
                        </div>
                    </div>
                    <div className='detail-exam'>
                        <div className='heading-result'>
                            <h2>Chi tiết đáp án</h2>
                            <Link to='./../..'>
                                <button className='btn'>
                                    <i className='fa-solid fa-chevron-left' />
                                    <span>Quay lại danh sách đề thi</span>
                                </button>
                            </Link>
                        </div>
                        <div className='list-question'>
                            {QuestionsAnswers?.map((question, qIndex) => {
                                const correctAnswers = question.answers?.filter(a => a.isCorrect) || [];
                                const isSelectedCorrect = correctAnswers.every(correct => myAnswers?.find(m => m.questionId == question.id)?.answers?.some(ans => ans?.answerId == correct.id));

                                return (
                                    <div
                                        key={qIndex}
                                        className={`question-item ${isSelectedCorrect ? 'correct-question' : 'incorrect-question'}`}
                                    >
                                        <h3>
                                            <span>Câu hỏi {qIndex + 1}</span>
                                            <i className={`fa-regular fa-${isSelectedCorrect ? 'check-circle' : 'xmark-circle'}`} />
                                        </h3>
                                        <p>{question.content}</p>
                                        <div className='list-answer'>
                                            {question.answers?.map((answer) => {
                                                const isSelected = guestSession?.examDetails?.some(detail => detail.answerId == answer.id);
                                                const isAnswerCorrect = answer.isCorrect;

                                                return (
                                                    <div
                                                        key={answer.id}
                                                        className={`
                                                        answer-item
                                                        ${isSelected ? 'selected' : ''}
                                                        ${isAnswerCorrect ? 'correct-answer' : ''}
                                                    `}
                                                    >
                                                        <div className='answer-content'>{answer.content}</div>
                                                        {isAnswerCorrect ?
                                                            <div className='tag-correct'>
                                                                <i className={'fa-regular fa-check-circle'} />
                                                                <span>{isSelected ? 'Trả lời chính xác' : 'Đáp án đúng'}</span>
                                                            </div>
                                                            :
                                                            (isSelected &&
                                                                <div className='tag-selected'>
                                                                    <i className={'fa-regular fa-xmark-circle'} />
                                                                    <span>Đáp án của bạn</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            }
            {/* <div className='my-answers'>
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
            </div> */}
        </div>
    )
}
