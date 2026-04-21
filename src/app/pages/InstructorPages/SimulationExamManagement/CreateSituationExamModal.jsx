import { useState, useEffect, useCallback } from 'react';
import Modal from '../../../components/Shared/Modal';
import { fetchData, postData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

const INITIAL_FORM = {
    title: '',
    description: '',
    passScore: '',
    isRandom: false,
    status: 1,
};

const buildPostPayload = (form, selectedSims) => ({
    title: form.title.trim(),
    description: form.description.trim(),
    passScore: Number(form.passScore),
    isRandom: form.isRandom,
    status: Number(form.status),
    simulationExams: selectedSims.map((s) => ({
        simulationId: s.simulationId,
        baseScore: Number(s.baseScore),
    })),
});

function difficultyChipClass(name) {
    if (name === 'Dễ') return 'approved';
    if (name === 'Trung bình') return 'pending';
    return 'rejected';
}

function PickerSimItem({ sim, selected, onToggle }) {
    const chapterName = sim.simulationChapter?.name || '—';
    const difficultyName = sim.simulationDifficultyLevel?.name || '—';
    const totalTime = sim.totalTime ?? 0;

    return (
        <div
            onClick={onToggle}
            className={`sim-exam-picker-item ${selected ? 'selected' : ''}`}
        >
            <span className={`sim-exam-picker-checkbox ${selected ? 'selected' : ''}`}>
                {selected && <i className='fa-solid fa-check' />}
            </span>
            <div className='sim-exam-picker-info'>
                <p className='sim-exam-picker-name'>{sim.name || '—'}</p>
                <p className='sim-exam-picker-meta'>
                    {chapterName} &bull;{' '}
                    <span
                        className={`ins-status-chip ${difficultyChipClass(difficultyName)}`}
                        style={{ fontSize: '11px', padding: '1px 8px' }}
                    >
                        {difficultyName}
                    </span>
                    {' '}&bull; {totalTime} giây
                </p>
            </div>
        </div>
    );
}

function SelectedSimItem({ item, index, onRemove, onBaseScoreChange }) {
    return (
        <div className='sim-exam-selected-item'>
            <span className='sim-exam-selected-index'>{index + 1}</span>
            <div className='sim-exam-selected-main'>
                <p className='sim-exam-selected-name'>{item.name || item.simulationId}</p>
                <p className='sim-exam-selected-meta'>
                    {item.chapterName} &bull; {item.totalTime} giây
                </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                    type='number'
                    className='ins-form-input'
                    title='Điểm cơ bản'
                    min={0}
                    value={item.baseScore}
                    onChange={(e) => onBaseScoreChange(item.simulationId, e.target.value)}
                    style={{ width: '68px', padding: '4px 8px', fontSize: '13px' }}
                />
                <span style={{ fontSize: '12px', opacity: 0.7 }}>điểm</span>
            </div>
            <button
                type='button'
                className='ins-action-btn delete'
                title='Xóa khỏi đề thi'
                onClick={onRemove}
                style={{ marginLeft: '6px' }}
            >
                <i className='fa-solid fa-xmark' />
            </button>
        </div>
    );
}

export default function CreateSituationExamModal({ isOpen, onClose, onSuccess }) {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';
    const [form, setForm] = useState(INITIAL_FORM);

    const [selectedSims, setSelectedSims] = useState([]);

    const [pickerOpen, setPickerOpen] = useState(false);
    const [pickerSearch, setPickerSearch] = useState('');
    const [pickerPage, setPickerPage] = useState(1);
    const [pickerList, setPickerList] = useState([]);
    const [pickerTotal, setPickerTotal] = useState(0);
    const [pickerTotalPages, setPickerTotalPages] = useState(1);
    const [pickerLoading, setPickerLoading] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setForm(INITIAL_FORM);
            setSelectedSims([]);
            setPickerOpen(false);
            setPickerSearch('');
            setPickerPage(1);
            setError('');
        }
    }, [isOpen]);

    const fetchPickerList = useCallback(async () => {
        setPickerLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(pickerPage),
                pageSize: '10',
                status: '1',
            });
            if (pickerSearch.trim()) query.set('name', pickerSearch.trim());
            const res = await fetchData(`SimulationScenarios?${query.toString()}`, token);
            setPickerList(normalizeItems(res));
            setPickerTotal(res?.totalCount ?? 0);
            setPickerTotalPages(res?.totalPages ?? 1);
        } catch (err) {
            if (err?.status === 401) refreshNewToken(user);
            setPickerList([]);
        } finally {
            setPickerLoading(false);
        }
    }, [token, pickerPage, pickerSearch, refreshNewToken, user]);

    useEffect(() => {
        if (pickerOpen) fetchPickerList();
    }, [pickerOpen, fetchPickerList]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const isSimSelected = (simulationId) =>
        selectedSims.some((s) => s.simulationId === simulationId);

    const togglePickerSim = (sim) => {
        if (isSimSelected(sim.id)) {
            setSelectedSims((prev) => prev.filter((s) => s.simulationId !== sim.id));
        } else {
            setSelectedSims((prev) => [
                ...prev,
                {
                    simulationId: sim.id,
                    name: sim.name || '',
                    chapterName: sim.simulationChapter?.name || '—',
                    totalTime: sim.totalTime ?? 0,
                    baseScore: 0,
                },
            ]);
        }
    };

    const removeSim = (simulationId) =>
        setSelectedSims((prev) => prev.filter((s) => s.simulationId !== simulationId));

    const handleBaseScoreChange = (simulationId, value) => {
        setSelectedSims((prev) =>
            prev.map((s) => (s.simulationId === simulationId ? { ...s, baseScore: value } : s)),
        );
    };

    const handlePickerSearch = () => {
        setPickerPage(1);
        fetchPickerList();
    };

    const handleClose = () => {
        setForm(INITIAL_FORM);
        setSelectedSims([]);
        setPickerOpen(false);
        setPickerSearch('');
        setError('');
        onClose();
    };

    const handleSubmit = async () => {
        setError('');
        if (!form.title.trim()) return setError('Vui lòng nhập tên đề thi.');
        if (!form.passScore || Number(form.passScore) <= 0)
            return setError('Điểm đạt phải lớn hơn 0.');
        if (selectedSims.length === 0)
            return setError('Đề thi phải có ít nhất 1 tình huống.');

        setSubmitting(true);
        try {
            const payload = buildPostPayload(form, selectedSims);
            await postData('SituationExams', payload, token);
            onSuccess?.();
            handleClose();
        } catch (err) {
            if (err.status === 401) {
                refreshNewToken(user);
            } else {
                setError(err.data?.message || err.message || 'Có lỗi xảy ra khi tạo đề thi.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const canSubmit = form.title.trim() && form.passScore && selectedSims.length > 0;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title='Tạo đề thi mô phỏng mới'
            wide
            message={
                error && (
                    <div className='ins-error-banner'>
                        <i className='fa-solid fa-triangle-exclamation' /> {error}
                    </div>
                )
            }
            footer={
                <>
                    <button
                        className='ins-btn ins-btn-secondary'
                        onClick={handleClose}
                        disabled={submitting}
                    >
                        Hủy
                    </button>
                    <button
                        className='ins-btn ins-btn-primary'
                        onClick={handleSubmit}
                        disabled={submitting || !canSubmit}
                        style={{ opacity: canSubmit ? 1 : 0.55, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                    >
                        {submitting ? (
                            <i className='fa-solid fa-spinner fa-spin' />
                        ) : (
                            <i className='fa-solid fa-floppy-disk' />
                        )}{' '}
                        Lưu đề thi
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
                                Điểm đạt (%) <span style={{ color: 'var(--ins-error)' }}>*</span>
                            </label>
                            <input
                                className='ins-form-input'
                                type='number'
                                name='passScore'
                                placeholder='VD: 80'
                                min={1}
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
                                <option value={0}>Nháp</option>
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
                            <span>Chọn tình huống ngẫu nhiên (isRandom)</span>
                        </label>
                        {form.isRandom && (
                            <p className='ins-form-hint'>
                                <i className='fa-solid fa-circle-info' /> Hệ thống sẽ tự động chọn
                                ngẫu nhiên các tình huống phù hợp mỗi lần thi.
                            </p>
                        )}
                    </div>

                    {selectedSims.length > 0 && (
                        <div className='sim-exam-selected-section'>
                            <p className='ins-section-label'>
                                Tình huống đã chọn ({selectedSims.length})
                            </p>
                            <div className='sim-exam-selected-list'>
                                {selectedSims.map((s, idx) => (
                                    <SelectedSimItem
                                        key={s.simulationId}
                                        item={s}
                                        index={idx}
                                        onRemove={() => removeSim(s.simulationId)}
                                        onBaseScoreChange={handleBaseScoreChange}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Cột phải: picker tình huống ── */}
                <div className='sim-exam-create-right'>
                    <div className='sim-detail-scenarios-header'>
                        <p className='ins-section-label'>
                            Chọn tình huống{' '}
                            <span style={{ color: 'var(--ins-error)' }}>*</span>
                        </p>
                        <button
                            type='button'
                            className='ins-btn ins-btn-secondary'
                            style={{ fontSize: '13px', padding: '5px 12px' }}
                            onClick={() => setPickerOpen((o) => !o)}
                        >
                            <i className={`fa-solid fa-${pickerOpen ? 'chevron-up' : 'plus'}`} />{' '}
                            {pickerOpen ? 'Thu gọn' : 'Tìm tình huống'}
                        </button>
                    </div>

                    {/* Picker panel */}
                    {pickerOpen && (
                        <div className='sim-exam-picker-panel'>
                            <div className='sim-scenario-search'>
                                <i className='fa-solid fa-magnifying-glass' />
                                <input
                                    type='text'
                                    placeholder='Tìm tình huống theo tên...'
                                    value={pickerSearch}
                                    onChange={(e) => setPickerSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePickerSearch()}
                                />
                                <button
                                    type='button'
                                    className='ins-btn ins-btn-secondary'
                                    style={{ padding: '4px 10px', fontSize: '13px' }}
                                    onClick={handlePickerSearch}
                                >
                                    <i className='fa-solid fa-magnifying-glass' />
                                </button>
                            </div>

                            {pickerLoading ? (
                                <div className='sim-empty-scenarios' style={{ padding: '24px' }}>
                                    <i className='fa-solid fa-spinner fa-spin' style={{ fontSize: '24px', opacity: 0.5 }} />
                                    <p>Đang tải...</p>
                                </div>
                            ) : (
                                <div className='sim-scenario-list'>
                                    {pickerList.length === 0 ? (
                                        <div className='sim-empty-scenarios' style={{ padding: '24px' }}>
                                            <i className='fa-solid fa-film' style={{ fontSize: '24px', opacity: 0.3 }} />
                                            <p>Không tìm thấy tình huống nào.</p>
                                        </div>
                                    ) : (
                                        pickerList.map((sim) => (
                                            <PickerSimItem
                                                key={sim.id}
                                                sim={sim}
                                                selected={isSimSelected(sim.id)}
                                                onToggle={() => togglePickerSim(sim)}
                                            />
                                        ))
                                    )}
                                </div>
                            )}

                            {pickerTotalPages > 1 && (
                                <div className='sim-exam-picker-pagination'>
                                    <button
                                        type='button'
                                        className='ins-btn ins-btn-secondary'
                                        style={{ padding: '4px 12px' }}
                                        disabled={pickerPage <= 1}
                                        onClick={() => setPickerPage((p) => p - 1)}
                                    >
                                        ‹
                                    </button>
                                    <span style={{ fontSize: '13px' }}>
                                        {pickerPage} / {pickerTotalPages}
                                    </span>
                                    <button
                                        type='button'
                                        className='ins-btn ins-btn-secondary'
                                        style={{ padding: '4px 12px' }}
                                        disabled={pickerPage >= pickerTotalPages}
                                        onClick={() => setPickerPage((p) => p + 1)}
                                    >
                                        ›
                                    </button>
                                </div>
                            )}

                            <div className='sim-exam-picker-summary'>
                                Tổng {pickerTotal} tình huống · Đã chọn {selectedSims.length}
                            </div>
                        </div>
                    )}

                    {/* Hiển thị khi picker đóng */}
                    {!pickerOpen && selectedSims.length === 0 && (
                        <div className='sim-empty-scenarios' style={{ marginTop: '16px' }}>
                            <i className='fa-solid fa-film' style={{ fontSize: '32px', opacity: 0.25 }} />
                            <p style={{ fontSize: '14px' }}>
                                Nhấn <strong>"Tìm tình huống"</strong> để chọn các tình huống cho đề thi.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
