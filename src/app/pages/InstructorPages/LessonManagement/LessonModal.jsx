
import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import '../InstructorPages.css';
import RichTextEditor from "../../../components/RichTextEditor/Lexical/RichTextEditor";
import { uploadMedia, deleteMedia } from '../../../../mocks/CallingAPI';
import TinyMCEEditor from '../../../components/RichTextEditor/TinyMCE/TinyMCEEditor';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

export default function LessonModal({
    isOpen,
    onClose,
    onSave,
    listLicenses,
    lesson: lessonProp,
    action,
    listChapters
}) {
    const { user } = useAuth?.() || {};
    // Giá trị mặc định cho lesson mới
    const defaultLesson = {
        name: '',
        chapter: '',
        type: 'Lý thuyết',
        description: '',
        content: '',
        index: 0,
        status: 0 
    };

    const [lesson, setLesson] = useState(lessonProp ? { ...lessonProp } : defaultLesson);
    const [chapters, setChapters] = useState([]);
    const [drivingLicenseId, setDrivingLicenseId] = useState('');
    const [editorInitialHtml, setEditorInitialHtml] = useState(lessonProp?.content || "");
    const token = user?.token || "";
    const hasPersistedLessonId = Boolean(lesson?.id && String(lesson.id).trim());

    // Đồng bộ initialHtml khi lessonProp thay đổi
    useEffect(() => {
        setEditorInitialHtml(lessonProp?.content || "");
    }, [lessonProp]);
    useEffect(() => {
        if (isOpen) {
            if (lessonProp && action === 'edit') {
                const licenseId = lessonProp.questionChapter?.drivingLicenseId || '';
                setDrivingLicenseId(licenseId);
                const filteredChapters = listChapters.filter(ch => ch.drivingLicenseId === licenseId);
                setChapters(filteredChapters);
                const currentChapter = filteredChapters.find(ch => ch.id === lessonProp.questionChapterId);
                setLesson({
                    ...lessonProp,
                    chapter: currentChapter ? currentChapter.id : (filteredChapters[0]?.id || '')
                });
            } else if (action === 'add') {
                setLesson(defaultLesson);
                setDrivingLicenseId('');
                setChapters([]);
            }
        }
    }, [isOpen, lessonProp, action, listChapters]);
    console.log('Current lesson in modal:', lesson.id);
    const handleLicenseChange = (e) => {
        const licenseId = e.target.value;
        setDrivingLicenseId(licenseId);
        const filteredChapters = listChapters.filter(ch => ch.drivingLicenseId === licenseId);
        setChapters(filteredChapters);
        setLesson(prev => ({ ...prev, chapter: '' }));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson((prev) => ({ ...prev, [name]: value }));
    };

    const handleRichTextChange = (html) => {
        setLesson((prev) => ({ ...prev, content: typeof html === "string" ? html : "" }));
    };

    const handleSubmit = () => {
        if (!lesson.name.trim()) return;
        if (!lesson.chapter) return;
        if (!lesson.description.trim()) return;
        if (onSave) onSave(lesson);
        setLesson(defaultLesson);
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === 'edit' ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
            wide
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit}>
                        <i className='fa-solid fa-save'></i> {action === 'edit' ? 'Cập nhật' : 'Lưu bài học'}
                    </button>
                </>
            }
        >
            <div className='ins-form-group'>
                <label className='ins-form-label'>Tên bài học <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <input
                    className='ins-form-input'
                    type='text'
                    name='name'
                    value={lesson.name}
                    onChange={handleChange}
                    placeholder='Nhập tên bài học...'
                    maxLength={255}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '16px' }}>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Bằng <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <select className='ins-form-select' name='drivingLicenseId' value={drivingLicenseId} onChange={handleLicenseChange}>
                        <option value='' disabled>Chọn bằng...</option>
                        {listLicenses.map((ch) => (
                            <option key={ch.id} value={ch.id}>{ch.name}</option>
                        ))}
                    </select>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Chương <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <select className='ins-form-select' name='chapter' value={lesson.chapter} onChange={handleChange}>
                        <option value='' disabled>Chọn chương...</option>
                        {chapters.map((ch) => (
                            <option key={ch.id} value={ch.id}>{ch.name}</option>
                        ))}
                    </select>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Trạng thái</label>
                    <select className='ins-form-select' name='status' value={lesson.status} onChange={handleChange}>
                        <option value={0}>Nháp</option>
                        <option value={1}>Hoạt động</option>
                    </select>
                </div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={lesson.description}
                    onChange={handleChange}
                    placeholder='Nhập mô tả ngắn cho bài học...'
                    maxLength={255}
                    style={{ minHeight: '80px' }}
                ></textarea>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Nội dung bài học</label>
                {!hasPersistedLessonId && (
                    <div style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>
                        Lưu bài học trước để bật chức năng upload, kéo-thả, dán ảnh.
                    </div>
                )}
                <TinyMCEEditor
                    value={lesson.content}
                    onChange={content => setLesson(prev => ({ ...prev, content }))}
                    placeholder= 'Nhập nội dung bài học tại đây...'
                    action={action}
                    entityId={lesson.id}
                    imageTarget= 'LessonImage'
                />
                {/* <RichTextEditor
                    key={`${action}-${lesson.id || "new"}`}
                    className='ins-form-textarea'
                    initialHtml={editorInitialHtml}
                    onHtmlChange={handleRichTextChange}
                    placeholder='Bắt đầu soạn thảo nội dung bài học tại đây...'
                    style={{ minHeight: '180px' }}
                    enableImage={hasPersistedLessonId}
                    imageFeatures={{
                        upload: hasPersistedLessonId,
                        url: true,
                        dragDrop: hasPersistedLessonId,
                        paste: hasPersistedLessonId,
                    }}
                    imageUploadConfig={hasPersistedLessonId ? {
                        entityId:  (lesson.id),
                        imageTarget: "LessonImage",
                        uploadHandler: async ({ files, entityId, imageTarget }) => {
                            return uploadMedia(files, entityId, imageTarget, token);
                        },
                    } : {}}
                /> */}
            </div>
        </Modal>
    );
}

