import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { fetchData, postData, putData, uploadVideo } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const defaultScenario = {
    simulationChapterId: '',
    simulationCategoryId: '',
    simulationDifficultyLevelId: '',
    name: '',
    description: '',
    video: '',
    totalTime: 0,
    startPoint: 0,
    endPoint: 0,
    index: 1,
    status: 1
};

export default function SimulationScenarioModal({ isOpen, onClose, onSuccess, item, action }) {
    const { user, refreshNewToken } = useAuth?.() || {};
    const token = user?.token || '';

    const [formData, setFormData] = useState({ ...defaultScenario });
    const [options, setOptions] = useState({ chapters: [], categories: [], levels: [] });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);

    // Load options cho các dropdown
    useEffect(() => {
        if (!isOpen) return;
        const fetchOptions = async () => {
            try {
                const [chaps, cats, lvls] = await Promise.all([
                    fetchData('SimulationChapters/all', token),
                    fetchData('SimulationCategories/all', token),
                    fetchData('SimulationDifficultyLevels/all', token)
                ]);
                setOptions({
                    chapters: chaps || [],
                    categories: cats || [],
                    levels: lvls || []
                });
            } catch (err) {
                if (err.status === 401) refreshNewToken(user);
                console.error("Lỗi load danh mục:", err);
            }
        };
        fetchOptions();
    }, [isOpen, token]);

    // Đồng bộ dữ liệu khi mở Modal (Edit hoặc Create)
    useEffect(() => {
        if (!isOpen) return;
        if (action === 'edit' && item) {
            setFormData({
                ...item,
                simulationChapterId: item.simulationChapterId || '',
                simulationCategoryId: item.simulationCategoryId || '',
                simulationDifficultyLevelId: item.simulationDifficultyLevelId || '',
            });
        } else {
            setFormData({ ...defaultScenario });
        }
        setSelectedVideoFile(null);
        setError('');
    }, [isOpen, action, item]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleVideoFileChange = (e) => {
        const file = e.target?.files?.[0] || null;
        setSelectedVideoFile(file);
        setError('');
    };

    const handleSubmit = async () => {
        // --- VALIDATION LOGIC ---

        // 1. Kiểm tra trống các trường bắt buộc
        if (!formData.name.trim()) { setError('Tên kịch bản không được để trống.'); return; }
        if (!selectedVideoFile && !formData.video.trim()) { setError('Vui lòng chọn file video hoặc nhập URL video.'); return; }
        if (!formData.simulationChapterId) { setError('Vui lòng chọn chương.'); return; }
        if (!formData.simulationCategoryId) { setError('Vui lòng chọn thể loại.'); return; }
        if (!formData.simulationDifficultyLevelId) { setError('Vui lòng chọn độ khó.'); return; }

        if (!formData.totalTime) { setError('Vui lòng nhập tổng thời gian.'); return; }
        if (formData.totalTime <= 0) { setError('Tổng thời gian phải lớn hơn 0.'); return; }

        if (!formData.startPoint) { setError('Vui lòng nhập điểm bắt đầu.'); return; }
        if (formData.startPoint < 0) {
            setError('Điểm bắt đầu không được âm.');
            return;
        }
        if (formData.startPoint > (formData.totalTime * 1000)) {
            setError('Điểm bắt đầu không được lớn hơn tổng thời gian kịch bản.');
            return;
        }

        if (formData.startPoint >= formData.endPoint) {
            setError('Điểm bắt đầu phải thấp hơn Điểm kết thúc.');
            return;
        }

        if (!formData.endPoint) { setError('Vui lòng nhập điểm kết thúc.'); return; }
        if (formData.endPoint > (formData.totalTime * 1000)) {
            setError('Điểm kết thúc không được lớn hơn tổng thời gian kịch bản.');
            return;
        }

        // --- END VALIDATION ---

        setSaving(true);
        setError('');
        try {
            let finalVideoUrl = formData.video?.trim() || '';

            if (selectedVideoFile) {
                finalVideoUrl = await uploadVideo(selectedVideoFile, token);
            }

            if (!finalVideoUrl) {
                setError('Không lấy được URL video sau khi upload.');
                return;
            }

            // Chuẩn bị dữ liệu để gửi (đảm bảo kiểu số)
            const payload = {
                ...formData,
                video: finalVideoUrl,
                totalTime: parseFloat(formData.totalTime),
                startPoint: parseFloat(formData.startPoint),
                endPoint: parseFloat(formData.endPoint),
            };

            if (action === 'edit' && item?.id) {
                await putData(`SimulationScenarios/${item.id}`, payload, token);
            } else {
                await postData('SimulationScenarios', payload, token);
            }
            onSuccess && onSuccess();
            onClose();
        } catch (err) {
            setError(err?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            if (err.status === 401) refreshNewToken(user);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === 'edit' ? 'Chỉnh sửa kịch bản mô phỏng' : 'Thêm kịch bản mới'}
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={saving}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={saving}>
                        <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {action === 'edit' ? ' Cập nhật' : ' Lưu kịch bản'}
                    </button>
                </>
            }
        >
            {error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}

            <div className='ins-form-row' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Tên kịch bản */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Tên kịch bản <span className="ins-required">*</span></label>
                    <input
                        className='ins-form-input'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Nhập tên tình huống...'
                    />
                </div>

                {/* Video upload */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Tải video <span className="ins-required">*</span></label>
                    <input
                        className='ins-form-input'
                        type='file'
                        accept='video/*'
                        onChange={handleVideoFileChange}
                    />
                    {selectedVideoFile && (
                        <small style={{ color: '#4b5563' }}>Đã chọn: {selectedVideoFile.name}</small>
                    )}
                </div>
            </div>

            <div className='ins-form-row'>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Video URL (tuỳ chọn nếu đã upload file)</label>
                    <input
                        className='ins-form-input'
                        type='text'
                        name='video'
                        value={formData.video}
                        onChange={handleChange}
                        placeholder='https://...'
                    />
                    {!!formData.video && (
                        <small style={{ color: '#4b5563', display: 'block', marginTop: '6px' }}>
                            URL hiện tại sẽ được giữ nguyên nếu không chọn file mới.
                        </small>
                    )}
                </div>
            </div>

            <div className='ins-form-row' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {/* Chương */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Chương <span className="ins-required">*</span></label>
                    <select
                        className='ins-form-input'
                        name="simulationChapterId"
                        value={formData.simulationChapterId}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn chương --</option>
                        {options.chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {/* Thể loại */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Thể loại <span className="ins-required">*</span></label>
                    <select
                        className='ins-form-input'
                        name="simulationCategoryId"
                        value={formData.simulationCategoryId}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn thể loại --</option>
                        {options.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {/* Độ khó */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Độ khó <span className="ins-required">*</span></label>
                    <select
                        className='ins-form-input'
                        name="simulationDifficultyLevelId"
                        value={formData.simulationDifficultyLevelId}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn độ khó --</option>
                        {options.levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                </div>
            </div>

            <div className='ins-form-row' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {/* Tổng thời gian */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Tổng thời gian (s) <span className="ins-required">*</span></label>
                    <input
                        className='ins-form-input'
                        type='number'
                        name='totalTime'
                        value={formData.totalTime}
                        onChange={handleChange}
                    />
                </div>

                {/* Điểm bắt đầu */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Điểm bắt đầu (ms) <span className="ins-required">*</span></label>
                    <input
                        className='ins-form-input'
                        type='number'
                        name='startPoint'
                        value={formData.startPoint}
                        onChange={handleChange}
                    />
                </div>

                {/* Điểm kết thúc */}
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Điểm kết thúc (ms) <span className="ins-required">*</span></label>
                    <input
                        className='ins-form-input'
                        type='number'
                        name='endPoint'
                        value={formData.endPoint}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Mô tả */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả kịch bản</label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Nhập chi tiết tình huống...'
                    style={{ minHeight: '80px' }}
                />
            </div>
        </Modal>
    );
}