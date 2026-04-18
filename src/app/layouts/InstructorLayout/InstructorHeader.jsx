import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { fetchData, putData } from '../../../mocks/CallingAPI';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import NotificationDropdown from '../../pages/Notification/NotificationDropdown';
import NotificationDetailModal from '../../pages/Notification/NotificationDetailModal';
import './InstructorHeader.css';

const pageTitles = {
    '/instructor/dashboard': 'Trang chủ',
    '/instructor/posts-list': 'Danh sách bài viết',
    '/instructor/pending-posts': 'Quản lý bài viết',
    '/instructor/community-reports': 'Báo cáo cộng đồng',
    '/instructor/content-error-reports': 'Báo cáo lỗi nội dung',
    '/instructor/change-requests': 'Duyệt yêu cầu thay đổi',
    '/instructor/chapter-management': 'Quản lý Chương',
    '/instructor/lesson-management': 'Quản lý Bài học',
    '/instructor/question-bank': 'Ngân hàng Câu hỏi',
    '/instructor/exam-management': 'Bài thi thử',
    '/instructor/traffic-sign-bank': 'Ngân hàng Biển báo',
    '/instructor/simulation-bank': 'Ngân hàng Mô phỏng',
    '/instructor/license-management': 'Quản lý Bằng lái',
    '/instructor/vehicle-management': 'Quản lý Phương tiện',
    '/instructor/report-processing': 'Xử lý báo cáo',
};

export default function InstructorHeader() {
    const { user, refreshNewToken } = useAuth();
    const location = useLocation();
    const [showNoti, setShowNoti] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const [selectedNoti, setSelectedNoti] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const currentTitle = pageTitles[location.pathname] || 'Trang chủ';

    const loadNotifications = async () => {
        const token = user?.token || '';
        try {
            const res = await fetchData(`Notifications/all?userId=${user.id}&sortBy=time`, token);
            const dataItems = res.items || res;

            if (Array.isArray(dataItems)) {
                const filteredNoti = dataItems.filter(n => n.status !== 0);
                setNotifications(filteredNoti);

                const hasUnread = filteredNoti.some(n => n.status === 2);
                setUnreadCount(hasUnread ? 1 : 0);
            }
        } catch (error) {
            console.error("Lỗi fetch notification:", error);
            // Sửa dựa trên ReportModal: Nếu 401 thì refresh token
            if (error.status == 401) {
                refreshNewToken(user);
            }
        }
    };

    useEffect(() => {
        if (user?.id) {
            loadNotifications();
        }
    }, [user?.id, user?.token, refresh]); // Thêm user.token vào dependency để tự load lại khi token mới được cập nhật

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNoti(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleNotification = () => setShowNoti(!showNoti);

    const handleOpenDetail = async (notiId) => {
        const token = user?.token || '';
        try {
            const detail = await fetchData(`Notifications/${notiId}`, token);
            if (detail) {
                setSelectedNoti(detail);
                setIsDetailOpen(true);
                setShowNoti(false);

                setNotifications(prevNotis =>
                    prevNotis.map(n =>
                        n.id === notiId ? { ...n, status: 1 } : n
                    )
                );

                const stillHasUnread = notifications.some(n => n.id !== notiId && n.status === 2);
                setUnreadCount(stillHasUnread ? 1 : 0);
                // ------------------------------------------
            }
        } catch (error) {
            console.error("Lỗi lấy chi tiết thông báo:", error);
            if (error.status == 401) {
                refreshNewToken(user);
            }
        }
    };

    return (
        <header className='instructor-header'>
            <div className='header-left'>
                <div className='header-breadcrumb'>
                    <span className='breadcrumb-item'>Giảng viên</span>
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
                        onClick={() => setShowNoti(!showNoti)}
                    >
                        <i className='fa-solid fa-bell'></i>
                        {unreadCount > 0 && <span className='badge-dot'></span>}
                    </button>

                    {showNoti && (
                        <NotificationDropdown
                            key={notifications.length}
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

            {isDetailOpen && selectedNoti &&
                <NotificationDetailModal
                    data={selectedNoti}
                    onClose={() => setIsDetailOpen(false)}
                />
            }
        </header>
    );
}
