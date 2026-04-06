import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { pendingPosts } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const pendingPostItems = [...pendingPosts];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề bài viết' },
    { key: 'userId', label: 'Tác giả', width: '120px', render: (val) => `User #${val}` },
    { key: 'forumTopicId', label: 'Chủ đề', width: '100px', render: (val) => `Topic #${val}` },
    { key: 'createAt', label: 'Ngày gửi', width: '130px', render: (val) => val?.split(' ')[0] },
    { key: 'status', label: 'Trạng thái', width: '120px', render: () => (
        <span className='ins-status-chip pending'><span className='chip-dot'></span>Chờ duyệt</span>
    )},
    { key: 'actions', label: 'Thao tác', width: '120px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Duyệt'><i className='fa-solid fa-check'></i></button>
            <button className='ins-action-btn delete' title='Từ chối'><i className='fa-solid fa-xmark'></i></button>
        </div>
    )},
];

export default function PendingPosts() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết chờ duyệt</h1>
                    <p>Danh sách bài viết đang chờ phê duyệt từ giảng viên.</p>
                </div>
            </div>
            <InstructorDataTable title={`Bài viết chờ duyệt (${pendingPostItems.length})`} columns={columns} data={pendingPostItems} />
        </div>
    );
}
