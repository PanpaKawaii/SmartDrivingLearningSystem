import { useState } from 'react';
import Timer from '../../components/Timer';
import './Answer.css';

export default function Answer({
    QuestionsAnswers = [],
    myAnswers = [],
    setSelectedQuestionId = () => { },
    selectedQuestionId = '',
    handleSelectAnswer = () => { },
}) {
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

        if (!item || item.answers.length === 0) {
            return 'none';
        }

        if (item.answers.length == (Number(question.correctAnswer) || 1)) {
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

            const correctAnswers = question.answers.filter(
                a => a.isCorrect
            );

            // ❌ Không chọn đáp án nào hoặc chọn chưa đủ
            if (
                !userAnswer ||
                userAnswer.answers.length !== correctAnswers.length
            ) {
                skippedCount++;
                return;
            }

            const selectedAnswerIds = userAnswer.answers.map(
                a => a.answerId
            );

            const correctAnswerIds = correctAnswers.map(
                a => a.id
            );

            // ✅ So sánh đúng / sai (phải khớp hoàn toàn)
            const isCorrect =
                selectedAnswerIds.length === correctAnswerIds.length &&
                selectedAnswerIds.every(id =>
                    correctAnswerIds.includes(id)
                );

            if (isCorrect) {
                correctCount++;
            }

            // 🔍 Ghi chi tiết
            correctAnswers.forEach(correct => {
                const selected = question.answers.find(a =>
                    selectedAnswerIds.includes(a.id)
                );

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
            totalCount: questionsAnswers.length,
            skippedCount: skippedCount,
            details: details,
        });

        // return {
        //     correctCount,
        //     totalCount: questionsAnswers.length,
        //     skippedCount,
        //     details
        // };
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
                        <div key={question.id} className={`question-item ${selectedQuestionId === question.id ? 'selected' : ''} ${getQuestionAnswerStatus(question.id)}`} onClick={() => setSelectedQuestionId(question.id)}>
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
                <button className='btn btn-end' onClick={() => checkAnswersResult(QuestionsAnswers, myAnswers)}>KẾT THÚC</button>
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
                                <div>Question: {d.questionId}</div>
                                <div style={{ backgroundColor: d.answerId === d.selectedAnswerId ? '#28a745' : '#fff' }}>Correct: {d.answerId}</div>
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
