import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './Header.css';

export default function Header() {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('NavigationBar', location.pathname);

    const menuItems = [
        { name: 'CORE LEARNING', icon: 'icon', path: '/core-learning' },
        { name: 'QUESTION', icon: 'icon', path: '/learning-question' },
        { name: 'SIGN', icon: 'icon', path: '/learning-sign' },
        { name: 'EXAM', icon: 'icon', path: '/exam' },
    ];

    useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/');
    }, [user]);

    return (
        <div className='header-container'>
            <Link to='/'>
                <div className='logo'>Xnova</div>
            </Link>
            <div className='items'>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`item ${location.pathname.includes(item.path) ? 'located' : ''}`}
                    >
                        <Link className='link' to={`${item.path}`}>
                            <i className={`fa-solid fa-${item.icon}`}></i>
                            <span>{item.name}</span>
                        </Link>
                    </div>
                ))}
                <div className='item' onClick={() => logout()}>
                    <div className='link'>
                        <i className={`fa-solid fa-right-to-bracket`}></i>
                        <span>LOG OUT</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
