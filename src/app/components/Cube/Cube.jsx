import React from 'react';

import './Cube.css';

export default function Cube({
    color = '',
    onClickCube = () => { },
    faces = [],
}) {
    const polygonToPath = (points) => {
        if (!points) return '';
        const coords = points.trim().split(/\s+/);
        let d = `M ${coords[0].replace(',', ' ')}`;
        for (let i = 1; i < coords.length; i++) {
            d += ` L ${coords[i].replace(',', ' ')}`;
        }
        return d + ' Z';
    };
    return (
        <div className='cube-container'>
            {/* <div
                className='scene-cube'
                style={{ '--color1': color, '--color2': color + '80' }}
            >
                <div
                    className='cube'
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`face f${i + 1}`} onClick={onClickCube}>{text}</div>
                    ))}
                </div>
            </div> */}
            <div
                className='scene-object'
                style={{ '--color1': color, '--color2': color + '80' }}
            >
                <div
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
