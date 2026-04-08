import { useState } from 'react';

import './ButtonList.css';

export default function ButtonList({
    list = [],
}) {
    const [show, setShow] = useState(false);
    const handleClick = (item) => {
        item.onToggle();
        setShow(false);
    };
    return (
        <div className='button-list-container'>
            <button className='btn-list' onClick={() => setShow(p => !p)}><i className='fa-solid fa-ellipsis-vertical' /></button>
            <div className='list-button'>
                {show && list?.map((item, index) => (
                    <button className='item' key={index} onClick={() => handleClick(item)} disabled={item.disabled}>
                        {item.name?.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    )
}
