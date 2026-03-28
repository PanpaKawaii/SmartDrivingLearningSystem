import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockPosts = [
    { id: 1, title: 'Mẹo vượt bài thi sa hình lần đầu', date: '27/03/2026', views: 1250, status: 'approved' },
    { id: 2, title: 'Hướng dẫn đỗ xe ngang chi tiết', date: '25/03/2026', views: 890, status: 'approved' },
    { id: 3, title: 'Kinh nghiệm lái xe đường đèo', date: '23/03/2026', views: 2100, status: 'approved' },
    { id: 4, title: 'Cập nhật Nghị định 100 mới nhất', date: '20/03/2026', views: 3400, status: 'draft' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề' },
    { key: 'date', label: 'Ngày đăng', width: '120px' },
    { key: 'views', label: 'Lượt xem', width: '100px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'approved' ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 'approved' ? 'Đã đăng' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function MyPosts() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết của tôi</h1>
                    <p>Quản lý các bài viết do bạn tạo.</p>
                </div>
                <button className='ins-btn ins-btn-primary'>
                    <i className='fa-solid fa-plus'></i> Tạo bài viết
                </button>
            </div>
            <InstructorDataTable title='Danh sách bài viết' columns={columns} data={mockPosts} />
        </div>
    );
}
