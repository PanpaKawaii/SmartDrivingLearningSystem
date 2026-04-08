import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import LOGO from '../../assets/Logo.png';

import './UserHeader.css';

export default function UserHeader({
    setLoginOpen = () => { },
}) {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showProfileList, setShowProfileList] = useState(false);

    const handleClick = (item) => {
        item.onToggle();
        setShowProfileList(false);
    };

    const profileList = [
        { name: 'Profile', onToggle: () => navigate('profile'), },
        { name: 'Logout', onToggle: () => logout(), },
    ];

    const menuItems = [
        { name: 'HOME', icon: 'house', iconType: 'solid', path: '/' },
        { name: 'LICENSE', icon: 'book', iconType: 'solid', path: '/driving-license' },
        { name: 'SIMULATION', icon: 'circle-play', iconType: 'regular', path: '/simulation' },
        { name: 'FORUM', icon: 'message', iconType: 'solid', path: '/forum' },
        { name: 'LEARNING', icon: 'book-open', iconType: 'solid', path: '/learning' },
        // { name: 'GROUND', icon: 'map', iconType: 'solid', path: '/three-scene' },
        // { name: 'CAR', icon: 'car', iconType: 'solid', path: '/car' },
        { name: 'ADMIN', icon: 'user', iconType: 'solid', path: '/admin' },
        { name: 'INSTRUCTOR', icon: 'chalkboard-user', iconType: 'solid', path: '/instructor' },
        { name: 'EXCEL', icon: 'file-excel', iconType: 'solid', path: '/read-excel-data' },
    ];

    useEffect(() => {
        const UserSession = localStorage.getItem('user');
        if (!UserSession) navigate('/');
        else if (user?.roleName == 'Instructor') navigate('/instructor');
        else if (user?.roleName == 'Admin') navigate('/admin');
    }, [user?.id]);

    return (
        <nav className='user-header-container'>
            <div className='nav-wrapper'>
                <Link to='/'>
                    <div className='logo'>
                        <img src={LOGO} />
                    </div>
                    <span className='logo-text'>GREENLIGHT</span>
                </Link>

                <div className='nav-links'>
                    {menuItems.map((item, index) => {
                        const locationPathname = location.pathname;
                        const itemPath = item.path;
                        const isActive = (itemPath !== '/' && (locationPathname)?.includes(itemPath)) || (itemPath === '/' && locationPathname === '/');

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

                {user ?
                    <div className='user-profile-link' onClick={() => setShowProfileList(p => !p)}>
                        <div className='avatar'>
                            <img src={user?.avatar || DefaultAvatar} alt={user?.name} />
                        </div>
                        <div className='name-role'>
                            <div className='name'>{user?.name || 'THIS IS USER NAME'}</div>
                            <div className='role'>{user?.roleName || 'This is role'}</div>
                        </div>
                        <div className='list-button'>
                            {showProfileList && profileList?.map((item, index) => (
                                <button className='item' key={index} onClick={() => handleClick(item)}>
                                    {item.name?.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    :
                    <button className='login-btn' onClick={() => setLoginOpen(true)}>
                        <i className='fa-solid fa-user' />
                        <span>LOGIN</span>
                    </button>
                }

                <button
                    className='mobile-toggle'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <i className='fa-solid fa-xmark' /> : <i className='fa-solid fa-bars' />}
                </button>
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
