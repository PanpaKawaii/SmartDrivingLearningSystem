import React, { useEffect, useRef } from 'react';

import './Cube.css';

export default function Cube({
    color = '',
    onClickCube = () => { },
    faces = [],
}) {
    const containerRef = useRef(null);
    const objectRef = useRef(null);
    // const dragging = useRef(false);
    // const rotation = useRef({ x: 0, y: 0 });

    // const applyRotation = () => {
    //     const { x, y } = rotation.current;
    //     objectRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    // };

    // useEffect(() => {
    //     const container = containerRef.current;

    //     const down = () => (dragging.current = true);
    //     const up = () => (dragging.current = false);

    //     const move = (e) => {
    //         if (!dragging.current) return;
    //         rotation.current.y += e.movementX * 0.5;
    //         rotation.current.x -= e.movementY * 0.5;
    //         applyRotation();
    //     };

    //     container.addEventListener('pointerdown', down);
    //     window.addEventListener('pointerup', up);
    //     window.addEventListener('pointermove', move);

    //     return () => {
    //         container.removeEventListener('pointerdown', down);
    //         window.removeEventListener('pointerup', up);
    //         window.removeEventListener('pointermove', move);
    //     };
    // }, []);

    const polygonToPath = (points) => {
        if (!points) return '';
        const coords = points.trim().split(/\s+/);
        let d = `M ${coords[0].replace(',', ' ')}`;
        for (let i = 1; i < coords.length; i++) {
            d += ` L ${coords[i].replace(',', ' ')}`;
        }
        return d + ' Z';
    };

    const text = 'AI';
    return (
        <div className='cube-container'>
            <div
                ref={containerRef}
                className='scene-cube'
                style={{ '--color1': color, '--color2': color + '80' }}
            >
                <div
                    ref={objectRef}
                    className='cube'
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`face f${i + 1}`} onClick={onClickCube}>{text}</div>
                    ))}
                </div>
            </div>
            <div style={{ width: '80px', height: '80px' }}></div>
            <div
                ref={containerRef}
                className='scene-object'
                style={{ '--color1': color, '--color2': color + '80' }}
            >
                <div
                    ref={objectRef}
                    className='object'
                >
                    {faces.map((face, index) => {
                        const styleObj = {};

                        face.steps?.forEach(step => {
                            if ((step.type.startsWith('translate')
                                || step.type.startsWith('rotate')
                                || step.type == 'scale')
                                && step.visible == 1) {

                                styleObj.transform = (styleObj.transform || '') +
                                    ` ${step.type}(${step.value}${step.type.includes('rotate') ? 'deg' : (step.type.includes('translate') ? 'px' : '')})`;
                            }
                        });

                        return face.visible == 1 ? (
                            <React.Fragment key={index}>
                                <svg
                                    className='face-svg'
                                    width={`${face.width || '0'}`}
                                    height={`${face.height || '0'}`}
                                    viewBox={`0 0 ${face.width || '0'} ${face.height || '0'}`}
                                    style={styleObj}
                                    onClick={onClickCube}
                                >
                                    {/* {face.glowVisible &&
                                        <defs>
                                            <filter
                                                id={`glow-${face.id}`}
                                                x='-60%'
                                                y='-60%'
                                                width='220%'
                                                height='220%'
                                            >
                                                <feGaussianBlur stdDeviation={face.glow || '0'} result='blur' />
                                                <feMerge>
                                                    <feMergeNode />
                                                    <feMergeNode in='SourceGraphic' />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                    } */}
                                    <path
                                        d={face.shape ? (face.shape?.includes('M') ? face.shape : polygonToPath(face.shape)) : `M 0 0 L ${face.width} 0 L ${face.width} ${face.height} L 0 ${face.height} Z`}
                                        fill={face.color || '#FFFFFF'}
                                        stroke={face.borderColor || '#FFFFFF'}
                                        strokeWidth={face.borderVisible === 1 ? face.borderWidth : 0}
                                        vectorEffect='non-scaling-stroke'
                                        filter={`url(#glow-${face.id})`}

                                    // strokeLinecap={face.id == selectedFaceId ? 'round' : ''}
                                    // strokeDasharray={face.id == selectedFaceId ? '8 6' : ''}
                                    // className={face.id == selectedFaceId ? 'dashoffset' : ''}

                                    // onClick={() => setSelectedFaceId(prev => {
                                    //     if (prev && prev == face.id) {
                                    //         return null;
                                    //     } else {
                                    //         return face.id;
                                    //     }
                                    // })}
                                    />
                                    <text
                                        x={face.width / 2}
                                        y={face.height / 2 + 1}
                                        textAnchor='middle'
                                        dominantBaseline='middle'
                                        fill={face.nameColor}
                                        fontSize={face.nameSize}
                                    >
                                        {face.nameVisible === 1 ? face.name : ''}
                                    </text>
                                </svg>
                            </React.Fragment>
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    )
}
