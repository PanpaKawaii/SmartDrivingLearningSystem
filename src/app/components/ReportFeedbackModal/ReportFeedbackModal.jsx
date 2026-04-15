import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal.jsx';

export default function ReportFeedbackModal({
    isOpen,
    mode,
    report,
    resolve,
    actionType,
    initialTitle,
    onClose,
    onSubmit,
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        console.log('ReportFeedbackModal opened with report:', report, 'and resolve:', resolve);
        setTitle(resolve?.title || initialTitle || '');
        setContent(resolve?.content || '');
        setError('');
        setSubmitting(false);
    }, [isOpen, resolve, mode, report, initialTitle]);

    if (!report) return null;

    const isViewMode = mode === 'view';
    const isValid = title.trim().length >= 5 && content.trim().length >= 10;

    const handleSubmit = async () => {
        console.log('Submitting feedback with title:', title, 'and content:', content);
        if (isViewMode) {
            onClose();
            return;
        }

        if (title.trim().length < 5) {
            setError('Tieu de phan hoi phai co it nhat 5 ky tu');
            return;
        }

        if (content.trim().length < 10) {
            setError('Noi dung phan hoi phai co it nhat 10 ky tu');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const result = await onSubmit({ title: title.trim(), content: content.trim() });
            console.log('Submit result:', result);
            if (result?.error) {
                setError(result.error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isViewMode ? 'Chi tiet bao cao' : actionType === 'disapprove' ? 'Bo qua bao cao' : 'Duyet bao cao'}
            wide
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={submitting}>
                        {isViewMode ? 'Dong' : 'Huy'}
                    </button>
                    {!isViewMode && (
                        <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={!isValid || submitting}>
                            {submitting ? 'Dang gui...' : actionType === 'disapprove' ? 'Bo qua' : 'Duyet'}
                        </button>
                    )}
                </>
            }
        >

            <div className='ins-form-group'>
                <label className='ins-form-label'>Loại báo cáo</label>
                <div className='ins-form-static'>{report?.reportCategory?.name ||'---'}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Tiêu đề báo cáo</label>
                <div className='ins-form-static'>{report?.title}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Nội dung báo cáo</label>
                <div className='ins-form-static'>{report?.content}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Người báo cáo</label>
                <div className='ins-form-static'>{report?.user?.name}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Trạng thái</label>
                <div className='ins-form-static'>{report?.status === 1 ? 'Chưa xử lý' : 'Đã xử lý'}</div>
            </div>

            {resolve && (
                <>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Phản hồi hiện tại</label>
                        <div className='ins-form-static'>{resolve.title}</div>
                    </div>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Nội dung phản hồi hiện tại</label>
                        <div className='ins-form-static'>{resolve.content}</div>
                    </div>
                </>
            )}

            {!isViewMode && (
                <>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Tieu de phan hoi</label>
                        <input
                            className='ins-form-input'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError('');
                            }}
                            placeholder='Nhap tieu de phan hoi...'
                            disabled={submitting}
                        />
                        <div style={{ 
                            fontSize: '0.8rem', 
                            color: title.trim().length >= 5 ? 'var(--ins-on-surface-variant)' : 'var(--ins-error)',
                            marginTop: '4px'
                        }}>
                            {title.trim().length}/5 ký tự (Tối thiểu 5 ký tự) {title.trim().length < 5}
                        </div>
                    </div>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Noi dung phan hoi</label>
                        <textarea
                            className='ins-form-textarea'
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setError('');
                            }}
                            placeholder='Nhap phan hoi cho nguoi bao cao...'
                            disabled={submitting}
                        ></textarea>
                        <div style={{ 
                            fontSize: '0.8rem', 
                            color: content.trim().length >= 10 ? 'var(--ins-on-surface-variant)' : 'var(--ins-error)',
                            marginTop: '4px'
                        }}>
                            {content.trim().length}/10 ký tự (Tối thiểu 10 ký tự) {content.trim().length < 10}
                        </div>
                    </div>
                    {error && <div style={{ color: 'var(--ins-error)', fontSize: '0.875rem', marginTop: '8px' }}>{error}</div>}
                </>
            )}
        </Modal>
    );
}
