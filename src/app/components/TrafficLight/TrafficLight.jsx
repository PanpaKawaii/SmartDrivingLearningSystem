import { useEffect, useRef } from 'react';
import { GlobalColor } from '../../../mocks/GlobalVar';

import './TrafficLight.css';

export default function TrafficLight({
    text = '',
    setRefresh = () => { },
}) {
    const containerRef = useRef(null);
    const objectRef = useRef(null);
    const dragging = useRef(false);
    const rotation = useRef({ x: 0, y: 0 });

    const applyRotation = () => {
        const { x, y } = rotation.current;
        objectRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    };

    useEffect(() => {
        const container = containerRef.current;

        const down = () => (dragging.current = true);
        const up = () => (dragging.current = false);

        const move = (e) => {
            if (!dragging.current) return;
            rotation.current.y += e.movementX * 0.5;
            rotation.current.x -= e.movementY * 0.5;
            applyRotation();
        };

        container.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointermove', move);

        return () => {
            container.removeEventListener('pointerdown', down);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointermove', move);
        };
    }, []);

    const color = text == 'Error' ? GlobalColor.red : (text == 'Loading' ? GlobalColor.yellow : (text == 'Success' ? GlobalColor.green : ''));
    return (
        <div className='traffic-light-container'>
            <div className={`scene-traffic-light ${text.toLowerCase()}`}
                ref={containerRef}>
                {/* <div className='cube'>
                    <div className='face f1' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                    <div className='face f2' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                    <div className='face f3' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                    <div className='face f4' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                    <div className='face f5' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                    <div className='face f6' onClick={() => setRefresh(p => p + 1)}>{text}</div>
                </div> */}
                <div className='traffic-light'
                    ref={objectRef}>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`face f${i + 1} ${i + 1 <= 4 ? 'side-face' : 'updown-face'}`}
                            onClick={() => setRefresh(p => p + 1)}
                        >
                            {[{ color: 'error' }, { color: 'loading' }, { color: 'success' }].map((color, j) => {
                                return i + 1 <= 4 && i % 2 === 0 && (
                                    <div
                                        key={j}
                                        className={`light ${color.color} ${text.toLowerCase() == color.color ? 'active' : 'inactive'}`}
                                    >
                                    </div>
                                )
                            })}
                            {/* {[{ color: 'error' }, { color: 'loading' }, { color: 'success' }].map((color, j) => {
                                return i + 1 <= 4 && i % 2 === 0 && (
                                    <>
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`lt l${i + 1}`}
                                            >
                                            </div>
                                        ))}
                                    </>
                                )
                            })} */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
