import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockSimulations = [
    { id: 1, title: 'Tình huống vượt xe tải trên đường hẹp', type: 'Đường hẹp', difficulty: 'Khó', duration: '3 phút', status: 'active' },
    { id: 2, title: 'Xử lý khi gặp người đi bộ sang đường', type: 'Đô thị', difficulty: 'Trung bình', duration: '2 phút', status: 'active' },
    { id: 3, title: 'Lái xe trong điều kiện mưa lớn', type: 'Thời tiết', difficulty: 'Khó', duration: '4 phút', status: 'active' },
    { id: 4, title: 'Tình huống đỗ xe song song', type: 'Đỗ xe', difficulty: 'Trung bình', duration: '3 phút', status: 'draft' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tên tình huống' },
    { key: 'type', label: 'Loại', width: '100px' },
    { key: 'difficulty', label: 'Độ khó', width: '100px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Khó' ? 'rejected' : 'pending'}`}>{val}</span>
    )},
    { key: 'duration', label: 'Thời lượng', width: '100px' },
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

export default function SimulationBank() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Ngân hàng Mô phỏng</h1><p>Quản lý danh sách tình huống mô phỏng lái xe.</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm mô phỏng</button>
            </div>
            <InstructorDataTable title='Danh sách mô phỏng' columns={columns} data={mockSimulations} />
        </div>
    );
}
