import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { fetchData, putData, uploadMedia } from '../../../../mocks/CallingAPI';

import InstructorProfileView from './InstructorProfileView';
import InstructorProfileEdit from './InstructorProfileEdit';
import ChangePasswordModal from '../../UserProfile/ChangePasswordModal';

import '../InstructorPages.css';
import './InstructorProfile.css';

export default function InstructorProfile() {
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
                console.error("Lỗi khi fetch Instructor profile:", err);
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
                // Cập nhật context để thay đổi header/sidebar Instructor ngay lập tức
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

    if (loading) return <div className='Instructor-profile-page'><TrafficLight text={'loading'} setRefresh={() => { }} /></div>;
    if (error) return <div className='Instructor-profile-page'><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>;

    return (
        <div className='ins-page Instructor-profile-page'>
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
                    <h1>Hồ sơ Giảng viên</h1>
                    <p>Quản lý thông tin cá nhân của bạn.</p>
                </div>
            </div>

            {/* {successMessage && (
                <div className='ins-success-banner'>
                    <i className='fa-solid fa-check'></i>
                    <span>{successMessage}</span>
                </div>
            )} */}

            <div className='Instructor-profile-container'>
                {/* Sidebar */}
                <div className='Instructor-profile-sidebar'>
                    <div className='avatar-section'>
                        <div className='avatar-wrapper'>
                            <ImageUpload
                                imageUrl={formData.avatar || DefaultAvatar}
                                onImageChange={({ preview, file }) => handleFieldChange('avatar', preview, file)}
                                disabled={!isEditing}
                                className='Instructor-profile-avatar-upload'
                            />
                        </div>
                        <h2 className='user-name'>{formData.name || 'Quản trị viên'}</h2>
                        <span className='user-role'>{authUser?.roleName || 'Instructor'}</span>
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
                <div className='Instructor-profile-main'>
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
                            <InstructorProfileEdit
                                formData={formData}
                                handleFieldChange={handleFieldChange}
                                handleSaveProfile={handleSaveProfile}
                                setIsEditing={setIsEditing}
                                user={authUser}
                                isSaving={saving}
                            />
                        ) : (
                            <InstructorProfileView formData={formData} user={authUser} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
