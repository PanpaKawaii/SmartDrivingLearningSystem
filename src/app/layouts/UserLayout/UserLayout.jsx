import { Link, Outlet } from 'react-router-dom';
import UserHeader from '../Header/UserHeader';

import './UserLayout.css';

export default function UserLayout() {

    return (
        <div className='user-layout-container'>
            <UserHeader />
            <main className='main'><Outlet /></main>

            <footer className='footer'>
                <div className='footer-wrapper'>
                    <div className='footer-brand'>
                        <div className='logo-icon'>
                            {/* <Gamepad2 className='icon' /> */}
                            <i className='fa-solid fa-gamepad' />
                        </div>
                        <span className='logo-text'>Smart Drive</span>
                        <p>
                            Advanced driving training system powered by AI technology.
                            Experience the future of driver education.
                        </p>
                    </div>

                    <div className='footer-column'>
                        <h3>Quick Links</h3>
                        <Link to='/learn'>Theory Learning</Link>
                        <Link to='/practice'>Practice Exams</Link>
                        <Link to='/signs'>Traffic Signs</Link>
                        <Link to='/simulator'>Simulator</Link>
                    </div>

                    <div className='footer-column'>
                        <h3>Support</h3>
                        <Link to='/assistant'>AI Assistant</Link>
                        <Link to='/dashboard'>My Progress</Link>
                        <a href='#'>Help Center</a>
                        <a href='#'>Contact Us</a>
                    </div>
                </div>

                <div className='footer-bottom'>
                    © 2026 <span>Smart Drive</span> Learning System. All rights reserved.
                </div>
            </footer>
        </div>
    )
}