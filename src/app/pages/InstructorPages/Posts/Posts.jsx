import DataTable from '../../../components/Shared/DataTable.jsx';
import { Post } from '../../../../mocks/DataSample.js';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import ForumCard from '../../Forum/ForumCard';
import PostModal from './PostModal';
import '../InstructorPages.css';
import { useEffect, useState } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';


const STATUS_LABELS = {
    '1': 'Public',
    '4': 'Đã ẩn',
    '5': 'Đã ghim',
};
const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

export default function Posts() {
    const { user, refreshNewToken } = useAuth();
    const [items, setItems] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    // Modal state
    const [showPostModal, setShowPostModal] = useState(false);
    const [editPost, setEditPost] = useState(null);

    // State for view popup
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const token = user?.token || '';
                // Lấy topics (chỉ lấy 1 lần)
                if (topics.length === 0) {
                    const topicRes = await fetchData('ForumTopics/all', token);
                    setTopics(normalizeItems(topicRes));
                }
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                    userId: user?.id,
                });
                const res = await fetchData(`ForumPosts?${query.toString()}`, token);
                setItems(normalizeItems(res));
                setServerPagination(prev => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount || prev.totalCount,
                    totalPages: res?.totalPages || 1,

                }));
            } catch (err) {
                if (err.status === 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi tải dữ liệu bài viết. Vui lòng thử lại.');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, serverPagination.page, serverPagination.pageSize]);

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };
    const handleOpenCreate = () => {
        setEditPost(null);
        setShowPostModal(true);
    };
    const handleOpenEdit = (post) => {
        setEditPost(post);
        setShowPostModal(true);
    };
    const handleCloseModal = () => {
        setShowPostModal(false);
        setEditPost(null);
    };
    const handleSavePost = () => {
        setRefresh(r => r + 1);
        handleCloseModal();
    };
    // Toggle post status between 1 (public) and 4 (hidden)
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/toggle-status`, { }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi cập nhật trạng thái bài viết.');
            }
        } finally {
        }
    };
    const handleTogglePin = async (id, currentStatus) => {
        try {
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/toggle-pin`, { }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else if(currentStatus !==1) {
                setError('Lỗi cập nhật trạng thái ghim bài viết. Chỉ có thể ghim bài viết đang ở trạng thái Công khai.');
            } else {
                setError('Lỗi cập nhật trạng thái ghim bài viết.');
            }
        } finally {
        }
    };
    const selectedPost = items.find(item => item.id === selectedPostId);

    const formatDateTimeLines = (value) => {
        if (!value) return { time: '', date: '' };

        const normalizedValue = String(value).replace('T', ' ').trim();
        const [datePart = '', timePart = ''] = normalizedValue.split(' ');
        const [year = '', month = '', day = ''] = datePart.split('-');

        return {
            time: timePart.slice(0, 5),
            date: day && month && year ? `${day}/${month}/${year}` : datePart,
        };
    };

    const columns = [
        { key: 'id', label: 'STT', width: '60px', render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'title', label: 'Tiêu đề' },
        { key: 'user', label: 'Tác giả', width: '120px', render: (val) => val?.name || val?.email || '---' },
        { key: 'forumTopicId', label: 'Chủ đề', width: '100px', render: (val) => {
            const topic = topics.find(t => t.id === val);
            return topic?.name || '---';
        } },
        { key: 'forumTopicId', label: 'Thể loại', width: '100px', render: (val) => {
            const topic = topics.find(t => t.id === val);
            return topic?.name || '---';
        } },
        { key: 'createAt', label: 'Ngày gửi', width: '130px', render: (val) => {
            const { time, date } = formatDateTimeLines(val);
            return (
                <div style={{ lineHeight: '1.2' }}>
                    <div>{time}</div>
                    <div>{date}</div>
                </div>
            );
        } },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => {
                let cls = 'active';
                if (val === 4) cls = 'hidden';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
            },
        },
        { key: 'actions', label: 'Thao tác', width: '100px', render: (_, row) => (
            <div className='ins-action-cell'>
                <button
                    className='ins-action-btn view'
                    title='Xem'
                    onClick={() => setSelectedPostId(row.id)}
                    disabled={loading}
                >
                    <i className='fa-solid fa-eye' ></i>
                </button>
                <button className='ins-action-btn edit' title='Sửa' onClick={() => handleOpenEdit(row)}><i className='fa-solid fa-pen'></i></button>
                <button
                    className={`ins-action-btn ${row.status === 5 ? 'hide' : 'show'}`}
                    title={row.status === 5 ? 'Bỏ ghim' : 'Ghim bài viết'}
                    onClick={() => handleTogglePin(row.id, row.status)}
                    disabled={loading}
                >
                    <i className={`fa-solid fa-thumbtack ${row.status === 5 ? 'pin-on' : 'pin-off'}`}  ></i>
                </button>
                <button
                    className={`ins-action-btn ${row.status === 1 ? 'hide' : 'show'}`}
                    title={row.status === 1 ? 'Ẩn bài viết' : 'Hiện bài viết'}
                    onClick={() => handleToggleStatus(row.id, row.status)}
                    disabled={loading}
                >
                    <i className={`fa-solid fa-toggle-${(( row.status === 1 || row.status === 5) ? 'on' : 'off')}`} style={{ fontSize: '1rem' }} ></i>
                </button>
            </div>
            )
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Danh sách bài viêt</h1>
                    <p>Quản lý các bài viết do bạn tạo.</p>
                </div>

                <button className='ins-btn ins-btn-primary' onClick={handleOpenCreate}>
                    <i className='fa-solid fa-plus'></i> Tạo bài viết
                </button>
            </div>
            {error && <div className='ins-error-banner'>{error}</div>}
            <DataTable
                title={`Danh sách bài viết (${serverPagination.totalCount})`}
                columns={columns}
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                actions={
                    <>
                    <button className='ins-btn ins-btn-secondary' onClick={() => setRefresh((r) => r + 1)} disabled={loading}>
                            <i className='fa-solid fa-rotate-right'></i> Làm mới
                        </button>
                    </>
                }
            />
            {/* View Popup */}
            {selectedPost && (
                <PopupContainer onClose={() => setSelectedPostId(null)} titleName={`Bài viết của ${selectedPost?.user?.name || ''}`} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCard post={selectedPost} parentLoading={loading} />
                </PopupContainer>
            )}
            {/* Post Modal for create/edit */}
            {showPostModal && (
                <PostModal
                    isOpen={showPostModal}
                    onClose={handleCloseModal}
                    onSave={handleSavePost}
                    post={editPost}
                    action={editPost ? 'edit' : 'create'}
                />
            )}
        </div>
    );
}
