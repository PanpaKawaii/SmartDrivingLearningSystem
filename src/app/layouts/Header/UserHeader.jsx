import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchData, patchData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import GREENLIGHT_LOGO from '../../assets/GREENLIGHT_LOGO.png';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import NotificationDropdown from '../../pages/Notification/NotificationDropdown';
// import LOGO from '../../assets/Logo.png';
import NotificationDetailModal from '../../pages/Notification/NotificationDetailModal';

import './UserHeader.css';

export default function UserHeader({
    setLoginOpen = () => { },
}) {
    const { logout, user, refreshNewToken } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [thisUser, setThisUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showProfileList, setShowProfileList] = useState(false);

    // State cho Notification
    const [notifications, setNotifications] = useState([]);
    const [showNoti, setShowNoti] = useState(false);
    const [selectedNotiDetail, setSelectedNotiDetail] = useState(null);
    const dropdownRef = useRef(null);

    // Kiểm tra xem có thông báo nào chưa đọc (status === 2) không
    const hasUnread = notifications.some(noti => noti.status === 2);

    const handleClick = (item) => {
        item.onToggle();
        setShowProfileList(true);
    };

    const profileList = [
        { name: 'Hồ sơ', onToggle: () => navigate('profile'), },
        { name: 'Đăng xuất', onToggle: () => logout(), },
    ];

    const menuItems = [
        // { name: 'TRANG CHỦ', icon: 'house', iconType: 'solid', path: '/' },
        { name: 'BẰNG LÁI', icon: 'book', iconType: 'solid', path: '/driving-license' },
        { name: 'MÔ PHỎNG', icon: 'circle-play', iconType: 'regular', path: '/simulation' },
        { name: 'DIỄN ĐÀN', icon: 'message', iconType: 'solid', path: '/forum' },
        { name: 'HỌC TẬP', icon: 'book-open', iconType: 'solid', path: '/learning' },
        { name: 'NHẬN DIỆN', icon: 'camera', iconType: 'solid', path: '/traffic-sign-recognition' },
        { name: 'LỘ TRÌNH', icon: 'map', iconType: 'solid', path: '/learning-path' },
        { name: 'VIP', icon: 'star', iconType: 'solid', path: '/membership' },
        // { name: 'GROUND', icon: 'map', iconType: 'solid', path: '/three-scene' },
        // { name: 'CAR', icon: 'car', iconType: 'solid', path: '/car' },
        // { name: 'ADMIN', icon: 'user', iconType: 'solid', path: '/admin' },
        // { name: 'INSTRUCTOR', icon: 'chalkboard-user', iconType: 'solid', path: '/instructor' },
        // { name: 'PAYMENT', icon: 'dollar', iconType: 'solid', path: '/payment-status/?message=Thanh%20toán%20thành%20công' },
        // { name: 'EXCEL', icon: 'file-excel', iconType: 'solid', path: '/read-excel-data' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNoti(false);
                setShowProfileList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadNotifications = async () => {
        if (!user?.token || !user?.id) return;
        try {
            // Gọi API lấy thông báo của user hiện tại
            const res = await fetchData(`Notifications/all?userId=${user.id}&sortBy=time`, user.token);
            const dataItems = res.items || res;
            if (Array.isArray(dataItems)) {
                // Lọc bỏ status = 0 nếu cần giống Admin
                setNotifications(dataItems.filter(n => n.status !== 0));
            }
        } catch (error) {
            console.error('Error loading notifications', error);
        }
    };

    const handleSelectNoti = async (notiId) => {
        const token = user?.token || '';

        try {
            const detail = await fetchData(`Notifications/${notiId}`, token);

            if (detail) {
                setSelectedNotiDetail(detail);
                setShowNoti(false);

                const targetNoti = notifications.find(n => n.id === notiId);

                // Nếu là thông báo chưa đọc (status = 2) thì cập nhật thành đã đọc (status = 1)
                if (targetNoti && targetNoti.status === 2) {
                    await patchData(`Notifications/${notiId}`, { status: 1 }, token);

                    setNotifications(prev =>
                        prev.map(n => n.id === notiId ? { ...n, status: 1 } : n)
                    );
                }
            }
        } catch (error) {
            console.error('Error updating notification', error);
            if (error?.status === 401) refreshNewToken(user);
        }
    };

    useEffect(() => {
        if (user?.id) {
            (async () => {
                try {
                    const result = await fetchData(`User/${user.id}`, user.token);
                    setThisUser(result);
                    loadNotifications();
                } catch (error) {
                    if (error.status === 401) refreshNewToken(user);
                }
            })();
        }
    }, [user?.id]);

    return (
        <nav className='user-header-container'>
            <div className='nav-wrapper'>
                <Link to='/'>
                    <div className='logo'>
                        <img src={GREENLIGHT_LOGO} />
                    </div>
                    <span className='logo-text'>GREENLIGHT</span>
                </Link>

                <div className='nav-links'>
                    {menuItems.map((item, index) => {
                        const locationPathname = location.pathname;
                        // console.log('locationPathname', locationPathname);

                        const itemPath = item.path;
                        // console.log('itemPath', itemPath);

                        const isActive = (itemPath !== '/' && (locationPathname?.split('/'))?.includes(itemPath.replace('/', ''))) || (itemPath === '/' && locationPathname === '/');

                        return (
                            <Link
                                key={index}
                                to={itemPath}
                                className={`nav-item ${isActive ? 'active' : ''} ${(itemPath == '/membership' && user?.roleName == 'Guest') ? 'highlight' : ''}`}
                            >
                                <i className={`fa-${item.iconType} fa-${item.icon}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className='header-right'>
                    {user ? (
                        <>
                            {/* CHUÔNG THÔNG BÁO */}
                            <div className='notification-wrapper'>
                                <button className='noti-bell-btn' onClick={() => setShowNoti(!showNoti)}>
                                    <i className="fa-solid fa-bell"></i>
                                    {hasUnread && <span className="red-dot"></span>}
                                </button>

                                {showNoti && (
                                    <NotificationDropdown
                                        notifications={notifications}
                                        onClose={() => setShowNoti(false)}
                                        onSelectNoti={handleSelectNoti}
                                    />
                                )}
                            </div>

                            {/* USER PROFILE */}
                            <div className='user-profile-link' onClick={() => setShowProfileList(p => !p)}>
                                <div className='avatar'>
                                    <img src={user?.avatar || DefaultAvatar} alt={user?.name} />
                                </div>
                                <div className='name-role'>
                                    <div className='name'>{user?.name}</div>
                                    <div className='role'>{user?.roleName}</div>
                                </div>

                                {showProfileList && (
                                    <div className='list-button'>
                                        {profileList.map((item, index) => (
                                            <button className='item' key={index} onClick={() => handleClick(item)}>
                                                {item.name?.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <button className='login-btn' onClick={() => setLoginOpen(true)}>
                            <i className='fa-solid fa-user' />
                            <span>Đăng nhập</span>
                        </button>
                    )}

                    <button className='mobile-toggle' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <i className='fa-solid fa-xmark' /> : <i className='fa-solid fa-bars' />}
                    </button>
                </div>
            </div>

            {/* Modal hiển thị chi tiết thông báo */}
            {selectedNotiDetail && (
                <NotificationDetailModal
                    data={selectedNotiDetail}
                    onClose={() => setSelectedNotiDetail(null)}
                />
            )}

            {mobileMenuOpen && (
                <div className='mobile-menu'>
                    {menuItems.map((item, index) => {
                        const locationPathname = location.pathname;
                        const itemPath = item.path;
                        const isActive = (itemPath !== '/' && (locationPathname)?.includes(itemPath)) || (itemPath === '/' && locationPathname === '/');

                        return (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`mobile-item ${isActive ? 'active' : ''}`}
                            >
                                <i className={`fa-solid fa-${item.icon}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
