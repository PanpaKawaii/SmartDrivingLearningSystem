import { useEffect, useState } from 'react';
import InstructorModal from '../../../components/InstructorComponent/InstructorModal';

export default function ReportFeedbackModal({
    isOpen,
    mode,
    report,
    reportCategoryName,
    entityDetails,
    resolve,
    onClose,
    onSubmit,
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        setTitle(resolve?.title || '');
        setContent(resolve?.content || '');
        setError('');
    }, [isOpen, resolve, mode, report]);

    if (!report) return null;

    const isViewMode = mode === 'view';
    const isValid = title.trim().length >= 3 && content.trim().length >= 10;

    const handleSubmit = () => {
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

        onSubmit({ title: title.trim(), content: content.trim() });
    };

    return (
        <InstructorModal
            isOpen={isOpen}
            onClose={onClose}
            title={isViewMode ? 'Chi tiet bao cao loi noi dung' : 'Xu ly bao cao loi noi dung'}
            wide
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose}>
                        {isViewMode ? 'Dong' : 'Huy'}
                    </button>
                    {!isViewMode && (
                        <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={!isValid}>
                            Gui phan hoi
                        </button>
                    )}
                </>
            }
        >
            <div className='ins-form-group'>
                <label className='ins-form-label'>Loai bao cao</label>
                <div className='ins-form-static'>{reportCategoryName}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Tieu de bao cao</label>
                <div className='ins-form-static'>{report.title}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Noi dung bao cao</label>
                <div className='ins-form-static'>{report.content}</div>
            </div>

            {entityDetails && (
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Chi tiet doi tuong lien quan ({entityDetails.type})</label>
                    <div className='ins-report-entity-detail'>
                        <div className='entity-header'>{entityDetails.label}</div>
                        <div className='entity-content'>{entityDetails.content}</div>
                        {entityDetails.details && Object.keys(entityDetails.details).length > 0 && (
                            <div className='entity-meta'>
                                {Object.entries(entityDetails.details).map(([key, value]) => (
                                    <div key={key} className='meta-row'>
                                        <span className='meta-label'>{key}:</span>
                                        <span className='meta-value'>{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className='ins-form-group'>
                <label className='ins-form-label'>Nguoi bao cao</label>
                <div className='ins-form-static'>User #{report.userId}</div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Trang thai</label>
                <div className='ins-form-static'>{report.status === 1 ? 'Chua xu ly' : 'Da xu ly'}</div>
            </div>

            {resolve && (
                <>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Phan hoi hien tai</label>
                        <div className='ins-form-static'>{resolve.title}</div>
                    </div>
                    <div className='ins-form-group'>
                        <label className='ins-form-label'>Noi dung phan hoi hien tai</label>
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
                        ></textarea>
                    </div>
                    {error && <div style={{ color: 'var(--ins-error)', fontSize: '0.875rem' }}>{error}</div>}
                    <div style={{ fontSize: '0.8rem', color: 'var(--ins-on-surface-variant)' }}>
                        {title.trim().length}/3 ky tu tieu de, {content.trim().length}/10 ky tu noi dung
                    </div>
                </>
            )}
        </InstructorModal>
    );
}
