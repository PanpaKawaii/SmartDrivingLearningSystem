import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import LOGO from '../../assets/Logo.png';
import './InstructorSidebar.css';

const menuSections = [
    {
        label: 'Nội dung',
        items: [
            { name: 'Trang chủ', icon: 'fa-house', path: '/instructor/dashboard' },
            { name: 'Tạo bài viết', icon: 'fa-pen-to-square', path: '/instructor/my-posts' },
            { name: 'Bài viết của tôi', icon: 'fa-file-lines', path: '/instructor/my-posts-list' },
        ],
    },
    {
        label: 'Duyệt & Báo cáo',
        items: [
            { name: 'Bài viết chờ duyệt', icon: 'fa-clock', path: '/instructor/pending-posts' },
            { name: 'Báo cáo cộng đồng', icon: 'fa-users', path: '/instructor/community-reports' },
            { name: 'Báo cáo lỗi nội dung', icon: 'fa-bug', path: '/instructor/content-error-reports' },
            { name: 'Duyệt yêu cầu thay đổi', icon: 'fa-code-pull-request', path: '/instructor/change-requests' },
        ],
    },
    {
        label: 'Quản lý Khóa học',
        items: [
            { name: 'Quản lý Chương', icon: 'fa-book', path: '/instructor/chapter-management' },
            { name: 'Quản lý Bài học', icon: 'fa-graduation-cap', path: '/instructor/lesson-management' },
            { name: 'Ngân hàng Câu hỏi', icon: 'fa-question-circle', path: '/instructor/question-bank' },
            { name: 'Bài thi thử', icon: 'fa-clipboard-check', path: '/instructor/exam-management' },
            { name: 'Ngân hàng Biển báo', icon: 'fa-triangle-exclamation', path: '/instructor/traffic-sign-bank' },
        ],
    },
];

export default function InstructorSidebar() {
    const location = useLocation();
    const { logout, user } = useAuth();

    const getUserInitials = () => {
        if (!user?.name) return 'GV';
        const parts = user.name.split(' ');
        return parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
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
                        {section.items.map((item, iIdx) => (
                            <Link
                                key={iIdx}
                                to={item.path}
                                className={`sidebar-nav-item ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'active' : ''}`}
                            >
                                <span className='nav-icon'>
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className='sidebar-user'>
                <div className='sidebar-user-avatar'>{getUserInitials()}</div>
                <div className='sidebar-user-info'>
                    <span className='sidebar-user-name'>{user?.name || 'Lê Minh Anh'}</span>
                    <span className='sidebar-user-role'>Giảng viên</span>
                </div>
                <button className='sidebar-logout' onClick={() => logout()} title='Đăng xuất'>
                    <i className='fa-solid fa-right-from-bracket'></i>
                </button>
            </div>
        </aside>
    );
}
