import { useLocation } from 'react-router-dom';
import './AdminHeader.css';

const pageTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/user-management': 'Quản lý tài khoản người dùng',
    '/admin/system-config': 'Cấu hình hệ thống',
    '/admin/scoring-rules': 'Quy tắc chấm điểm',
    '/admin/categories': 'Danh mục nội dung',
    '/admin/change-requests': 'Yêu cầu thay đổi',
    '/admin/pending-posts': 'Bài viết chờ duyệt',
    '/admin/community-reports': 'Báo cáo cộng đồng',
    '/admin/generate-reports': 'Báo cáo hệ thống',
    '/admin/notifications': 'Thông báo',
    '/admin/profile': 'Hồ sơ',
};

export default function AdminHeader() {
    const location = useLocation();
    const currentTitle = pageTitles[location.pathname] || 'Dashboard';

    return (
        <header className='admin-header'>
            <div className='header-left'>
                <div className='header-breadcrumb'>
                    <span className='breadcrumb-item'>Admin</span>
                    <span className='breadcrumb-separator'>
                        <i className='fa-solid fa-chevron-right'></i>
                    </span>
                    <span className='breadcrumb-current'>{currentTitle}</span>
                </div>
            </div>

            <div className='header-right'>
                <div className='header-search'>
                    <i className='fa-solid fa-magnifying-glass search-icon'></i>
                    <input type='text' placeholder='Tìm kiếm...' />
                </div>
                <button className='header-icon-btn' title='Thông báo'>
                    <i className='fa-solid fa-bell'></i>
                    <span className='badge'></span>
                </button>
                <button className='header-icon-btn' title='Cài đặt'>
                    <i className='fa-solid fa-gear'></i>
                </button>
            </div>
        </header>
    );
}
