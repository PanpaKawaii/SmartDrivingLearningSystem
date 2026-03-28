import { useState } from 'react';
import LoginFace from './LoginFace';
import RegisterFace from './RegisterFace';

import './LoginRegister.css';

export default function LoginRegister({
    onClose = () => { },
}) {
    const [rotate, setRotate] = useState(0);

    return (
        <div className='login-register-container'>
            <div className='login-register-modal-box' style={{ transform: `rotateY(${rotate}deg)` }}>
                <div className={`face face-login ${rotate == 0 ? 'front' : 'back'}`}>
                    <button onClick={() => onClose(false)} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                    <LoginFace setRotate={setRotate} />
                </div>

                <div className={`face face-register ${rotate == -180 ? 'front' : 'back'}`}>
                    <button onClick={() => onClose(false)} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                    <RegisterFace setRotate={setRotate} />
                </div>

                {[...Array(8)].map((_, index) => (
                    <div className={`face face-border f${index + 1}`}>
                        {/* Face-{index + 1} */}
                    </div>
                ))}
            </div>
        </div>
    )
}
