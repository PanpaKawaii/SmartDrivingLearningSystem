import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
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

const getReportSubjectType = (report) => {
    if (report?.questionId) return 'Cau hoi';
    if (report?.simulationId) return 'Tinh huong';
    if (report?.forumPostId) return 'Bai viet';
    if (report?.forumCommentId) return 'Binh luan';
    return 'Khac';
};

const getEntityRoute = (report) => {
    if (report?.questionId) return `/instructor/report-entity/question/${report.questionId}`;
    if (report?.simulationId) return `/instructor/report-entity/simulation/${report.simulationId}`;
    return null;
};

export default function ChangeRequests() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportItems, setReportItems] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [actionType, setActionType] = useState('approve');

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
                const res = await fetchData(`Reports?${query.toString()}`, token);
                const requestReports = normalizeItems(res).filter((report) => report?.reportCategory?.name === 'Yêu cầu');

                setReportItems(requestReports);
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
        { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => {
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
        { key: 'actions', label: 'Thao tác', width: '140px', render: (_, row) => (
            <div className='ins-action-cell'>
                <button className='ins-action-btn view' title='Chi tiết' onClick={() => {
                    const route = getEntityRoute(row);
                    if (!route) return;
                    navigate(route);
                }}><i className='fa-solid fa-eye'></i></button>
                <button className='ins-action-btn edit' title='Duyệt' onClick={() => {
                    setSelectedReport(row);
                    setModalMode('process');
                    setActionType('approve');
                }}><i className='fa-solid fa-check'></i></button>
                <button className='ins-action-btn delete' title='Bỏ qua' onClick={() => {
                    setSelectedReport(row);
                    setModalMode('process');
                    setActionType('disapprove');
                }}><i className='fa-solid fa-xmark'></i></button>
            </div>
        )},
    ];

    const handleCloseModal = () => {
        setSelectedReport(null);
        setModalMode('view');
        setActionType('approve');
    };


    const handleSubmitFeedback = async ({ title, content }) => {
        if (!selectedReport) return { error: 'Khong tim thay bao cao can xu ly.' };

        const token = user?.token || '';
        if (!token) {
            return { error: 'Ban can dang nhap Instructor de gui resolve.' };
        }

        try {
            const endpoint = actionType === 'disapprove'
                ? `Reports/${selectedReport.id}/disapprove`
                : `Reports/${selectedReport.id}/approve`;

            const result = await patchData(endpoint, { title, content }, token);

            if (result !== true) {
                return { error: 'He thong khong xac nhan xu ly bao cao thanh cong.' };
            }
        } catch (error) {
            const apiErrors = error?.payload?.errors;
            if (apiErrors && typeof apiErrors === 'object') {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = Array.isArray(apiErrors[firstKey]) ? apiErrors[firstKey][0] : null;
                return { error: firstMessage || 'Du lieu khong hop le.' };
            }
            return { error: error?.message || 'Xu ly bao cao that bai.' };
        }

        setRefresh((current) => current + 1);
        handleCloseModal();
        return { ok: true };
    };

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Duyệt yêu cầu thay đổi</h1><p>Xem xét và phê duyệt các yêu cầu thay đổi nội dung.</p></div>
            </div>
            {error && <div className='ins-error-banner'>{error}</div>}
            <InstructorDataTable
                title={`Yêu cầu thay đổi (${serverPagination.totalCount})`}
                columns={columns}
                data={reportItems}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
            />

            <ReportFeedbackModal
                isOpen={!!selectedReport}
                mode={modalMode}
                report={selectedReport}
                resolve={selectedReport?.resolves?.[0] || null}
                actionType={actionType}
                initialTitle={actionType === 'disapprove'
                    ? '[Kết quả] Phản hồi về yêu cầu thay đổi nội dung ....'
                    : '[Đã cập nhật] Xác nhận sửa đổi theo yêu cầu của bạn!'}
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
