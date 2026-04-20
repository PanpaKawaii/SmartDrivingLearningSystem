import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import TinyMCEEditor from '../../../components/RichTextEditor/TinyMCE/TinyMCEEditor';
import { postData, putData, fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const defaultPost = {
    forumTopicId: '',
    title: '',
    content: '',
};

export default function PostModal({ isOpen, onClose, onSave, post: postProp, action }) {
    const { user, refreshNewToken } = useAuth?.() || {};
    const token = user?.token || '';

    const [post, setPost] = useState({ ...defaultPost });
    const [topics, setTopics] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchData('ForumTopics/all', token);
                const items = Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : []);
                setTopics(items.filter(t => t.status === 1));
            } catch (e) {
                setError('Lỗi tải danh sách chủ đề.');
            }
        })();
    }, [token]);

    useEffect(() => {
        if (!isOpen) return;
        setError('');
        if (action === 'edit' && postProp) {
            setPost({
                forumTopicId: postProp.forumTopicId || '',
                title: postProp.title || '',
                content: postProp.content || '',
            });
        } else {
            setPost({ ...defaultPost });
        }
    }, [isOpen, action, postProp]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content) => {
        setPost(prev => ({ ...prev, content }));
    };

    const handleSubmit = async () => {
        if (!post.title.trim()) { setError('Tiêu đề không được để trống.'); return; }
        if (!post.forumTopicId) { setError('Vui lòng chọn chủ đề.'); return; }
        if (!post.content.trim()) { setError('Nội dung không được để trống.'); return; }
        setSaving(true);
        setError('');
        try {
            let payload = {
                forumTopicId: post.forumTopicId,
                title: post.title.trim(),
                content: post.content,
            };
            let res;
            if (action === 'edit' && postProp?.id) {
                res = await putData(`ForumPosts/${postProp.id}`, payload, token);
                onSave && onSave(res || { ...postProp, ...payload }, 'edit');
            } else {
                payload = { ...payload, status: 4 };
                res = await postData('ForumPosts/instructor', payload, token);
                onSave && onSave(res, 'create');
            }
            onClose();
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                setError(error?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === 'edit' ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={saving}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={saving}>
                        <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {action === 'edit' ? ' Cập nhật' : ' Đăng bài'}
                    </button>
                </>
            }
        >
            {error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Chủ đề <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <select
                    className='ins-form-select'
                    name='forumTopicId'
                    value={post.forumTopicId}
                    onChange={handleChange}
                    disabled={saving}
                >
                    <option value='' disabled>Chọn chủ đề...</option>
                    {topics.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>
            <div className='ins-form-group'>
                <label className='ins-form-label'>Tiêu đề <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <input
                    className='ins-form-input'
                    name='title'
                    value={post.title}
                    onChange={handleChange}
                    disabled={saving}
                    placeholder='Nhập tiêu đề bài viết'
                />
            </div>
            <div className='ins-form-group'>
                <label className='ins-form-label'>Nội dung <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <TinyMCEEditor
                    value={post.content}
                    onChange={handleContentChange}
                    useImage={true}
                    placeholder='Nhập nội dung bài viết...'
                    action={action}
                    entityId={postProp?.id}
                    imageTarget='ForumPostImage'
                />
            </div>
        </Modal>
    );
}
