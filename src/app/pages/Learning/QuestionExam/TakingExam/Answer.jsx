import { useState } from 'react';
import Timer from '../../../../components/Timer/Timer';

import './Answer.css';

export default function Answer({
    examId = '',
    QuestionsAnswers = [],
    myAnswers = [],
    setSelectedQuestionId = () => { },
    selectedQuestionId = '',
    handleSelectAnswer = () => { },
    duration = 5,
    passScore = 0,
}) {
    const [isFinish, setIsFinish] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [result, setResult] = useState({
        correctCount: 0,
        totalCount: 0,
        skippedCount: 0,
        details: [],
    })
    const isAnswerSelected = (questionId, answerId) => {
        const item = myAnswers.find(i => i.questionId === questionId);
        return item
            ? item.answers.some(a => a.answerId === answerId)
            : false;
    };

    const getQuestionAnswerStatus = (questionId) => {
        const question = QuestionsAnswers.find(q => q.id === questionId);
        const item = myAnswers.find(a => a.questionId === questionId);

        if (!item) {
            // Chưa trả lời
            return '';
        } else if (item.answers?.length !== (Number(question.correctAnswer))) {
            // Trả lời chưa đủ
            return 'none';
        } else if (item?.answers?.length == (Number(question.correctAnswer))) {
            // Trả lời đủ
            return 'full';
        }

        return 'answered';
    };

    const checkAnswersResult = (questionsAnswers, myAnswers) => {
        let correctCount = 0;
        let skippedCount = 0;

        const details = [];

        questionsAnswers.forEach(question => {
            const userAnswer = myAnswers.find(
                a => a.questionId === question.id
            );
            // console.log('userAnswer', userAnswer);

            const correctAnswers = question.answers.filter(
                a => a.isCorrect
            );
            // console.log('correctAnswers', correctAnswers);

            // Không chọn đáp án nào hoặc chọn chưa đủ
            if (!userAnswer || userAnswer.answers?.length !== correctAnswers?.length) {
                skippedCount++;
                return;
            }

            const selectedAnswerIds = userAnswer?.answers?.map(a => a.answerId);

            const correctAnswerIds = correctAnswers.map(a => a.id);

            // So sánh đúng / sai (phải khớp hoàn toàn)
            const isCorrect =
                selectedAnswerIds?.length === correctAnswerIds?.length &&
                selectedAnswerIds?.every(id => correctAnswerIds?.includes(id));
            // console.log('isCorrect', isCorrect);

            if (isCorrect) {
                correctCount++;
            }

            // console.log('correctAnswers', correctAnswers);
            // console.log('question.answers', question.answers);
            // Ghi chi tiết
            correctAnswers.forEach(correct => {
                const selected = question.answers.find(a =>
                    selectedAnswerIds?.includes(a.id)
                );
                // console.log('correct', correct);
                // console.log('selected', selected);

                details.push({
                    questionId: question.id,
                    questionContent: question.content,

                    answerId: correct.id,
                    answerContent: correct.content,

                    selectedAnswerId: selected?.id || null,
                    selectedAnswerContent: selected?.content || null
                });
            });
        });

        setResult({
            correctCount: correctCount,
            totalCount: questionsAnswers?.length || 0,
            skippedCount: skippedCount,
            details: details,
        });

        const resultFlat = myAnswers.flatMap(item =>
            item.answers.map(ans => ({
                answerId: ans.answerId,
            }))
        );
        console.log('resultFlat', resultFlat);
        const score = Number(((100 * correctCount / (QuestionsAnswers?.length || 1)) || 0)?.toFixed(0) || 0);
        console.log('score', score);

        const ExamSessionData = {
            examId: examId,
            score: score,
            totalDuration: Math.max(0, Math.min(duration, (new Date() - startTime) / 1000)),
            isPass: score >= passScore,
            examDetails: resultFlat,
        };
        console.log('ExamSessionData:', ExamSessionData);
    };

    // console.log('result', result);
    console.log('myAnswers', myAnswers);
    // console.log('startTime', startTime);

    return (
        <div className='answer-container'>
            <div className='content'>
                <div className='time'>
                    <h2>THỜI GIAN THI CÒN LẠI:</h2>
                    <Timer
                        initialTime={duration}
                        // showStartButton={true}
                        // showPauseButton={true}
                        // showRestartButton={true}
                        continueRunning={!isFinish}
                        onFinish={() => checkAnswersResult(QuestionsAnswers, myAnswers)}
                        timelines={[
                            { time: 10, action: () => console.log('Còn 10 giây!'), },
                            { time: 5, action: () => console.log('Sắp hết giờ!'), },
                        ]}
                        color={['#3b82f6', '#ef4444']}
                    />
                </div>

                <div className='questions'>
                    {QuestionsAnswers.map((question, qIndex) => (
                        <div key={question.id} className={`question-item ${selectedQuestionId === question.id ? 'selected' : ''} ${getQuestionAnswerStatus(question.id)}`} onClick={() => setSelectedQuestionId(question.id)}>
                            <div className='index'>{qIndex + 1}</div>
                            <div className='answers'>
                                {question.answers?.map((answer, aIndex) => (
                                    <div key={answer.id} className={`answer-item`}>
                                        <button className={`btn ${isAnswerSelected(question.id, answer.id) ? 'btn-selected' : ''}`} onClick={() => handleSelectAnswer(question.id, answer.id)}>{aIndex + 1}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className='btn btn-end' onClick={() => setIsFinish(true)} disabled={isFinish}>KẾT THÚC</button>
                <div>
                    <hr />
                    <div>Correct: {result.correctCount}</div>
                    <div>Total: {result.totalCount}</div>
                    <div>Skipped: {result.skippedCount}</div>
                    <hr />
                    <hr />
                    <div>
                        {result?.details?.map((d, index) => (
                            <div key={index}>
                                {/* <div>{d.questionContent}</div>
                                <div>{d.answerContent}</div>
                                <div>{d.selectedAnswerContent}</div> */}
                                <div>{index + 1}</div>
                                <div>Question: {d.questionId}</div>
                                <div style={{ backgroundColor: d.answerId == d.selectedAnswerId ? '#28a745' : '#ffffff80' }}>Correct: {d.answerId}</div>
                                <div>Selected: {d.selectedAnswerId}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
