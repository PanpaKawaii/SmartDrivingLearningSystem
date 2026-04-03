import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockExams = [
    { id: 1, title: 'Đề thi thử hạng B2 - Bộ 1', questions: 35, duration: '22 phút', license: 'B2', status: 'active' },
    { id: 2, title: 'Đề thi thử hạng B2 - Bộ 2', questions: 35, duration: '22 phút', license: 'B2', status: 'active' },
    { id: 3, title: 'Đề thi thử hạng A1 - Bộ 1', questions: 25, duration: '19 phút', license: 'A1', status: 'active' },
    { id: 4, title: 'Đề thi thử biển báo nâng cao', questions: 40, duration: '25 phút', license: 'Tất cả', status: 'draft' },
    { id: 5, title: 'Đề thi thử tình huống mô phỏng', questions: 20, duration: '15 phút', license: 'B2', status: 'active' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tên bài thi' },
    { key: 'questions', label: 'Số câu', width: '80px' },
    { key: 'duration', label: 'Thời gian', width: '100px' },
    { key: 'license', label: 'Hạng', width: '80px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'active' ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 'active' ? 'Hoạt động' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function ExamManagement() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Quản lý Bài thi thử</h1><p>Quản lý danh sách bài thi sát hạch thử nghiệm.</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Tạo bài thi</button>
            </div>
            <InstructorDataTable title='Danh sách bài thi' columns={columns} data={mockExams} />
        </div>
    );
}
