import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../assets/DefaultAvatar.png';

import './UserProfile.css';

export default function UserProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'Male',
        description: '',
        dateOfBirth: '',
        licenseType: 'B2',
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name || prev.name,
                phone: user.phone || prev.phone,
                gender: user.gender || prev.gender,
                description: user.description || prev.description,
                dateOfBirth: user.dateOfBirth?.split('T')[0] || prev.dateOfBirth,
                licenseType: user.licenseType || prev.licenseType,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert('Profile saved! (Mock)');
        setIsEditing(false);
    };

    return (
        <div className='user-profile-page'>
            <div className='profile-container'>
                
                {/* Left Column - Sidebar Info */}
                <div className='profile-sidebar'>
                    <div className='avatar-section'>
                        <div className='avatar-wrapper'>
                            <img src={user?.avatar || DefaultAvatar} alt='User Avatar' />
                            {isEditing && (
                                <button className='upload-btn' type='button'>
                                    <i className='fa-solid fa-camera'></i>
                                </button>
                            )}
                        </div>
                        <h2 className='user-name'>{user?.name || 'Học viên'}</h2>
                        <span className='user-role'>{user?.roleName || 'Student'}</span>
                    </div>

                    <div className='sidebar-info'>
                        <div className='info-item'>
                            <i className='fa-regular fa-envelope'></i>
                            <span>{user?.email || 'N/A'}</span>
                        </div>
                        <div className='info-item status-active'>
                            <i className='fa-regular fa-circle-check'></i>
                            <span>Active</span>
                        </div>
                    </div>

                    <div className='sidebar-actions'>
                        <button className='sidebar-btn outline-btn'>
                            <i className='fa-solid fa-lock'></i> Đổi mật khẩu
                        </button>
                        <Link to='/learning' className='sidebar-btn primary-btn'>
                            <i className='fa-solid fa-chart-line'></i> Xem tiến độ học tập
                        </Link>
                    </div>
                </div>

                {/* Right Column - Main Content / Form */}
                <div className='profile-main'>
                    <div className='profile-header'>
                        <h2>{isEditing ? 'Cập nhật hồ sơ' : 'Thông tin cá nhân'}</h2>
                        {!isEditing && (
                            <button className='edit-mode-btn' onClick={() => setIsEditing(true)}>
                                <i className='fa-solid fa-pen'></i> Chỉnh sửa
                            </button>
                        )}
                    </div>

                    <div className='profile-content'>
                        {isEditing ? (
                            <form className='profile-form' onSubmit={handleSaveProfile}>
                                <div className='form-group'>
                                    <label>Họ và tên</label>
                                    <input 
                                        type='text' 
                                        name='name' 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder='Nhập họ tên đầy đủ' 
                                        required 
                                    />
                                </div>

                                <div className='form-row'>
                                    <div className='form-group half'>
                                        <label>Số điện thoại</label>
                                        <input 
                                            type='tel' 
                                            name='phone' 
                                            value={formData.phone} 
                                            onChange={handleInputChange} 
                                            placeholder='09xx xxx xxx' 
                                        />
                                    </div>
                                    <div className='form-group half'>
                                        <label>Ngày sinh</label>
                                        <input 
                                            type='date' 
                                            name='dateOfBirth' 
                                            value={formData.dateOfBirth} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-group half'>
                                        <label>Giới tính</label>
                                        <select name='gender' value={formData.gender} onChange={handleInputChange}>
                                            <option value='Male'>Nam</option>
                                            <option value='Female'>Nữ</option>
                                            <option value='Other'>Khác</option>
                                        </select>
                                    </div>
                                    <div className='form-group half'>
                                        <label>Hạng bằng lái</label>
                                        <select name='licenseType' value={formData.licenseType} onChange={handleInputChange}>
                                            <option value='B1'>B1</option>
                                            <option value='B2'>B2</option>
                                            <option value='C'>C</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='form-group'>
                                    <label>Mô tả cá nhân</label>
                                    <textarea 
                                        name='description' 
                                        value={formData.description} 
                                        onChange={handleInputChange} 
                                        rows='4' 
                                        placeholder='Vài nét về bản thân...'
                                    ></textarea>
                                </div>

                                <div className='form-readonly-group'>
                                    <p className='readonly-note'><i className='fa-solid fa-circle-info'></i> Thông tin hệ thống (Không thể chỉnh sửa)</p>
                                    <div className='readonly-grid'>
                                        <div className='readonly-item'>
                                            <label>Email</label>
                                            <input type='text' value={user?.email || ''} disabled />
                                        </div>
                                        <div className='readonly-item'>
                                            <label>Vai trò</label>
                                            <input type='text' value={user?.roleName || 'Student'} disabled />
                                        </div>
                                        <div className='readonly-item'>
                                            <label>Ngày tạo</label>
                                            <input type='text' value={user?.createAt ? new Date(user.createAt).toLocaleDateString() : 'N/A'} disabled />
                                        </div>
                                        <div className='readonly-item'>
                                            <label>Cập nhật lần cuối</label>
                                            <input type='text' value={user?.updateAt ? new Date(user.updateAt).toLocaleDateString() : 'N/A'} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className='form-actions'>
                                    <button type='button' className='cancel-btn' onClick={() => setIsEditing(false)}>Hủy</button>
                                    <button type='submit' className='save-btn'>Lưu thay đổi</button>
                                </div>
                            </form>
                        ) : (
                            <div className='profile-view-details'>
                                <div className='detail-grid'>
                                    <div className='detail-item'>
                                        <span className='detail-label'>Họ và tên</span>
                                        <span className='detail-value'>{formData.name || '-'}</span>
                                    </div>
                                    <div className='detail-item'>
                                        <span className='detail-label'>Số điện thoại</span>
                                        <span className='detail-value'>{formData.phone || '-'}</span>
                                    </div>
                                    <div className='detail-item'>
                                        <span className='detail-label'>Ngày sinh</span>
                                        <span className='detail-value'>{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : '-'}</span>
                                    </div>
                                    <div className='detail-item'>
                                        <span className='detail-label'>Giới tính</span>
                                        <span className='detail-value'>
                                            {formData.gender === 'Male' ? 'Nam' : formData.gender === 'Female' ? 'Nữ' : 'Khác'}
                                        </span>
                                    </div>
                                    <div className='detail-item'>
                                        <span className='detail-label'>Hạng bằng đang học</span>
                                        <span className='detail-value license-badge'>{formData.licenseType || 'B2'}</span>
                                    </div>
                                    <div className='detail-item full-width'>
                                        <span className='detail-label'>Mô tả cá nhân</span>
                                        <span className='detail-value'>{formData.description || 'Chưa cung cấp thông tin.'}</span>
                                    </div>
                                </div>

                                <div className='system-meta-info'>
                                    <div className='meta-item'>
                                        <i className='fa-regular fa-clock'></i>
                                        <span>Tham gia: {user?.createAt ? new Date(user.createAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <div className='meta-item'>
                                        <i className='fa-solid fa-clock-rotate-left'></i>
                                        <span>Cập nhật gần nhất: {user?.updateAt ? new Date(user.updateAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
