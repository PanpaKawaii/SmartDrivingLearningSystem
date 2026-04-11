import { useEffect ,useState } from 'react';
import DataTable from '../../../components/Shared/DataTable';
import LessonModal from './LessonModal';
import '../InstructorPages.css';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

const STATUS_LABELS = {
    '-1': 'Nháp',
    '1': 'Public',
    '0': 'Đã ẩn',
};


export default function LessonManagement() {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    
    // State for view popup
    const [selectedItem, setSelectedItem] = useState(null);
    console.log('Fetched lessons:', lessons);
    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            const questionChapterQuery = new URLSearchParams({
                page: '1',
                pageSize: '500',
                status: 1,
            });            
            try {
                const token = user?.token || '';
                
                
                if (chapters.length === 0) {
                    const chapterRes = await fetchData(`QuestionChapters?${questionChapterQuery.toString()}`, token);
                    setChapters(normalizeItems(chapterRes));
                }
                // Lấy posts phân trang
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });
                const res = await fetchData(`QuestionLessons?${query.toString()}`, token);
                setLessons(normalizeItems(res));
                console.log('Fetched lessons:', res);
                setServerPagination(prev => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount || prev.totalCount,
                    totalPages: res?.totalPages || 1,
                    
                }));
            } catch (err) {
                setError('Lỗi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, serverPagination.page, serverPagination.pageSize]);

    const normalizeItems = (payload) => {
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.items)) return payload.items;
        return [];
    };
    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            setLoading(true);
            const token = user?.token || '';
            // Toggle: 1 (Public) <-> 0 (Hidden)
            await patchData(`QuestionLessons/${id}`, { }, token);
            setRefresh(r => r + 1);
        } catch (err) {
            setError('Lỗi cập nhật trạng thái');
        } finally {
            setLoading(false);
        }
    };    
    const handleSave = (newLesson) => {

    };
    const columns = [
        { key: 'index', label: 'STT', width: '60px',render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'name', label: 'Tên bài học', width: '100px' },
        { key: 'questionChapterId', label: 'Chương', width: '100px', render: (val) => {
            const chapter = chapters.find(t => t.id === val);
            return chapter?.name || '---';
        } },
        // { key: 'content', label: 'Nội dung',
        // render: (val) => {
        //     return <div dangerouslySetInnerHTML={{ __html: val }} />;
        // } },
        { key: 'content', label: 'Nội dung'},
        { key: 'status', label: 'Trạng thái', width: '100px', render: (val) => {
                let cls = 'active';
                if (val === 0) cls = 'hidden';
                else if (val === -1) cls = 'draft';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
        },},
        { key: 'actions', label: 'Thao tác', width: '120px', render: (_, row) => (
            <div className='ins-action-cell'>
                <button className='ins-action-btn edit' title='Sửa' onClick={() => {
                    setSelectedItem(row);
                    setShowModal(true);
                }}><i className='fa-solid fa-pen'></i></button>
                <button 
                    className={`ins-action-btn ${row.status === 1 ? 'active' : 'hidden'}`}
                    title={row.status === 1 ? 'Ẩn bài học' : 'Hiển thị bài học'}
                    onClick={() => handleToggleStatus(row.id,row.status)}
                    disabled={loading}
                >
                    <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`} style={{fontSize:'1rem'}}></i>
                </button>
            </div>
        )},
    ];
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Bài học</h1>
                    <p>Quản lý danh sách bài học trong hệ thống đào tạo.</p>
                </div>
                <button className='ins-btn ins-btn-primary' onClick={() => {
                    setSelectedItem(null);
                    setShowModal(true);
                }}>
                    <i className='fa-solid fa-plus'></i> Thêm bài học
                </button>
            </div>
            <DataTable 
                title={`Danh sách bài học (${serverPagination.totalCount})`} 
                columns={columns} 
                data={lessons}
                loading={loading}
                error={error}
                serverPagination={serverPagination}
                onPageChange={handlePageChange} 
            />
            <LessonModal 
                isOpen={showModal} 
                lesson={selectedItem}
                action={selectedItem ? 'edit' : 'add'}
                chapter={selectedItem?.questionChapterId}
                chapters={chapters}
                onClose={() => {
                    setShowModal(false);
                    setSelectedItem(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}
