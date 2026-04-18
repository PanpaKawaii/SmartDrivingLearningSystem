import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import { fetchData } from '../../../mocks/CallingAPI'; // Import fetchData
import LOGO from '../../assets/Logo.png';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
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
        ],
    },
];

export default function AdminSidebar() {
    const location = useLocation();
    const { logout, user, refreshNewToken } = useAuth();
    const [thisUser, setThisUser] = useState(null); // State lưu dữ liệu fetch từ API

    // Fetch dữ liệu admin chi tiết giống UserHeader
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
                console.error('Error fetching admin data', error);
                if (error.status === 401) refreshNewToken(user);
            }
        })();
    }, [user?.id, user?.avatar, user?.name]); // Re-fetch khi user context thay đổi (sau khi update profile)

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
                            {/* Ưu tiên hiển thị: Dữ liệu API (thisUser) > Dữ liệu Context (user) > Ảnh mặc định */}
                            <img
                                src={thisUser?.avatar || user?.avatar || DefaultAvatar}
                                alt="avatar"
                                onError={(e) => e.target.src = DefaultAvatar}
                            />
                        </div>
                        <div className='sidebar-user-info'>
                            <span className='sidebar-user-name'>
                                {thisUser?.name || user?.name || 'Quản trị viên'}
                            </span>
                            <span className='sidebar-user-role'>
                                {thisUser?.roleName || user?.roleName || 'Admin'}
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