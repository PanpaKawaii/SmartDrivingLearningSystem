import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';
import ReportFeedbackModal from '../../../components/ReportFeedbackModal/ReportFeedbackModal.jsx';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { fetchData, patchData } from '../../../../mocks/CallingAPI.js';
import ForumCard from '../../Forum/ForumCard';
import ForumComment from '../../Forum/ForumComment';
import '../InstructorPages.css';

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
    if (report?.forumPostId) return `/instructor/report-entity/forum-post/${report.forumPostId}`;
    if (report?.forumCommentId) return `/instructor/report-entity/forum-comment/${report.forumCommentId}`;
    return null;
};

const getReportTargetLabel = (report) => {
    if (report?.forumPostId) return 'Bài viết';
    if (report?.forumCommentId) return 'Bình luận';
    return '---';
};

const STATUS_OPTIONS = [
    { id: '-1', name: 'Chờ duyệt' },
    { id: '1', name: 'Đã duyệt' },
    { id: '3', name: 'Đã bỏ qua' },
];

export default function CommunityReports() {
    const { user, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportItems, setReportItems] = useState([]);
    const [reportCategories, setReportCategories] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [actionType, setActionType] = useState('approve');
    const [viewPost, setViewPost] = useState(null);
    const [highlightCommentId, setHighlightCommentId] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        reportCategoryId: ''
    });

    useEffect(() => {
        (async () => {
            const token = user?.token || '';
            if (!token) {
                setReportCategories([]);
                return;
            }

            try {
                const response = await fetchData('ReportCategories/all?status=1', token);
                setReportCategories(normalizeItems(response));
            } catch (error) {
                if (error.status === 401) {
                    refreshNewToken(user);
                } else {
                    console.error('Lỗi tải danh mục báo cáo:', error);
                }
            }
        })();
    }, [user?.token, refreshNewToken, user]);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);

            const token = user?.token || '';

            try {
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });

                if (filters.status !== '') {
                    query.set('status', filters.status);
                }

                if (filters.reportCategoryId !== '') {
                    query.set('reportCategoryId', filters.reportCategoryId);
                }

                const res = await fetchData(`Reports?${query.toString()}&reportCategoryIds=337093eb-b4c4-4efb-83a5-72a0f1e3ee14&reportCategoryIds=9cf4bdbe-1b3e-4f1a-9ebf-320ad4769dad`, token);
                console.log('Fetched reports data:', res);
                const communityReports = normalizeItems(res).filter((report) => Boolean(report?.forumPostId || report?.forumCommentId));

                setReportItems(communityReports);
                setServerPagination((prev) => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount || prev.totalCount,
                    totalPages: res?.totalPages || 1,
                }));
            } catch (error) {
                if (error.status === 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi tải dữ liệu');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, serverPagination.page, serverPagination.pageSize, filters.status, filters.reportCategoryId]);

    const STATUS_LABELS = {
        '-1': 'Chờ duyệt',
        '1': 'Đã duyệt',
        '3': 'Đã bỏ qua',
    };
    const handleCloseModal = () => {
        console.log('Closing modal and resetting selected report');
        setSelectedReport(null);
        setModalMode('view');
        setActionType('approve');
    };

    const handleCloseView = () => {
        console.log('Closing post view');
        setViewPost(null);
        setHighlightCommentId(null);
    };

    const handleOpenReportEntity = async (report) => {
        console.log('Opening report entity for report:', report);
        if (!report) return;

        setViewLoading(true);
        setError(null);

        const token = user?.token || '';
        try {
            let postId = report?.forumPostId || null;
            const commentId = report?.forumCommentId || null;

            if (!postId && commentId) {
                const comment = await fetchData(`ForumComments/${commentId}`, token);
                postId = comment?.forumPostId || null;
            }

            if (!postId) {
                throw new Error('Khong tim thay bai viet can xem.');
            }

            const post = await fetchData(`ForumPosts/${postId}`, token);
            setViewPost(post || null);
            setHighlightCommentId(commentId || null);
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi tải chi tiết bài viết');
            }
            setViewPost(null);
            setHighlightCommentId(null);
        } finally {
            setViewLoading(false);
        }
    };

    const handleSubmitFeedback = async ({ title, content }) => {
        console.log('Submitting feedback with title:', title, 'and content:', content);
        if (!selectedReport) return { error: 'Khong tim thay bao cao can xu ly.' };

        const token = user?.token || '';
        if (!token) {
            return { error: 'Bạn cần đăng nhập với tư cách Instructor để gửi phản hồi.' };
        }

        try {
            const endpoint = actionType === 'disapprove'
                ? `Reports/${selectedReport.id}/disapprove`
                : `Reports/${selectedReport.id}/approve`;

            await patchData(endpoint, { title, content }, token);
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                const apiErrors = error?.payload?.errors;
                if (apiErrors && typeof apiErrors === 'object') {
                    const firstKey = Object.keys(apiErrors)[0];
                    const firstMessage = Array.isArray(apiErrors[firstKey]) ? apiErrors[firstKey][0] : null;
                    return { error: firstMessage || 'Dữ liệu không hợp lệ.' };
                }
                return { error: error?.message || 'Xử lý báo cáo thất bại.' };
            }
        }

        setRefresh((current) => current + 1);
        handleCloseModal();
        return { ok: true };
    };

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    const handleFilterStatus = (value) => {
        setFilters(prev => ({ ...prev, status: value }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleFilterCategory = (value) => {
        setFilters(prev => ({ ...prev, reportCategoryId: value }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleResetFilters = () => {
        setFilters({ status: '', reportCategoryId: '' });
        setServerPagination(prev => ({ ...prev, page: 1 }));
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
                let colorClass = '';
                if (label === 'Bài viết') colorClass = 'post-label';
                else if (label === 'Bình luận') colorClass = 'comment-label';
                return (
                    <span className={`ins-status-chip ${colorClass}`} style={{ fontWeight: 600 }}>
                        <span className='chip-dot'></span>{label}
                    </span>
                );
            },
        },
        { key: 'user', label: 'Người báo', width: '140px', render: (val, row) => row?.user?.name || '---' },
        { key: 'reportCategory', label: 'Danh mục', width: '140px', render: (val, row) => row?.reportCategory?.name || '---' },
        {
            key: 'createAt', label: 'Ngày', width: '130px', render: (val) => {
                const { time, date } = formatDateTimeLines(val);
                return (
                    <div style={{ lineHeight: '1.2' }}>
                        <div>{time}</div>
                        <div>{date}</div>
                    </div>
                );
            }
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
            width: '140px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button
                        className='ins-action-btn view'
                        title='Chi tiết'
                        disabled={viewLoading}
                        onClick={() => handleOpenReportEntity(row)}
                    >
                        <i className='fa-solid fa-eye'></i>
                    </button>
                    {row.status === -1 && (
                        <>
                            <button className='ins-action-btn edit' title='Duyệt' onClick={() => {
                                setSelectedReport(row);
                                setModalMode('process');
                                setActionType('approve');
                            }} disabled={loading}><i className='fa-solid fa-check'></i></button>
                            <button className='ins-action-btn delete' title='Bỏ qua' onClick={() => {
                                setSelectedReport(row);
                                setModalMode('process');
                                setActionType('disapprove');
                            }} disabled={loading}><i className='fa-solid fa-xmark'></i></button>
                        </>
                    )}
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
            <FilterBar
                selectOptions={[
                    {
                        placeholder: '— Tất cả danh mục —',
                        value: filters.reportCategoryId,
                        options: reportCategories,
                        onChange: handleFilterCategory,
                    },
                    {
                        placeholder: '— Tất cả trạng thái —',
                        value: filters.status,
                        options: STATUS_OPTIONS,
                        onChange: handleFilterStatus,
                    },
                ]}
                onSearch={() => {
                    setServerPagination(prev => ({ ...prev, page: 1 }));
                    setRefresh((current) => current + 1);
                }}
                onReset={handleResetFilters}
            />
            <DataTable
                title={`Báo cáo cộng đồng (${serverPagination.totalCount})`}
                columns={columns}
                data={reportItems}
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

            {viewPost && (
                <PopupContainer
                    onClose={handleCloseView}
                    titleName={`Bài viết của ${viewPost?.user?.name || ''}`}
                    modalStyle={{}}
                    innerStyle={{ width: 700 }}
                >
                    <ForumCard post={viewPost} setSelectedPostId={() => { }} setRefresh={setRefresh} parentLoading={viewLoading} />
                    {highlightCommentId && (
                        <ForumComment
                            post={viewPost}
                            setRefreshParent={setRefresh}
                            highlightCommentId={highlightCommentId}
                        />
                    )}
                </PopupContainer>
            )}

            <ReportFeedbackModal
                isOpen={!!selectedReport}
                mode={modalMode}
                report={selectedReport}
                resolve={selectedReport?.resolves?.[0] || null}
                actionType={actionType}
                initialTitle={actionType === 'disapprove'
                    ? '[Kết quả] Phản hồi về báo cáo cộng đồng ....'
                    : '[Đã cập nhật] Xác nhận xử lý báo cáo từ cộng đồng!'}
                onOpenEntity={() => {
                    if (!selectedReport) return;
                    const route = getEntityRoute(selectedReport);
                    if (!route) return;
                    navigate(route);
                }}
                onClose={handleCloseModal}
                onSubmit={handleSubmitFeedback}
            />
        </div>
    );
}
