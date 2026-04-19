import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';
import Footer from '../Footer/Footer';
import UserHeader from '../Header/UserHeader';

import './UserLayout.css';

export default function UserLayout() {
    const location = useLocation();

    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        if (location.state?.openLogin == 'true') setLoginOpen(true);
        else if (location.state?.openLogin == 'false') setLoginOpen(false);
    }, [location.state]);

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