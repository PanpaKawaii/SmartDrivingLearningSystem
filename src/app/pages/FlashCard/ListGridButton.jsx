
import './ListGridButton.css';

export default function ListGridButton({
    list = [],
    selectedQuestionId = '',
    setSelectedQuestionId = () => { },
}) {
    return (
        <div className='list-grid-button-container'>
            {list.map((question, bIndex) => (
                <button key={question.id} className={`btn ${selectedQuestionId === question.id ? 'btn-selected' : ''}`} onClick={() => setSelectedQuestionId(question.id)}>{bIndex + 1}</button>
            ))}
        </div>
    )
}
