import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockRequests = [
    { id: 1, title: 'Cập nhật nội dung bài học Luật giao thông', requester: 'GV Nguyễn V', type: 'Bài học', date: '27/03/2026', priority: 'Cao', status: 'pending' },
    { id: 2, title: 'Sửa đáp án câu hỏi #245', requester: 'GV Trần T', type: 'Câu hỏi', date: '26/03/2026', priority: 'Trung bình', status: 'pending' },
    { id: 3, title: 'Thêm biển báo mới theo NĐ 100', requester: 'GV Lê M', type: 'Biển báo', date: '24/03/2026', priority: 'Thấp', status: 'pending' },
    { id: 4, title: 'Cập nhật video mô phỏng tình huống #5', requester: 'GV Phạm H', type: 'Mô phỏng', date: '23/03/2026', priority: 'Cao', status: 'approved' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Nội dung yêu cầu' },
    { key: 'requester', label: 'Người yêu cầu', width: '130px' },
    { key: 'type', label: 'Loại', width: '100px', render: (val) => (
        <span className='ins-status-chip active'><span className='chip-dot'></span>{val}</span>
    )},
    { key: 'priority', label: 'Ưu tiên', width: '100px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Cao' ? 'rejected' : val === 'Trung bình' ? 'pending' : 'approved'}`}>
            {val}
        </span>
    )},
    { key: 'date', label: 'Ngày', width: '120px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'pending' ? 'pending' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
        </span>
    )},
    { key: 'actions', label: '', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Duyệt'><i className='fa-solid fa-check'></i></button>
        </div>
    )},
];

export default function ChangeRequests() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Duyệt yêu cầu thay đổi</h1><p>Xem xét và phê duyệt các yêu cầu thay đổi nội dung.</p></div>
            </div>
            <InstructorDataTable title='Yêu cầu thay đổi' columns={columns} data={mockRequests} />
        </div>
    );
}
