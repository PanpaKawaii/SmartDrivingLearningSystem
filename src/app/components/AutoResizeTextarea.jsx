import './AutoResizeTextarea.css';

export default function AutoResizeTextarea({
    refer = null,
    placeholder = '',
}) {
    const handleInput = () => {
        const textarea = refer.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (
        <textarea
            ref={refer}
            className='auto-textarea'
            rows={1}
            placeholder={placeholder}
            onInput={handleInput}
        />
    )
}
