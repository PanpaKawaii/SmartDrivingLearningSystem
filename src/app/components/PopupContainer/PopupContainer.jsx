import './PopupContainer.css';

export default function PopupContainer({
    children,
    titleName = '',
    modalStyle = {},
    innerStyle = {},
    onClose = () => { },
}) {
    return (
        <div className='popup-container-container'>
            <div className='modal-box' style={modalStyle}>
                <div className='box-heading'>
                    <h2>{titleName}</h2>
                    <button onClick={onClose} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                </div>
                <div className='inner-popup' style={innerStyle}>
                    {children}
                </div>
                <div className='popup-footer'></div>
            </div>
        </div>
    )
}
