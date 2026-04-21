import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import { fetchData } from '../../../mocks/CallingAPI';
import LOGO from '../../assets/Logo.png';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import './InstructorSidebar.css';

const menuSections = [
    {
        label: 'Nội dung',
        items: [
            { name: 'Trang chủ', icon: 'fa-house', path: '/instructor/dashboard' },
            { name: 'Danh sách bài viết', icon: 'fa-file-lines', path: '/instructor/posts-list' },
        ],
    },
    {
        label: 'Duyệt & Báo cáo',
        items: [
            { name: 'Quản lý bài viết', icon: 'fa-clock', path: '/instructor/pending-posts' },
            { name: 'Báo cáo cộng đồng', icon: 'fa-users', path: '/instructor/community-reports' },
            { name: 'Báo cáo lỗi nội dung', icon: 'fa-bug', path: '/instructor/content-error-reports' },
            // { name: 'Duyệt yêu cầu thay đổi', icon: 'fa-code-pull-request', path: '/instructor/change-requests' },
        ],
    },
    {
        label: 'Quản lý Khóa học',
        items: [
            { name: 'Quản lý bằng lái', icon: 'fa-book', path: '/instructor/license-management' },
            { name: 'Quản lý Chương', icon: 'fa-book', path: '/instructor/chapter-management' },
            { name: 'Quản lý Bài học', icon: 'fa-graduation-cap', path: '/instructor/lesson-management' },
            { name: 'Ngân hàng Câu hỏi', icon: 'fa-question-circle', path: '/instructor/question-bank' },
            { name: 'Bài thi thử', icon: 'fa-clipboard-check', path: '/instructor/exam-management' },
            { name: 'Ngân hàng Biển báo', icon: 'fa-triangle-exclamation', path: '/instructor/traffic-sign-bank' },
            { name: 'Ngân hàng Mô phỏng', icon: 'fa-video', path: '/instructor/simulation-bank' },
            { name: 'Đề thi Mô phỏng', icon: 'fa-film', path: '/instructor/simulation-exam-management' },
        ],
    },
];

export default function InstructorSidebar() {
    const location = useLocation();
    const { logout, user, refreshNewToken } = useAuth();
    const [thisUser, setThisUser] = useState(null);

    // Fetch dữ liệu giảng viên chi tiết
    useEffect(() => {
        (async () => {
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                if (userId) {
                    const result = await fetchData(`User/${userId}`, token);
                    setThisUser(result);
                }
            } catch (error) {
                console.error('Error fetching instructor data', error);
                if (error.status === 401) refreshNewToken(user);
            }
        })();
    }, [user?.id, user?.avatar, user?.name]);

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        logout();
    };

    return (
        <aside className='instructor-sidebar'>
            <Link to='/instructor/dashboard' className='sidebar-logo'>
                <img src={LOGO} alt='Green Light' />
                <div className='sidebar-logo-text'>
                    <span className='sidebar-logo-title'>Green Light</span>
                    <span className='sidebar-logo-subtitle'>Hệ thống Giảng viên</span>
                </div>
            </Link>

            <nav className='sidebar-nav'>
                {menuSections.map((section, sIdx) => (
                    <div key={sIdx}>
                        <div className='sidebar-section-label'>{section.label}</div>
                        {section.items.map((item, iIdx) => {
                            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                            return (
                                <Link
                                    key={iIdx}
                                    to={item.path}
                                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <span className='nav-icon'>
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className='sidebar-footer'>
                <Link
                    to="/instructor/profile"
                    className={`sidebar-user-card ${location.pathname === '/instructor/profile' ? 'active' : ''}`}
                >
                    <div className='user-card-content'>
                        <div className='sidebar-user-avatar'>
                            <img
                                src={thisUser?.avatar || user?.avatar || DefaultAvatar}
                                alt="avatar"
                                onError={(e) => e.target.src = DefaultAvatar}
                            />
                        </div>
                        <div className='sidebar-user-info'>
                            <span className='sidebar-user-name'>
                                {thisUser?.name || user?.name || 'Giảng viên'}
                            </span>
                            <span className='sidebar-user-role'>
                                {thisUser?.roleName || user?.roleName || 'Instructor'}
                            </span>
                        </div>
                    </div>

                    <button className='sidebar-logout-inline' onClick={handleLogout} title='Đăng xuất'>
                        <i className='fa-solid fa-right-from-bracket'></i>
                    </button>
                </Link>
            </div>
        </aside>
    );
}