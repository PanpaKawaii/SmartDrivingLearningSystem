import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import ReportFeedbackModal from '../../../components/ReportFeedbackModal/ReportFeedbackModal.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { postData } from '../../../../mocks/CallingAPI.js';
import { reportCategories, reports, resolves } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const nowAsTimestamp = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

const getReportCategoryName = (reportCategoryId) => {
    const category = reportCategories.find((item) => item.id === reportCategoryId);
    return category?.name || 'Khong xac dinh';
};

const isCommunityReport = (report) => Boolean(report?.forumPostId || report?.forumCommentId);

const getEntityRoute = (report) => {
    if (report?.questionId) return `/instructor/report-entity/question/${report.questionId}`;
    if (report?.simulationId) return `/instructor/report-entity/simulation/${report.simulationId}`;
    return null;
};

export default function ContentErrorReports() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reportItems, setReportItems] = useState(() => reports.filter((report) => !isCommunityReport(report) && report.reportCategoryId !== 4));
    const [resolveItems, setResolveItems] = useState(() => [...resolves]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [modalMode, setModalMode] = useState('view');

    const resolveByReportId = useMemo(() => {
        return resolveItems.reduce((accumulator, item) => {
            accumulator[item.reportId] = item;
            return accumulator;
        }, {});
    }, [resolveItems]);

    const columns = [
        { key: 'id', label: 'STT', width: '60px' },
        { key: 'title', label: 'Tiêu đề báo cáo' },
        { key: 'content', label: 'Nội dung' },
        { key: 'userId', label: 'Người báo', width: '110px', render: (val) => `User #${val}` },
        { key: 'createAt', label: 'Ngày', width: '130px', render: (val) => val?.split(' ')[0] },
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

        const timestamp = nowAsTimestamp();
        const oldResolve = resolveItems.find((item) => Number(item.reportId) === Number(selectedReport.id));
        const resolveRecord = {
            id: oldResolve?.id || Date.now(),
            reportId: selectedReport.id,
            userId: 1,
            title,
            content,
            createAt: oldResolve?.createAt || timestamp,
            updateAt: timestamp,
            status: 1,
        };

        setResolveItems((current) => [resolveRecord, ...current.filter((item) => Number(item.reportId) !== Number(selectedReport.id))]);

        setReportItems((current) => current.map((item) => (
            Number(item.id) === Number(selectedReport.id)
                ? { ...item, status: 1, updateAt: timestamp }
                : item
        )));

        handleCloseModal();
        return { ok: true };
    };

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Báo cáo lỗi nội dung</h1><p>Danh sách lỗi nội dung được báo cáo từ người dùng.</p></div>
            </div>

            <InstructorDataTable title={`Báo cáo lỗi (${reportItems.length})`} columns={columns} data={reportItems} />

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
