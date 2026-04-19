import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchData, patchData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import GREENLIGHT_LOGO from '../../assets/GREENLIGHT_LOGO.png';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import NotificationDropdown from '../../pages/Notification/NotificationDropdown';
// import LOGO from '../../assets/Logo.png';

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
        { name: 'THÀNH VIÊN', icon: 'users', iconType: 'solid', path: '/membership' },
        { name: 'LỘ TRÌNH', icon: 'map', iconType: 'solid', path: '/learning-path' },
        // { name: 'GROUND', icon: 'map', iconType: 'solid', path: '/three-scene' },
        // { name: 'CAR', icon: 'car', iconType: 'solid', path: '/car' },
        // { name: 'ADMIN', icon: 'user', iconType: 'solid', path: '/admin' },
        // { name: 'INSTRUCTOR', icon: 'chalkboard-user', iconType: 'solid', path: '/instructor' },
        // { name: 'PAYMENT', icon: 'dollar', iconType: 'solid', path: '/payment-status/?message=Thanh%20toán%20thành%20công' },
        // { name: 'EXCEL', icon: 'file-excel', iconType: 'solid', path: '/read-excel-data' },
    ];

    const loadNotifications = async () => {
        if (!user?.token) return;
        try {
            // Gọi API lấy thông báo của user hiện tại
            const res = await fetchData(`Notifications/user/${user.id}`, user.token);
            setNotifications(Array.isArray(res) ? res : res?.items || []);
        } catch (error) {
            console.error('Error loading notifications', error);
        }
    };

    const handleSelectNoti = async (notiId) => {
        try {
            // Cập nhật status thành đã đọc (giả sử 1 là đã đọc)
            await patchData(`Notifications/${notiId}`, { status: 1 }, user.token);
            // Reload lại danh sách
            loadNotifications();
        } catch (error) {
            console.error('Error updating notification', error);
        }
    };

    useEffect(() => {
        const UserSession = localStorage.getItem('user');
        if (!UserSession) {
            console.log('/');
            navigate('/');
        } else if (user?.roleName == 'Guest') {
            console.log('Guest');
        } else if (user?.roleName == 'Student') {
            console.log('Student');
        } else if (user?.roleName == 'Instructor') {
            console.log('Instructor');
            navigate('/instructor');
        } else if (user?.roleName == 'Admin') {
            console.log('Admin');
            navigate('/admin');
        }

        (async () => {
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                if (userId) {
                    const result = await fetchData(`User/${userId}`, token);
                    console.log('result', result);

                    setThisUser(result);

                    // Load thông báo khi có user
                    loadNotifications();
                }
            } catch (error) {
                console.error('Error', error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                // setLoading(false);
            };
        })();
    }, [user?.id]);

    useEffect(() => {
        if (location.state?.openLogin == 'true') setLoginOpen(true);
        else if (location.state?.openLogin == 'false') setLoginOpen(false);
    }, [location.state]);

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
                        console.log('locationPathname', locationPathname);

                        const itemPath = item.path;
                        console.log('itemPath', itemPath);
                        const isActive = (itemPath !== '/' && (locationPathname?.split('/'))?.includes(itemPath.replace('/', ''))) || (itemPath === '/' && locationPathname === '/');

                        return (
                            <Link
                                key={index}
                                to={itemPath}
                                className={`nav-item ${isActive ? 'active' : ''}`}
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
                                    <img src={thisUser?.avatar || user?.avatar || DefaultAvatar} alt={user?.name} />
                                </div>
                                <div className='name-role'>
                                    <div className='name'>{thisUser?.name || user?.name}</div>
                                    <div className='role'>{thisUser?.roleName || user?.roleName}</div>
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
    )
}
