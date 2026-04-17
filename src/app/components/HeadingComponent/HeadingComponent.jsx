import { useNavigate } from 'react-router-dom';

import './HeadingComponent.css';

export default function HeadingComponent({
    title = '',
    subtitle = '',
    titlePosition = 'left',
    back = 'Back',
    linkBack = '',
}) {
    const navigate = useNavigate();
    return (
        <div className='heading-component-container'>
            {back && (
                <button className='btn' onClick={() => linkBack ? navigate(linkBack) : navigate(-1)}>
                    <i className='fa-solid fa-chevron-left' />
                    <span>{back}</span>
                </button>
            )}
            <h1 style={{ textAlign: titlePosition }}>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    )
}
