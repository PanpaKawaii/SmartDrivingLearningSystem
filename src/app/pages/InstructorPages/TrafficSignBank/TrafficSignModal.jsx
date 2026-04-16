//src/app/pages/InstructorPages/TrafficSignBank/TrafficSignModal.jsx
import { useState, useEffect, useRef } from 'react';
import Modal from '../../../components/Shared/Modal';
import { postData, putData, uploadMedia } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB tính bằng bytes

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
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({ ...defaultFormData });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
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
            setPreviewUrl(selectedData.image || '');
        } else {
            setFormData({ ...defaultFormData });
            setPreviewUrl('');
        }
        setSelectedFile(null);
        setError('');
    }, [isOpen, selectedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'index' || name === 'status' ? parseInt(value) || 0 : value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Kiểm tra dung lượng file
            if (file.size > MAX_FILE_SIZE) {
                setError('Dung lượng ảnh quá lớn (tối đa 3MB). Vui lòng chọn ảnh khác.');
                // Reset file input để người dùng có thể chọn lại cùng 1 file nhỏ hơn nếu cần
                e.target.value = '';
                return;
            }

            setError(''); // Xóa lỗi cũ nếu file hợp lệ
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!formData.signCategoryId) { setError('Vui lòng chọn loại biển báo.'); return; }
        if (!formData.code.trim()) { setError('Mã biển báo không được để trống.'); return; }
        if (!formData.name.trim()) { setError('Tên biển báo không được để trống.'); return; }

        setIsSubmitting(true);
        setError('');

        const runProcess = async (currentToken) => {
            let currentId = selectedData?.id;
            let finalImageUrl = formData.image;

            if (!currentId) {
                const createPayload = { ...formData, image: null };
                const result = await postData('TrafficSigns', createPayload, currentToken);
                currentId = result.id;
            } else {
                await putData(`TrafficSigns/${currentId}`, formData, currentToken);
            }

            if (selectedFile && currentId) {
                const uploadResults = await uploadMedia([selectedFile], currentId, "TrafficSign", currentToken);
                const uploadedUrl = uploadResults[0]?.url || uploadResults[0];

                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                    const finalPayload = { ...formData, image: finalImageUrl };
                    await putData(`TrafficSigns/${currentId}`, finalPayload, currentToken);
                    setPreviewUrl(`${uploadedUrl}?t=${new Date().getTime()}`);
                }
            }
        };

        try {
            await runProcess(token);
            onRefresh && onRefresh();
            onClose();
        } catch (err) {
            if (err.status === 401 && refreshNewToken) {
                try {
                    const refreshResult = await refreshNewToken(user);
                    if (refreshResult?.message === 'Refreshed' && refreshResult?.token) {
                        const newToken = refreshResult.token;
                        await runProcess(newToken);
                        onRefresh && onRefresh();
                        onClose();
                        return;
                    } else if (refreshResult?.message === 'Logout') {
                        setError('Phiên đăng nhập hết hạn hoặc tài khoản bị khóa.');
                        return;
                    }
                } catch (refreshErr) {
                    setError('Không thể làm mới phiên đăng nhập.');
                    return;
                }
            }
            setError(err?.data?.message || err?.message || 'Có lỗi xảy ra.');
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
                        {isSubmitting ? ' Đang lưu...' : (selectedData ? ' Cập nhật' : ' Lưu')}
                    </button>
                </>
            }
        >
            {error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}

            <div className='ins-form-group'>
                <label className='ins-form-label'>Loại biển báo <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <select className='ins-form-input' name='signCategoryId' value={formData.signCategoryId} onChange={handleChange}>
                    <option value="">-- Chọn loại biển báo --</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Mã biển báo *</label>
                    <input className='ins-form-input' name='code' value={formData.code} onChange={handleChange} placeholder='P.101' />
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Thứ tự hiển thị</label>
                    <input className='ins-form-input' type='number' name='index' value={formData.index} onChange={handleChange} min="1" />
                </div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Tên biển báo *</label>
                <input className='ins-form-input' name='name' value={formData.name} onChange={handleChange} placeholder='Nhập tên biển báo...' />
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Hình ảnh biển báo (Tối đa 3MB)</label>
                <div
                    className="ins-file-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        border: error.includes('Dung lượng') ? '2px dashed var(--ins-error)' : '2px dashed #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: 'var(--ins-surface-low)'
                    }}
                >
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileSelect} />
                    {previewUrl ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={previewUrl.startsWith('blob:') ? previewUrl : `${previewUrl}?t=${new Date().getTime()}`}
                                alt="Preview"
                                style={{ maxHeight: '100px', borderRadius: '4px' }}
                            />
                            <div style={{ fontSize: '12px', color: 'var(--ins-primary)', marginTop: '5px' }}>Nhấn để thay đổi hình ảnh</div>
                        </div>
                    ) : (
                        <div style={{ padding: '10px' }}>
                            <i className="fa-solid fa-image" style={{ fontSize: '24px', color: '#aaa', marginBottom: '8px' }}></i>
                            <div style={{ fontSize: '14px', color: '#666' }}>Chọn file ảnh biển báo</div>
                        </div>
                    )}
                </div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả</label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Mô tả chi tiết ý nghĩa biển báo...'
                    style={{ minHeight: '80px' }}
                />
            </div>
        </Modal>
    );
}