import { useLocation } from 'react-router-dom';
import './InstructorHeader.css';

const pageTitles = {
    '/instructor/dashboard': 'Trang chủ',
    '/instructor/my-posts': 'Tạo bài viết',
    '/instructor/my-posts-list': 'Bài viết của tôi',
    '/instructor/pending-posts': 'Bài viết chờ duyệt',
    '/instructor/community-reports': 'Báo cáo cộng đồng',
    '/instructor/content-error-reports': 'Báo cáo lỗi nội dung',
    '/instructor/change-requests': 'Duyệt yêu cầu thay đổi',
    '/instructor/chapter-management': 'Quản lý Chương',
    '/instructor/lesson-management': 'Quản lý Bài học',
    '/instructor/question-bank': 'Ngân hàng Câu hỏi',
    '/instructor/exam-management': 'Bài thi thử',
    '/instructor/traffic-sign-bank': 'Ngân hàng Biển báo',
    '/instructor/simulation-bank': 'Ngân hàng Mô phỏng',
    '/instructor/license-management': 'Quản lý Bằng lái',
    '/instructor/vehicle-management': 'Quản lý Phương tiện',
    '/instructor/report-processing': 'Xử lý báo cáo',
};

export default function InstructorHeader() {
    const location = useLocation();
    const currentTitle = pageTitles[location.pathname] || 'Trang chủ';

    return (
        <header className='instructor-header'>
            <div className='header-left'>
                <div className='header-breadcrumb'>
                    <span className='breadcrumb-item'>Giảng viên</span>
                    <span className='breadcrumb-separator'>
                        <i className='fa-solid fa-chevron-right'></i>
                    </span>
                    <span className='breadcrumb-current'>{currentTitle}</span>
                </div>
            </div>

            <div className='header-right'>
                <div className='header-search'>
                    <i className='fa-solid fa-magnifying-glass search-icon'></i>
                    <input type='text' placeholder='Tìm kiếm...' />
                </div>
                <button className='header-icon-btn' title='Thông báo'>
                    <i className='fa-solid fa-bell'></i>
                    <span className='badge'></span>
                </button>
                <button className='header-icon-btn' title='Cài đặt'>
                    <i className='fa-solid fa-gear'></i>
                </button>
            </div>
        </header>
    );
}
