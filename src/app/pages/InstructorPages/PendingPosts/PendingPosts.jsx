import DataTable from '../../../components/Shared/DataTable';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import ForumCard from '../../Forum/ForumCard';
import '../InstructorPages.css';
import { useEffect, useState } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

const STATUS_LABELS = {
    '-1': 'Chờ duyệt',
    '1': 'Đã duyệt',
    '2': 'Đã xóa',
    '3': 'Đã từ chối',
};


export default function PendingPosts() {
    const { user, refreshNewToken } = useAuth();
    const [items, setItems] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedActions, setSelectedActions] = useState({});
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });

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
                    setTopics(Array.isArray(topicRes) ? topicRes : topicRes?.items || []);
                }
                // Lấy posts phân trang
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });
                if (filterStatus !== '') {
                    query.set('status', filterStatus);
                }
                const res = await fetchData(`ForumPosts?${query.toString()}`, token);
                setItems(res?.items || []);
                setServerPagination(prev => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount || prev.totalCount,
                    totalPages: res?.totalPages || 1,
                    
                }));
            } catch (error) {
                if (error.status == 401) refreshNewToken(user);
                else setError('Lỗi tải dữ liệu bài viết. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, serverPagination.page, serverPagination.pageSize, filterStatus]);

    const handleFilterStatus = (e) => {
        const nextStatus = e.target.value;
        setFilterStatus(nextStatus);
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleApprove = async (id) => {
        try {
            setSelectedActions(prev => ({ ...prev, [id]: 'approve' }));
            setLoading(true);
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/approve`, { status: 1 }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status == 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi duyệt bài');
            }
            setSelectedActions(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            setError('Lỗi duyệt bài');

        } finally {
            setLoading(false);
        }
    };
    const handleReject = async (id) => {
        try {
            setSelectedActions(prev => ({ ...prev, [id]: 'reject' }));
            setLoading(true);
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/disapprove`, { status: 3 }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status == 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi từ chối bài');
            }
            setSelectedActions(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            setError('Lỗi từ chối bài');
        } finally {
            setLoading(false);
        }
    };

    const handleForceDelete = async (id) => {
        try {
            setSelectedActions(prev => ({ ...prev, [id]: 'forceDelete' }));
            setLoading(true);
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/force-delete`, { status: 2 }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status == 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi xóa bài viết');
            }
            setSelectedActions(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            setError('Lỗi xóa bài viết');
        } finally {
            setLoading(false);
        }
    };

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
        { key: 'id', label: 'STT', width: '60px',render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1  },
        { key: 'title', label: 'Tiêu đề' },
        { key: 'user', label: 'Tác giả', width: '120px', render: (val) => val?.name || val?.email || '---' },
        { key: 'forumTopicId', label: 'Chủ đề', width: '100px', render: (val) => {
            const topic = topics.find(t => t.id === val);
            return topic?.name || '---';
        } },
        { key: 'forumTopicId', label: 'Thể loại', width: '120px', render: (val) => {
            const topic = topics.find(t => t.id === val);
            return topic?.description || '---';
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
                let cls = 'pending';
                if (val === 1) cls = 'approved';
                else if (val === 2) cls = 'rejected';
                else if (val === 3) cls = 'rejected';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
            },
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '120px',
            render: (_, row) => {
                const chosenAction = selectedActions[row.id];
                const isPending = row.status === -1;
                const isApproved = row.status === 1;
                const showApprove = isPending && chosenAction !== 'reject';
                const showReject = isPending && chosenAction !== 'approve';
                const showForceDelete = isApproved;

                return (
                    <div className='ins-action-cell'>
                        <button
                            className='ins-action-btn view'
                            title='Xem'
                            onClick={() => setSelectedPostId(row.id)}
                            disabled={loading}
                        >
                            <i className='fa-solid fa-eye' ></i>
                        </button>
                        {showApprove && (
                            <button className='ins-action-btn edit' title='Duyệt' onClick={() => handleApprove(row.id)} disabled={row.status === 1 || loading}><i className='fa-solid fa-check'></i></button>
                        )}
                        {showReject && (
                            <button className='ins-action-btn delete' title='Từ chối' onClick={() => handleReject(row.id)} disabled={row.status === 3 || loading}><i className='fa-solid fa-xmark'></i></button>
                        )}
                        {showForceDelete && (
                            <button className='ins-action-btn delete' title='Xóa bài' onClick={() => handleForceDelete(row.id)} disabled={loading}><i className='fa-solid fa-trash'></i></button>
                        )}
                    </div>
                );
            },
        },
    ];

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    // Find the selected post object
    const selectedPost = items.find(item => item.id === selectedPostId);

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý bài viết</h1>
                    <p>Danh sách bài viết đang chờ phê duyệt từ giảng viên.</p>
                </div>
            </div>
            {error && <div className='ins-error-banner'>{error}</div>}
            <DataTable
                title={`Quản lý bài viết (${serverPagination.totalCount})`}
                columns={columns}   
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                filters={[
                    {
                        id: 'status-filter',
                        value: filterStatus,
                        onChange: handleFilterStatus,
                        options: [
                            { id: '-1', name: 'Chờ duyệt' },
                            { id: '1', name: 'Đã duyệt' },
                            { id: '2', name: 'Đã xóa' },
                            { id: '3', name: 'Đã từ chối' },
                        ],
                        placeholder: '— Tất cả trạng thái —',
                    },
                ]}
            />

            {/* View Popup */}
            {selectedPost && (
                <PopupContainer onClose={() => setSelectedPostId(null)} titleName={`Bài viết của ${selectedPost?.user?.name || ''}`} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCard post={selectedPost} parentLoading={loading} />
                </PopupContainer>
            )}
        </div>
    );
}
