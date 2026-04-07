import './AutoResizeTextarea.css';

export default function AutoResizeTextarea({
    refer = null,
    placeholder = '',
    disable = false,
}) {
    const handleInput = () => {
        const textarea = refer.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 4 + 'px';
    };

    return (
        <textarea
            ref={refer}
            className='auto-textarea'
            rows={1}
            placeholder={placeholder}
            onInput={handleInput}
            disabled={disable}
        />
    )
}
