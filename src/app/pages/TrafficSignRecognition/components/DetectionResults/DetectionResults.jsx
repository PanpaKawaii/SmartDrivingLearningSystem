import DetectionCard from '../DetectionCard/DetectionCard';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import './DetectionResults.css';

export default function DetectionResults({ rawOutput }) {
    if (!rawOutput) return null;

    const rawData = Array.isArray(rawOutput) ? rawOutput[0] : rawOutput;

    const collectTexts = (value) => {
        if (!value) return [];

        if (typeof value === 'string') {
            const trimmed = value.trim();
            return trimmed ? [trimmed] : [];
        }

        if (Array.isArray(value)) {
            return value.flatMap((item) => collectTexts(item));
        }

        if (typeof value === 'object') {
            if (typeof value.content === 'string') return collectTexts(value.content);
            if (typeof value.result === 'string') return collectTexts(value.result);
        }

        return [];
    };

    const predictions = rawData?.predictions?.predictions || rawData?.predictions || [];
    const ocrText = rawData?.ocr_text;
    const hasPredictions = Array.isArray(predictions) && predictions.length > 0;
    const hasOcr = typeof ocrText === 'string' && ocrText.trim();

    const aiResult = [
        ...collectTexts(rawData?.result),
        ...collectTexts(rawData?.DetectionResult),
        ...collectTexts(rawData?.Capston),
    ].filter((text, index, arr) => arr.indexOf(text) === index);
    const hasAiResult = aiResult.length > 0;

    let parsedAiResults = [];
    let isParsedResult = false;

    if (hasAiResult) {
        for (const contentString of aiResult) {
            try {
                const cleanContent = contentString.replace(/```json/gi, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(cleanContent);
                if (Array.isArray(parsed)) {
                    parsedAiResults = parsed;
                    isParsedResult = true;
                    break;
                }
            } catch (e) {
                console.warn('Could not parse AI result content as JSON', e);
            }
        }
    }

    const isCustomEmpty = hasAiResult && isParsedResult && parsedAiResults.length === 0;

    if (!hasPredictions && !hasOcr && isCustomEmpty) {
        return (
            <div className='result-placeholder result-placeholder-warning'>
                <div className='placeholder-icon'>
                    <i className='fa-solid fa-eye-slash' />
                </div>
                <p className='warning-title'>Cảnh báo: Không thể nhận diện</p>
                <p className='hint-text'>
                    AI không tìm thấy hoặc không thể đọc được nội dung biển báo nào rõ ràng trong bức ảnh này. Xin vui lòng thử lại với ảnh khác rõ nét hơn.
                </p>
            </div>
        );
    }

    if (!hasPredictions && !hasOcr && !hasAiResult) {
        return (
            <div className='result-placeholder'>
                <div className='placeholder-icon'>
                    <i className='fa-solid fa-circle-info' />
                </div>
                <p className='hint-text'>Không có dữ liệu nhận diện để hiển thị.</p>
            </div>
        );
    }

    const formatMarkdownList = (text) => {
        if (!text) return <div />;

        let html = text;

        // Headings: convert markdown heading markers to HTML headings
        html = html.replace(/^###\s*(.*)$/gm, '<h3 class="md-h3">$1</h3>');
        html = html.replace(/^##\s*(.*)$/gm, '<h2 class="md-h2">$1</h2>');
        html = html.replace(/^#\s*(.*)$/gm, '<h1 class="md-h1">$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // List items using '-' or '*' normalize to <li>
        html = html.replace(/^\s*[-\*]\s+(.*)$/gm, '<li class="formatted-li">$1</li>');

        // Wrap consecutive <li> items into <ul>
        html = html.replace(/(<li[\s\S]*?<\/li>)(?:\s*<li[\s\S]*?<\/li>)+/g, (match) => {
            // collect all li items
            const items = match.match(/<li[\s\S]*?<\/li>/g) || [];
            return `<ul class="formatted-ul">${items.join('')}</ul>`;
        });

        // Replace remaining newlines with <br /> for plain paragraphs
        html = html.replace(/\n+/g, '<br />');

        // Collapse multiple <br />
        html = html.replace(/(<br \/>){3,}/g, '<br /><br />');

        const clean = DOMPurify.sanitize(html || '');
        return <div>{parse(clean)}</div>;
    };

    return (
        <div className='detections'>
            {hasAiResult && (
                <div className='ai-result-section'>
                    <div className='section-label'>
                        <i className='fa-solid fa-list-check' />
                        <span>Kết quả nhận diện</span>
                    </div>
                    {isParsedResult ? (
                        <div className='parsed-results-list'>
                            {parsedAiResults.map((item, idx) => (
                                <div key={idx} className='parsed-result-item'>
                                    {item.Capston && (
                                        <div className='result-capston'>
                                            <span className='label'>Biển báo:</span>
                                            <span className='value'>{item.Capston}</span>
                                        </div>
                                    )}
                                    {item.result && (
                                        <div className='result-desc'>
                                            {item.result}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        aiResult.map((content, idx) => {
                            return (
                                <div key={idx} className='formatted-text-block'>
                                    {formatMarkdownList(content || '')}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {hasOcr && (
                <div className='ocr-result'>
                    <div className='ocr-label'>
                        <i className='fa-solid fa-font' />
                        <span>Văn bản nhận diện</span>
                    </div>
                    <p className='ocr-text'>{ocrText}</p>
                </div>
            )}

            {hasPredictions && (
                <>
                    <div className='detections-summary'>
                        <span className='count-badge'>{predictions.length}</span>
                        <span>biển báo được phát hiện</span>
                    </div>
                    <div className='detection-list'>
                        {predictions.map((pred, idx) => (
                            <DetectionCard key={idx} prediction={pred} index={idx} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
