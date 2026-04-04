
import './PopupContainer.css';

export default function PopupContainer({
    children,
    onClose = () => { },
}) {
    return (
        <div className='popup-container-container'>
            <div className='modal-box'>
                <button onClick={onClose} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                {children}
            </div>
        </div>
    )
}
