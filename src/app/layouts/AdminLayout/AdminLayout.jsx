import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../../styles/shared-design-tokens.css';
import './AdminLayout.css';

export default function AdminLayout() {
    return (
        <div className='admin-layout'>
            <AdminSidebar />
            <div className='admin-main-area'>
                <AdminHeader />
                <main className='admin-content'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
