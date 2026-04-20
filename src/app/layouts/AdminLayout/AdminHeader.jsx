import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import { fetchData } from '../../../mocks/CallingAPI';
import NotificationDropdown from '../../pages/Notification/NotificationDropdown';
import NotificationDetailModal from '../../pages/Notification/NotificationDetailModal';
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
    const { user, refreshNewToken } = useAuth();
    const location = useLocation();
    const [showNoti, setShowNoti] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const [selectedNoti, setSelectedNoti] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const currentTitle = pageTitles[location.pathname] || 'Dashboard';

    // 1. Load danh sách thông báo và xử lý dữ liệu (giống Instructor)
    const loadNotifications = async () => {
        const token = user?.token || '';
        try {
            const res = await fetchData(`Notifications/all?userId=${user.id}&sortBy=time`, token);
            const dataItems = res.items || res;

            if (Array.isArray(dataItems)) {
                // Lọc bỏ các thông báo có status = 0 (đã xóa)
                const filteredNoti = dataItems.filter(n => n.status !== 0);
                setNotifications(filteredNoti);

                // Kiểm tra xem còn thông báo nào chưa đọc (status = 2) không
                const hasUnread = filteredNoti.some(n => n.status === 2);
                setUnreadCount(hasUnread ? 1 : 0);
            }
        } catch (error) {
            console.error("Lỗi fetch notification:", error);
            if (error.status === 401) {
                refreshNewToken(user);
            }
        }
    };

    useEffect(() => {
        if (user?.id) {
            loadNotifications();
        }
    }, [user?.id, user?.token]);

    // 2. Click outside để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNoti(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 3. Mở chi tiết thông báo và cập nhật trạng thái đã đọc tại chỗ
    const handleOpenDetail = async (notiId) => {
        const token = user?.token || '';
        try {
            const detail = await fetchData(`Notifications/${notiId}`, token);
            if (detail) {
                setSelectedNoti(detail);
                setIsDetailOpen(true);
                setShowNoti(false);

                // Cập nhật trạng thái thành 'đã đọc' (status = 1) trong local state
                setNotifications(prevNotis =>
                    prevNotis.map(n => n.id === notiId ? { ...n, status: 1 } : n)
                );

                // Kiểm tra lại unreadCount sau khi vừa đọc xong thông báo này
                const stillHasUnread = notifications.some(n => n.id !== notiId && n.status === 2);
                setUnreadCount(stillHasUnread ? 1 : 0);
            }
        } catch (error) {
            console.error("Lỗi lấy chi tiết thông báo:", error);
            if (error.status === 401) {
                refreshNewToken(user);
            }
        }
    };

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

            <div className='header-right' ref={dropdownRef}>
                <div className="notification-wrapper">
                    <button
                        className={`header-icon-btn ${showNoti ? 'active' : ''}`}
                        title='Thông báo'
                        onClick={() => setShowNoti(!showNoti)}
                    >
                        <i className='fa-solid fa-bell'></i>
                        {/* Chấm đỏ hiện lên khi có thông báo status = 2 */}
                        {unreadCount > 0 && <span className='badge-dot'></span>}
                    </button>

                    {showNoti && (
                        <NotificationDropdown
                            notifications={notifications}
                            onClose={() => setShowNoti(false)}
                            onSelectNoti={handleOpenDetail}
                        />
                    )}
                </div>

                <button className='header-icon-btn' title='Cài đặt'>
                    <i className='fa-solid fa-gear'></i>
                </button>
            </div>

            {/* Modal hiển thị chi tiết khi click vào item trong dropdown */}
            {isDetailOpen && selectedNoti && (
                <NotificationDetailModal
                    data={selectedNoti}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}
        </header>
    );
}