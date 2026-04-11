import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../../../mocks/CallingAPI';
import Timer from '../../../../components/Timer/Timer';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

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
    const { user, refreshNewToken } = useAuth();

    const navigate = useNavigate();

    const [isFinish, setIsFinish] = useState(false);
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

    const checkAnswersResult = async (questionsAnswers, myAnswers) => {
        setLoading(true);
        setIsFinish(true);

        let correctCount = 0;
        let skippedCount = 0;

        const details = [];

        questionsAnswers.forEach(question => {
            const userAnswer = myAnswers.find(a => a.questionId === question.id);
            const correctAnswers = question.answers.filter(a => a.isCorrect);

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

            if (isCorrect) {
                correctCount++;
            }

            // Ghi chi tiết
            correctAnswers.forEach(correct => {
                const selected = question.answers.find(a => selectedAnswerIds?.includes(a.id));

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

        // setResult({
        //     correctCount: correctCount,
        //     totalCount: questionsAnswers?.length || 0,
        //     skippedCount: skippedCount,
        //     details: details,
        // });

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

        const token = user?.token || '';
        try {
            const result = await postData('ExamSessions', ExamSessionData, token);
            console.log('result', result);

            navigate('./..');
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

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
                        <div
                            key={question.id}
                            className={`question-item ${selectedQuestionId === question.id ? 'selected' : ''} ${getQuestionAnswerStatus(question.id)}`}
                            onClick={() => setSelectedQuestionId(p => isFinish ? p : question.id)}
                            style={{ cursor: isFinish ? 'not-allowed' : 'pointer' }}
                        >
                            <div className='index'>{qIndex + 1}</div>
                            <div className='answers'>
                                {question.answers?.map((answer, aIndex) => (
                                    <div key={answer.id} className={`answer-item`}>
                                        <button
                                            className={`btn ${isAnswerSelected(question.id, answer.id) ? 'btn-selected' : ''}`}
                                            onClick={() => handleSelectAnswer(question.id, answer.id)}
                                            disabled={isFinish}
                                        >
                                            {aIndex + 1}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {isFinish ?
                    <button className='btn btn-end' onClick={() => checkAnswersResult(QuestionsAnswers, myAnswers)} disabled={loading}>KẾT THÚC (FUNCTION)</button>
                    :
                    <button className='btn btn-end' onClick={() => { setLoading(true); setIsFinish(true); }} disabled={loading}>KẾT THÚC (TIME)</button>
                }
                {/* <div>
                    <hr />
                    <div>Correct: {result.correctCount}</div>
                    <div>Total: {result.totalCount}</div>
                    <div>Skipped: {result.skippedCount}</div>
                    <hr />
                    <hr />
                    <div>
                        {result?.details?.map((d, index) => (
                            <div key={index}>
                                <div>{d.questionContent}</div>
                                <div>{d.answerContent}</div>
                                <div>{d.selectedAnswerContent}</div>
                                <div>{index + 1}</div>
                                <div>Question: {d.questionId}</div>
                                <div style={{ backgroundColor: d.answerId == d.selectedAnswerId ? '#28a745' : '#ffffff80' }}>Correct: {d.answerId}</div>
                                <div>Selected: {d.selectedAnswerId}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}
