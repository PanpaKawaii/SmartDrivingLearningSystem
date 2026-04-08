import DataTable from '../../../components/Shared/DataTable';
import { myPosts } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const myPostItems = [...myPosts];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'title', label: 'Tiêu đề' },
    { key: 'viewCount', label: 'Lượt xem', width: '100px' },
    { key: 'createAt', label: 'Ngày đăng', width: '130px', render: (val) => val?.split(' ')[0] },
    { key: 'status', label: 'Trạng thái', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Đã đăng' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function MyPosts() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết của tôi</h1>
                    <p>Quản lý các bài viết do bạn tạo ({myPostItems.length} bài viết).</p>
                </div>
                <button className='ins-btn ins-btn-primary'>
                    <i className='fa-solid fa-plus'></i> Tạo bài viết
                </button>
            </div>
            <DataTable title={`Hiển thị ${myPostItems.length} bài viết`} columns={columns} data={myPostItems} />
        </div>
    );
}
