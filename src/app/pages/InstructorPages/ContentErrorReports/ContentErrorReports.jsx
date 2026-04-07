import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import ReportFeedbackModal from '../../../components/ReportFeedbackModal/ReportFeedbackModal.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { fetchData, postData } from '../../../../mocks/CallingAPI.js';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

const normalizeUserName = (user) => user?.name || user?.fullName || user?.userName || user?.displayName || 'Khong xac dinh';

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
    if (report?.questionId) return `/instructor/report-entity/question/${report.questionId}`;
    if (report?.simulationId) return `/instructor/report-entity/simulation/${report.simulationId}`;
    return null;
};

export default function ContentErrorReports() {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(0);
    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: 10,
    });
    const [pagingMeta, setPagingMeta] = useState({
        page: 0,
        pageSize: 0,
        totalCount: 0,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const [reportItems, setReportItems] = useState([]);
    const [resolveItems, setResolveItems] = useState([]);
    const [reportCategoryItems, setReportCategoryItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');

    const reportCategoryNameById = useMemo(() => {
        return reportCategoryItems.reduce((accumulator, item) => {
            accumulator[item.id] = item.name;
            return accumulator;
        }, {});
    }, [reportCategoryItems]);

    const userNameById = useMemo(() => {
        return userItems.reduce((accumulator, item) => {
            accumulator[item.id] = normalizeUserName(item);
            return accumulator;
        }, {});
    }, [userItems]);

    const getReportCategoryName = (reportCategoryId) => reportCategoryNameById[reportCategoryId] || 'Khong xac dinh';

    const resolveByReportId = useMemo(() => {
        return resolveItems.reduce((accumulator, item) => {
            accumulator[item.reportId] = item;
            return accumulator;
        }, {});
    }, [resolveItems]);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const query = new URLSearchParams({
                    page: String(queryParams.page),
                    pageSize: String(queryParams.pageSize),
                });

                const [reportCategoriesResponse, reportsResponse, resolvesResponse] = await Promise.all([
                    fetchData(`ReportCategories?${query.toString()}`, token),
                    fetchData(`Reports?${query.toString()}`, token),
                    fetchData(`Resolves?${query.toString()}`, token),
                ]);

                let usersResponse = null;
                try {
                    usersResponse = await fetchData(`Users?${query.toString()}`, token);
                } catch (usersError) {
                    console.warn('Could not load users for report names:', usersError);
                }

                const reportCategoryApiItems = normalizeItems(reportCategoriesResponse);
                const reportApiItems = normalizeItems(reportsResponse);
                const resolveApiItems = normalizeItems(resolvesResponse);
                const userApiItems = normalizeItems(usersResponse);

                const contentErrorReports = reportApiItems.filter((report) => Boolean(report?.questionId || report?.simulationId));

                setReportCategoryItems(reportCategoryApiItems);
                setUserItems(userApiItems);
                setReportItems(contentErrorReports);
                setResolveItems(resolveApiItems);
                setPagingMeta({
                    page: Number(reportsResponse?.page || queryParams.page),
                    pageSize: Number(reportsResponse?.pageSize || queryParams.pageSize),
                    totalCount: Number(reportsResponse?.totalCount || contentErrorReports.length),
                    totalPages: Math.max(1, Number(reportsResponse?.totalPages || 1)),
                });
            } catch (err) {
                console.error('Error loading content error reports:', err);
                //setError('Khong the tai du lieu bao cao loi noi dung.');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token, queryParams.page, queryParams.pageSize]);
    console.log('reportItems', reportItems);
    const columns = [
        { key: 'totalCount', label: 'STT', width: '60px', render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'title', label: 'Tiêu đề báo cáo' },
        { key: 'content', label: 'Nội dung' },
        { key: 'userId', label: 'Người báo', width: '140px', render: (val, row) => userNameById[val] || normalizeUserName(row?.user) },
        { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => {
            const { time, date } = formatDateTimeLines(val);
            return (
                <div style={{ lineHeight: '1.2' }}>
                    <div>{time}</div>
                    <div>{date}</div>
                </div>
            );
        } },
        { key: 'status', label: 'Trạng thái', width: '130px', render: (val) => (
            <span className={`ins-status-chip ${val === 1 ? 'rejected' : 'approved'}`}>
                <span className='chip-dot'></span>{val === 1 ? 'Chua xu ly' : 'Da xu ly'}
            </span>
        )},
        { key: 'actions', label: 'Thao tác', width: '100px', render: (_, row) => (
            <div className='ins-action-cell'>
                <button className='ins-action-btn view' title='Chi tiết' onClick={() => {
                    const route = getEntityRoute(row);
                    if (!route) return;
                    navigate(route);
                }}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                <button className='ins-action-btn edit' title='Xử lý' onClick={() => {
                    setSelectedReport(row);
                    setModalMode('process');
                }}>
                    <i className='fa-solid fa-wrench'></i>
                </button>
            </div>
        )},
    ];

    const handleCloseModal = () => {
        setSelectedReport(null);
        setModalMode('view');
    };

    const handleSubmitFeedback = async ({ title, content }) => {
        if (!selectedReport) return { error: 'Khong tim thay bao cao can xu ly.' };

        const token = user?.token || '';
        if (!token) {
            return { error: 'Ban can dang nhap Instructor de gui resolve.' };
        }

        try {
            const result = await postData('api/Resolves', {
                reportId: selectedReport.id,
                title,
                content,
            }, token);

            if (result !== true) {
                return { error: 'He thong khong xac nhan resolve thanh cong.' };
            }
        } catch (error) {
            const apiErrors = error?.payload?.errors;
            if (apiErrors && typeof apiErrors === 'object') {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = Array.isArray(apiErrors[firstKey]) ? apiErrors[firstKey][0] : null;
                return { error: firstMessage || 'Du lieu khong hop le.' };
            }
            return { error: error?.message || 'Gui resolve that bai.' };
        }

        handleCloseModal();
        setRefresh((current) => current + 1);
        return { ok: true };
    };

    if (error) {
        return (
            <div className='ins-page'>
                <div className='ins-page-header'>
                    <div><h1>Báo cáo lỗi nội dung</h1><p>{error}</p></div>
                </div>
            </div>
        );
    }

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo lỗi nội dung</h1><p>Danh sách lỗi nội dung được báo cáo từ người dùng.</p></div>
            </div>

            <InstructorDataTable
                title={`Báo cáo lỗi (${pagingMeta.totalCount})`}
                columns={columns}
                data={reportItems}
                loading={loading}
                serverPagination={pagingMeta}
                onPageChange={(nextPage) => setQueryParams((current) => ({ ...current, page: nextPage }))}
            />

            <ReportFeedbackModal
                isOpen={!!selectedReport}
                mode={modalMode}
                report={selectedReport}
                reportCategoryName={selectedReport ? getReportCategoryName(selectedReport.reportCategoryId) : ''}
                resolve={selectedReport ? resolveByReportId[selectedReport.id] : null}
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
