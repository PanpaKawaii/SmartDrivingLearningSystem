import DataTable from '../../../components/Shared/DataTable';
import { signCategories, trafficSigns } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const data = trafficSigns.map((s) => ({
    ...s,
    categoryName: signCategories.find((c) => c.id === s.signCategoryId)?.name || '',
}));

const columns = [
    { key: 'code', label: 'Mã', width: '90px' },
    { key: 'name', label: 'Tên biển báo' },
    { key: 'categoryName', label: 'Loại', width: '130px', render: (val) => (
        <span className='ins-status-chip active'>{val}</span>
    )},
    { key: 'status', label: 'Trạng thái', width: '110px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '110px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function TrafficSignBank() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Ngân hàng Biển báo</h1><p>Quản lý danh sách biển báo giao thông ({data.length} biển báo).</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm biển báo</button>
            </div>
            <DataTable title={`Hiển thị ${data.length} biển báo`} columns={columns} data={data} />
        </div>
    );
}
