import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import LOGO from '../../assets/Logo.png';

import './UserHeader.css';

export default function UserHeader({
    setLoginOpen = () => {},
}) {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('Header', location.pathname);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'HOME', icon: 'house', iconType: 'solid', path: '/' },
        { name: 'LICENSE', icon: 'book', iconType: 'solid', path: '/driving-license' },
        { name: 'SIMULATION', icon: 'circle-play', iconType: 'regular', path: '/simulation' },
        { name: 'FORUM', icon: 'message', iconType: 'solid', path: '/forum' },
        { name: 'LEARNING', icon: 'book-open', iconType: 'solid', path: '/learning' },

        { name: 'GROUND', icon: 'map', iconType: 'solid', path: '/three-scene' },
        { name: 'CAR', icon: 'car', iconType: 'solid', path: '/car' },
        { name: 'ADMIN', icon: 'user', iconType: 'solid', path: '/admin' },
        { name: 'INSTRUCTOR', icon: 'chalkboard-user', iconType: 'solid', path: '/instructor' },
        { name: 'EXCEL', icon: 'file-excel', iconType: 'solid', path: '/read-excel-data' },
    ];

    // useEffect(() => {
    //     const UserSession = localStorage.getItem('user');
    //     if (!UserSession) navigate('/');
    //     else if (user?.role === 'admin') navigate('/admin/user-management');
    // }, [user?.id]);

    return (
        <nav className='user-header-container'>
            <div className='nav-wrapper'>
                <Link to='/'>
                    <div className='logo-icon'>
                        <i className='fa-solid fa-car' />
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

                {/* ==FIX== */}
                <div className='user-profile'>
                    <div className='avatar'>
                        <img src={'https://media.wired.com/photos/592675f6cefba457b079a0cd/3:2/w_2560%2Cc_limit/SCG003S-FRONTTA.jpg'} alt={user?.name} />
                    </div>
                    <span>{user?.name || 'THIS IS USER NAME'}</span>
                </div>

                <button className='login-btn' onClick={() => setLoginOpen(true)}>
                    <i className='fa-solid fa-user' />
                    <span>LOGIN</span>
                </button>

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
