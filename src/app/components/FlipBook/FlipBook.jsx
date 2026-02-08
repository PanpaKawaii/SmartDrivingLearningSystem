import { useEffect, useRef } from 'react';

import './FlipBook.css';

export default function FlipBook(props) {
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

    return (
        <div
            ref={containerRef}
            className='flip-book-container'
        >
            <div
                ref={objectRef}
                className='book'
            >
                <div
                    className='book-structure structure-back'
                    style={{
                        width: props.space * Math.max(props.currentPage - 1, props.pages.length - props.currentPage - 1),
                        height: props.height,
                        transform: `
                            rotateY(-90deg)
                            translateX(${-props.space * Math.max((props.pages.length + props.currentPage + 1) / 2, (props.currentPage * 1.5 + 0.5))}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-up structure-right'
                    style={{
                        width: props.width,
                        height: props.space * Math.max(0, props.pages.length - props.currentPage - 1),
                        // transform: `
                        //     rotateX(90deg)
                        //     rotateZ(90deg)
                        //     translateZ(${props.height / 2}px)
                        //     translateY(${-props.width / 2}px)
                        //     translateX(${-props.space * Math.max((props.pages.length + 1 + props.currentPage), (props.currentPage * 2 + 2)) / 2}px)
                        // `,
                        transform: `
                            rotateX(90deg)
                            translateZ(${props.height / 2}px)
                            translateY(${-props.space * Math.max((props.pages.length + props.currentPage + 1), (props.currentPage * 2 + 2)) / 2}px)
                            rotateZ(${props.currentPage == props.pages.length ? 180 : 0}deg)
                            translateX(${props.width / 2}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-down structure-right'
                    style={{
                        width: props.width,
                        height: props.space * Math.max(0, props.pages.length - props.currentPage - 1),
                        transform: `
                            rotateX(-90deg)
                            translateZ(${props.height / 2}px)
                            translateY(${props.space * Math.max((props.pages.length + props.currentPage + 1), (props.currentPage * 2 + 2)) / 2}px)
                            rotateZ(${props.currentPage == props.pages.length ? -180 : 0}deg)
                            translateX(${props.width / 2}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-mid structure-right'
                    style={{
                        width: props.space * Math.max(0, props.pages.length - props.currentPage - 1),
                        height: props.height,
                        transform: `
                            translateZ(${-props.space * Math.max((props.pages.length + props.currentPage + 1), (props.currentPage * 2 + 2)) / 2}px)
                            rotateY(${props.currentPage == props.pages.length ? -90 : 90}deg)
                            translateZ(${props.width}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-up structure-left'
                    style={{
                        width: props.width,
                        height: props.space * Math.max(0, props.currentPage - 1),
                        // transform: `
                        //     rotateX(90deg)
                        //     rotateZ(90deg)
                        //     translateZ(${props.height / 2}px)
                        //     translateY(${-props.width / 2}px)
                        //     translateX(${-props.space * Math.max((props.pages.length + 1 + props.currentPage), (props.currentPage * 2 + 2)) / 2}px)
                        // `,
                        transform: `
                            rotateX(90deg)
                            translateZ(${props.height / 2}px)
                            translateY(${-props.space * Math.max(1, (props.currentPage) * 1.5 + 0.5)}px)
                            rotateZ(${props.currentPage == 0 ? -180 : 0}deg)
                            translateX(${-props.width / 2}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-down structure-left'
                    style={{
                        width: props.width,
                        height: props.space * Math.max(0, props.currentPage - 1),
                        transform: `
                            rotateX(-90deg)
                            translateZ(${props.height / 2}px)
                            translateY(${props.space * Math.max(1, (props.currentPage) * 1.5 + 0.5)}px)
                            rotateZ(${props.currentPage == 0 ? 180 : 0}deg)
                            translateX(${-props.width / 2}px)
                        `
                    }}
                >
                </div>
                <div
                    className='book-structure structure-mid structure-left'
                    style={{
                        width: props.space * Math.max(0, props.currentPage - 1),
                        height: props.height,
                        transform: `
                            translateZ(${-props.space * Math.max(1, (props.currentPage) * 1.5 + 0.5)}px)
                            rotateY(${props.currentPage == 0 ? 90 : -90}deg)
                            translateZ(${props.width}px)
                        `
                    }}
                >
                </div>
                {props.children}
            </div>
        </div>
    )
}
