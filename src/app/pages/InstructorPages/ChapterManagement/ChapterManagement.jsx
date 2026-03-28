import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockChapters = [
    { id: 1, name: 'Luật giao thông đường bộ', lessons: 12, questions: 150, license: 'B2', status: 'active' },
    { id: 2, name: 'Kỹ thuật lái xe', lessons: 8, questions: 80, license: 'B2', status: 'active' },
    { id: 3, name: 'Hệ thống biển báo', lessons: 6, questions: 200, license: 'Tất cả', status: 'active' },
    { id: 4, name: 'Cấu tạo và sửa chữa', lessons: 5, questions: 45, license: 'B2', status: 'draft' },
    { id: 5, name: 'Đạo đức người lái xe', lessons: 4, questions: 30, license: 'Tất cả', status: 'active' },
    { id: 6, name: 'Tình huống mô phỏng', lessons: 10, questions: 120, license: 'B1, B2', status: 'active' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'name', label: 'Tên chương' },
    { key: 'lessons', label: 'Số bài học', width: '100px' },
    { key: 'questions', label: 'Số câu hỏi', width: '100px' },
    { key: 'license', label: 'Hạng', width: '100px' },
    { key: 'status', label: 'Trạng thái', width: '100px', render: (val) => (
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

export default function ChapterManagement() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Chương</h1>
                    <p>Quản lý danh sách chương trong chương trình đào tạo.</p>
                </div>
                <button className='ins-btn ins-btn-primary'>
                    <i className='fa-solid fa-plus'></i> Thêm chương
                </button>
            </div>
            <InstructorDataTable title='Danh sách chương' columns={columns} data={mockChapters} />
        </div>
    );
}
