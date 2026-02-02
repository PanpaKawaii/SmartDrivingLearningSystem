import './StyleLabelSelect.css';

export default function StyleLabelSelect({
    id = '',
    list = [],
    value = '',
    onValueChange,
    extraClassName = '',
    extraStyle = {},
    label = '',
    labelStyle = '',
    disable = false
}) {
    return (
        <div className='style-label-select-container' style={extraStyle}>
            <select
                id={id}
                value={list?.find(m => m.id == value)?.id}
                onChange={(e) => {
                    const val = e.target.value;
                    onValueChange(val);
                }}
                className={`select ${extraClassName}`}
                disabled={disable}
            >
                <option value={''} className='option'>--</option>
                {list.map((item, index) => (
                    <option key={index} value={item.id} className='option'>{item.name}</option>
                ))}
            </select>
            <label htmlFor={label} className={labelStyle}>{label}</label>
        </div>
    )
}
