import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../EditModal.css';

export default function EditCategoryModal({ item, config, onClose, setRefresh, action, showFeedback }) {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(item || { name: '', description: '', colorCode: '#3b82f6', status: 1 });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitData = async (retryToken = null) => {
        const token = retryToken || authUser?.token || '';
        try {
            if (action === 'create') {
                await postData(config.endpoint, formData, token);
            } else {
                await putData(`${config.endpoint}/${item.id}`, formData, token);
            }
            showFeedback('success', action === 'create' ? 'Thêm mới thành công!' : 'Cập nhật thành công!');
            setRefresh(p => p + 1);
            onClose();
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(authUser);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                } else if (refreshResult?.token) {
                    return await submitData(refreshResult.token);
                }
            } else {
                showFeedback('error', err.data?.message || "Không thể lưu dữ liệu");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        submitData();
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box' style={{ maxWidth: '500px' }}>
                <button className='btn close-btn' onClick={onClose}>
                    <i className='fa-solid fa-xmark'></i>
                </button>

                <form onSubmit={handleSubmit}>
                    <div className='edit-title'>
                        {action === 'create' ? `Tạo ${config.label}` : `Sửa ${config.label}`}
                    </div>

                    <div className='input-group'>
                        <input name='name' value={formData.name || ''} onChange={handleChange} required placeholder=' ' />
                        <label>Tên danh mục</label>
                    </div>

                    <div className='input-group'>
                        <textarea name='description' value={formData.description || ''} onChange={handleChange} placeholder=' ' rows="4" />
                        <label>Mô tả chi tiết</label>
                    </div>

                    {config.hasColor && (
                        <div className='input-group'>
                            <div className='flex' style={{ alignItems: 'center', gap: '15px' }}>
                                <input
                                    name='colorCode' type='color'
                                    value={formData.colorCode || '#3b82f6'}
                                    onChange={handleChange}
                                    style={{ width: '60px', height: '40px', padding: '2px', cursor: 'pointer' }}
                                />
                                <input
                                    name='colorCode' type='text'
                                    value={formData.colorCode || ''}
                                    onChange={handleChange}
                                    placeholder='#ffffff' style={{ flex: 1 }}
                                />
                            </div>
                            <label className='static-label' style={{ position: 'relative', top: '-10px', fontSize: '12px', color: '#666' }}>
                                Mã màu hiển thị
                            </label>
                        </div>
                    )}

                    <div className='btn-box' style={{ marginTop: '30px' }}>
                        <button type='submit' className='btn btn-save' disabled={loading}>
                            {loading ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                        </button>
                        <button type='button' className='btn' onClick={onClose}>HỦY</button>
                    </div>
                </form>
            </div>
        </div>
    );
}