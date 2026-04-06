import { useState } from 'react';

import './ButtonList.css';

export default function ButtonList({
    icon = '',
    onToggle = () => { },
    list = [],
}) {
    const [show, setShow] = useState(false);
    const ListSwapController = [
        { value: 'report' },
        { value: 'test' },
    ];
    const handleClick = (item) => {
        onToggle(item);
        setShow(false);
    };
    return (
        <div className='button-list-container'>
            <button className='btn-list' onClick={() => setShow(p => !p)}><i className={icon} /></button>
            <div className='list-button'>
                {show && ListSwapController?.map((item, index) => {
                    const appear = list.includes(item.value)
                    return appear && (
                        <button className='item' key={index} onClick={() => handleClick(item.value)}>
                            {item.value?.toUpperCase()}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
