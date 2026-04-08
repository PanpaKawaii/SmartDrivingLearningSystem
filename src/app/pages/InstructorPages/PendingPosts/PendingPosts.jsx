import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import '../InstructorPages.css';
import { useEffect, useState } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

const STATUS_LABELS = {
    '-1': 'Chờ duyệt',
    '1': 'Đã duyệt',
    '3': 'Đã từ chối',
};


export default function PendingPosts() {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });

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
                const res = await fetchData(`ForumPosts?${query.toString()}`, token);
                setItems(res?.items || []);
                setServerPagination(prev => ({
                    ...prev,
                    totalPages: res?.totalPages || 1,
                    totalCount: res?.totalCount || 0
                }));
            } catch (err) {
                setError('Lỗi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, serverPagination.page, serverPagination.pageSize]);

    const handleApprove = async (id) => {
        try {
            setLoading(true);
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/approve`, { status: 1 }, token);
            setRefresh(r => r + 1);
        } catch (err) {
            setError('Lỗi duyệt bài');
        } finally {
            setLoading(false);
        }
    };
    const handleReject = async (id) => {
        try {
            setLoading(true);
            const token = user?.token || '';
            await patchData(`ForumPosts/${id}/disapprove`, { status: 3 }, token);
            setRefresh(r => r + 1);
        } catch (err) {
            setError('Lỗi từ chối bài');
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
        { key: 'title', label: 'Tiêu đề bài viết' },
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
                    <button className='ins-action-btn view' title='Xem' disabled><i className='fa-solid fa-eye'></i></button>
                    <button className='ins-action-btn edit' title='Duyệt' onClick={() => handleApprove(row.id)} disabled={row.status === 1 || loading}><i className='fa-solid fa-check'></i></button>
                    <button className='ins-action-btn delete' title='Từ chối' onClick={() => handleReject(row.id)} disabled={row.status === 3 || loading}><i className='fa-solid fa-xmark'></i></button>
                </div>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết chờ duyệt</h1>
                    <p>Danh sách bài viết đang chờ phê duyệt từ giảng viên.</p>
                </div>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <InstructorDataTable
                title={`Bài viết chờ duyệt (${serverPagination.totalCount})`}
                columns={columns}
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
