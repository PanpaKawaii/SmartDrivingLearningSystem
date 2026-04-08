import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { exams } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const examItems = [...exams];


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tên bài thi' },
    { key: 'duration', label: 'Thời gian (giây)', width: '140px', render: (val) => `${val}s` },
    { key: 'passScore', label: 'Điểm đạt', width: '100px' },
    { key: 'isRandom', label: 'Ngẫu nhiên', width: '110px', render: (val) => val ? 'Có' : 'Không' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
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
            <InstructorDataTable title={`Hiển thị ${examItems.length} bài thi`} columns={columns} data={examItems} />
        </div>
    );
}
