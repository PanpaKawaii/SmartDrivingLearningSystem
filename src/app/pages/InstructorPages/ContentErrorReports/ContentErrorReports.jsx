import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { reports } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

// Lọc chỉ lấy báo cáo chưa xử lý hoặc đã xử lý
const data = reports;


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề báo cáo' },
    { key: 'content', label: 'Nội dung' },
    { key: 'userId', label: 'Người báo', width: '110px', render: (val) => `User #${val}` },
    { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => val?.split(' ')[0] },
    { key: 'status', label: 'Trạng thái', width: '130px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'rejected' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Chưa xử lý' : 'Đã xử lý'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Xử lý'><i className='fa-solid fa-wrench'></i></button>
        </div>
    )},
];

export default function ContentErrorReports() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo lỗi nội dung</h1><p>Danh sách lỗi nội dung được báo cáo từ người dùng.</p></div>
            </div>
            <InstructorDataTable title={`Báo cáo lỗi (${data.length})`} columns={columns} data={data} />
        </div>
    );
}
