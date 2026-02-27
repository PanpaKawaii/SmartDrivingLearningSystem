import React, { useEffect, useRef } from 'react';
import { GlobalColor } from '../../../mocks/GlobalVar';

import './TrafficLight.css';

export default function TrafficLight({
    text = 'error',
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

    const color = text == 'error' ? GlobalColor.red : (text == 'loading' ? GlobalColor.yellow : (text == 'success' ? GlobalColor.green : ''));
    return (
        <div className='traffic-light-container'>
            <div className={`scene-traffic-light ${text}`}
                ref={containerRef}>
                <div className='traffic-light'
                    ref={objectRef}>
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`face f${i + 1} ${i < 2 ? 'updown-face' : 'side-face'}`}
                            onClick={() => setRefresh(p => p + 1)}
                        >
                        </div>
                    ))}
                    {[...Array(2)].map((_, i) => (
                        [{ color: 'error' }, { color: 'loading' }, { color: 'success' }].map((color, j) => {
                            return (
                                <React.Fragment key={j}>
                                    {[...Array(6)].map((_, k) => (
                                        <div
                                            key={k}
                                            className={`light l${k + 1} ${k < 2 ? 'updown-light' : 'side-light'} ${color.color} ${text == color.color ? 'active' : 'inactive'}`}
                                            style={{ '--i': i, '--j': 1 - j }}
                                        >
                                            {/* I{i + 1}-J{j + 1}-K{k + 1} */}
                                        </div>
                                    ))}
                                </React.Fragment>
                            )
                        })
                    ))}
                </div>
            </div>
        </div>
    )
}
