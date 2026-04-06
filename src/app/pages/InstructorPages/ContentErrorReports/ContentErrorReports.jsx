import { useMemo, useState } from 'react';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { reports, resolves, getReportCategoryName, getReportEntityDetails } from '../../../../mocks/DataSample.js';
import ReportFeedbackModal from './ReportFeedbackModal.jsx';
import '../InstructorPages.css';

const nowAsTimestamp = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

export default function ContentErrorReports() {
    const [reportItems, setReportItems] = useState(() => [...reports]);
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
                    setSelectedReport(row);
                    setModalMode('view');
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

    const handleSubmitFeedback = ({ title, content }) => {
        if (!selectedReport) return;

        const resolveRecord = {
            id: Date.now(),
            reportId: selectedReport.id,
            userId: 1,
            title,
            content,
            createAt: nowAsTimestamp(),
            updateAt: nowAsTimestamp(),
            status: 1,
        };

        setResolveItems((current) => {
            const filtered = current.filter((item) => item.reportId !== selectedReport.id);
            return [resolveRecord, ...filtered];
        });

        setReportItems((current) => current.map((item) => (
            item.id === selectedReport.id
                ? { ...item, status: 2, updateAt: nowAsTimestamp() }
                : item
        )));

        handleCloseModal();
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
                entityDetails={selectedReport ? getReportEntityDetails(selectedReport) : null}
                resolve={selectedReport ? resolveByReportId[selectedReport.id] : null}
                onClose={handleCloseModal}
                onSubmit={handleSubmitFeedback}
            />
        </div>
    );
}
