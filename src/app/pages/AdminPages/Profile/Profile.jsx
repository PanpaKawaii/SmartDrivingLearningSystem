import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';
import '../AdminPages.css';
import './AdminProfile.css';

export default function AdminProfile() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'settings'
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'Male',
        description: '',
        dateOfBirth: '',
        avatar: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                gender: user.gender || 'Male',
                description: user.description || '',
                dateOfBirth: user.dateOfBirth?.split('T')[0] || '',
                avatar: user.avatar || DefaultAvatar,
            });
        }
    }, [user]);

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        // TODO: API call to update profile
        setSuccessMessage('Cập nhật hồ sơ thành công!');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const genderList = [
        { id: 'Male', name: 'Nam' },
        { id: 'Female', name: 'Nữ' },
        { id: 'Other', name: 'Khác' }
    ];

    return (
        <div className='ins-page admin-profile-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Hồ sơ Quản trị viên</h1>
                    <p>Quản lý thông tin cá nhân và cài đặt hệ thống.</p>
                </div>
            </div>

            {successMessage && (
                <div className='ins-success-banner'>
                    <i className='fa-solid fa-check'></i>
                    <span>{successMessage}</span>
                </div>
            )}

            <div className='admin-profile-container'>
                {/* Sidebar */}
                <div className='admin-profile-sidebar'>
                    <div className='avatar-section'>
                        <div className='avatar-wrapper'>
                            <ImageUpload
                                imageUrl={formData.avatar || DefaultAvatar}
                                onImageChange={({ preview }) => {
                                    setFormData(prev => ({ ...prev, avatar: preview }));
                                }}
                                disabled={!isEditing}
                                className='admin-profile-avatar-upload'
                            />
                        </div>
                        <h2 className='user-name'>{user?.name || 'Quản trị viên'}</h2>
                        <span className='user-role'>{user?.roleName || 'Admin'}</span>
                    </div>

                    <div className='sidebar-info'>
                        <div className='info-item'>
                            <i className='fa-regular fa-envelope'></i>
                            <span>{user?.email || 'N/A'}</span>
                        </div>
                        <div className='info-item'>
                            <i className='fa-solid fa-shield'></i>
                            <span>Admin</span>
                        </div>
                    </div>

                    <div className='sidebar-actions'>
                        <button 
                            className={`sidebar-btn ${activeTab === 'profile' ? 'primary-btn' : 'outline-btn'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <i className='fa-regular fa-id-card'></i> Thông tin cá nhân
                        </button>
                        <button 
                            className={`sidebar-btn ${activeTab === 'settings' ? 'primary-btn' : 'outline-btn'}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <i className='fa-solid fa-gear'></i> Cài đặt hệ thống
                        </button>
                        <button className='sidebar-btn outline-btn mt-auto'>
                            <i className='fa-solid fa-lock'></i> Đổi mật khẩu
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className='admin-profile-main'>
                    {activeTab === 'profile' && (
                        <>
                            <div className='ins-page-header' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className='header-title'>
                                    <i className='fa-regular fa-user'></i>
                                    <h2>{isEditing ? 'Cập nhật hồ sơ' : 'Thông tin cá nhân'}</h2>
                                </div>
                                {!isEditing && (
                                    <button className='ins-action-btn primary' onClick={() => setIsEditing(true)}>
                                        <i className='fa-solid fa-pen'></i> Chỉnh sửa
                                    </button>
                                )}
                            </div>

                            <div className='ins-detail-card'>
                                {isEditing ? (
                                    <form className='profile-form' onSubmit={handleSaveProfile}>
                                        <div className='ins-form-group'>
                                            <MovingLabelInput 
                                                type='text' 
                                                label='Họ và tên' 
                                                labelStyle='moving left'
                                                value={formData.name} 
                                                onValueChange={(val) => handleFieldChange('name', val)} 
                                            />
                                        </div>

                                        <div className='form-row'>
                                            <div className='ins-form-group'>
                                                <MovingLabelInput 
                                                    type='tel' 
                                                    label='Số điện thoại' 
                                                    labelStyle='moving left'
                                                    value={formData.phone} 
                                                    onValueChange={(val) => handleFieldChange('phone', val)} 
                                                />
                                            </div>
                                            <div className='ins-form-group'>
                                                <MovingLabelInput 
                                                    type='date' 
                                                    label='Ngày sinh' 
                                                    labelStyle='stay left'
                                                    value={formData.dateOfBirth} 
                                                    onValueChange={(val) => handleFieldChange('dateOfBirth', val)} 
                                                />
                                            </div>
                                        </div>

                                        <div className='form-row'>
                                            <div className='ins-form-group'>
                                                <StyleLabelSelect 
                                                    label='Giới tính' 
                                                    labelStyle='left'
                                                    list={genderList} 
                                                    value={formData.gender} 
                                                    onValueChange={(val) => handleFieldChange('gender', val)} 
                                                />
                                            </div>
                                        </div>

                                        <div className='ins-form-group'>
                                            <label className='ins-form-label'>Mô tả cá nhân</label>
                                            <textarea 
                                                name='description' 
                                                value={formData.description} 
                                                onChange={(e) => handleFieldChange('description', e.target.value)} 
                                                rows='3' 
                                                placeholder='Vài nét về bản thân...'
                                                className='ins-form-textarea'
                                            ></textarea>
                                        </div>

                                        <div className='form-readonly-group'>
                                            <p className='readonly-note'><i className='fa-solid fa-shield-halved'></i> Dữ liệu hệ thống</p>
                                            <div className='readonly-grid'>
                                                <div className='readonly-item'>
                                                    <label>Email</label>
                                                    <input type='text' value={user?.email || ''} disabled />
                                                </div>
                                                <div className='readonly-item'>
                                                    <label>Vai trò</label>
                                                    <input type='text' value={user?.roleName || 'Admin'} disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-actions'>
                                            <button type='button' className='ins-action-btn outline' onClick={() => setIsEditing(false)}>Hủy</button>
                                            <button type='submit' className='ins-action-btn primary'>Lưu thay đổi</button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className='profile-view-details'>
                                        <div className='ins-detail-grid'>
                                            <div className='ins-detail-field'>
                                                <span className='ins-detail-label'>Họ và tên</span>
                                                <span className='ins-detail-value'>{formData.name || '-'}</span>
                                            </div>
                                            <div className='ins-detail-field'>
                                                <span className='ins-detail-label'>Số điện thoại</span>
                                                <span className='ins-detail-value'>{formData.phone || '-'}</span>
                                            </div>
                                            <div className='ins-detail-field'>
                                                <span className='ins-detail-label'>Ngày sinh</span>
                                                <span className='ins-detail-value'>
                                                    {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : '-'}
                                                </span>
                                            </div>
                                            <div className='ins-detail-field'>
                                                <span className='ins-detail-label'>Giới tính</span>
                                                <span className='ins-detail-value'>
                                                    {formData.gender === 'Male' ? 'Nam' : formData.gender === 'Female' ? 'Nữ' : 'Khác'}
                                                </span>
                                            </div>
                                            <div className='ins-detail-field full-width'>
                                                <span className='ins-detail-label'>Mô tả cá nhân</span>
                                                <span className='ins-detail-value'>{formData.description || 'Chưa cung cấp thông tin.'}</span>
                                            </div>
                                        </div>

                                        <div className='system-meta-info'>
                                            <div className='meta-item'>
                                                <i className='fa-regular fa-clock'></i>
                                                <span>Tham gia: {user?.createAt ? new Date(user.createAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                                            </div>
                                            <div className='meta-item'>
                                                <i className='fa-solid fa-clock-rotate-left'></i>
                                                <span>Cập nhật: {user?.updateAt ? new Date(user.updateAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'settings' && (
                        <>
                            <div className='ins-page-header'>
                                <div className='header-title'>
                                    <i className='fa-solid fa-gear'></i>
                                    <h2>Cài đặt hệ thống</h2>
                                </div>
                            </div>

                            <div className='ins-detail-card'>
                                <div className='settings-section'>
                                    <h3 className='settings-title'>Thông báo & Quyền riêng tư</h3>
                                    <div className='settings-options'>
                                        <label className='setting-option'>
                                            <input type='checkbox' defaultChecked />
                                            <span>Nhận thông báo email</span>
                                        </label>
                                        <label className='setting-option'>
                                            <input type='checkbox' defaultChecked />
                                            <span>Nhận báo cáo hoạt động hàng tuần</span>
                                        </label>
                                        <label className='setting-option'>
                                            <input type='checkbox' />
                                            <span>Cho phép các trang khác liên kết tới hồ sơ</span>
                                        </label>
                                    </div>
                                </div>

                                <div className='settings-section'>
                                    <h3 className='settings-title'>Thoát phiên đăng nhập</h3>
                                    <p className='settings-desc'>Thoát khỏi tất cả các thiết bị khác</p>
                                    <button className='ins-action-btn outline'>Thoát tất cả</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
