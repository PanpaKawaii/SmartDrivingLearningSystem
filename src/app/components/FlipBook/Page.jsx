
import './Page.css';

export default function Page(props) {
    const position = props.index % 2 == 0 ? 'right' : 'left';
    const isFlipped = props.index <= props.currentPage;
    return (
        <div
            className='page-container'
            style={{
                zIndex: props.index,
                backgroundColor: props.color,
                // transform: `
                //     rotateY(${isFlipped ? (position == 'left' ? -180 : 0) : (position == 'right' ? 180 : 0)}deg)
                //     translateX(${position == 'right' ? -50 : 50}%)
                //     translateZ(${20 * (isFlipped ? (props.index - props.currentPage * 2 - 1) : props.index) * (position == 'right' ? 1 : -1)}px)
                // `
                transform: `
                    translateZ(${-1 * (isFlipped ? (props.currentPage * 2 - props.index + 1) : props.index)}px)
                    rotateY(${isFlipped ? (position == 'left' ? -180 : 0) : (position == 'right' ? 180 : 0)}deg)
                    translateX(${position == 'right' ? -50 : 50}%)
                `
            }}
        >
            {props.children}
        </div>
    )
}
