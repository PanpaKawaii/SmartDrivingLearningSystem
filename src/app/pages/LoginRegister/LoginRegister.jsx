import { useState } from 'react';
import './LoginRegister.css';

export default function LoginRegister({
    onClose = () => { },
}) {
    const [rotate, setRotate] = useState(0);

    return (
        <div className='login-register-container'>
            <div className='login-register-modal-box' style={{ transform: `rotateY(${rotate}deg)` }}>
                <div className={`face face-login ${rotate == 0 ? 'front' : 'back'}`}>
                    <div className='content'>
                        <button onClick={() => onClose(false)} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                        <h1>LOGIN</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <p>This is login</p>
                        <input />
                        <select>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                        </select>
                        <button onClick={() => setRotate(-180)}>To Register</button>
                    </div>
                </div>

                <div className={`face face-register ${rotate == -180 ? 'front' : 'back'}`}>
                    <div className='content'>
                        <button onClick={() => onClose(false)} className='close-btn'><i className='fa-solid fa-xmark' /></button>
                        <h1>REGISTER H1</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <h1>REGISTER</h1>
                        <p>This is register</p>
                        <input />
                        <select>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                            <option></option>
                        </select>
                        <button onClick={() => setRotate(0)}>To Login</button>
                    </div>
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
