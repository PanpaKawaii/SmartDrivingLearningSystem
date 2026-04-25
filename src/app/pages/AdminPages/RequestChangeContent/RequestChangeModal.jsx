import { useEffect, useRef, useState, useCallback } from 'react';
import Modal from '../../../components/Shared/Modal';
import AutoResizeTextarea from '../../../components/AutoResizeTextarea/AutoResizeTextarea';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';
import { fetchData, uploadMedia } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../../app/hooks/AuthContext/AuthContext';

export default function RequestChangeModal({
    isOpen,
    mode, // 'create', 'edit', 'view'
    report,
    onClose,
    onSubmit,
    isSaving,
}) {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [reportCategories, setReportCategories] = useState([]);

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refContent = useRef(null);
    const fileInputRef = useRef(null);

    const isViewMode = mode === 'view';

    const loadCategories = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const query = new URLSearchParams({ status: 1 });
            const response = await fetchData(`ReportCategories/all?${query.toString()}`, token);
            setReportCategories(response);
        } catch (err) {
            console.error('Error fetching categories:', err);
            if (err.status === 401) {
                try {
                    await refreshNewToken(user);
                } catch (reErr) {
                    setError('Phiên đăng nhập hết hạn.');
                }
            } else {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }, [token, user, refreshNewToken]);

    useEffect(() => {
        if (isOpen) {
            loadCategories();
        }
    }, [isOpen, loadCategories]);

    useEffect(() => {
        if (!isOpen) return;
        setTitle(report?.title || '');
        setContent(report?.content || '');
        setCategory(report?.reportCategoryId || '');
        setImageUrl(report?.image || null);
    }, [isOpen, report]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const result = await uploadMedia([file], user?.id, 'ReportImage', token);
            setImageUrl(result[0]?.url);
        } catch (err) {
            console.error('Upload error:', err);
            if (err.status === 401) {
                try {
                    await refreshNewToken(user);
                    alert("Phiên làm việc đã được làm mới. Vui lòng chọn lại file để upload.");
                } catch (reErr) {
                    console.error("Refresh token failed during upload");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAction = () => {
        const finalContent = isViewMode ? content : (refContent.current?.value || content);

        if (!title || !finalContent || !category) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        onSubmit({
            ...report,
            title,
            content: finalContent,
            reportCategoryId: category,
            image: imageUrl || ''
        });
    };

    const getDisplayName = () => {
        if (report?.questionContent) return report.questionContent;
        if (report?.question?.content) return report.question.content;
        if (report?.questionId) return `Câu hỏi ID: ${report.questionId}`;
        return "Đang tải nội dung đối tượng...";
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'Tạo yêu cầu mới' : 'Chi tiết yêu cầu'}
            wide
            footer={
                <>
                    <button
                        className='ins-btn ins-btn-secondary'
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Đóng
                    </button>
                    {!isViewMode && (
                        <button
                            className='ins-btn ins-btn-primary'
                            onClick={handleAction}
                            disabled={isSaving || loading}
                        >
                            {isSaving ? (
                                <>
                                    <i className='fa-solid fa-spinner fa-spin'></i> Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <i className={mode === 'create' ? 'fa-solid fa-paper-plane' : 'fa-solid fa-floppy-disk'}></i>
                                    {mode === 'create' ? ' Gửi yêu cầu' : ' Cập nhật'}
                                </>
                            )}
                        </button>
                    )}
                </>
            }
        >
            <div className='report-modal-container' style={{ padding: '10px' }}>
                <div className='report-information'>
                    <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px', display: 'block', fontWeight: '600' }}>
                        Đối tượng báo cáo:
                    </label>
                    <textarea
                        className='input-read-only'
                        value={getDisplayName()}
                        readOnly
                        style={{ width: '100%', minHeight: '60px', resize: 'none' }}
                    />
                </div>

                <div className='report-information'>
                    <div className='form-group'>
                        <MovingLabelInput
                            type={'text'}
                            value={title}
                            onValueChange={setTitle}
                            label={'Tiêu đề'}
                            labelStyle={'left moving'}
                            disable={isViewMode}
                        />
                    </div>
                    <div className='form-group'>
                        <StyleLabelSelect
                            id={`select-category`}
                            list={reportCategories}
                            value={category}
                            onValueChange={setCategory}
                            label={'Phân loại'}
                            labelStyle={'left'}
                            disable={isViewMode}
                        />
                    </div>
                </div>

                {/* {(!isViewMode || imageUrl) && (
                    <div className='upload-image' style={{ marginTop: '15px' }}>
                        {!isViewMode && (
                            <div className='file-input' style={{ marginBottom: '10px' }}>
                                <label htmlFor="modal-file-upload" className='ins-btn ins-btn-secondary btn-sm'>
                                    <i className="fa-solid fa-image"></i> {imageUrl ? 'Thay đổi ảnh' : 'Thêm ảnh minh họa'}
                                </label>
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    accept='image/*'
                                    onChange={handleUpload}
                                    style={{ display: 'none' }}
                                    id="modal-file-upload"
                                    disabled={loading}
                                />
                                {loading && <i className="fa-solid fa-spinner fa-spin" style={{ marginLeft: '10px' }}></i>}
                            </div>
                        )}
                        {imageUrl && (
                            <div className='image' style={{ textAlign: 'center', position: 'relative' }}>
                                <img src={imageUrl} alt='Report' style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                {!isViewMode && (
                                    <button
                                        style={{ position: 'absolute', top: '-10px', right: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', width: '25px', height: '25px' }}
                                        onClick={() => setImageUrl(null)}
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )} */}

                <div className='content-area' style={{ marginTop: '20px' }}>
                    <AutoResizeTextarea
                        refer={refContent}
                        placeholder={'Nội dung yêu cầu chi tiết...'}
                        disable={isViewMode}
                        propContent={content}
                        setContent={setContent}
                    />
                </div>
            </div>
        </Modal>
    );
}