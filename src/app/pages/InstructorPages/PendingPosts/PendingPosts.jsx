import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockPosts = [
    { id: 1, title: 'Hướng dẫn lái xe số tự động cho người mới', author: 'Nguyễn Văn A', date: '27/03/2026', category: 'Hướng dẫn', status: 'pending' },
    { id: 2, title: 'Kinh nghiệm thi sát hạch lái xe hạng B2', author: 'Trần Thị B', date: '26/03/2026', category: 'Kinh nghiệm', status: 'pending' },
    { id: 3, title: 'Các lỗi thường gặp khi thi sa hình', author: 'Lê Văn C', date: '25/03/2026', category: 'Mẹo thi', status: 'pending' },
    { id: 4, title: 'Cách xử lý tình huống khẩn cấp trên đường', author: 'Phạm D', date: '25/03/2026', category: 'An toàn', status: 'pending' },
    { id: 5, title: 'Bảo dưỡng xe định kỳ', author: 'Hoàng E', date: '24/03/2026', category: 'Bảo trì', status: 'pending' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề bài viết' },
    { key: 'author', label: 'Tác giả', width: '140px' },
    { key: 'category', label: 'Danh mục', width: '120px' },
    { key: 'date', label: 'Ngày gửi', width: '120px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: () => (
        <span className='ins-status-chip pending'><span className='chip-dot'></span>Chờ duyệt</span>
    )},
    { key: 'actions', label: 'Thao tác', width: '120px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Duyệt'><i className='fa-solid fa-check'></i></button>
            <button className='ins-action-btn delete' title='Từ chối'><i className='fa-solid fa-xmark'></i></button>
        </div>
    )},
];

export default function PendingPosts() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết chờ duyệt</h1>
                    <p>Danh sách bài viết đang chờ phê duyệt từ giảng viên.</p>
                </div>
            </div>
            <InstructorDataTable title='Bài viết chờ duyệt' columns={columns} data={mockPosts} />
        </div>
    );
}
