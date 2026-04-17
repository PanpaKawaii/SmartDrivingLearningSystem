import './DetectionCard.css';

export default function DetectionCard({ prediction, index }) {
    const confidence = prediction?.confidence ?? prediction?.score;
    const label = prediction?.class || prediction?.label || prediction?.class_name || `Object ${index + 1}`;
    const text = prediction?.text || prediction?.recognized_text;
    const confidencePercent = confidence != null ? Math.round(confidence * 100) : null;
    const confidenceColor =
        confidencePercent >= 80 ? '#52c41a' :
        confidencePercent >= 50 ? '#faad14' : '#ff4d4f';

    return (
        <div className='detection-card' style={{ animationDelay: `${index * 0.08}s` }}>
            <div className='detection-index'>
                <span>{index + 1}</span>
            </div>
            <div className='detection-info'>
                <div className='detection-label'>
                    <i className='fa-solid fa-triangle-exclamation' />
                    <strong>{label}</strong>
                </div>
                {text && (
                    <div className='detection-text'>
                        <i className='fa-solid fa-font' />
                        <span>{text}</span>
                    </div>
                )}
                {prediction?.x != null && (
                    <div className='detection-coords'>
                        <span>x: {Math.round(prediction.x)}</span>
                        <span>y: {Math.round(prediction.y)}</span>
                        {prediction?.width && <span>w: {Math.round(prediction.width)}</span>}
                        {prediction?.height && <span>h: {Math.round(prediction.height)}</span>}
                    </div>
                )}
            </div>
            {confidencePercent != null && (
                <div className='detection-confidence'>
                    <div className='confidence-bar-wrapper'>
                        <div
                            className='confidence-bar'
                            style={{ width: `${confidencePercent}%`, background: confidenceColor }}
                        />
                    </div>
                    <span className='confidence-label' style={{ color: confidenceColor }}>
                        {confidencePercent}%
                    </span>
                </div>
            )}
        </div>
    );
}
