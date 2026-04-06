import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { simulationScenarios, simulationChapters, simulationDifficultyLevels } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

// Build danh sách kèm join tên chương và độ khó
const data = simulationScenarios.slice(0, 20).map((s) => ({
    ...s,
    chapterName: simulationChapters.find((c) => c.id === s.simulationChapterId)?.name || '',
    difficultyName: simulationDifficultyLevels.find((d) => d.id === s.simulationDifficultyLevelId)?.name || '',
    durationMin: Math.round(s.totalTime / 60) || Math.round(s.totalTime),
}));

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'name', label: 'Tên tình huống' },
    { key: 'chapterName', label: 'Chương' },
    { key: 'difficultyName', label: 'Độ khó', width: '120px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Thang điểm khó' ? 'rejected' : val === 'Thang điểm vừa' ? 'pending' : 'approved'}`}>{val}</span>
    )},
    { key: 'totalTime', label: 'Thời lượng (giây)', width: '140px', render: (val) => `${val}s` },
    { key: 'status', label: 'Trạng thái', width: '110px', render: (val) => (
        <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
            <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nháp'}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: () => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function SimulationBank() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Ngân hàng Mô phỏng</h1><p>Quản lý danh sách tình huống mô phỏng lái xe. ({data.length} tình huống)</p></div>
                <button className='ins-btn ins-btn-primary'><i className='fa-solid fa-plus'></i> Thêm mô phỏng</button>
            </div>
            <InstructorDataTable title={`Hiển thị ${data.length} tình huống`} columns={columns} data={data} />
        </div>
    );
}
