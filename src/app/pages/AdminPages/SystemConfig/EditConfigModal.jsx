import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../EditModal.css';

export default function EditConfigModal({ configProp, action, onClose, setRefresh }) {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(configProp);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = (name === 'value' || name === 'status') ? Number(value) : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    // Hàm submit có khả năng nhận token mới để retry
    const submitData = async (retryToken = null) => {
        const token = retryToken || authUser?.token || '';

        // Chuẩn bị payload
        const payload = { ...formData };
        if (action === 'edit') {
            payload.status = 1; // Ép status bằng 1 khi update
        }

        try {
            if (action === 'create') {
                await postData('SystemConfigs', payload, token);
            } else {
                await putData(`SystemConfigs/${payload.id}`, payload, token);
            }
            setRefresh(prev => prev + 1);
            onClose();
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(authUser);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                } else if (refreshResult?.token) {
                    // Thử lại với token mới vừa lấy được
                    return await submitData(refreshResult.token);
                }
            } else {
                alert("Lỗi: " + (err.data?.message || err.message || "Không thể lưu dữ liệu"));
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
                        {action === 'create' ? 'Tạo cấu hình mới' : 'Cập nhật cấu hình'}
                    </div>

                    <div className='input-group'>
                        <input
                            name='name'
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                            placeholder=' '
                            readOnly={action === 'edit'}
                            style={action === 'edit' ? {
                                backgroundColor: 'var(--ins-surface-low)',
                                color: 'var(--ins-on-surface)',
                                cursor: 'not-allowed'
                            } : {}}
                        />
                        <label>{action === 'edit' ? 'Tên cấu hình (Chỉ xem)' : 'Tên cấu hình (Name)'}</label>
                    </div>

                    <div className='input-group'>
                        <input
                            name='value'
                            type='number'
                            value={formData.value}
                            onChange={handleChange}
                            required
                            placeholder=' '
                        />
                        <label>Giá trị (Value - Kiểu số)</label>
                    </div>

                    {action === 'create' && (
                        <div className='input-group'>
                            <select name='status' value={formData.status ?? 1} onChange={handleChange}>
                                <option value={1}>Hoạt động</option>
                                <option value={0}>Vô hiệu hóa</option>
                            </select>
                            <label>Trạng thái</label>
                        </div>
                    )}

                    <div className='input-group'>
                        <textarea
                            name='description'
                            value={formData.description || ''}
                            onChange={handleChange}
                            placeholder=' '
                            rows="4"
                        />
                        <label>Mô tả chi tiết</label>
                    </div>

                    <div className='btn-box'>
                        <button type='submit' className='btn btn-save' disabled={loading}>
                            {loading ? 'ĐANG LƯU...' : 'LƯU CẤU HÌNH'}
                        </button>
                        <button type='button' className='btn' onClick={onClose}>HỦY</button>
                    </div>
                </form>
            </div>
        </div>
    );
}