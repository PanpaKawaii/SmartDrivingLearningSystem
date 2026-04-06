import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { questionChapters } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const chapterItems = [...questionChapters];


const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'name', label: 'Tên chương' },
    { key: 'description', label: 'Mô tả' },
    { key: 'status', label: 'Trạng thái', width: '110px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function ChapterManagement() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Chương</h1>
                    <p>Quản lý danh sách chương trong chương trình đào tạo ({chapterItems.length} chương).</p>
                </div>
                <button className='ins-btn ins-btn-primary'>
                    <i className='fa-solid fa-plus'></i> Thêm chương
                </button>
            </div>
            <InstructorDataTable title={`Hiển thị ${chapterItems.length} chương`} columns={columns} data={chapterItems} />
        </div>
    );
}
