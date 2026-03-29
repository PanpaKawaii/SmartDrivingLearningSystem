import './Cube.css';

export default function Cube({
    color = '',
    onClickCube = () => { },
}) {
    const text = 'AI';
    return (
        <div className='cube-container'>
            <div className='scene-cube'
                style={{ '--color1': color, '--color2': color + '80' }}>
                <div className='cube'>
                    <div className='face f1' onClick={onClickCube}>{text}</div>
                    <div className='face f2' onClick={onClickCube}>{text}</div>
                    <div className='face f3' onClick={onClickCube}>{text}</div>
                    <div className='face f4' onClick={onClickCube}>{text}</div>
                    <div className='face f5' onClick={onClickCube}>{text}</div>
                    <div className='face f6' onClick={onClickCube}>{text}</div>
                </div>
            </div>
        </div>
    )
}
