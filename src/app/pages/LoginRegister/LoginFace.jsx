import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';

import './LoginFace.css';

export default function LoginFace({
    setRotate = () => { },
}) {
    console.log('Login');
    const { login } = useAuth();
    const navigate = useNavigate();

    const ResetLoginInputs = () => {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setLoginError({ value: '', name: '' });
    };

    const [Remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LoginError, setLoginError] = useState({ value: '', name: '' });

    const Login = async (Username, Password) => {
        if (!Username) {
            console.error('Invalid value');
            setLoginError({ value: 'Invalid username', name: 'Username' });
            return;
        }
        if (!Password) {
            console.error('Invalid value');
            setLoginError({ value: 'Invalid password', name: 'Password' });
            return;
        }

        const LoginData = {
            username: Username,
            password: Password,
        };
        console.log('LoginData:', LoginData);

        try {
            setLoading(true);
            const result = await postData('api/user/loginusername', LoginData, '');
            console.log('result', result);

            if (result?.role == 'Disable') {
                console.error('This user was disabled');
                setLoginError({ value: 'This user was disabled', name: 'Username or Password' });
                return;
            }

            login(result);
            navigate('/profile');
        } catch (error) {
            console.log('Login failed:', error);
            setLoginError({ value: 'Login failed', name: 'Username or Password' });
        } finally {
            setLoading(false);
        };
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoginError({ value: '', name: '' });
        const Username = e.target.username.value;
        const Password = e.target.password.value;
        console.log({ Username, Password });
        Login(Username, Password);
    };

    const handleRemember = () => {
        setRemember(p => !p);
    };

    return (
        <div className='login-face-container'>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmitLogin}>
                <div className='form-group'>
                    <input type='text' name='username' placeholder='' />
                    <label htmlFor={'username'} style={{ color: LoginError.name.includes('Username') && '#ff4d4f', }}>Username</label>
                </div>
                <div className='form-group'>
                    <input type='password' name='password' placeholder='' />
                    <label htmlFor={'password'} style={{ color: LoginError.name.includes('Password') && '#ff4d4f', }}>Password</label>
                </div>
                <div className='form-check'>
                    <div className='form-remember'>
                        <label className='label-remember'>
                            <input type='checkbox' id='checkbox-remember' checked={Remember} onChange={handleRemember} />
                            Remember me
                        </label>
                    </div>
                    <a href='#' className='forget-link'>Forgot password?</a>
                </div>

                {LoginError && <div className='message error-message'>{LoginError.value}</div>}
                {!LoginError && <div className='message error-message'></div>}

                <div className='btn-box'>
                    <button type='submit' className='btn-submit'>SUBMIT</button>
                    <button type='reset' className='btn-reset' onClick={ResetLoginInputs}>CLEAR</button>
                </div>
            </form>
            <div className='other-method'>Or</div>
            <div className='link-box'>
                <div>Have no accounts yet?</div>
                <div className='link' onClick={() => setRotate(-180)}>Sign up now!</div>
            </div>
        </div>
    )
}
