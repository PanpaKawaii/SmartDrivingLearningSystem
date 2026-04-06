import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { changeRequests } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const changeRequestItems = [...changeRequests];


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Nội dung yêu cầu' },
    { key: 'type', label: 'Loại', width: '100px', render: (val) => (
        <span className='ins-status-chip active'><span className='chip-dot'></span>{val}</span>
    )},
    { key: 'priority', label: 'ƯU tiên', width: '100px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Cao' ? 'rejected' : val === 'Trung bình' ? 'pending' : 'approved'}`}>
            {val}
        </span>
    )},
    { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => val?.split(' ')[0] },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'pending' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Chờ duyệt' : 'Đã duyệt'}
        </span>
    )},
    { key: 'actions', label: '', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Duyệt'><i className='fa-solid fa-check'></i></button>
        </div>
    )},
];

export default function ChangeRequests() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Duyệt yêu cầu thay đổi</h1><p>Xem xét và phê duyệt các yêu cầu thay đổi nội dung.</p></div>
            </div>
            <InstructorDataTable title={`Yêu cầu thay đổi (${changeRequestItems.length})`} columns={columns} data={changeRequestItems} />
        </div>
    );
}
