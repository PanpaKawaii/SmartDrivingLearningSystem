import { useState } from 'react';
import Modal from '../../../components/Shared/Modal';
import {
    simulationExams,
    simulationScenarios,
    simulationChapters,
    simulationDifficultyLevels,
} from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

function getSimulationExamDetails(situationExamId) {
    return simulationExams
        .filter((detail) => detail.situationExamId === situationExamId)
        .map((detail) => {
            const scenario = simulationScenarios.find((s) => s.id === detail.simulationId);
            const chapter = simulationChapters.find((c) => c.id === scenario?.simulationChapterId);
            const difficulty = simulationDifficultyLevels.find(
                (d) => d.id === scenario?.simulationDifficultyLevelId
            );

            return {
                ...detail,
                scenarioName: scenario?.name || '',
                totalTime: scenario?.totalTime || 0,
                chapterName: chapter?.name || '',
                difficultyName: difficulty?.name || '',
            };
        });
}

export default function SituationExamDetailModal({ isOpen, exam, onClose }) {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(null);

    if (!exam) return null;

    const scenarios = getSimulationExamDetails(exam.id);

    const handleEnterEdit = () => {
        setForm({ ...exam });
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setForm(null);
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleClose = () => {
        setEditMode(false);
        setForm(null);
        onClose();
    };

    const totalDuration = scenarios.reduce((sum, s) => sum + Math.round(s.totalTime / 60), 0);
    const totalBaseScore = scenarios.reduce((sum, s) => sum + s.baseScore, 0);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={editMode ? 'Chỉnh sửa đề thi mô phỏng' : 'Chi tiết đề thi mô phỏng'}
            wide
            footer={
                editMode ? (
                    <>
                        <button className='ins-btn ins-btn-secondary' onClick={handleCancelEdit}>
                            Hủy thay đổi
                        </button>
                        <button className='ins-btn ins-btn-primary'>
                            <i className='fa-solid fa-floppy-disk'></i> Lưu thay đổi
                        </button>
                    </>
                ) : (
                    <>
                        <button className='ins-btn ins-btn-secondary' onClick={handleClose}>
                            Đóng
                        </button>
                        <button className='ins-btn ins-btn-primary' onClick={handleEnterEdit}>
                            <i className='fa-solid fa-pen'></i> Chỉnh sửa
                        </button>
                    </>
                )
            }
        >
            <div className='sim-exam-detail-grid'>
                {/* ── Cột trái: thông tin đề thi ── */}
                <div className='sim-exam-detail-left'>
                    <p className='ins-section-label'>Thông tin đề thi</p>

                    {editMode ? (
                        <>
                            <div className='ins-form-group'>
                                <label className='ins-form-label'>Tên đề thi</label>
                                <input
                                    className='ins-form-input'
                                    name='title'
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='ins-form-group'>
                                <label className='ins-form-label'>Mô tả</label>
                                <textarea
                                    className='ins-form-textarea'
                                    name='description'
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='ins-form-row-2'>
                                <div className='ins-form-group'>
                                    <label className='ins-form-label'>Thời gian (phút)</label>
                                    <input
                                        className='ins-form-input'
                                        type='number'
                                        name='duration'
                                        value={form.duration}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='ins-form-group'>
                                    <label className='ins-form-label'>Điểm đạt (%)</label>
                                    <input
                                        className='ins-form-input'
                                        type='number'
                                        name='passScore'
                                        value={form.passScore}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='ins-form-group'>
                                <label className='ins-form-label'>Trạng thái</label>
                                <select
                                    className='ins-form-select'
                                    name='status'
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value={1}>Hoạt động</option>
                                    <option value={0}>Nháp</option>
                                </select>
                            </div>
                            <div className='ins-form-group'>
                                <label className='ins-form-label ins-form-checkbox-label'>
                                    <input
                                        type='checkbox'
                                        name='isRandom'
                                        checked={form.isRandom}
                                        onChange={handleChange}
                                        className='ins-form-checkbox'
                                    />
                                    <span>Chọn ngẫu nhiên (isRandom)</span>
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Tên đề thi</span>
                                <span className='sim-detail-value'>{exam.title}</span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Mô tả</span>
                                <span className='sim-detail-value'>{exam.description || '—'}</span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Thời gian</span>
                                <span className='sim-detail-value'>{exam.duration} phút</span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Điểm đạt</span>
                                <span className='sim-detail-value'>{exam.passScore}%</span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Ngẫu nhiên</span>
                                <span
                                    className={`ins-status-chip ${exam.isRandom ? 'approved' : 'pending'}`}
                                >
                                    {exam.isRandom ? 'Có' : 'Không'}
                                </span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Trạng thái</span>
                                <span
                                    className={`ins-status-chip ${exam.status === 1 ? 'approved' : 'pending'}`}
                                >
                                    <span className='chip-dot'></span>
                                    {exam.status === 1 ? 'Hoạt động' : 'Nháp'}
                                </span>
                            </div>
                        </>
                    )}

                    {/* Thống kê nhanh */}
                    <div className='sim-exam-stats'>
                        <div className='sim-exam-stat-item'>
                            <i className='fa-solid fa-film'></i>
                            <span>{scenarios.length} tình huống</span>
                        </div>
                        <div className='sim-exam-stat-item'>
                            <i className='fa-solid fa-clock'></i>
                            <span>~{totalDuration} phút</span>
                        </div>
                        <div className='sim-exam-stat-item'>
                            <i className='fa-solid fa-star'></i>
                            <span>{totalBaseScore} điểm tổng</span>
                        </div>
                    </div>
                </div>

                {/* ── Cột phải: danh sách SimulationExam (junction) ── */}
                <div className='sim-exam-detail-right'>
                    <div className='sim-detail-scenarios-header'>
                        <p className='ins-section-label'>
                            Danh sách tình huống trong đề ({scenarios.length})
                        </p>
                        {editMode && (
                            <button className='ins-btn ins-btn-secondary' style={{ fontSize: '13px', padding: '5px 12px' }}>
                                <i className='fa-solid fa-plus'></i> Thêm tình huống
                            </button>
                        )}
                    </div>

                    {scenarios.length === 0 ? (
                        <div className='sim-empty-scenarios'>
                            <i className='fa-solid fa-film' style={{ fontSize: '32px', opacity: 0.3 }}></i>
                            <p>Chưa có tình huống nào trong đề thi này</p>
                        </div>
                    ) : (
                        <div className='sim-scenario-detail-list'>
                            {scenarios.map((simExam, idx) => (
                                <div key={simExam.id} className='sim-scenario-detail-item'>
                                    <div className='sim-scenario-detail-index'>{idx + 1}</div>
                                    <div className='sim-scenario-detail-info'>
                                        <p className='sim-scenario-detail-name'>
                                            {simExam.scenarioName}
                                        </p>
                                        <p className='sim-scenario-detail-meta'>
                                            {simExam.chapterName} &bull;{' '}
                                            <span
                                                className={`ins-status-chip ${
                                                    simExam.difficultyName === 'Dễ'
                                                        ? 'approved'
                                                        : simExam.difficultyName === 'Trung bình'
                                                        ? 'pending'
                                                        : 'rejected'
                                                }`}
                                                style={{ fontSize: '11px', padding: '1px 8px' }}
                                            >
                                                {simExam.difficultyName}
                                            </span>
                                            &bull; {Math.round(simExam.totalTime / 60)} phút
                                        </p>
                                    </div>
                                    <div className='sim-scenario-detail-score'>
                                        <span className='sim-score-badge'>{simExam.baseScore} điểm</span>
                                    </div>
                                    {editMode && (
                                        <button
                                            className='ins-action-btn delete'
                                            title='Xóa khỏi đề'
                                            style={{ marginLeft: '8px' }}
                                        >
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
