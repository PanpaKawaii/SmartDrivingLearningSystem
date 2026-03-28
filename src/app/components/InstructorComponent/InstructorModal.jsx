import './InstructorModal.css';

export default function InstructorModal({ isOpen, onClose, title, children, footer, wide }) {
    if (!isOpen) return null;

    return (
        <div className='ins-modal-overlay' onClick={onClose}>
            <div className={`ins-modal ${wide ? 'wide' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='ins-modal-header'>
                    <h2 className='ins-modal-title'>{title}</h2>
                    <button className='ins-modal-close' onClick={onClose}>
                        <i className='fa-solid fa-xmark'></i>
                    </button>
                </div>
                <div className='ins-modal-body'>{children}</div>
                {footer && <div className='ins-modal-footer'>{footer}</div>}
            </div>
        </div>
    );
}
