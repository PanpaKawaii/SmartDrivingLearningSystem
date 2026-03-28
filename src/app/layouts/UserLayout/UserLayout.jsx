import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import UserHeader from '../Header/UserHeader';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';

import './UserLayout.css';

export default function UserLayout() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <div className='user-layout-container'>
            <UserHeader setLoginOpen={setLoginOpen} />
            <main className='main'><Outlet /></main>
            <Footer />

            {loginOpen &&
                <LoginRegister onClose={setLoginOpen} />
            }
        </div>
    )
}