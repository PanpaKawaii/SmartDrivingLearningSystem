import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockVehicles = [
    { id: 1, plate: '51A-123.45', type: 'Ô tô', model: 'Toyota Vios 2024', license: 'B2', status: 'active' },
    { id: 2, plate: '51A-678.90', type: 'Ô tô', model: 'Hyundai i10 2024', license: 'B1', status: 'active' },
    { id: 3, plate: '51B-111.22', type: 'Xe tải', model: 'Hyundai Porter 2023', license: 'C', status: 'maintenance' },
    { id: 4, plate: '59P1-333.44', type: 'Xe máy', model: 'Honda Wave 2024', license: 'A1', status: 'active' },
];

const columns = [
    { key: 'plate', label: 'Biển số', width: '120px' },
    { key: 'model', label: 'Xe' },
    { key: 'type', label: 'Loại xe', width: '100px' },
    { key: 'license', label: 'Hạng', width: '80px' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'active' ? 'approved' : val === 'maintenance' ? 'pending' : 'rejected'}`}>
            <span className='chip-dot'></span>{val === 'active' ? 'Hoạt động' : val === 'maintenance' ? 'Bảo trì' : 'Ngưng'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function VehicleManagement() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Quản lý Phương tiện</h1><p>Quản lý danh sách phương tiện đào tạo.</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm phương tiện</button>
            </div>
            <InstructorDataTable title='Danh sách phương tiện' columns={columns} data={mockVehicles} />
        </div>
    );
}
