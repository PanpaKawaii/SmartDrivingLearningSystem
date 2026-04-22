import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const getScenarioInfo = (simExam) => {
    const sim = simExam?.simulation || {};
    return {
        id: simExam.id,
        situationExamId: simExam.situationExamId,
        simulationId: simExam.simulationId,
        baseScore: simExam.baseScore ?? 0,
        status: simExam.status ?? 1,
        scenarioName: sim.name || '—',
        totalTime: sim.totalTime || 0,
        chapterName: sim.simulationChapter?.name || '—',
        difficultyName: sim.simulationDifficultyLevel?.name || '—',
        categoryName: sim.simulationCategory?.name || '—',
    };
};

const difficultyChipClass = (name) => {
    if (name === 'Dễ') return 'approved';
    if (name === 'Trung bình') return 'pending';
    return 'rejected';
};

const buildPutPayload = (form, scenarios) => ({
    title: form.title.trim(),
    description: form.description.trim(),
    passScore: Number(form.passScore),
    isRandom: form.isRandom,
    status: Number(form.status),
    simulationExams: scenarios.map((s) => ({
        id: s.id,
        simulationId: s.simulationId,
        baseScore: Number(s.baseScore),
        status: Number(s.status),
    })),
});


export default function SituationExamDetailModal({ isOpen, exam, onClose, onSuccess, startInEditMode = false }) {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(null);
    const [editScenarios, setEditScenarios] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Khi mở modal hoặc đổi exam → reset state, tự vào edit mode nếu cần
    useEffect(() => {
        if (isOpen && exam) {
            setError('');
            if (startInEditMode) {
                setEditMode(true);
                setForm({
                    title: exam.title || '',
                    description: exam.description || '',
                    passScore: exam.passScore ?? 0,
                    isRandom: exam.isRandom ?? false,
                    status: exam.status ?? 1,
                });
                setEditScenarios((exam.simulationExams || []).map(getScenarioInfo));
            } else {
                setEditMode(false);
                setForm(null);
                setEditScenarios([]);
            }
        }
    }, [isOpen, exam, startInEditMode]);

    if (!exam) return null;

    const scenarios = (exam.simulationExams || []).map(getScenarioInfo);

    const totalBaseScore = scenarios.reduce((sum, s) => sum + s.baseScore, 0);

    const handleEnterEdit = () => {
        setForm({
            title: exam.title || '',
            description: exam.description || '',
            passScore: exam.passScore ?? 0,
            isRandom: exam.isRandom ?? false,
            status: exam.status ?? 1,
        });
        setEditScenarios(scenarios.map((s) => ({ ...s }))); // deep copy
        setError('');
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setForm(null);
        setEditScenarios([]);
        setError('');
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRemoveScenario = (simExamId) => {
        setEditScenarios((prev) => prev.filter((s) => s.id !== simExamId));
    };

    const handleBaseScoreChange = (simExamId, newScore) => {
        setEditScenarios((prev) =>
            prev.map((s) => (s.id === simExamId ? { ...s, baseScore: newScore } : s)),
        );
    };

    const handleClose = () => {
        setEditMode(false);
        setForm(null);
        setEditScenarios([]);
        setError('');
        onClose();
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            setError('Vui lòng nhập tên đề thi.');
            return;
        }
        if (editScenarios.length === 0) {
            setError('Đề thi phải có ít nhất 1 tình huống.');
            return;
        }

        setSubmitting(true);
        setError('');
        try {
            const payload = buildPutPayload(form, editScenarios);
            await putData(`SituationExams/${exam.id}`, payload, token);
            onSuccess?.();
            handleClose();
        } catch (err) {
            if (err.status === 401) {
                refreshNewToken(user);
            } else {
                setError(err.data?.message || err.message || 'Có lỗi xảy ra khi lưu đề thi.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={editMode ? 'Chỉnh sửa đề thi mô phỏng' : 'Chi tiết đề thi mô phỏng'}
            wide
            message={
                error && (
                    <div className='ins-error-banner'>
                        <i className='fa-solid fa-triangle-exclamation' /> {error}
                    </div>
                )
            }
            footer={
                editMode ? (
                    <>
                        <button
                            className='ins-btn ins-btn-secondary'
                            onClick={handleCancelEdit}
                            disabled={submitting}
                        >
                            Hủy thay đổi
                        </button>
                        <button
                            className='ins-btn ins-btn-primary'
                            onClick={handleSave}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <i className='fa-solid fa-spinner fa-spin' />
                            ) : (
                                <i className='fa-solid fa-floppy-disk' />
                            )}{' '}
                            Lưu thay đổi
                        </button>
                    </>
                ) : (
                    <>
                        <button className='ins-btn ins-btn-secondary' onClick={handleClose}>
                            Đóng
                        </button>
                        <button className='ins-btn ins-btn-primary' onClick={handleEnterEdit}>
                            <i className='fa-solid fa-pen' /> Chỉnh sửa
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
                                <label className='ins-form-label'>
                                    Tên đề thi{' '}
                                    <span style={{ color: 'var(--ins-error)' }}>*</span>
                                </label>
                                <input
                                    className='ins-form-input'
                                    name='title'
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder='Nhập tên bộ đề thi...'
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
                                    placeholder='Mô tả ngắn về bộ đề thi...'
                                />
                            </div>
                            <div className='ins-form-row-2'>
                                <div className='ins-form-group'>
                                    <label className='ins-form-label'>
                                        Điểm đạt (%){' '}
                                        <span style={{ color: 'var(--ins-error)' }}>*</span>
                                    </label>
                                    <input
                                        className='ins-form-input'
                                        type='number'
                                        name='passScore'
                                        min={0}
                                        max={100}
                                        value={form.passScore}
                                        onChange={handleChange}
                                    />
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
                                        <option value={0}>Ngưng</option>
                                    </select>
                                </div>
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
                                    {/* <span>Chọn ngẫu nhiên (isRandom)</span> */}
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
                                <span className='sim-detail-value'>~{Math.ceil(exam.duration / 60)} phút</span>
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
                                    <span className='chip-dot' />
                                    {exam.isRandom ? 'Có' : 'Không'}
                                </span>
                            </div>
                            <div className='sim-detail-field'>
                                <span className='sim-detail-label'>Trạng thái</span>
                                <span
                                    className={`ins-status-chip ${exam.status === 1 ? 'approved' : 'pending'}`}
                                >
                                    <span className='chip-dot' />
                                    {exam.status === 1 ? 'Hoạt động' : 'Ngưng'}
                                </span>
                            </div>
                        </>
                    )}

                    {/* Thống kê nhanh */}
                    <div className='sim-exam-stats'>
                        <div className='sim-exam-stat-item'>
                            <i className='fa-solid fa-film' />
                            <span>{scenarios.length} tình huống</span>
                        </div>
                        <div className='sim-exam-stat-item'>
                            <i className='fa-solid fa-star' />
                            <span>{totalBaseScore} điểm tổng</span>
                        </div>
                    </div>
                </div>

                {/* ── Cột phải: danh sách tình huống ── */}
                <div className='sim-exam-detail-right'>
                    <div className='sim-detail-scenarios-header'>
                        <p className='ins-section-label'>
                            Danh sách tình huống trong đề (
                            {editMode ? editScenarios.length : scenarios.length})
                        </p>
                    </div>

                    {/* View mode */}
                    {!editMode && (
                        scenarios.length === 0 ? (
                            <div className='sim-empty-scenarios'>
                                <i className='fa-solid fa-film' style={{ fontSize: '32px', opacity: 0.3 }} />
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
                                                    className={`ins-status-chip ${difficultyChipClass(simExam.difficultyName)}`}
                                                    style={{ fontSize: '11px', padding: '1px 8px' }}
                                                >
                                                    {simExam.difficultyName}
                                                </span>{' '}
                                                &bull; {simExam.totalTime} Giây
                                            </p>
                                        </div>
                                        <div className='sim-scenario-detail-score'>
                                            <span className='sim-score-badge'>
                                                {simExam.baseScore} điểm
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* Edit mode */}
                    {editMode && (
                        editScenarios.length === 0 ? (
                            <div className='sim-empty-scenarios'>
                                <i className='fa-solid fa-film' style={{ fontSize: '32px', opacity: 0.3 }} />
                                <p>Chưa có tình huống nào. Lưu sẽ xóa toàn bộ.</p>
                            </div>
                        ) : (
                            <div className='sim-scenario-detail-list'>
                                {editScenarios.map((simExam, idx) => (
                                    <div key={simExam.id} className='sim-scenario-detail-item'>
                                        <div className='sim-scenario-detail-index'>{idx + 1}</div>
                                        <div className='sim-scenario-detail-info'>
                                            <p className='sim-scenario-detail-name'>
                                                {simExam.scenarioName}
                                            </p>
                                            <p className='sim-scenario-detail-meta'>
                                                {simExam.chapterName} &bull;{' '}
                                                <span
                                                    className={`ins-status-chip ${difficultyChipClass(simExam.difficultyName)}`}
                                                    style={{ fontSize: '11px', padding: '1px 8px' }}
                                                >
                                                    {simExam.difficultyName}
                                                </span>{' '}
                                                &bull; {simExam.totalTime} Giây
                                            </p>
                                        </div>
                                        <div
                                            className='sim-scenario-detail-score'
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <input
                                                type='number'
                                                className='ins-form-input'
                                                title='Điểm cơ bản'
                                                min={0}
                                                value={simExam.baseScore}
                                                onChange={(e) =>
                                                    handleBaseScoreChange(simExam.id, e.target.value)
                                                }
                                                style={{ width: '72px', padding: '4px 8px', fontSize: '13px' }}
                                            />
                                            <span style={{ fontSize: '12px', color: 'var(--ins-on-surface)', opacity: 0.7 }}>
                                                điểm
                                            </span>
                                        </div>
                                        <button
                                            className='ins-action-btn delete'
                                            title='Xóa khỏi đề'
                                            style={{ marginLeft: '8px' }}
                                            onClick={() => handleRemoveScenario(simExam.id)}
                                        >
                                            <i className='fa-solid fa-trash' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </Modal>
    );
}
