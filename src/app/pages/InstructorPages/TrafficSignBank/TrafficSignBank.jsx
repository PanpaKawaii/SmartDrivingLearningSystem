import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockSigns = [
    { id: 1, code: 'P.102', name: 'Cấm đi ngược chiều', type: 'Cấm', image: '🚫', status: 'active' },
    { id: 2, code: 'W.201a', name: 'Chỗ ngoặt nguy hiểm vòng bên trái', type: 'Nguy hiểm', image: '⚠️', status: 'active' },
    { id: 3, code: 'I.401', name: 'Bắt đầu đường cao tốc', type: 'Chỉ dẫn', image: '🛣️', status: 'active' },
    { id: 4, code: 'R.301a', name: 'Hướng đi phải theo', type: 'Hiệu lệnh', image: '➡️', status: 'active' },
    { id: 5, code: 'S.501', name: 'Phụ biển khoảng cách', type: 'Phụ', image: '📏', status: 'draft' },
];

const columns = [
    { key: 'code', label: 'Mã', width: '80px' },
    { key: 'image', label: '', width: '50px', render: (val) => <span style={{ fontSize: '1.25rem' }}>{val}</span> },
    { key: 'name', label: 'Tên biển báo' },
    { key: 'type', label: 'Loại', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Cấm' ? 'rejected' : val === 'Nguy hiểm' ? 'pending' : 'active'}`}>
            {val}
        </span>
    )},
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

export default function TrafficSignBank() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Ngân hàng Biển báo</h1><p>Quản lý danh sách biển báo giao thông.</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm biển báo</button>
            </div>
            <InstructorDataTable title='Danh sách biển báo' columns={columns} data={mockSigns} />
        </div>
    );
}
