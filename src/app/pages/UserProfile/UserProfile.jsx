//src/app/pages/UserProfile/UserProfile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm navigate để xử lý logout
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { fetchData, putData } from '../../../mocks/CallingAPI';
import TrafficLight from '../../components/TrafficLight/TrafficLight';

import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import LearningProgress from './LearningProgress';

import './UserProfile.css';

export default function UserProfile() {
    const { user: authUser, logout, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0); // Để trigger load lại data khi cần
    
    const [formData, setFormData] = useState({
        name: '', phone: '', gender: 'Male', description: '', 
        dateOfBirth: '', licenseType: 'B2', avatar: '',
        createAt: '', updateAt: ''
    });

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
                    setFormData({
                        name: result.name || '',
                        phone: result.phone || '',
                        gender: result.gender || 'Male',
                        description: result.description || '',
                        dateOfBirth: result.dateOfBirth ? result.dateOfBirth.split('T')[0] : '',
                        licenseType: result.licenseType || '',
                        avatar: result.avatar || '',
                        createAt: result.createAt || result.createdAt, 
                        updateAt: result.updateAt || result.updatedAt
                    });
                }
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
        e.preventDefault();
        try {
            // 1. Tạo Payload đúng chuẩn UserUpdateDTO của Backend
            const updatePayload = {
                roleId: authUser.roleId, // RoleId là bắt buộc theo [NotEmptyGuid]
                email: authUser.email,
                name: formData.name,
                avatar: formData.avatar,
                phone: formData.phone,
                gender: formData.gender,
                description: formData.description,
                // Backend dùng DateOnly nên gửi format YYYY-MM-DD
                dateOfBirth: formData.dateOfBirth || null,
                licenseType: formData.licenseType,
                status: 1, // Hoặc giá trị status mặc định của bạn
                // Password: "", // Chỉ gửi nếu bạn làm tính năng đổi pass ở đây
            };

            // 2. Gọi API PUT (Đảm bảo URL đúng: api/user/{id})
            const response = await putData(`User/${authUser.id}`, updatePayload, authUser.token);
            
            if (response) {
                alert('Cập nhật thông tin thành công!');
                setIsEditing(false);
                setRefresh(prev => prev + 1); 
            }
        } catch (error) {
            alert('Cập nhật thất bại! Vui lòng kiểm tra lại dữ liệu.');
            console.error("Update Error Detail:", error.response?.data || error);
        }
    };

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // UI Loading & Error đồng bộ với ChapterLesson
    if (loading) return <div className='user-profile-page'><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>;
    if (error) return <div className='user-profile-page'><StarsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>;

    return (
        <div className='user-profile-page'>
            <StarsBackground />
            <div className='content-wrapper'>
                <div className='profile-container'>
                    {/* Cột trái - Sidebar */}
                    <div className='profile-sidebar'>
                        <div className='avatar-section'>
                            <div className='avatar-wrapper'>
                                <ImageUpload
                                    imageUrl={formData.avatar || DefaultAvatar}
                                    onImageChange={({ preview }) => handleFieldChange('avatar', preview)}
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
                            <button className='sidebar-btn outline-btn mt-auto'>
                                 <i className='fa-solid fa-lock'></i> Đổi mật khẩu
                            </button>
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
                                        />
                                    ) : (
                                        <ProfileView formData={formData} user={authUser} />
                                    )}
                                </div>
                            </>
                        )}
                        {activeTab === 'progress' && <LearningProgress />}
                    </div>
                </div>
            </div>
        </div>
    );
}

// import { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/AuthContext/AuthContext';
// import DefaultAvatar from '../../assets/DefaultAvatar.png';
// import StarsBackground from '../../components/StarsBackground/StarsBackground';
// import MovingLabelInput from '../../components/MovingLabelInput/MovingLabelInput';
// import StyleLabelSelect from '../../components/StyleLabelSelect/StyleLabelSelect';
// import ProgressBar from '../../components/ProgressBar/ProgressBar';
// import ImageUpload from '../../components/ImageUpload/ImageUpload';

// import './UserProfile.css';

// export default function UserProfile() {
//     const { user } = useAuth();
//     const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'progress'
//     const [isEditing, setIsEditing] = useState(false);
    
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         gender: 'Male',
//         description: '',
//         dateOfBirth: '',
//         licenseType: 'B2',
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 phone: user.phone || '',
//                 gender: user.gender || 'Male',
//                 description: user.description || '',
//                 dateOfBirth: user.dateOfBirth?.split('T')[0] || '',
//                 licenseType: user.licenseType || 'B2',
//             });
//         }
//     }, [user]);

//     const handleFieldChange = (name, value) => {
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveProfile = (e) => {
//         e.preventDefault();
//         alert('Profile saved! (Mock)');
//         setIsEditing(false);
//     };

//     // Prepare lists for selects
//     const genderList = [
//         { id: 'Male', name: 'Nam' },
//         { id: 'Female', name: 'Nữ' },
//         { id: 'Other', name: 'Khác' }
//     ];
    
//     const licenseList = [
//         { id: 'B1', name: 'Hạng B1' },
//         { id: 'B2', name: 'Hạng B2' },
//         { id: 'C', name: 'Hạng C' }
//     ];

//     return (
//         <div className='user-profile-page'>
//             <StarsBackground />
            
//             <div className='content-wrapper'>
//                 <div className='profile-container'>
                    
//                     {/* Left Column - Sidebar Info */}
//                     <div className='profile-sidebar'>
//                         <div className='avatar-section'>
//                             <div className='avatar-wrapper'>
//                                 <ImageUpload
//                                     imageUrl={user?.avatar || DefaultAvatar}
//                                     onImageChange={({ file, preview }) => {
//                                         // TODO: Gọi API upload ở đây sau này
//                                         // Hiện tại chỉ đổi preview trên UI
//                                         setFormData(prev => ({ ...prev, avatar: preview }));
//                                     }}
//                                     disabled={!isEditing || activeTab !== 'profile'}
//                                     className='profile-avatar-upload'
//                                     label={isEditing ? 'Đổi ảnh đại diện' : ''}
//                                 />
//                             </div>
//                             <h2 className='user-name'>{user?.name || 'Học viên'}</h2>
//                             <span className='user-role glass-badge'>{user?.roleName || 'Student'}</span>
//                         </div>

//                         <div className='sidebar-info'>
//                             <div className='info-item'>
//                                 <i className='fa-regular fa-envelope'></i>
//                                 <span>{user?.email || 'N/A'}</span>
//                             </div>
//                         </div>

//                         <div className='sidebar-actions'>
//                             <button 
//                                 className={`sidebar-btn ${activeTab === 'profile' ? 'primary-btn glow' : 'outline-btn'}`}
//                                 onClick={() => setActiveTab('profile')}
//                             >
//                                 <i className='fa-regular fa-id-card'></i> Quản lý hồ sơ
//                             </button>
//                             <button 
//                                 className={`sidebar-btn ${activeTab === 'progress' ? 'primary-btn glow' : 'outline-btn'}`}
//                                 onClick={() => setActiveTab('progress')}
//                             >
//                                 <i className='fa-solid fa-chart-pie'></i> Tiến độ học tập
//                             </button>
//                             <button className='sidebar-btn outline-btn mt-auto'>
//                                 <i className='fa-solid fa-lock'></i> Đổi mật khẩu
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Column - Main Content / Form */}
//                     <div className='profile-main'>
                        
//                         {activeTab === 'profile' && (
//                             <>
//                                 <div className='profile-header'>
//                                     <div className='header-title'>
//                                         <i className='fa-regular fa-user'></i>
//                                         <h2>{isEditing ? 'Cập nhật hồ sơ' : 'Thông tin cá nhân'}</h2>
//                                     </div>
//                                     {!isEditing && (
//                                         <button className='edit-mode-btn' onClick={() => setIsEditing(true)}>
//                                             <i className='fa-solid fa-pen'></i> Chỉnh sửa
//                                         </button>
//                                     )}
//                                 </div>

//                                 <div className='profile-content'>
//                                     {isEditing ? (
//                                         <form className='profile-form' onSubmit={handleSaveProfile}>
//                                             <div className='form-group full-width-input'>
//                                                 <MovingLabelInput 
//                                                     type='text' 
//                                                     label='Họ và tên' 
//                                                     labelStyle='moving left'
//                                                     value={formData.name} 
//                                                     onValueChange={(val) => handleFieldChange('name', val)} 
//                                                 />
//                                             </div>

//                                             <div className='form-row'>
//                                                 <div className='form-group half'>
//                                                     <MovingLabelInput 
//                                                         type='tel' 
//                                                         label='Số điện thoại' 
//                                                         labelStyle='moving left'
//                                                         value={formData.phone} 
//                                                         onValueChange={(val) => handleFieldChange('phone', val)} 
//                                                     />
//                                                 </div>
//                                                 <div className='form-group half'>
//                                                     <MovingLabelInput 
//                                                         type='date' 
//                                                         label='Ngày sinh' 
//                                                         labelStyle='stay left'
//                                                         value={formData.dateOfBirth} 
//                                                         onValueChange={(val) => handleFieldChange('dateOfBirth', val)} 
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className='form-row'>
//                                                 <div className='form-group half'>
//                                                     <StyleLabelSelect 
//                                                         label='Giới tính' 
//                                                         labelStyle='left'
//                                                         list={genderList} 
//                                                         value={formData.gender} 
//                                                         onValueChange={(val) => handleFieldChange('gender', val)} 
//                                                     />
//                                                 </div>
//                                                 <div className='form-group half'>
//                                                     <StyleLabelSelect 
//                                                         label='Hạng bằng lái' 
//                                                         labelStyle='left'
//                                                         list={licenseList} 
//                                                         value={formData.licenseType} 
//                                                         onValueChange={(val) => handleFieldChange('licenseType', val)} 
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className='form-group full-width-input'>
//                                                 <label className='default-label'>Mô tả cá nhân</label>
//                                                 <textarea 
//                                                     name='description' 
//                                                     value={formData.description} 
//                                                     onChange={(e) => handleFieldChange('description', e.target.value)} 
//                                                     rows='3' 
//                                                     placeholder='Vài nét về bản thân...'
//                                                 ></textarea>
//                                             </div>

//                                             <div className='form-readonly-group'>
//                                                 <p className='readonly-note'><i className='fa-solid fa-shield-halved'></i> Dữ liệu hệ thống</p>
//                                                 <div className='readonly-grid'>
//                                                     <div className='readonly-item'>
//                                                         <label>Email</label>
//                                                         <input type='text' value={user?.email || ''} disabled />
//                                                     </div>
//                                                     <div className='readonly-item'>
//                                                         <label>Vai trò</label>
//                                                         <input type='text' value={user?.roleName || 'Student'} disabled />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className='form-actions'>
//                                                 <button type='button' className='cancel-btn outline-btn' onClick={() => setIsEditing(false)}>Hủy</button>
//                                                 <button type='submit' className='save-btn primary-btn'>Lưu thay đổi</button>
//                                             </div>
//                                         </form>
//                                     ) : (
//                                         <div className='profile-view-details'>
//                                             <div className='detail-grid'>
//                                                 <div className='detail-item'>
//                                                     <span className='detail-label'>Họ và tên</span>
//                                                     <span className='detail-value'>{formData.name || '-'}</span>
//                                                 </div>
//                                                 <div className='detail-item'>
//                                                     <span className='detail-label'>Số điện thoại</span>
//                                                     <span className='detail-value'>{formData.phone || '-'}</span>
//                                                 </div>
//                                                 <div className='detail-item'>
//                                                     <span className='detail-label'>Ngày sinh</span>
//                                                     <span className='detail-value'>{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : '-'}</span>
//                                                 </div>
//                                                 <div className='detail-item'>
//                                                     <span className='detail-label'>Giới tính</span>
//                                                     <span className='detail-value'>
//                                                         {formData.gender === 'Male' ? 'Nam' : formData.gender === 'Female' ? 'Nữ' : 'Khác'}
//                                                     </span>
//                                                 </div>
//                                                 <div className='detail-item'>
//                                                     <span className='detail-label'>Hạng bằng đang học</span>
//                                                     <span className='detail-value license-badge'>{formData.licenseType || 'B2'}</span>
//                                                 </div>
//                                                 <div className='detail-item full-width'>
//                                                     <span className='detail-label'>Mô tả cá nhân</span>
//                                                     <span className='detail-value description-text'>{formData.description || 'Chưa cung cấp thông tin.'}</span>
//                                                 </div>
//                                             </div>

//                                             <div className='system-meta-info'>
//                                                 <div className='meta-item'>
//                                                     <i className='fa-regular fa-clock'></i>
//                                                     <span>Tham gia: {user?.createAt ? new Date(user.createAt).toLocaleDateString() : 'N/A'}</span>
//                                                 </div>
//                                                 <div className='meta-item'>
//                                                     <i className='fa-solid fa-clock-rotate-left'></i>
//                                                     <span>Cập nhật: {user?.updateAt ? new Date(user.updateAt).toLocaleDateString() : 'N/A'}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </>
//                         )}

//                         {activeTab === 'progress' && (
//                             <div className='progress-dashboard'>
//                                 <div className='profile-header'>
//                                     <div className='header-title'>
//                                         <i className='fa-solid fa-chart-line'></i>
//                                         <h2>Tiến độ học tập</h2>
//                                     </div>
//                                     <p className='subtitle'>Thống kê chi tiết & Phân tích AI</p>
//                                 </div>

//                                 <div className='stats-grid'>
//                                     <div className='stat-card'>
//                                         <div className='icon-box blue-glow'>
//                                             <i className='fa-solid fa-file-signature'></i>
//                                         </div>
//                                         <div className='stat-info'>
//                                             <span className='stat-label'>Thi thử đã làm</span>
//                                             <span className='stat-value'>12 <small>Đề</small></span>
//                                         </div>
//                                     </div>
//                                     <div className='stat-card'>
//                                         <div className='icon-box green-glow'>
//                                             <i className='fa-solid fa-award'></i>
//                                         </div>
//                                         <div className='stat-info'>
//                                             <span className='stat-label'>Tỉ lệ đỗ</span>
//                                             <span className='stat-value'>85<small>%</small></span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className='progress-section'>
//                                     <h3 className='section-title'>Chương trình huấn luyện</h3>
//                                     <div className='progress-cards'>
//                                         <div className='progress-card'>
//                                             <div className='card-top'>
//                                                 <div className='title-area'>
//                                                     <i className='fa-solid fa-book-open theory-icon'></i>
//                                                     <h4>Lý thuyết</h4>
//                                                 </div>
//                                                 <span className='percent'>75%</span>
//                                             </div>
//                                             <ProgressBar current={450} total={600} showValue={false} height="8px" />
//                                             <p className='progress-note'>Hoàn thành 450/600 câu hỏi</p>
//                                         </div>

//                                         <div className='progress-card'>
//                                             <div className='card-top'>
//                                                 <div className='title-area'>
//                                                     <i className='fa-solid fa-car simulation-icon'></i>
//                                                     <h4>Mô phỏng 3D</h4>
//                                                 </div>
//                                                 <span className='percent'>40%</span>
//                                             </div>
//                                             <ProgressBar current={48} total={120} showValue={false} height="8px" />
//                                             <p className='progress-note'>Vượt qua 48/120 tình huống</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className='ai-analysis-card'>
//                                     <div className='ai-header'>
//                                         <i className='fa-solid fa-robot ai-icon'></i>
//                                         <div>
//                                             <h3>Lộ trình học cá nhân hoá</h3>
//                                             <p>AI phát hiện bạn thường xuyên làm sai câu hỏi phần "Biển báo cấm".</p>
//                                         </div>
//                                     </div>
//                                     <div className='ai-action'>
//                                         <button className='primary-btn ai-btn'>
//                                             <i className='fa-solid fa-bolt'></i> Ôn tập câu hỏi yếu (Weak-area Quiz)
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }
