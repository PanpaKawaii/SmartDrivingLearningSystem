import './SmallSpinner.css';

export default function SmallSpinner({
    size = 16,
}) {
    return (
        <div className='small-spinner' style={{ fontSize: size }}>
            <i className='fa-solid fa-spinner' style={{ fontSize: size }} />
        </div>
    )
}
