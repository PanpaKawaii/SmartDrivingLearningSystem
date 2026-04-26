import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal.jsx';

export default function ReportFeedbackModal({
    isOpen,
    mode,
    report,
    resolve,
    actionType,
    initialTitle,
    showReportedContentButton = false,
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
        console.log('ReportFeedbackModal opened with report:', report, 'and resolve:', resolve);
        setTitle(resolve?.title || initialTitle || '');
        setContent(resolve?.content || '');
        setError('');
        setSubmitting(false);
    }, [isOpen, resolve, mode, report, initialTitle]);

    if (!report) return null;

    const isViewMode = mode === 'view';
    const isValid = title.trim().length >= 5 && content.trim().length >= 10;
    const hasEntityNavigation = typeof onOpenEntity === 'function';

    const handleSubmit = async () => {
        console.log('Submitting feedback with title:', title, 'and content:', content);
        if (isViewMode) {
            onClose();
            return;
        }

        if (title.trim().length < 5) {
            setError('Tiêu đề phản hồi phải có ít nhất 5 ký tự');
            return;
        }

        if (content.trim().length < 10) {
            setError('Nội dung phản hồi phải có ít nhất 10 ký tự');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const result = await onSubmit({ title: title.trim(), content: content.trim() });

            if (result?.error) {
                setError(result.error);
                setSubmitting(false); // Quan trọng: chỉ set lại false khi có lỗi để user sửa
            }
        } catch (err) {
            setError("Có lỗi xảy ra ngoài dự kiến.");
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isViewMode ? 'Chi tiết báo cáo' : actionType === 'disapprove' ? 'Bỏ qua báo cáo' : 'Duyệt báo cáo'}
            wide
            translate="no"
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={submitting}>
                        {isViewMode ? 'Đóng' : 'Hủy'}
                    </button>
                    {isViewMode && showReportedContentButton && hasEntityNavigation && (
                        <button className='ins-btn ins-btn-primary' onClick={onOpenEntity}>
                            Xem nội dung bị báo cáo
                        </button>
                    )}
                    {!isViewMode && (
                        <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={!isValid || submitting}>
                            {submitting ? 'Đang gửi...' : actionType === 'disapprove' ? 'Bỏ qua' : 'Duyệt'}
                        </button>
                    )}
                </>
            }
        >

            <div className='ins-form-group'>
                <label className='ins-form-label'>Loại báo cáo</label>
                <div className='ins-form-static'>{report?.reportCategory?.name || '---'}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Tiêu đề báo cáo</label>
                <div className='ins-form-static'>{report?.title}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Nội dung báo cáo</label>
                <div className='ins-form-static'>{report?.content}</div>
            </div>

            {showReportedContentButton && isViewMode && (
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Nội dung bị báo cáo</label>
                    <button
                        className='ins-btn ins-btn-secondary'
                        onClick={onOpenEntity}
                        disabled={!hasEntityNavigation}
                    >
                        Đi đến trang quản lý nội dung
                    </button>
                </div>
            )}

            <div className='ins-form-group'>
                <label className='ins-form-label'>Người báo cáo</label>
                <div className='ins-form-static'>{report?.user?.name}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Trạng thái</label>
                <div className='ins-form-static'>{report?.status === -1 ? 'Chưa xử lý' : 'Đã xử lý'}</div>
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
                        <label className='ins-form-label'>Tiêu đề phản hồi</label>
                        <input
                            className='ins-form-input'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError('');
                            }}
                            placeholder='Nhập tiêu đề phản hồi...'
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
                        <label className='ins-form-label'>Nội dung phản hồi</label>
                        <textarea
                            className='ins-form-textarea'
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setError('');
                            }}
                            placeholder='Nhập phản hồi cho người báo cáo...'
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
