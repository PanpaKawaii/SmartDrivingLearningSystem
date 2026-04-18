import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { fetchData, putData, uploadMedia } from '../../../../mocks/CallingAPI';

import AdminProfileView from './AdminProfileView';
import AdminProfileEdit from './AdminProfileEdit';
import ChangePasswordModal from '../../UserProfile/ChangePasswordModal';

import '../AdminPages.css';
import './AdminProfile.css';

export default function AdminProfile() {
    const { user: authUser, logout, refreshNewToken, updateUser } = useAuth();
    const navigate = useNavigate();

    const [showResetModal, setShowResetModal] = useState(false);
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'Male',
        description: '',
        dateOfBirth: '',
        avatar: '',
        createAt: '',
        updateAt: '',
        avatarFile: null // Dùng để lưu file ảnh mới chọn
    });

    const showFeedback = (type, message) => {
        setFeedback({ show: true, type, message });
        setTimeout(() => {
            setFeedback(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    // Lấy dữ liệu từ API
    useEffect(() => {
        (async () => {
            if (!authUser?.id) {
                setLoading(false);
                return;
            }

            try {
                setError(null);
                setLoading(true);
                const result = await fetchData(`User/${authUser.id}`, authUser.token);

                if (result) {
                    setFormData({
                        name: result.name || '',
                        phone: result.phone || '',
                        gender: result.gender || 'Male',
                        description: result.description || '',
                        dateOfBirth: result.dateOfBirth ? result.dateOfBirth.split('T')[0] : '',
                        avatar: result.avatar || '',
                        createAt: result.createAt || result.createdAt,
                        updateAt: result.updateAt || result.updatedAt,
                        avatarFile: null
                    });
                }
            } catch (err) {
                console.error("Lỗi khi fetch admin profile:", err);
                setError(err);

                if (err.status === 401) {
                    const refreshResult = await refreshNewToken(authUser);
                    if (refreshResult?.message === 'Logout') {
                        logout();
                        navigate('/', { state: { openLogin: 'true' } });
                    }
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [authUser?.id, authUser?.token, refresh]);

    const handleFieldChange = (name, value, file = null) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(file && { avatarFile: file })
        }));
    };

    const handleSaveProfile = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);

        try {
            let finalAvatarUrl = formData.avatar;

            // 1. Upload ảnh nếu có file mới
            if (formData.avatarFile) {
                const uploadResult = await uploadMedia(
                    [formData.avatarFile],
                    authUser.id,
                    'UserAvatar',
                    authUser.token
                );
                if (uploadResult && uploadResult.length > 0) {
                    finalAvatarUrl = uploadResult[0].url;
                }
            }

            // 2. Gửi payload cập nhật
            const updatePayload = {
                roleId: authUser.roleId,
                email: authUser.email,
                name: formData.name,
                avatar: finalAvatarUrl,
                phone: formData.phone,
                gender: formData.gender,
                description: formData.description,
                dateOfBirth: formData.dateOfBirth || null,
                status: 1
            };

            const response = await putData(`User/${authUser.id}`, updatePayload, authUser.token);

            if (response) {
                // Cập nhật context để thay đổi header/sidebar admin ngay lập tức
                updateUser({
                    avatar: finalAvatarUrl,
                    name: formData.name
                });

                showFeedback('success', 'Cập nhật hồ sơ thành công!');
                setIsEditing(false);
                setRefresh(prev => prev + 1);
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error("Update Error:", err);
            showFeedback('error', 'Có lỗi xảy ra khi cập nhật!');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className='admin-profile-page'><TrafficLight text={'loading'} setRefresh={() => { }} /></div>;
    if (error) return <div className='admin-profile-page'><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>;

    return (
        <div className='ins-page admin-profile-page'>
            {/* Render Feedback Popup */}
            {feedback.show && (
                <div className={`feedback-popup ${feedback.type} slide-in`}>
                    <i className={feedback.type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                    <span>{feedback.message}</span>
                </div>
            )}

            {/* Render Modal Đổi mật khẩu */}
            {showResetModal && (
                <div className="fixed-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="modal-content-animation">
                        <ChangePasswordModal
                            user={authUser}
                            onClose={() => setShowResetModal(false)}
                            showFeedback={showFeedback}
                            refreshNewToken={refreshNewToken}
                            logout={logout}
                        />
                    </div>
                </div>
            )}

            <div className='ins-page-header'>
                <div>
                    <h1>Hồ sơ Quản trị viên</h1>
                    <p>Quản lý thông tin cá nhân của bạn.</p>
                </div>
            </div>

            {/* {successMessage && (
                <div className='ins-success-banner'>
                    <i className='fa-solid fa-check'></i>
                    <span>{successMessage}</span>
                </div>
            )} */}

            <div className='admin-profile-container'>
                {/* Sidebar */}
                <div className='admin-profile-sidebar'>
                    <div className='avatar-section'>
                        <div className='avatar-wrapper'>
                            <ImageUpload
                                imageUrl={formData.avatar || DefaultAvatar}
                                onImageChange={({ preview, file }) => handleFieldChange('avatar', preview, file)}
                                disabled={!isEditing}
                                className='admin-profile-avatar-upload'
                            />
                        </div>
                        <h2 className='user-name'>{formData.name || 'Quản trị viên'}</h2>
                        <span className='user-role'>{authUser?.roleName || 'Admin'}</span>
                    </div>

                    <div className='sidebar-info'>
                        <div className='info-item'>
                            <i className='fa-regular fa-envelope'></i>
                            <span>{authUser?.email || 'N/A'}</span>
                        </div>
                    </div>

                    <div className='sidebar-actions'>
                        <button className='sidebar-btn primary-btn'>
                            <i className='fa-regular fa-id-card'></i> Thông tin cá nhân
                        </button>
                        <button
                            className='sidebar-btn outline-btn mt-auto'
                            onClick={() => setShowResetModal(true)}
                        >
                            <i className='fa-solid fa-lock'></i> Đổi mật khẩu
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className='admin-profile-main'>
                    <div className='ins-page-header' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className='header-title'>
                            <i className='fa-regular fa-user'></i>
                            <h2>{isEditing ? 'Cập nhật hồ sơ' : 'Thông tin cá nhân'}</h2>
                        </div>
                        {!isEditing && (
                            <button className='edit-mode-btn' onClick={() => setIsEditing(true)}>
                                <i className='fa-solid fa-pen'></i> Chỉnh sửa
                            </button>
                        )}
                    </div>

                    <div className='ins-detail-card'>
                        {isEditing ? (
                            <AdminProfileEdit
                                formData={formData}
                                handleFieldChange={handleFieldChange}
                                handleSaveProfile={handleSaveProfile}
                                setIsEditing={setIsEditing}
                                user={authUser}
                                isSaving={saving}
                            />
                        ) : (
                            <AdminProfileView formData={formData} user={authUser} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// import { useState, useEffect } from 'react';
// import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
// import DefaultAvatar from '../../../assets/DefaultAvatar.png';
// import ImageUpload from '../../../components/ImageUpload/ImageUpload';
// import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
// import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';
// import '../AdminPages.css';
// import './AdminProfile.css';

// export default function AdminProfile() {
//     const { user } = useAuth();
//     const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'settings'
//     const [isEditing, setIsEditing] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');

//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         gender: 'Male',
//         description: '',
//         dateOfBirth: '',
//         avatar: '',
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 phone: user.phone || '',
//                 gender: user.gender || 'Male',
//                 description: user.description || '',
//                 dateOfBirth: user.dateOfBirth?.split('T')[0] || '',
//                 avatar: user.avatar || DefaultAvatar,
//             });
//         }
//     }, [user]);

//     const handleFieldChange = (name, value) => {
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveProfile = (e) => {
//         e.preventDefault();
//         // TODO: API call to update profile
//         setSuccessMessage('Cập nhật hồ sơ thành công!');
//         setIsEditing(false);
//         setTimeout(() => setSuccessMessage(''), 3000);
//     };

//     const genderList = [
//         { id: 'Male', name: 'Nam' },
//         { id: 'Female', name: 'Nữ' },
//         { id: 'Other', name: 'Khác' }
//     ];

//     return (
//         <div className='ins-page admin-profile-page'>
//             <div className='ins-page-header'>
//                 <div>
//                     <h1>Hồ sơ Quản trị viên</h1>
//                     <p>Quản lý thông tin cá nhân và cài đặt hệ thống.</p>
//                 </div>
//             </div>

//             {successMessage && (
//                 <div className='ins-success-banner'>
//                     <i className='fa-solid fa-check'></i>
//                     <span>{successMessage}</span>
//                 </div>
//             )}

//             <div className='admin-profile-container'>
//                 {/* Sidebar */}
//                 <div className='admin-profile-sidebar'>
//                     <div className='avatar-section'>
//                         <div className='avatar-wrapper'>
//                             <ImageUpload
//                                 imageUrl={formData.avatar || DefaultAvatar}
//                                 onImageChange={({ preview }) => {
//                                     setFormData(prev => ({ ...prev, avatar: preview }));
//                                 }}
//                                 disabled={!isEditing}
//                                 className='admin-profile-avatar-upload'
//                             />
//                         </div>
//                         <h2 className='user-name'>{user?.name || 'Quản trị viên'}</h2>
//                         <span className='user-role'>{user?.roleName || 'Admin'}</span>
//                     </div>

//                     <div className='sidebar-info'>
//                         <div className='info-item'>
//                             <i className='fa-regular fa-envelope'></i>
//                             <span>{user?.email || 'N/A'}</span>
//                         </div>
//                         <div className='info-item'>
//                             <i className='fa-solid fa-shield'></i>
//                             <span>Admin</span>
//                         </div>
//                     </div>

//                     <div className='sidebar-actions'>
//                         <button
//                             className={`sidebar-btn ${activeTab === 'profile' ? 'primary-btn' : 'outline-btn'}`}
//                             onClick={() => setActiveTab('profile')}
//                         >
//                             <i className='fa-regular fa-id-card'></i> Thông tin cá nhân
//                         </button>
//                         <button
//                             className={`sidebar-btn ${activeTab === 'settings' ? 'primary-btn' : 'outline-btn'}`}
//                             onClick={() => setActiveTab('settings')}
//                         >
//                             <i className='fa-solid fa-gear'></i> Cài đặt hệ thống
//                         </button>
//                         <button className='sidebar-btn outline-btn mt-auto'>
//                             <i className='fa-solid fa-lock'></i> Đổi mật khẩu
//                         </button>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className='admin-profile-main'>
//                     {activeTab === 'profile' && (
//                         <>
//                             <div className='ins-page-header' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <div className='header-title'>
//                                     <i className='fa-regular fa-user'></i>
//                                     <h2>{isEditing ? 'Cập nhật hồ sơ' : 'Thông tin cá nhân'}</h2>
//                                 </div>
//                                 {!isEditing && (
//                                     <button className='ins-action-btn primary' onClick={() => setIsEditing(true)}>
//                                         <i className='fa-solid fa-pen'></i> Chỉnh sửa
//                                     </button>
//                                 )}
//                             </div>

//                             <div className='ins-detail-card'>
//                                 {isEditing ? (
//                                     <form className='profile-form' onSubmit={handleSaveProfile}>
//                                         <div className='ins-form-group'>
//                                             <MovingLabelInput
//                                                 type='text'
//                                                 label='Họ và tên'
//                                                 labelStyle='moving left'
//                                                 value={formData.name}
//                                                 onValueChange={(val) => handleFieldChange('name', val)}
//                                             />
//                                         </div>

//                                         <div className='form-row'>
//                                             <div className='ins-form-group'>
//                                                 <MovingLabelInput
//                                                     type='tel'
//                                                     label='Số điện thoại'
//                                                     labelStyle='moving left'
//                                                     value={formData.phone}
//                                                     onValueChange={(val) => handleFieldChange('phone', val)}
//                                                 />
//                                             </div>
//                                             <div className='ins-form-group'>
//                                                 <MovingLabelInput
//                                                     type='date'
//                                                     label='Ngày sinh'
//                                                     labelStyle='stay left'
//                                                     value={formData.dateOfBirth}
//                                                     onValueChange={(val) => handleFieldChange('dateOfBirth', val)}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className='form-row'>
//                                             <div className='ins-form-group'>
//                                                 <StyleLabelSelect
//                                                     label='Giới tính'
//                                                     labelStyle='left'
//                                                     list={genderList}
//                                                     value={formData.gender}
//                                                     onValueChange={(val) => handleFieldChange('gender', val)}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className='ins-form-group'>
//                                             <label className='ins-form-label'>Mô tả cá nhân</label>
//                                             <textarea
//                                                 name='description'
//                                                 value={formData.description}
//                                                 onChange={(e) => handleFieldChange('description', e.target.value)}
//                                                 rows='3'
//                                                 placeholder='Vài nét về bản thân...'
//                                                 className='ins-form-textarea'
//                                             ></textarea>
//                                         </div>

//                                         <div className='form-readonly-group'>
//                                             <p className='readonly-note'><i className='fa-solid fa-shield-halved'></i> Dữ liệu hệ thống</p>
//                                             <div className='readonly-grid'>
//                                                 <div className='readonly-item'>
//                                                     <label>Email</label>
//                                                     <input type='text' value={user?.email || ''} disabled />
//                                                 </div>
//                                                 <div className='readonly-item'>
//                                                     <label>Vai trò</label>
//                                                     <input type='text' value={user?.roleName || 'Admin'} disabled />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className='form-actions'>
//                                             <button type='button' className='ins-action-btn outline' onClick={() => setIsEditing(false)}>Hủy</button>
//                                             <button type='submit' className='ins-action-btn primary'>Lưu thay đổi</button>
//                                         </div>
//                                     </form>
//                                 ) : (
//                                     <div className='profile-view-details'>
//                                         <div className='ins-detail-grid'>
//                                             <div className='ins-detail-field'>
//                                                 <span className='ins-detail-label'>Họ và tên</span>
//                                                 <span className='ins-detail-value'>{formData.name || '-'}</span>
//                                             </div>
//                                             <div className='ins-detail-field'>
//                                                 <span className='ins-detail-label'>Số điện thoại</span>
//                                                 <span className='ins-detail-value'>{formData.phone || '-'}</span>
//                                             </div>
//                                             <div className='ins-detail-field'>
//                                                 <span className='ins-detail-label'>Ngày sinh</span>
//                                                 <span className='ins-detail-value'>
//                                                     {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : '-'}
//                                                 </span>
//                                             </div>
//                                             <div className='ins-detail-field'>
//                                                 <span className='ins-detail-label'>Giới tính</span>
//                                                 <span className='ins-detail-value'>
//                                                     {formData.gender === 'Male' ? 'Nam' : formData.gender === 'Female' ? 'Nữ' : 'Khác'}
//                                                 </span>
//                                             </div>
//                                             <div className='ins-detail-field full-width'>
//                                                 <span className='ins-detail-label'>Mô tả cá nhân</span>
//                                                 <span className='ins-detail-value'>{formData.description || 'Chưa cung cấp thông tin.'}</span>
//                                             </div>
//                                         </div>

//                                         <div className='system-meta-info'>
//                                             <div className='meta-item'>
//                                                 <i className='fa-regular fa-clock'></i>
//                                                 <span>Tham gia: {user?.createAt ? new Date(user.createAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
//                                             </div>
//                                             <div className='meta-item'>
//                                                 <i className='fa-solid fa-clock-rotate-left'></i>
//                                                 <span>Cập nhật: {user?.updateAt ? new Date(user.updateAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </>
//                     )}

//                     {activeTab === 'settings' && (
//                         <>
//                             <div className='ins-page-header'>
//                                 <div className='header-title'>
//                                     <i className='fa-solid fa-gear'></i>
//                                     <h2>Cài đặt hệ thống</h2>
//                                 </div>
//                             </div>

//                             <div className='ins-detail-card'>
//                                 <div className='settings-section'>
//                                     <h3 className='settings-title'>Thông báo & Quyền riêng tư</h3>
//                                     <div className='settings-options'>
//                                         <label className='setting-option'>
//                                             <input type='checkbox' defaultChecked />
//                                             <span>Nhận thông báo email</span>
//                                         </label>
//                                         <label className='setting-option'>
//                                             <input type='checkbox' defaultChecked />
//                                             <span>Nhận báo cáo hoạt động hàng tuần</span>
//                                         </label>
//                                         <label className='setting-option'>
//                                             <input type='checkbox' />
//                                             <span>Cho phép các trang khác liên kết tới hồ sơ</span>
//                                         </label>
//                                     </div>
//                                 </div>

//                                 <div className='settings-section'>
//                                     <h3 className='settings-title'>Thoát phiên đăng nhập</h3>
//                                     <p className='settings-desc'>Thoát khỏi tất cả các thiết bị khác</p>
//                                     <button className='ins-action-btn outline'>Thoát tất cả</button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
