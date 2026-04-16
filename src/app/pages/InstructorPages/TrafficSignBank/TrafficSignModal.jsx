import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const defaultFormData = {
    signCategoryId: '',
    name: '',
    code: '',
    description: '',
    image: '',
    status: 1,
    index: 1
};

export default function TrafficSignModal({ isOpen, onClose, selectedData, categories, onRefresh }) {
    const { user, refreshNewToken } = useAuth?.() || {};
    const token = user?.token || '';

    const [formData, setFormData] = useState({ ...defaultFormData });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        if (selectedData) {
            setFormData({
                signCategoryId: selectedData.signCategoryId || '',
                name: selectedData.name || '',
                code: selectedData.code || '',
                description: selectedData.description || '',
                image: selectedData.image || '',
                status: selectedData.status ?? 1,
                index: selectedData.index || 1
            });
        } else {
            setFormData({ ...defaultFormData });
        }
        setError('');
    }, [isOpen, selectedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'index' || name === 'status' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async () => {
        // Validation cơ bản
        if (!formData.signCategoryId) { setError('Vui lòng chọn loại biển báo.'); return; }
        if (!formData.code.trim()) { setError('Mã biển báo không được để trống.'); return; }
        if (!formData.name.trim()) { setError('Tên biển báo không được để trống.'); return; }

        setIsSubmitting(true);
        setError('');

        try {
            if (selectedData?.id) {
                // Update
                try {
                    await putData(`TrafficSigns/${selectedData.id}`, formData, token);
                    onRefresh && onRefresh();
                } catch (err) {
                    if (err.status === 401) refreshNewToken?.(user);
                    throw err;
                }
            } else {
                // Create
                try {
                    await postData('TrafficSigns', formData, token);
                    onRefresh && onRefresh();
                } catch (err) {
                    if (err.status === 401) refreshNewToken?.(user);
                    throw err;
                }
            }
            onClose();
        } catch (err) {
            setError(err?.data?.message || err?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedData ? 'Chỉnh sửa biển báo' : 'Thêm biển báo mới'}
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={isSubmitting}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={isSubmitting}>
                        <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {selectedData ? ' Cập nhật' : ' Lưu'}
                    </button>
                </>
            }
        >
            {error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}

            {/* Loại biển báo */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Loại biển báo <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <select
                    className='ins-form-input'
                    name='signCategoryId'
                    value={formData.signCategoryId}
                    onChange={handleChange}
                >
                    <option value="">-- Chọn loại biển báo --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Mã và Thứ tự trên cùng một hàng */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Mã biển báo <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <input
                        className='ins-form-input'
                        type='text'
                        name='code'
                        value={formData.code}
                        onChange={handleChange}
                        placeholder='Ví dụ: P.101'
                        maxLength={50}
                    />
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Thứ tự hiển thị</label>
                    <input
                        className='ins-form-input'
                        type='number'
                        name='index'
                        value={formData.index}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
            </div>

            {/* Tên biển báo */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Tên biển báo <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <input
                    className='ins-form-input'
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Nhập tên biển báo...'
                    maxLength={255}
                />
            </div>

            {/* URL Hình ảnh */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>URL Hình ảnh</label>
                <input
                    className='ins-form-input'
                    type='text'
                    name='image'
                    value={formData.image}
                    onChange={handleChange}
                    placeholder='https://example.com/image.png'
                />
                {formData.image && (
                    <div style={{ marginTop: '8px', textAlign: 'center', background: 'var(--ins-surface-low)', padding: '8px', borderRadius: '8px' }}>
                        <img src={formData.image} alt="Preview" style={{ maxHeight: '100px', borderRadius: '4px' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                )}
            </div>

            {/* Mô tả */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả</label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Mô tả chi tiết ý nghĩa biển báo...'
                    style={{ minHeight: '100px' }}
                />
            </div>
        </Modal>
    );
}