import { useState } from 'react';
import InstructorModal from '../../../components/InstructorComponent/InstructorModal';
import {
    simulationScenarios,
    simulationChapters,
    simulationDifficultyLevels,
} from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

// Build danh sách tình huống kèm thông tin hiển thị (join từ lookup tables)
const scenarioOptions = simulationScenarios.slice(0, 30).map((s) => ({
    ...s,
    chapterName: simulationChapters.find((c) => c.id === s.simulationChapterId)?.name || '',
    difficultyName: simulationDifficultyLevels.find((d) => d.id === s.simulationDifficultyLevelId)?.name || '',
}));

const initialForm = {
    title: '',
    description: '',
    duration: '',
    passScore: '',
    isRandom: false,
    status: 1,
};


export default function CreateSituationExamModal({ isOpen, onClose }) {
    const [form, setForm] = useState(initialForm);
    const [selectedScenarios, setSelectedScenarios] = useState([]);
    const [scenarioSearch, setScenarioSearch] = useState('');

    const filteredScenarios = scenarioOptions.filter((s) =>
        s.name.toLowerCase().includes(scenarioSearch.toLowerCase()) ||
        s.chapterName.toLowerCase().includes(scenarioSearch.toLowerCase())
    );

    const handleClose = () => {
        setForm(initialForm);
        setSelectedScenarios([]);
        setScenarioSearch('');
        onClose();
    };

    const toggleScenario = (scenario) => {
        setSelectedScenarios((prev) =>
            prev.find((s) => s.id === scenario.id)
                ? prev.filter((s) => s.id !== scenario.id)
                : [...prev, scenario]
        );
    };

    const isSelected = (id) => selectedScenarios.some((s) => s.id === id);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const canSubmit =
        form.title.trim() &&
        form.duration &&
        form.passScore &&
        selectedScenarios.length > 0;

    return (
        <InstructorModal
            isOpen={isOpen}
            onClose={handleClose}
            title='Tạo đề thi mô phỏng mới'
            wide
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={handleClose}>
                        Hủy
                    </button>
                    <button
                        className='ins-btn ins-btn-primary'
                        disabled={!canSubmit}
                        style={{ opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                    >
                        <i className='fa-solid fa-floppy-disk'></i> Lưu đề thi
                    </button>
                </>
            }
        >
            {/* ── Thông tin cơ bản ── */}
            <div className='sim-exam-create-grid'>
                <div className='sim-exam-create-left'>
                    <p className='ins-section-label'>Thông tin đề thi</p>

                    <div className='ins-form-group'>
                        <label className='ins-form-label'>
                            Tên đề thi <span style={{ color: 'var(--ins-error)' }}>*</span>
                        </label>
                        <input
                            className='ins-form-input'
                            type='text'
                            name='title'
                            placeholder='Nhập tên bộ đề thi mô phỏng...'
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
                            placeholder='Mô tả ngắn về bộ đề thi...'
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='ins-form-row-2'>
                        <div className='ins-form-group'>
                            <label className='ins-form-label'>
                                Thời gian (phút) <span style={{ color: 'var(--ins-error)' }}>*</span>
                            </label>
                            <input
                                className='ins-form-input'
                                type='number'
                                name='duration'
                                placeholder='VD: 30'
                                min={5}
                                max={120}
                                value={form.duration}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='ins-form-group'>
                            <label className='ins-form-label'>
                                Điểm đạt (%) <span style={{ color: 'var(--ins-error)' }}>*</span>
                            </label>
                            <input
                                className='ins-form-input'
                                type='number'
                                name='passScore'
                                placeholder='VD: 80'
                                min={0}
                                max={100}
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
                            <span>Chọn tình huống ngẫu nhiên (isRandom)</span>
                        </label>
                        {form.isRandom && (
                            <p className='ins-form-hint'>
                                <i className='fa-solid fa-circle-info'></i> Hệ thống sẽ tự động chọn ngẫu nhiên các tình huống phù hợp mỗi lần thi.
                            </p>
                        )}
                    </div>

                    {selectedScenarios.length > 0 && (
                        <div className='sim-selected-summary'>
                            <p className='ins-section-label'>
                                Đã chọn ({selectedScenarios.length} tình huống)
                            </p>
                            {selectedScenarios.map((s) => (
                                <div key={s.id} className='sim-selected-chip'>
                                    <span>{s.name}</span>
                                    <button onClick={() => toggleScenario(s)} title='Bỏ chọn'>
                                        <i className='fa-solid fa-xmark'></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Chọn tình huống ── */}
                <div className='sim-exam-create-right'>
                    <p className='ins-section-label'>
                        Chọn tình huống <span style={{ color: 'var(--ins-error)' }}>*</span>
                    </p>
                    <div className='sim-scenario-search'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                        <input
                            type='text'
                            placeholder='Tìm tình huống...'
                            value={scenarioSearch}
                            onChange={(e) => setScenarioSearch(e.target.value)}
                        />
                    </div>

                    <div className='sim-scenario-list'>
                        {filteredScenarios.map((scenario) => (
                            <div
                                key={scenario.id}
                                className={`sim-scenario-item ${isSelected(scenario.id) ? 'selected' : ''}`}
                                onClick={() => toggleScenario(scenario)}
                            >
                                <div className='sim-scenario-check'>
                                    {isSelected(scenario.id) ? (
                                        <i className='fa-solid fa-circle-check'></i>
                                    ) : (
                                        <i className='fa-regular fa-circle'></i>
                                    )}
                                </div>
                                <div className='sim-scenario-info'>
                                    <p className='sim-scenario-name'>{scenario.name}</p>
                                    <p className='sim-scenario-meta'>
                                        {scenario.chapterName} &bull;{' '}
                                        <span
                                            className={`ins-status-chip ${
                                                scenario.difficultyName === 'Dễ'
                                                    ? 'approved'
                                                    : scenario.difficultyName === 'Trung bình'
                                                    ? 'pending'
                                                    : 'rejected'
                                            }`}
                                            style={{ fontSize: '11px', padding: '1px 8px' }}
                                        >
                                            {scenario.difficultyName}
                                        </span>
                                        &bull; {Math.round(scenario.totalTime / 60)} phút
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </InstructorModal>
    );
}
