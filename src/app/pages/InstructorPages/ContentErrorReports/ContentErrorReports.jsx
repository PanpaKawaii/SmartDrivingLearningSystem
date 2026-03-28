import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockErrors = [
    { id: 1, content: 'Đáp án câu hỏi #245 không chính xác', page: 'Ngân hàng Câu hỏi', reporter: 'Học viên A', date: '27/03/2026', status: 'pending' },
    { id: 2, content: 'Hình ảnh biển báo P.102 bị sai', page: 'Biển báo', reporter: 'Học viên B', date: '26/03/2026', status: 'pending' },
    { id: 3, content: 'Link video bài học #12 không hoạt động', page: 'Bài học', reporter: 'Học viên C', date: '25/03/2026', status: 'resolved' },
    { id: 4, content: 'Nội dung bài học chương 3 bị trùng', page: 'Bài học', reporter: 'GV Trần', date: '24/03/2026', status: 'pending' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'content', label: 'Nội dung lỗi' },
    { key: 'page', label: 'Trang', width: '140px' },
    { key: 'reporter', label: 'Người báo', width: '120px' },
    { key: 'date', label: 'Ngày', width: '120px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'pending' ? 'rejected' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 'pending' ? 'Chưa sửa' : 'Đã sửa'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-wrench'></i></button>
        </div>
    )},
];

export default function ContentErrorReports() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo lỗi nội dung</h1><p>Danh sách lỗi nội dung được báo cáo từ người dùng.</p></div>
            </div>
            <InstructorDataTable title='Danh sách báo cáo lỗi' columns={columns} data={mockErrors} />
        </div>
    );
}
