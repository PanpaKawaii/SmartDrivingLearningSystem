
import './ListScenario.css';

export default function ListScenario({
    list = [],
    groupBy = '',
    onClickButton = () => { },
    selected = '',
}) {
    const groupedList = Object.values(
        list.reduce((acc, item) => {
            const chapterId = item?.[groupBy];
            if (!acc[chapterId]) {
                acc[chapterId] = { [groupBy]: item.chapter, items: [] };
            }
            acc[chapterId].items.push(item);
            return acc;
        }, {})
    );
    console.log('groupedList', groupedList);

    return (
        <div className='list-scenario-container'>
            <div className='group-list'>
                {groupedList.map((group, gIndex) => (
                    <div key={gIndex} className='group-item'>
                        <h3>Chương {gIndex + 1}: {group?.[groupBy]?.name}</h3>
                        <div className='list'>
                            {group.items?.map((item, index) => {
                                const i = list?.findIndex(s => s.id == item.id);
                                return (
                                    <button key={index} className={`item ${item.id == selected ? 'btn-selected' : ''}`} onClick={() => onClickButton(item.id)}>
                                        <div>
                                            {i + 1}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
