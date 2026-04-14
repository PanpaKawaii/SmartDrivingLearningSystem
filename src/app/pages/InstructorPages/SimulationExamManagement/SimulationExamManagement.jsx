import { useState } from 'react';
import DataTable from '../../../components/Shared/DataTable';
import CreateSituationExamModal from './CreateSituationExamModal';
import SituationExamDetailModal from './SituationExamDetailModal';
import { situationExams, simulationExams } from '../../../../mocks/DataSample.js';
import './SimulationExamManagement.css';
import '../InstructorPages.css';

const situationExamItems = situationExams.map((exam) => ({
    ...exam,
    totalScenarios: simulationExams.filter((detail) => detail.situationExamId === exam.id).length,
}));

export default function SimulationExamManagement() {
    const [showCreate, setShowCreate] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const columns = [
        {
            key: 'id',
            label: 'STT',
            width: '60px',
            render: (_, __, idx) => idx + 1,
        },
        { key: 'title', label: 'Tên bộ đề thi mô phỏng' },
        {
            key: 'totalScenarios',
            label: 'Số tình huống',
            width: '130px',
            render: (val) => <span style={{ fontWeight: 600 }}>{val} tình huống</span>,
        },
        {
            key: 'duration',
            label: 'Thời gian',
            width: '110px',
            render: (val) => `${val} phút`,
        },
        {
            key: 'passScore',
            label: 'Điểm đạt',
            width: '100px',
            render: (val) => `${val}%`,
        },
        {
            key: 'isRandom',
            label: 'Ngẫu nhiên',
            width: '110px',
            render: (val) => (
                <span className={`ins-status-chip ${val ? 'approved' : 'pending'}`}>
                    <span className='chip-dot'></span>
                    {val ? 'Có' : 'Không'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    <span className='chip-dot'></span>
                    {val === 1 ? 'Hoạt động' : 'Nháp'}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '110px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button
                        className='ins-action-btn view'
                        title='Xem chi tiết'
                        onClick={() => setSelectedExam(row)}
                    >
                        <i className='fa-solid fa-eye'></i>
                    </button>
                    <button
                        className='ins-action-btn edit'
                        title='Chỉnh sửa'
                        onClick={() => setSelectedExam(row)}
                    >
                        <i className='fa-solid fa-pen'></i>
                    </button>
                    <button className='ins-action-btn delete' title='Xóa'>
                        <i className='fa-solid fa-trash'></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Đề thi Mô phỏng</h1>
                    <p>
                        Tạo và quản lý bộ đề thi mô phỏng lái xe từ các tình huống trong Ngân hàng Mô phỏng.
                    </p>
                </div>
            </div>

            <DataTable
                title={`Hiển thị ${situationExamItems.length} bộ đề thi mô phỏng`}
                columns={columns}
                data={situationExamItems}
                actions={
                    <button
                        className='ins-btn ins-btn-primary'
                        onClick={() => setShowCreate(true)}
                    >
                        <i className='fa-solid fa-plus'></i> Tạo đề thi mới
                    </button>
                }
            />

            <CreateSituationExamModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
            />

            <SituationExamDetailModal
                isOpen={!!selectedExam}
                exam={selectedExam}
                onClose={() => setSelectedExam(null)}
            />
        </div>
    );
}
