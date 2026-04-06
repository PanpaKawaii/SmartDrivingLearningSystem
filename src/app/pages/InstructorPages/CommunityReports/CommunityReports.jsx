import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { reports } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

// Lọc báo cáo cộng đồng (có forumPostId hoặc forumCommentId)
const communityData = reports.filter((r) => r.forumPostId || r.forumCommentId);

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề báo cáo' },
    { key: 'content', label: 'Nội dung' },
    { key: 'userId', label: 'Người báo cáo', width: '120px', render: (val) => `User #${val}` },
    { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => val?.split(' ')[0] },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'pending' : 'approved'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Chờ xử lý' : 'Đã xử lý'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Chi tiết'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Xử lý'><i className='fa-solid fa-gavel'></i></button>
        </div>
    )},
];

export default function CommunityReports() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo cộng đồng</h1><p>Danh sách báo cáo vi phạm từ cộng đồng.</p></div>
            </div>
            <InstructorDataTable title={`Báo cáo cộng đồng (${communityData.length})`} columns={columns} data={communityData} />
        </div>
    );
}
