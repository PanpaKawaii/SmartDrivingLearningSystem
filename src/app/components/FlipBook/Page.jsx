
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
                // rotateY(${isFlipped ? -180 : (position == 'right' ? -180 : 0)}deg)
                transform: `
                    rotateY(${isFlipped ? -180 : 0}deg)
                    translateX(50%)
                    translateZ(${- props.index * 10}px)
                `
            }}
        >
            {props.children}
        </div>
    )
}
