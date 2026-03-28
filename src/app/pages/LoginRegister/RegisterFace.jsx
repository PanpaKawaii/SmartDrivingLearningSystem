
import './RegisterFace.css';

export default function RegisterFace({
    setRotate = () => { },
}) {
    return (
        <div className='register-face-container'>
            <h1>REGISTER</h1>
            <button onClick={() => setRotate(0)}>To Login</button>
        </div>
    )
}
