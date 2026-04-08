import './ListGridButton.css';

export default function ListGridButton({
    list = [],
    mark = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
    myAnswers = [],
    column = 1,
}) {
    const getQuestionStatus = (question, myAnswers) => {
        if (myAnswers.length == 0) return 'btn-not-answer';

        const userAnswer = myAnswers.find(
            item => item.questionId == question.id
        );

        // Chưa chọn gì
        if (!userAnswer || userAnswer.answers?.length == 0) {
            return 'btn-not-answer';
        }

        const selectedAnswerIds = userAnswer.answers.map(a => a.answerId);
        const correctAnswerIds = question.answers.filter(a => a.isCorrect).map(a => a.id);

        const isFull = selectedAnswerIds.length == question.correctAnswer;
        const hasIncorrect = selectedAnswerIds.some(
            id => !correctAnswerIds.includes(id)
        );

        if (!hasIncorrect && isFull) return 'btn-correct';
        if (hasIncorrect && isFull) return 'btn-incorrect';
        if (!hasIncorrect && !isFull) return 'btn-correct-missing';
        if (hasIncorrect && !isFull) return 'btn-incorrect-missing';

        return 'btn-not-answer';
    };

    return (
        <div className='list-grid-button-container' style={{ '--column': column }}>
            {list.map((question, bIndex) => (
                <button
                    key={bIndex}
                    className={`grid-btn ${selectedQuestionId == question.id ? 'btn-selected' : ''} ${getQuestionStatus(question, myAnswers)} ${mark.includes(question.id) ? 'marked' : ''}`}
                    onClick={() => setSelectedQuestionId(question.id)}
                >
                    {bIndex + 1}
                </button>
            ))}
        </div>
    )
}
