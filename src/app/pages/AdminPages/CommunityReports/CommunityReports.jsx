import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import ReportFeedbackModal from '../../../components/ReportFeedbackModal/ReportFeedbackModal.jsx';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { fetchData, patchData } from '../../../../mocks/CallingAPI.js';
import ForumCard from '../../Forum/ForumCard';
import ForumComment from '../../Forum/ForumComment';
import '../AdminPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
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

const getEntityRoute = (report) => {
    if (report?.forumPostId) return `/admin/report-entity/forum-post/${report.forumPostId}`;
    if (report?.forumCommentId) return `/admin/report-entity/forum-comment/${report.forumCommentId}`;
    return null;
};

const getReportTargetLabel = (report) => {
    if (report?.forumPostId) return 'Bài viết';
    if (report?.forumCommentId) return 'Bình luận';
    return '---';
};

export default function AdminCommunityReports() {
    const { user, refreshNewToken, logout } = useAuth(); // Thêm refreshNewToken và logout
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportItems, setReportItems] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [actionType, setActionType] = useState('approve');
    const [viewPost, setViewPost] = useState(null);
    const [highlightCommentId, setHighlightCommentId] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    // 1. Logic tải danh sách báo cáo với Refresh Token
    const loadReports = useCallback(async () => {
        if (!user?.token) return;

        setError(null);
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: serverPagination.page,
                pageSize: serverPagination.pageSize,
            });

            const res = await fetchData(`Reports?${query.toString()}`, user.token);
            const communityReports = normalizeItems(res).filter((report) => Boolean(report?.forumPostId || report?.forumCommentId));

            setReportItems(communityReports);
            setServerPagination((prev) => ({
                ...prev,
                page: res?.page || prev.page,
                pageSize: res?.pageSize || prev.pageSize,
                totalCount: res?.totalCount || prev.totalCount,
                totalPages: res?.totalPages || 1,
            }));
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(user);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                }
            } else {
                setError('Lỗi tải danh sách báo cáo');
            }
        } finally {
            setLoading(false);
        }
    }, [user, serverPagination.page, serverPagination.pageSize, refreshNewToken, logout, navigate]);

    useEffect(() => {
        loadReports();
    }, [loadReports, refresh]);

    // 2. Logic xem chi tiết thực thể (Post/Comment) bị báo cáo
    const handleOpenReportEntity = async (report) => {
        if (!report || !user?.token) return;

        setViewLoading(true);
        setError(null);

        try {
            let postId = report?.forumPostId || null;
            const commentId = report?.forumCommentId || null;

            if (!postId && commentId) {
                const comment = await fetchData(`ForumComments/${commentId}`, user.token);
                postId = comment?.forumPostId || null;
            }

            if (!postId) throw new Error('Không tìm thấy bài viết cần xem.');

            const post = await fetchData(`ForumPosts/${postId}`, user.token);
            setViewPost(post || null);
            setHighlightCommentId(commentId || null);
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(user);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                }
            } else {
                setError('Lỗi tải chi tiết nội dung bị báo cáo');
            }
        } finally {
            setViewLoading(false);
        }
    };

    // 3. Logic xử lý gửi phản hồi/duyệt báo cáo
    const handleSubmitFeedback = async ({ title, content }) => {
        if (!selectedReport || !user?.token) return { error: 'Không tìm thấy dữ liệu báo cáo.' };

        try {
            const endpoint = actionType === 'disapprove'
                ? `Reports/${selectedReport.id}/disapprove`
                : `Reports/${selectedReport.id}/approve`;

            await patchData(endpoint, { title, content }, user.token);

            setRefresh((current) => current + 1);
            handleCloseModal();
            return { ok: true };
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(user);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                }
                return { error: 'Phiên làm việc hết hạn, vui lòng thử lại.' };
            }

            const apiErrors = err?.payload?.errors;
            if (apiErrors && typeof apiErrors === 'object') {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = Array.isArray(apiErrors[firstKey]) ? apiErrors[firstKey][0] : null;
                return { error: firstMessage || 'Dữ liệu không hợp lệ.' };
            }
            return { error: err?.message || 'Xử lý báo cáo thất bại.' };
        }
    };

    const STATUS_LABELS = {
        '-1': 'Chờ duyệt',
        '1': 'Đã duyệt',
        '3': 'Đã bỏ qua',
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
        setModalMode('view');
        setActionType('approve');
    };

    const handleCloseView = () => {
        setViewPost(null);
        setHighlightCommentId(null);
    };

    const columns = [
        { key: '', label: 'STT', width: '60px', render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'title', label: 'Tiêu đề báo cáo' },
        { key: 'content', label: 'Nội dung' },
        {
            key: 'targetType',
            label: 'Thể loại',
            width: '120px',
            render: (_, row) => {
                const label = getReportTargetLabel(row);
                let colorClass = label === 'Bài viết' ? 'post-label' : (label === 'Bình luận' ? 'comment-label' : '');
                return (
                    <span className={`ins-status-chip ${colorClass}`} style={{ fontWeight: 600 }}>
                        <span className='chip-dot'></span>{label}
                    </span>
                );
            },
        },
        { key: 'user', label: 'Người báo', width: '140px', render: (_, row) => row?.user?.name || '---' },
        { key: 'reportCategory', label: 'Danh mục', width: '140px', render: (_, row) => row?.reportCategory?.name || '---' },
        {
            key: 'createAt',
            label: 'Ngày',
            width: '130px',
            render: (val) => {
                const { time, date } = formatDateTimeLines(val);
                return (
                    <div style={{ lineHeight: '1.2' }}>
                        <div>{time}</div>
                        <div>{date}</div>
                    </div>
                );
            },
        },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => {
                const cls = val === 1 ? 'approved' : (val === 3 ? 'rejected' : 'pending');
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
            },
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '140px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Chi tiết' disabled={viewLoading} onClick={() => handleOpenReportEntity(row)}>
                        <i className='fa-solid fa-eye'></i>
                    </button>
                    <button className='ins-action-btn edit' title='Duyệt' onClick={() => {
                        setSelectedReport(row);
                        setModalMode('process');
                        setActionType('approve');
                    }} disabled={row.status === 1 || loading}><i className='fa-solid fa-check'></i></button>
                    <button className='ins-action-btn delete' title='Bỏ qua' onClick={() => {
                        setSelectedReport(row);
                        setModalMode('process');
                        setActionType('disapprove');
                    }} disabled={row.status === 3 || loading}><i className='fa-solid fa-xmark'></i></button>
                </div>
            ),
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo cộng đồng</h1><p>Danh sách báo cáo vi phạm từ cộng đồng.</p></div>
            </div>
            {error && <div className='ins-error-banner'>{error}</div>}
            <DataTable
                title={`Báo cáo cộng đồng (${serverPagination.totalCount})`}
                columns={columns}
                data={reportItems}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={(page) => setServerPagination((prev) => ({ ...prev, page }))}
            />

            {viewPost && (
                <PopupContainer onClose={handleCloseView} titleName={`Bài viết của ${viewPost?.user?.name || ''}`} innerStyle={{ width: 700 }}>
                    <ForumCard post={viewPost} setSelectedPostId={() => { }} setRefresh={setRefresh} parentLoading={viewLoading} />
                    {highlightCommentId && <ForumComment post={viewPost} setRefreshParent={setRefresh} highlightCommentId={highlightCommentId} />}
                </PopupContainer>
            )}

            <ReportFeedbackModal
                isOpen={!!selectedReport}
                mode={modalMode}
                report={selectedReport}
                resolve={selectedReport?.resolves?.[0] || null}
                actionType={actionType}
                initialTitle={actionType === 'disapprove' ? '[Kết quả] Phản hồi về báo cáo cộng đồng ....' : '[Đã cập nhật] Xác nhận xử lý báo cáo từ cộng đồng!'}
                onOpenEntity={() => {
                    if (!selectedReport) return;
                    const route = getEntityRoute(selectedReport);
                    if (route) navigate(route);
                }}
                onClose={handleCloseModal}
                onSubmit={handleSubmitFeedback}
            />
        </div>
    );
}