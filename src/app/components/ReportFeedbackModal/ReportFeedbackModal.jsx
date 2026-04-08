import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal.jsx';

export default function ReportFeedbackModal({
    isOpen,
    mode,
    report,
    resolve,
    actionType,
    initialTitle,
    onOpenEntity,
    onClose,
    onSubmit,
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setTitle(resolve?.title || initialTitle || '');
        setContent(resolve?.content || '');
        setError('');
        setSubmitting(false);
    }, [isOpen, resolve, mode, report, initialTitle]);

    if (!report) return null;

    const isViewMode = mode === 'view';
    const isValid = title.trim().length >= 3 && content.trim().length >= 10;

    const handleSubmit = async () => {
        if (isViewMode) {
            onClose();
            return;
        }

        if (title.trim().length < 3) {
            setError('Tieu de phan hoi phai co it nhat 3 ky tu');
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

            {onOpenEntity && (
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Đối tượng liên quan</label>
                    <button className='ins-btn ins-btn-secondary' type='button' onClick={onOpenEntity}>
                        Xem chi tiết đối tượng
                    </button>
                </div>
            )}

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
                    </div>
                    {error && <div style={{ color: 'var(--ins-error)', fontSize: '0.875rem' }}>{error}</div>}
                    <div style={{ fontSize: '0.8rem', color: 'var(--ins-on-surface-variant)' }}>
                        {content.trim().length}/10 ký tự (Tối thiểu 10 ký tự)
                    </div>
                </>
            )}
        </Modal>
    );
}
