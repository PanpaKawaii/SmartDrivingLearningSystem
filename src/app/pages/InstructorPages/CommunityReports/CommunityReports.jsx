import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockReports = [
    { id: 1, content: 'Bình luận vi phạm trong bài viết #102', reporter: 'Nguyễn A', target: 'Bình luận', date: '27/03/2026', status: 'pending' },
    { id: 2, content: 'Tài khoản spam quảng cáo', reporter: 'Trần B', target: 'Tài khoản', date: '26/03/2026', status: 'pending' },
    { id: 3, content: 'Nội dung bài viết sai sự thật', reporter: 'Lê C', target: 'Bài viết', date: '25/03/2026', status: 'resolved' },
    { id: 4, content: 'Hành vi quấy rối trên diễn đàn', reporter: 'Phạm D', target: 'Tài khoản', date: '24/03/2026', status: 'pending' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'content', label: 'Nội dung báo cáo' },
    { key: 'reporter', label: 'Người báo cáo', width: '140px' },
    { key: 'target', label: 'Đối tượng', width: '100px' },
    { key: 'date', label: 'Ngày', width: '120px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'pending' ? 'pending' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 'pending' ? 'Chờ xử lý' : 'Đã xử lý'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Xử lý'><i className='fa-solid fa-gavel'></i></button>
        </div>
    )},
];

export default function CommunityReports() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo cộng đồng</h1><p>Danh sách báo cáo vi phạm từ cộng đồng.</p></div>
            </div>
            <InstructorDataTable title='Danh sách báo cáo' columns={columns} data={mockReports} />
        </div>
    );
}
