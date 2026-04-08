import { Outlet } from 'react-router-dom';
import InstructorSidebar from './InstructorSidebar';
import InstructorHeader from './InstructorHeader';
import './InstructorLayout.css';

export default function InstructorLayout() {
    return (
        <div className='instructor-layout'>
            <InstructorSidebar />
            <div className='instructor-main-area'>
                <InstructorHeader />
                <main className='instructor-content'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
