import { useNavigate } from 'react-router-dom';

import './HeadingComponent.css';

export default function HeadingComponent({
    title = '',
    subtitle = '',
    titlePosition = 'left',
    back = 'Back',
    linkBack = '',
    badge = '',
    stateProp = '',
}) {
    const navigate = useNavigate();
    const positionClass = titlePosition === 'left' ? 'is-left' : 'is-center';
    return (
        <div className={`heading-component-container ${positionClass}`}>
            {back && (
                <button className='btn heading-back-btn' onClick={() => linkBack ? navigate(linkBack, { state: stateProp }) : navigate(-1)}>
                    <i className='fa-solid fa-chevron-left' />
                    <span>{back}</span>
                </button>
            )}

            {badge && (
                <div className='heading-badge'>
                    <i className='fa-solid fa-book-open' />
                    <span>{badge}</span>
                </div>
            )}

            <h1>{title}</h1>
            {subtitle && <p className='heading-subtitle'>{subtitle}</p>}
        </div>
    );
}
