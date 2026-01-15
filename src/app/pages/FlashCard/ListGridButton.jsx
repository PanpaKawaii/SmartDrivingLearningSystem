
import './ListGridButton.css';

export default function ListGridButton({
    list = [],
    setSelectedQuestionId = () => { },
}) {
    return (
        <div className='list-grid-button-container'>
            {list.map((question, bIndex) => (
                <button key={question.id} onClick={() => setSelectedQuestionId(question.id)}>{bIndex + 1}</button>
            ))}
        </div>
    )
}
