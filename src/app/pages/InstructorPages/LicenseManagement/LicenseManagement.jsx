import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { drivingLicenses } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const drivingLicenseItems = [...drivingLicenses];


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'name', label: 'Tên hạng bằng lái' },
    { key: 'description', label: 'Mô tả' },
    { key: 'status', label: 'Trạng thái', width: '110px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nghưng'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
        </div>
    )},
];

export default function LicenseManagement() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Quản lý Bằng lái</h1><p>Quản lý danh sách các hạng giấy phép lái xe ({drivingLicenseItems.length} hạng).</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm hạng</button>
            </div>
            <InstructorDataTable title={`Hiển thị ${drivingLicenseItems.length} hạng bằng lái`} columns={columns} data={drivingLicenseItems} />
        </div>
    );
}
