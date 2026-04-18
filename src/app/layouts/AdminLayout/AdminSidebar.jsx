import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import LOGO from '../../assets/Logo.png';
import DefaultAvatar from '../../assets/DefaultAvatar.png'; // Thêm Default Avatar
import './AdminSidebar.css';

const menuSections = [
    {
        label: 'Tổng quan',
        items: [
            { name: 'Dashboard', icon: 'fa-chart-column', path: '/admin/dashboard' },
        ],
    },
    {
        label: 'Điều phối nội dung',
        items: [
            { name: 'Bài viết chờ duyệt', icon: 'fa-clock', path: '/admin/pending-posts' },
            { name: 'Báo cáo cộng đồng', icon: 'fa-users', path: '/admin/community-reports' },
            { name: 'Yêu cầu thay đổi', icon: 'fa-code-pull-request', path: '/admin/change-requests' },
            { name: 'Báo cáo hệ thống', icon: 'fa-file-export', path: '/admin/generate-reports' },
        ],
    },
    {
        label: 'Quản trị hệ thống',
        items: [
            { name: 'Tài khoản người dùng', icon: 'fa-user-gear', path: '/admin/user-management' },
            { name: 'Cấu hình hệ thống', icon: 'fa-gear', path: '/admin/system-config' },
            { name: 'Quy tắc chấm điểm', icon: 'fa-scale-balanced', path: '/admin/scoring-rules' },
            { name: 'Danh mục nội dung', icon: 'fa-layer-group', path: '/admin/categories' },
        ],
    },
    {
        label: 'Cá nhân',
        items: [
            { name: 'Thông báo', icon: 'fa-bell', path: '/admin/notifications' },
            // ĐÃ XÓA MỤC HỒ SƠ Ở ĐÂY
        ],
    },
];

export default function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        logout();
    };

    return (
        <aside className='admin-sidebar'>
            <Link to='/admin/dashboard' className='sidebar-logo'>
                <img src={LOGO} alt='Green Light' />
                <div className='sidebar-logo-text'>
                    <span className='sidebar-logo-title'>Green Light</span>
                    <span className='sidebar-logo-subtitle'>Hệ thống Quản trị</span>
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
                    to="/admin/profile"
                    className={`sidebar-user-card ${location.pathname === '/admin/profile' ? 'active' : ''}`}
                >
                    <div className='user-card-content'>
                        <div className='sidebar-user-avatar'>
                            <img
                                src={user?.avatar || DefaultAvatar}
                                alt="avatar"
                                onError={(e) => e.target.src = DefaultAvatar}
                            />
                        </div>
                        <div className='sidebar-user-info'>
                            <span className='sidebar-user-name'>{user?.name || 'Quản trị viên'}</span>
                            <span className='sidebar-user-role'>{user?.roleName || 'Admin'}</span>
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