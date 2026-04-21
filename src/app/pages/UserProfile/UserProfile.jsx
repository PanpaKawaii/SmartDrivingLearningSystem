import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm navigate để xử lý logout
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { fetchData, putData, uploadMedia } from '../../../mocks/CallingAPI';
import TrafficLight from '../../components/TrafficLight/TrafficLight';

import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import LearningProgress from './LearningProgress';
import ChangePasswordModal from './ChangePasswordModal';

import './UserProfile.css';

export default function UserProfile() {
    const { user: authUser, logout, refreshNewToken, updateUser } = useAuth();
    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
    const [showResetModal, setShowResetModal] = useState(false);

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0); // Để trigger load lại data khi cần

    const [formData, setFormData] = useState({
        name: '', phone: '', gender: 'Male', description: '',
        dateOfBirth: '', licenseType: '', avatar: '',
        createAt: '', updateAt: '',
        learningProgressQuestionCount: 0,
        totalQuestionCount: 0,
        examPassRate: 0,
        simulationPassRate: 0,
        examSessionCount: 0, // Số đề thi đã làm
        simulationSessionCount: 0, // Số đề mô phỏng đã làm
        lessonProgressCount: 0,
        drivingLicenses: []
    });

    const showFeedback = (type, message) => {
        setFeedback({ show: true, type, message });
        // Dùng functional update để đảm bảo tắt đúng popup hiện tại
        setTimeout(() => {
            setFeedback(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        (async () => {
            if (!authUser?.id) {
                setLoading(false);
                return;
            }

            try {
                setError(null);
                setLoading(true);
                const token = authUser?.token || '';

                // Gọi API lấy thông tin chi tiết User
                const result = await fetchData(`User/${authUser.id}`, token);

                if (result) {
                    const existingLicenses = result.userLicenses?.map(ul => ul.drivingLicense?.name).filter(Boolean) || [];

                    setFormData({
                        name: result.name || '',
                        phone: result.phone || '',
                        gender: result.gender || 'Male',
                        description: result.description || '',
                        dateOfBirth: result.dateOfBirth ? result.dateOfBirth.split('T')[0] : '',
                        licenseType: result.licenseType || '',
                        avatar: result.avatar || '',
                        createAt: result.createAt || result.createdAt,
                        updateAt: result.updateAt || result.updatedAt,
                        drivingLicenses: existingLicenses,
                        learningProgressQuestionCount: result.learningProgressQuestionCount || 0,
                        totalQuestionCount: result.totalQuestionCount || 0,
                        examPassRate: result.examPassRate || 0,
                        simulationPassRate: result.simulationPassRate || 0,
                        examSessionCount: result.examSessions?.length || 0,
                        simulationSessionCount: result.simulationSessions?.length || 0,
                        lessonProgressCount: result.lessonProgresses?.length || 0,
                        drivingLicenseIds: result.userLicenses?.map(ul => ul.drivingLicenseId) || [], // Lưu danh sách ID
                        // drivingLicenses: result.userLicenses?.map(ul => ul.drivingLicense?.name) || [], // Lưu danh sách tên (để hiển thị ở View)
                    });
                }
                // {activeTab === 'progress' && <LearningProgress stats={formData} />}
            } catch (error) {
                console.error("Lỗi khi fetch profile:", error);
                setError(error);

                // Xử lý lỗi Token hết hạn (401) giống ChapterLesson
                if (error.status === 401) {
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
    }, [authUser?.token, refresh]); // Chạy lại khi token thay đổi hoặc refresh tăng

    const handleUpdateProfile = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);

        setSaving(true); // Bắt đầu loading
        try {
            let finalAvatarUrl = formData.avatar;

            // 1. Kiểm tra nếu người dùng đã chọn ảnh mới (là đối tượng File)
            if (formData.avatarFile) {
                const uploadResult = await uploadMedia(
                    [formData.avatarFile],
                    authUser.id,
                    'UserAvatar',
                    authUser.token
                );

                // Kết quả trả về đã được normalize thành mảng qua hàm normalizeMediaUploadResponse
                if (uploadResult && uploadResult.length > 0) {
                    finalAvatarUrl = uploadResult[0].url;
                }
            }

            const updatePayload = {
                roleId: authUser.roleId,
                email: authUser.email,
                name: formData.name,
                avatar: finalAvatarUrl,
                phone: formData.phone,
                gender: formData.gender,
                description: formData.description,
                dateOfBirth: formData.dateOfBirth || null,
                licenseType: formData.licenseType,
                status: 1,
                drivingLicenseIds: formData.drivingLicenseIds
            };

            const response = await putData(`User/${authUser.id}`, updatePayload, authUser.token);

            if (response) {
                // Cập nhật AuthContext và LocalStorage ngay lập tức
                updateUser({
                    avatar: finalAvatarUrl,
                    name: formData.name
                });

                showFeedback('success', 'Cập nhật hồ sơ thành công!');
                setIsEditing(false);

                // Xóa file tạm và cập nhật URL mới vào state nội bộ
                setFormData(prev => ({
                    ...prev,
                    avatarFile: null,
                    avatar: finalAvatarUrl
                }));

                setRefresh(prev => prev + 1);
            }

        } catch (error) {
            console.error("Update Error:", error);
            showFeedback('error', 'Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!');
        } finally {
            setSaving(false); // Kết thúc loading
        }
    };

    const handleFieldChange = (name, value, file = null) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(file && { avatarFile: file }) // Lưu file vào state nếu có
        }));
    };

    // UI Loading & Error đồng bộ với ChapterLesson
    if (loading) return <div className='user-profile-page'><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>;
    if (error) return <div className='user-profile-page'><StarsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>;

    return (
        <div className='user-profile-page'>
            <StarsBackground />

            {/* PHẦN POPUP THÔNG BÁO */}
            {feedback.show && (
                <div className={`feedback-popup ${feedback.type} slide-in`}>
                    <i className={feedback.type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                    <span>{feedback.message}</span>
                </div>
            )}

            {showResetModal && (
                <div className="fixed-overlay">
                    <div className="modal-content-animation">
                        <ChangePasswordModal
                            user={authUser}
                            onClose={() => setShowResetModal(false)}
                            showFeedback={showFeedback}
                            refreshNewToken={refreshNewToken} // Truyền thêm hàm này
                            logout={logout}                   // Truyền thêm hàm này
                        />
                    </div>
                </div>
            )}

            <div className='content-wrapper'>
                <div className='profile-container'>
                    {/* Cột trái - Sidebar */}
                    <div className='profile-sidebar'>
                        <div className='avatar-section'>
                            <div className='avatar-wrapper'>
                                <ImageUpload
                                    imageUrl={formData.avatar || DefaultAvatar}
                                    // Object trả về từ ImageUpload của bạn thường có { preview, file }
                                    onImageChange={({ preview, file }) => handleFieldChange('avatar', preview, file)}
                                    disabled={!isEditing || activeTab !== 'profile'}
                                />
                            </div>
                            <h2 className='user-name'>{formData.name || 'Học viên'}</h2>
                            <span className='user-role glass-badge'>{authUser?.roleName || 'Student'}</span>
                        </div>

                        <div className='sidebar-actions'>
                            <button className={`sidebar-btn ${activeTab === 'profile' ? 'primary-btn glow' : 'outline-btn'}`} onClick={() => setActiveTab('profile')}>
                                <i className='fa-regular fa-id-card'></i> Quản lý hồ sơ
                            </button>
                            <button className={`sidebar-btn ${activeTab === 'progress' ? 'primary-btn glow' : 'outline-btn'}`} onClick={() => setActiveTab('progress')}>
                                <i className='fa-solid fa-chart-pie'></i> Tiến độ học tập
                            </button>
                            <button
                                className='sidebar-btn outline-btn mt-auto'
                                onClick={() => setShowResetModal(true)}
                            >
                                <i className='fa-solid fa-lock'></i> Đổi mật khẩu
                            </button>
                            <Link to='/membership'>
                                <button className='sidebar-btn outline-btn mt-auto'>
                                    <i className='fa-solid fa-users'></i> Đăng ký thành viên
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Cột phải - Nội dung */}
                    <div className='profile-main'>
                        {activeTab === 'profile' && (
                            <>
                                <div className='profile-header'>
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

                                <div className='profile-content'>
                                    {isEditing ? (
                                        <ProfileEdit
                                            formData={formData}
                                            handleFieldChange={handleFieldChange}
                                            handleSaveProfile={handleUpdateProfile}
                                            setIsEditing={setIsEditing}
                                            user={authUser}
                                            isSaving={saving} // Truyền state saving xuống
                                        />
                                    ) : (
                                        <ProfileView formData={formData} user={authUser} />
                                    )}
                                </div>
                            </>
                        )}
                        {activeTab === 'progress' && <LearningProgress stats={formData} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
