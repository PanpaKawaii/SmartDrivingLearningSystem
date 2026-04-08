import { useParams } from 'react-router-dom';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import CoreLearning from '../../TheoryLearning/CoreLearning';

import './LessonQuiz.css';

export default function LessonQuiz() {
    const Params = useParams();
    const questionLessonId = Params?.lessonId;

    const questionQuery = new URLSearchParams({
        page: '1',
        pageSize: '1000',
        lessonId: questionLessonId,
        status: 1,
    });

    return (
        <div className='lesson-quiz-container'>
            <StarsBackground />
            <CoreLearning
                grid={2}
                questionQuery={questionQuery}
                disableAfterAnswer={true}
                endQuizButton={true}
            />
            {/* <div className='container'>
                <ListGridButton
                    list={QUESTIONs}
                    mark={SavedQuestions}
                    selectedQuestionId={selectedQuestionId}
                    setSelectedQuestionId={setSelectedQuestionId}
                    myAnswers={myAnswers}
                    column={2}
                />
                {selectedQuestion && (
                    <div className='question-card'>
                        <div className='top'>
                            <div className='text'>
                                Câu hỏi {index + 1} trong số {QUESTIONs?.length} câu hỏi
                            </div>
                            <ProgressBar current={myAnswers?.filter(q => q.answers)?.length || 0} total={QUESTIONs?.length || 1} showValue={false} height={'8px'} />
                        </div>

                        <div className='card'>
                            <div className='title'>
                                <div className='index-tags'>
                                    <div className='index'>Câu hỏi {index + 1}: </div>
                                    <div className='tags'>
                                        {selectedQuestion?.tags?.map((tag, index) => (
                                            <div key={index} className='tag' style={{ backgroundColor: tag.colorCode || '#ccc' }}>{tag.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className='index-content'>{selectedQuestion?.content}</div>
                            </div>
                            <div className='grid-answer'>
                                {selectedQuestion?.answers?.map((answer, aIndex) => (
                                    <button
                                        key={answer.id}
                                        className={`${getAnswerStatus(selectedQuestion, answer, myAnswers)}`}
                                        style={{ animationDelay: `${aIndex * 0.1}s` }}
                                        onClick={() => toggleAnswerInMyAnswers(selectedQuestion?.id, answer.id, answer.isCorrect)}
                                        disabled={myAnswers.some(a => a.questionId == selectedQuestionId)}
                                    >
                                        {aIndex + 1}. {answer.content}
                                    </button>
                                ))}
                            </div>
                            <div className={`explanation ${selectedQuestion?.explanation ? '' : 'no-explanation'}`}>
                                {selectedQuestion?.explanation ? 'Giải thích: ' + selectedQuestion?.explanation : 'Không có giải thích'}
                            </div>
                        </div>
                        <div className='btns'>
                            <button className='btn-left' onClick={() => handleMoveCard('left')}>Câu trước</button>
                            {index < QUESTIONs.length - 1 ?
                                <button className='btn-right' onClick={() => handleMoveCard('right')}>Câu sau</button>
                                :
                                <button className='btn-end' onClick={() => handleEndQuiz()}>Kết thúc</button>
                            }
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    )
}