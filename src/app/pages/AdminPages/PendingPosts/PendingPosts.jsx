import DataTable from '../../../components/Shared/DataTable';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import ForumCard from '../../Forum/ForumCard';
import '../AdminPages.css';
import { useEffect, useState, useCallback } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const STATUS_LABELS = {
    '-1': 'Chờ duyệt',
    '1': 'Đã duyệt',
    '3': 'Đã từ chối',
};

export default function AdminPendingPosts() {
    const { user, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [selectedPostId, setSelectedPostId] = useState(null);

    // Hàm bọc logic gọi API để tái sử dụng và xử lý Refresh Token
    const loadData = useCallback(async () => {
        if (!user?.token) return;

        setLoading(true);
        setError(null);
        try {
            const token = user.token;

            // Tải Topics nếu chưa có
            if (topics.length === 0) {
                const topicRes = await fetchData('ForumTopics/all', token);
                setTopics(Array.isArray(topicRes) ? topicRes : topicRes?.items || []);
            }

            // Tải danh sách bài viết
            const query = new URLSearchParams({ page: serverPagination.page, pageSize: serverPagination.pageSize });
            const res = await fetchData(`ForumPosts?${query.toString()}`, token);

            setItems(res?.items || []);
            setServerPagination((prev) => ({
                ...prev,
                page: res?.page || prev.page,
                pageSize: res?.pageSize || prev.pageSize,
                totalCount: res?.totalCount || prev.totalCount,
                totalPages: res?.totalPages || 1,
            }));
        } catch (err) {
            console.error("Load Data Error:", err);
            // Xử lý Refresh Token nếu lỗi 401
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(user);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                } else {
                    // Nếu refresh thành công, effect sẽ tự chạy lại do user.token thay đổi
                    // Hoặc ta có thể kích hoạt refresh thủ công: setRefresh(r => r + 1);
                }
            } else {
                setError('Lỗi tải dữ liệu hệ thống');
            }
        } finally {
            setLoading(false);
        }
    }, [user, serverPagination.page, serverPagination.pageSize, topics.length, refreshNewToken, logout, navigate]);

    useEffect(() => {
        loadData();
    }, [loadData, refresh]); // refresh dùng để load lại sau khi Duyệt/Từ chối

    const handleAction = async (id, actionType) => {
        try {
            setLoading(true);
            const token = user?.token || '';
            const endpoint = actionType === 'approve' ? `ForumPosts/${id}/approve` : `ForumPosts/${id}/disapprove`;

            await patchData(endpoint, {}, token);
            setRefresh((r) => r + 1);
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(user);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                }
            } else {
                setError(actionType === 'approve' ? 'Lỗi duyệt bài' : 'Lỗi từ chối bài');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDateTimeLines = (value) => {
        if (!value) return { time: '', date: '' };
        const normalizedValue = String(value).replace('T', ' ').trim();
        const [datePart = '', timePart = ''] = normalizedValue.split(' ');
        const [year = '', month = '', day = ''] = datePart.split('-');
        return { time: timePart.slice(0, 5), date: day && month && year ? `${day}/${month}/${year}` : datePart };
    };

    const columns = [
        { key: '', label: 'STT', width: '60px', render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'title', label: 'Tiêu đề bài viết' },
        { key: 'user', label: 'Tác giả', width: '120px', render: (val) => val?.name || val?.email || '---' },
        { key: 'forumTopicId', label: 'Chủ đề', width: '100px', render: (val) => topics.find((t) => t.id === val)?.name || '---' },
        { key: 'forumTopicId', label: 'Thể loại', width: '120px', render: (val) => topics.find((t) => t.id === val)?.description || '---' },
        {
            key: 'createAt',
            label: 'Ngày gửi',
            width: '130px',
            render: (val) => {
                const { time, date } = formatDateTimeLines(val);
                return <div style={{ lineHeight: '1.2' }}><div>{time}</div><div>{date}</div></div>;
            },
        },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => {
                let cls = 'pending';
                if (val === 1) cls = 'approved';
                else if (val === 3) cls = 'rejected';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
            },
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '120px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Xem' onClick={() => setSelectedPostId(row.id)} disabled={loading}><i className='fa-solid fa-eye'></i></button>
                    <button className='ins-action-btn edit' title='Duyệt' onClick={() => handleAction(row.id, 'approve')} disabled={row.status === 1 || loading}><i className='fa-solid fa-check'></i></button>
                    <button className='ins-action-btn delete' title='Từ chối' onClick={() => handleAction(row.id, 'reject')} disabled={row.status === 3 || loading}><i className='fa-solid fa-xmark'></i></button>
                </div>
            ),
        },
    ];

    const selectedPost = items.find((item) => item.id === selectedPostId);

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết chờ duyệt</h1>
                    <p>Danh sách bài viết từ cộng đồng đang chờ phê duyệt nội dung.</p>
                </div>
            </div>

            {error && <div className='ins-error-banner'>{error}</div>}

            <DataTable
                title={`Danh sách bài viết (${serverPagination.totalCount})`}
                columns={columns}
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={(page) => setServerPagination((prev) => ({ ...prev, page }))}
            />

            {selectedPost && (
                <PopupContainer
                    onClose={() => setSelectedPostId(null)}
                    titleName={`Chi tiết bài viết: ${selectedPost?.title}`}
                    innerStyle={{ width: 800 }}
                >
                    <ForumCard post={selectedPost} parentLoading={loading} />
                </PopupContainer>
            )}
        </div>
    );
}