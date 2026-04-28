import './Page.css';

export default function Page(props) {
    const position = props.index % 2 == 0 ? 'right' : 'left';
    const isFlipped = props.index <= props.currentPage;
    return (
        // (props.index >= props.currentPage - 4 && props.index <= props.currentPage + 3) &&
        <div
            className='page-container'
            style={{
                // opacity: ((props.index >= props.currentPage - 2 && props.index <= props.currentPage + 3) || props.index <= 0) ? 1 : 0,
                width: props.width,
                height: props.height,
                opacity: props.opacity,
                zIndex: -props.index,
                backgroundColor: props.color,
                boxShadow: `inset ${position == 'right' ? '-' : ''}4px 0 40px 4px #977859bb`,
                // backgroundColor: (props.index >= props.currentPage - 2 && props.index <= props.currentPage + 3) ? 'lime' : 'gray',
                // transform: `
                //     rotateY(${isFlipped ? (position == 'left' ? -180 : 0) : (position == 'right' ? 180 : 0)}deg)
                //     translateX(${position == 'right' ? -50 : 50}%)
                //     translateZ(${20 * (isFlipped ? (props.index - props.currentPage * 2 - 1) : props.index) * (position == 'right' ? 1 : -1)}px)
                // `
                transform: `
                    translateZ(${-props.space * (isFlipped ? (props.currentPage * 2 - props.index + 1) : props.index)}px)
                    rotateY(${isFlipped ? (position == 'left' ? -180 : 0) : (position == 'right' ? 180 : 0)}deg)
                    translateX(${position == 'right' ? -50 : 50}%)
                `
            }}
        >
            {props.children}
        </div>
    )
}
