import { useState } from 'react';
import Modal from '../../../components/Shared/Modal';
import '../InstructorPages.css';
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";

const chapterOptions = [
    { id: 1, name: 'Luật giao thông' },
    { id: 2, name: 'Kỹ thuật lái xe' },
    { id: 3, name: 'Biển báo' },
    { id: 4, name: 'Tình huống' },
    { id: 5, name: 'Cấu tạo và sửa chữa' },
    { id: 6, name: 'Đạo đức người lái xe' },
];

const typeOptions = ['Lý thuyết', 'Thực hành', 'Mô phỏng'];

export default function AddLessonModal({ isOpen, onClose, onSave }) {
    const [lesson, setLesson] = useState({
        name: '',
        chapter: '',
        type: 'Lý thuyết',
        description: '',
        content: '',
        duration: '',
        status: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!lesson.name.trim()) return;
        if (onSave) onSave(lesson);
        setLesson({ name: '', chapter: '', type: 'Lý thuyết', description: '', content: '', duration: '', status: 1 });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Thêm bài học mới'
            wide
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit}>
                        <i className='fa-solid fa-save'></i> Lưu bài học
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Chương <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                    <select className='ins-form-select' name='chapter' value={lesson.chapter} onChange={handleChange}>
                        <option value=''>Chọn chương...</option>
                        {chapterOptions.map((ch) => (
                            <option key={ch.id} value={ch.id}>{ch.name}</option>
                        ))}
                    </select>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Trạng thái</label>
                    <select className='ins-form-select' name='status' value={lesson.status} onChange={handleChange}>
                        <option value={1}>Hoạt động</option>
                        <option value={0}>Nháp</option>
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
                <RichTextEditor
                    key={`${lesson.id || "new"}`}
                    className='ins-form-textarea'
                    name='content'
                    value={lesson.content}
                    onChange={handleChange}
                    placeholder='Bắt đầu soạn thảo nội dung bài học tại đây...'
                    style={{ minHeight: '180px' }}
                ></RichTextEditor>
            </div>
        </Modal>
    );
}
