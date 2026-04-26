import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';
import ReportFeedbackModal from '../../../components/ReportFeedbackModal/ReportFeedbackModal.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { fetchData, patchData } from '../../../../mocks/CallingAPI.js';
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
    const questionId = report?.questionId || report?.question?.id;
    const simulationId = report?.simulationId || report?.simulation?.id;

    if (questionId) return `/instructor/question-bank/${questionId}`;
    if (simulationId) return '/instructor/simulation-bank';
    if (report?.forumPostId || report?.forumCommentId) return '/instructor/posts-list';
    return null;
};

const STATUS_OPTIONS = [
    { id: '-1', name: 'Chờ duyệt' },
    { id: '1', name: 'Đã duyệt' },
    { id: '3', name: 'Đã bỏ qua' },
];

export default function ContentErrorReports() {
    const { user, refreshNewToken } = useAuth();
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [reportItems, setReportItems] = useState([]);
    const [reportCategories, setReportCategories] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [actionType, setActionType] = useState('approve');
    const [filters, setFilters] = useState({
        status: '',
        reportCategoryId: '',
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

                const res = await fetchData(`Reports?${query.toString()}&reportCategoryIds=4f16b1bb-7adf-4008-bd94-e8746f95208f`, token);
                const contentReports = normalizeItems(res).filter(
                    (report) => report?.forumPostId == null && report?.forumCommentId == null
                );
                setReportItems(contentReports);
                setServerPagination(prev => ({
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

    const columns = [
        { key: '', label: 'STT', width: '60px', render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'title', label: 'Tiêu đề báo cáo' },
        { key: 'content', label: 'Nội dung' },
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
            key: 'actions', label: 'Thao tác', width: '140px', render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Chi tiết' onClick={() => {
                        setSelectedReport(row);
                        setModalMode('view');
                        setActionType('approve');
                    }}>
                        <i className='fa-solid fa-eye'></i>
                    </button>
                    {row.status === -1 && (
                        <>
                            <button className='ins-action-btn edit' title='Duyệt' onClick={() => {
                                setSelectedReport(row);
                                setModalMode('process');
                                setActionType('approve');
                            }} disabled={loading}>
                                <i className='fa-solid fa-check'></i>
                            </button>
                            <button className='ins-action-btn delete' title='Bỏ qua' onClick={() => {
                                setSelectedReport(row);
                                setModalMode('process');
                                setActionType('disapprove');
                            }} disabled={loading}>
                                <i className='fa-solid fa-xmark'></i>
                            </button>
                        </>
                    )}
                </div>
            )
        },
    ];

    const handleCloseModal = () => {
        setSelectedReport(null);
        setModalMode('view');
        setActionType('approve');
    };

    const handleSubmitFeedback = async ({ title, content }) => {
        if (!selectedReport) return { error: 'Không tìm thấy báo cáo cần xử lý.' };

        const token = user?.token || '';
        if (!token) {
            return { error: 'Bạn cần đăng nhập Instructor để thực hiện thao tác này.' };
        }

        try {
            const endpoint = actionType === 'disapprove'
                ? `Reports/${selectedReport.id}/disapprove`
                : `Reports/${selectedReport.id}/approve`;

            const result = await patchData(endpoint, { title, content }, token);

            if (result && result.error) {
                return { error: result.error };
            }

            setRefresh((current) => current + 1);
            handleCloseModal();
            return { ok: true };

        } catch (error) {
            console.error("Lỗi khi xử lý báo cáo nội dung:", error);

            if (error.status === 401 || error.response?.status === 401) {
                refreshNewToken(user);
                return { error: 'Phiên làm việc hết hạn, đang làm mới dữ liệu...' };
            }

            // Xử lý lỗi Validate từ API (như cấu trúc bạn đã viết)
            const apiErrors = error?.payload?.errors;
            if (apiErrors && typeof apiErrors === 'object') {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = Array.isArray(apiErrors[firstKey]) ? apiErrors[firstKey][0] : null;
                return { error: firstMessage || 'Dữ liệu không hợp lệ.' };
            }

            return { error: error?.message || 'Xử lý báo cáo thất bại.' };
        }
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

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo lỗi nội dung</h1><p>Danh sách lỗi nội dung được báo cáo từ người dùng.</p></div>
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
                title={`Báo cáo lỗi (${serverPagination.totalCount})`}
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
            <ReportFeedbackModal
                isOpen={!!selectedReport}
                mode={modalMode}
                report={selectedReport}
                resolve={selectedReport?.resolves?.[0] || null}
                actionType={actionType}
                showReportedContentButton
                initialTitle={actionType === 'disapprove'
                    ? '[Kết quả] Phản hồi về báo cáo nội dung ....'
                    : '[Đã cập nhật] Xác nhận sửa đổi nội dung theo báo cáo của bạn!'}
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
