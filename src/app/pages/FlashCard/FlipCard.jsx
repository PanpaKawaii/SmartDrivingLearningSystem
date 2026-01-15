import './FlipCard.css';

export default function FlipCard({
    list = [],
    selectedQuestion = {},
}) {
    return (
        <div className='flip-card-container'>
            <div>{selectedQuestion?.content}</div>
            <div>
                {(selectedQuestion?.answers?.filter(a => a.isCorrect === true))?.map((answer) => (
                    <div key={answer.id}>
                        <div>{answer.content}</div>
                    </div>
                ))}
            </div>
            {/* <div>Length: {(selectedQuestion?.answers?.filter(a => a.isCorrect === true))?.length}</div>
            <div>{selectedQuestion?.answers?.[0]?.content || 'none'} - {selectedQuestion?.answers?.[0]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[1]?.content || 'none'} - {selectedQuestion?.answers?.[1]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[2]?.content || 'none'} - {selectedQuestion?.answers?.[2]?.isCorrect === true ? 'true' : 'false'}</div>
            <div>{selectedQuestion?.answers?.[3]?.content || 'none'} - {selectedQuestion?.answers?.[3]?.isCorrect === true ? 'true' : 'false'}</div> */}
        </div>
    )
}
