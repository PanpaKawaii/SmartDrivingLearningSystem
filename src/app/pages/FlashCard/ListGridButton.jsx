import './ListGridButton.css';

export default function ListGridButton({
    list = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
    myAnswers = [],
    column = 1,
}) {
    const getQuestionStatus = (question, myAnswers) => {
        if (myAnswers.length === 0) return '';

        const userAnswer = myAnswers.find(
            item => item.questionId === question.id
        );

        // Chưa chọn gì
        if (!userAnswer || userAnswer.answers.length === 0) {
            return '';
        }

        const selectedAnswerIds = userAnswer.answers.map(a => a.answerId);
        const correctAnswerIds = question.answers.filter(a => a.isCorrect).map(a => a.id);

        const isFull = selectedAnswerIds.length === question.correctAnswer;
        const hasIncorrect = selectedAnswerIds.some(
            id => !correctAnswerIds.includes(id)
        );

        if (!hasIncorrect && isFull) return 'btn-correct';
        if (hasIncorrect && isFull) return 'btn-incorrect';
        if (!hasIncorrect && !isFull) return 'btn-correct-missing';
        if (hasIncorrect && !isFull) return 'btn-incorrect-missing';

        return '';
    };

    return (
        <div className='list-grid-button-container' style={{ '--column': column }}>
            {list.map((question, bIndex) => (
                <button
                    key={question.id}
                    className={`btn ${selectedQuestionId === question.id ? 'btn-selected' : ''} ${getQuestionStatus(question, myAnswers)}`}
                    onClick={() => setSelectedQuestionId(question.id)}
                >
                    {bIndex + 1}
                </button>
            ))}
        </div>
    )
}
