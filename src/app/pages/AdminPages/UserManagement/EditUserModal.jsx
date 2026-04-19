import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import '../EditModal.css';

export default function EditUserModal({ userprop, roles, onClose, setRefresh, action }) {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(userprop);
    const [loading, setLoading] = useState(false);

    const submitData = async () => {
        const token = authUser?.token || '';
        try {
            if (action === 'edit') {
                await putData(`user/${formData.id}`, formData, token);
            } else {
                await postData('user', formData, token);
            }
            setRefresh(p => p + 1);
            onClose();
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(authUser);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                } else {
                    // Retry sau khi đã có token mới trong AuthContext
                    return await submitData();
                }
            } else {
                alert("Lỗi: " + (err.data?.message || "Không thể lưu dữ liệu"));
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <button className='btn close-btn' onClick={onClose}>
                    <i className='fa-solid fa-xmark'></i>
                </button>
                <form onSubmit={handleSubmit}>
                    <div className='edit-title'>{action === 'create' ? 'Create User' : 'Edit User'}</div>

                    <div className='flex'>
                        <div className='image-container'>
                            <img src={formData.avatar || DefaultAvatar} alt='avatar' />
                        </div>
                        <div className='column'>
                            <div className='input-group'>
                                <input name='name' value={formData.name || ''} onChange={handleChange} required placeholder=' ' />
                                <label>Full Name</label>
                            </div>
                            <div className='input-group'>
                                <input name='avatar' value={formData.avatar || ''} onChange={handleChange} placeholder=' ' />
                                <label>Avatar URL</label>
                            </div>
                        </div>
                    </div>

                    <div className='input-group'>
                        <input name='email' type='email' value={formData.email || ''}
                            onChange={handleChange} required placeholder=' '
                            disabled={action === 'edit'} />
                        <label className={action === 'edit' ? 'disable' : ''}>Email</label>
                    </div>

                    {action === 'create' && (
                        <div className='input-group'>
                            <input name='password' type='password' onChange={handleChange} required placeholder=' ' />
                            <label>Password</label>
                        </div>
                    )}

                    <div className='column'>
                        <div className='flex'>
                            <div className='input-group flex-1'>
                                <select name='roleId' value={formData.roleId} onChange={handleChange} required>
                                    <option value="">Select Role</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                                <label>Role</label>
                            </div>
                            <div className='input-group flex-1'>
                                <input name='phone' value={formData.phone || ''} onChange={handleChange} placeholder=' ' />
                                <label>Phone</label>
                            </div>
                        </div>
                    </div>

                    <div className='input-group'>
                        <textarea name='description' value={formData.description || ''} onChange={handleChange} placeholder=' ' />
                        <label>Description</label>
                    </div>

                    <div className='btn-box'>
                        <button type='submit' className='btn btn-save' disabled={loading}>
                            {loading ? 'SAVING...' : 'SAVE'}
                        </button>
                        <button type='button' className='btn' onClick={onClose}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    );
}