import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { postData, putData, fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const defaultChapter = {
    drivingLicenseId: '',
    name: '',
    description: '',
    index: 1,
};

export default function ChapterModal({ isOpen, onClose, onSave, chapter: chapterProp, action, defaultLicenseId }) {
    const { user, refreshNewToken } = useAuth?.() || {};
    const token = user?.token || '';

    const [chapter, setChapter] = useState({ ...defaultChapter });
    const [licenses, setLicenses] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const query = new URLSearchParams({ page: '1', pageSize: '100' });
                const res = await fetchData(`DrivingLicenses/all?${query.toString()}`, token);
                const items = Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : []);
                setLicenses(items.filter(l => l.status === 1));
            } catch (e) { 
                console.error('Error saving lesson:', e);
                setError('Lỗi tải danh sách hạng bằng lái.');}
        })();
    }, [token]);

    useEffect(() => {
        if (!isOpen) return;
        setError('');
        if (action === 'edit' && chapterProp) {
            setChapter({
                drivingLicenseId: chapterProp.drivingLicenseId || '',
                name: chapterProp.name || '',
                description: chapterProp.description || '',
                index: chapterProp.index ?? 1,
            });
        } else {
            setChapter({
                ...defaultChapter,
                // Pre-fill từ quick navigate
                drivingLicenseId: defaultLicenseId || '',
            });
        }
    }, [isOpen, action, chapterProp, defaultLicenseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChapter(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!chapter.name.trim()) { setError('Tên chương không được để trống.'); return; }
        if (!chapter.drivingLicenseId) { setError('Vui lòng chọn hạng bằng lái.'); return; }
        if (!chapter.index || Number(chapter.index) < 1) { setError('Vị trí phải là số nguyên ≥ 1.'); return; }

        setSaving(true);
        setError('');
        try {
            const payload = {
                drivingLicenseId: chapter.drivingLicenseId,
                index: Number(chapter.index),
                name: chapter.name.trim(),
                description: chapter.description.trim(),
            };

            if (action === 'edit' && chapterProp?.id) {
                const res = await putData(`QuestionChapters/${chapterProp.id}`, payload, token);
                onSave && onSave(res || { ...chapterProp, ...payload }, 'edit');
            } else {
                const res = await postData('QuestionChapters', payload, token);
                onSave && onSave(res, 'create');
            }
            onClose();
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                setError(error?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === 'edit' ? 'Chỉnh sửa chương' : 'Thêm chương mới'}
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={saving}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={saving}>
                        <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {action === 'edit' ? ' Cập nhật' : ' Lưu chương'}
                    </button>
                </>
            }
            message={error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}
        >
            

            {/* Hạng bằng lái */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Hạng bằng lái <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <select
                    className='ins-form-select'
                    name='drivingLicenseId'
                    value={chapter.drivingLicenseId}
                    onChange={handleChange}
                    disabled={action === 'edit'}
                >
                    <option value='' disabled>Chọn hạng bằng...</option>
                    {licenses.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
                {action === 'edit' && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--ins-on-surface-variant)', marginTop: 4 }}>
                        Không thể thay đổi hạng bằng sau khi tạo.
                    </p>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Tên chương <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <input
                        className='ins-form-input'
                        type='text'
                        name='name'
                        value={chapter.name}
                        onChange={handleChange}
                        placeholder='Ví dụ: Chương 1 - Khái niệm cơ bản...'
                        maxLength={255}
                    />
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Vị trí (index) <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <input
                        className='ins-form-input'
                        type='number'
                        name='index'
                        value={chapter.index}
                        onChange={e => {
                            const val = e.target.value;
                            if (val === '' || /^[1-9]\d*$/.test(val))
                                setChapter(prev => ({ ...prev, index: val === '' ? '' : parseInt(val, 10) }));
                        }}
                        min={1}
                        step={1}
                        style={{ width: '80px' }}
                        placeholder='1'
                    />
                </div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả</label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={chapter.description}
                    onChange={handleChange}
                    placeholder='Mô tả tổng quan về nội dung chương...'
                    maxLength={255}
                    style={{ minHeight: '80px' }}
                />
            </div>
        </Modal>
    );
}
