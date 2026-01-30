import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';

import './AdminSideBar.css';

export default function AdminSideBar() {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('AdminSideBar', location.pathname);

    const menuItems = [
        { name: 'USER', icon: 'user', path: '/admin/user-management' },
        { name: 'TRANSACTION', icon: 'money-check-dollar', path: '/admin/transaction-management', },
        { name: 'QUESTION', icon: 'question', path: '/admin/question-management', },
    ];

    // useEffect(() => {
    //     const UserSession = localStorage.getItem('user');
    //     if (!UserSession) navigate('/');
    //     else if (user?.role === 'user') navigate('/');
    // }, [user?.id]);

    return (
        <>
            <div className={`admin-side-bar-container`}>
                <Link to='/'>
                    <div className='logo'>Green Light</div>
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
            <Outlet />
        </>
    )
}
