import { useState } from 'react';
import { postData, putData, uploadMedia } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import '../EditModal.css';

export default function EditUserModal({ userprop, roles, onClose, setRefresh, action }) {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(userprop);
    const [loading, setLoading] = useState(false);
    // State quản lý lỗi validate
    const [passwordError, setPasswordError] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(userprop.avatar || '');

    // Hàm kiểm tra password
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            return "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
        }
        return "";
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submitData = async (retryToken = null) => {
        const token = retryToken || authUser?.token || '';
        try {
            let finalUser = { ...formData };
            let userId = formData.id;

            if (action === 'create' && !userId) {
                const newUser = await postData('user', { ...formData, avatar: '' }, token);
                userId = newUser.id;
                finalUser.id = userId;
            }

            if (selectedFile && userId) {
                const uploadResult = await uploadMedia(
                    [selectedFile],
                    userId,
                    'UserAvatar',
                    token
                );

                if (uploadResult && uploadResult.length > 0) {
                    const avatarUrl = uploadResult[0].url;
                    finalUser.avatar = avatarUrl;
                    await putData(`user/${userId}`, finalUser, token);
                }
            }
            else if (action === 'edit') {
                await putData(`user/${userId}`, finalUser, token);
            }

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
                alert("Lỗi: " + (err.data?.message || err.message || "Không thể lưu dữ liệu"));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate mật khẩu khi CREATE
        if (action === 'create') {
            const error = validatePassword(formData.password || '');
            if (error) {
                setPasswordError(error);
                return; // Dừng lại không submit
            }
        }

        setPasswordError(''); // Xóa lỗi cũ nếu có
        setLoading(true);
        submitData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Xóa lỗi ngay khi người dùng bắt đầu gõ lại mật khẩu
        if (name === 'password') setPasswordError('');
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <button className='btn close-btn' onClick={onClose}>
                    <i className='fa-solid fa-xmark'></i>
                </button>
                <form onSubmit={handleSubmit}>
                    <div className='edit-title'>{action === 'create' ? 'Create User' : 'Edit User'}</div>

                    <div className='flex' style={{ alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <div className='image-container' style={{ position: 'relative' }}>
                            <img src={previewUrl || DefaultAvatar} alt='avatar' style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }} />

                            <label htmlFor="file-upload" className="custom-file-upload" style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                background: '#007bff',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,123,255,0.4)',
                                transition: 'all 0.2s ease'
                            }}>
                                <i className="fa-solid fa-camera" style={{ fontSize: '14px' }}></i>
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                        </div>
                        <div className='column' style={{ flex: 1 }}>
                            <div className='input-group'>
                                <input name='name' value={formData.name || ''} onChange={handleChange} required placeholder=' ' />
                                <label>Full Name</label>
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
                            <input
                                name='password'
                                type='password'
                                onChange={handleChange}
                                required
                                placeholder=' '
                                style={passwordError ? { borderBottomColor: 'red' } : {}}
                            />
                            <label style={passwordError ? { color: 'red' } : {}}>Password</label>
                            {/* Hiển thị câu báo lỗi */}
                            {passwordError && (
                                <small style={{ color: 'red', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                                    {passwordError}
                                </small>
                            )}
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