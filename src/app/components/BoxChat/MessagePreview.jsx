import './MessagePreview.css';

export default function MessagePreview({
    visible,
    message,
}) {
    if (!visible) return null;
    return (
        <div className='message-preview'>
            {message}
        </div>
    )
}
