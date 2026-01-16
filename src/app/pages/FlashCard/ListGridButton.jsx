import './ListGridButton.css';

export default function ListGridButton({
    list = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
    column = 1,
}) {
    return (
        <div className='list-grid-button-container' style={{ '--column': column }}>
            {list.map((question, bIndex) => (
                <button
                    key={question.id}
                    className={`btn ${selectedQuestionId === question.id ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedQuestionId(question.id)}
                >
                    {bIndex + 1}
                </button>
            ))}
        </div>
    )
}
