import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserHeader.css';

export default function UserHeader() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'HOME', icon: 'house', path: '/' },
        { name: 'LEARNING', icon: 'book-open', path: '/core-learning' },
        { name: 'QUESTION', icon: 'question', path: '/learning-question' },
        { name: 'SIGN', icon: 'sign', path: '/learning-sign' },
        { name: 'EXAM', icon: 'copy', path: '/list-exam' },
        { name: 'VIDEO', icon: 'video', path: '/controlled-video' },
        { name: 'FORUM', icon: 'message', path: '/forum' },
        { name: 'GROUND', icon: 'map', path: '/three-scene' },
        { name: 'CAR', icon: 'car', path: '/car' },
        { name: 'SIGN', icon: 'sign', path: '/traffic-sign-flip-book' },
        { name: 'ADMIN', icon: 'user', path: '/admin' },
    ];

    return (
        <nav className='user-header-container'>
            <div className='nav-wrapper'>
                <div className='logo'>
                    <Link to='/'>
                        <div className='logo-icon'>
                            <i className='fa-solid fa-gamepad' />
                        </div>
                        <span className='logo-text'>GREENLIGHT</span>
                    </Link>
                </div>

                <div className='nav-links'>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                            >
                                <i className={`fa-solid fa-${item.icon}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <button
                    className='mobile-toggle'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {/* {mobileMenuOpen ? <X /> : <Menu />} */}
                    {mobileMenuOpen ? <i className='fa-solid fa-xmark' /> : <i className='fa-solid fa-bars' />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className='mobile-menu'>
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`mobile-item ${isActive ? 'active' : ''}`}
                            >
                                <Icon />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    )
}
