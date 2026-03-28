import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';

const mockLicenses = [
    { id: 1, code: 'A1', name: 'Hạng A1 - Xe máy dưới 175cc', minAge: 18, trainingHours: 12, status: 'active' },
    { id: 2, code: 'A2', name: 'Hạng A2 - Xe máy trên 175cc', minAge: 18, trainingHours: 16, status: 'active' },
    { id: 3, code: 'B1', name: 'Hạng B1 - Ô tô dưới 9 chỗ (số tự động)', minAge: 18, trainingHours: 420, status: 'active' },
    { id: 4, code: 'B2', name: 'Hạng B2 - Ô tô dưới 9 chỗ', minAge: 18, trainingHours: 588, status: 'active' },
    { id: 5, code: 'C', name: 'Hạng C - Ô tô tải', minAge: 21, trainingHours: 720, status: 'active' },
];

const columns = [
    { key: 'code', label: 'Hạng', width: '80px' },
    { key: 'name', label: 'Tên giấy phép' },
    { key: 'minAge', label: 'Tuổi tối thiểu', width: '120px' },
    { key: 'trainingHours', label: 'Giờ đào tạo', width: '100px' },
    { key: 'status', label: 'Trạng thái', width: '100px', render: (val) => (
        <span className={`ins-status-chip ${val === 'active' ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>Hoạt động
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
                <div><h1>Quản lý Bằng lái</h1><p>Quản lý danh sách các hạng giấy phép lái xe.</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm hạng</button>
            </div>
            <InstructorDataTable title='Danh sách bằng lái' columns={columns} data={mockLicenses} />
        </div>
    );
}
