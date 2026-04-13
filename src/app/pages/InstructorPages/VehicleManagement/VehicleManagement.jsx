import DataTable from '../../../components/Shared/DataTable';
import { vehicles } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const vehicleItems = [...vehicles];


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'name', label: 'Tên phương tiện' },
    { key: 'description', label: 'Mô tả' },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nghưng'}
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
                <div><h1>Quản lý Phương tiện</h1><p>Quản lý danh sách phương tiện đào tạo ({vehicleItems.length} xe).</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm phương tiện</button>
            </div>
            <DataTable title={`Hiển thị ${vehicleItems.length} phương tiện`} columns={columns} data={vehicleItems} />
        </div>
    );
}
