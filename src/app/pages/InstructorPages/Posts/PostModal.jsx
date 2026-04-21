import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { postData, putData, fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

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
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchData('ForumTopics/all', token);
                const items = Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : []);
                setTopics(items.filter(t => t.status === 1));
            } catch {
                setError('Lỗi tải danh sách chủ đề.');
            }
        })();
    }, [token]);

    useEffect(() => {
        if (!isOpen) return;
        setError('');
        setImageFile(null);

        const existingImageUrl = postProp?.postImages?.[0]?.imageUrl || postProp?.postImages?.[0]?.url || '';
        if (action === 'edit' && postProp) {
            setPost({
                forumTopicId: postProp.forumTopicId || '',
                title: postProp.title || '',
                content: postProp.content || '',
            });
            setImageUrl(existingImageUrl);
            setImagePreview(existingImageUrl);
        } else {
            setPost({ ...defaultPost });
            setImageUrl('');
            setImagePreview('');
        }
    }, [isOpen, action, postProp]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);

        if (!file) {
            setImagePreview(imageUrl.trim());
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result || '');
        };
        reader.readAsDataURL(file);
    };

    const resolvePostId = (responsePayload) => {
        if (responsePayload?.id) return responsePayload.id;
        if (responsePayload?.data?.id) return responsePayload.data.id;
        if (responsePayload?.item?.id) return responsePayload.item.id;
        return postProp?.id || '';
    };

    const getFileFromImageUrl = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Không thể tải ảnh từ URL đã nhập.');
        }

        const blob = await response.blob();
        if (!blob.type?.startsWith('image/')) {
            throw new Error('URL không phải là ảnh hợp lệ.');
        }

        const ext = blob.type.split('/')[1] || 'jpg';
        return new File([blob], `forum-post-image-${Date.now()}.${ext}`, { type: blob.type });
    };

    const uploadPostImage = async (forumPostId, name, file) => {
        if (!forumPostId || !file) return;

        const formData = new FormData();
        formData.append('ForumPostId', forumPostId);
        formData.append('Name', name || 'Post image');
        formData.append('File', file);

        const response = await fetch(`${apiUrl}PostImages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Upload ảnh bài viết thất bại.');
        }

        if (response.status === 204) return null;

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return null;
        }

        return response.json();
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
            } else {
                payload = { ...payload, status: 4 };
                res = await postData('ForumPosts/manager', payload, token);
            }

            const postId = resolvePostId(res);
            const trimmedImageUrl = imageUrl.trim();
            const fileToUpload = imageFile || (trimmedImageUrl ? await getFileFromImageUrl(trimmedImageUrl) : null);

            if (fileToUpload && postId) {
                await uploadPostImage(postId, post.title.trim(), fileToUpload);
            }

            onSave && onSave(res || { ...postProp, ...payload }, action === 'edit' ? 'edit' : 'create');
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
            message={error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}
        >
            
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
                <textarea
                    className='ins-form-textarea'
                    name='content'
                    value={post.content}
                    onChange={handleChange}
                    disabled={saving}
                    rows={8}
                    placeholder='Nhập nội dung bài viết...'
                />
            </div>
            <div className='ins-form-group'>
                <label className='ins-form-label'>Ảnh bài viết (URL hoặc upload)</label>
                <input
                    className='ins-form-input'
                    value={imageUrl}
                    onChange={(e) => {
                        const nextValue = e.target.value;
                        setImageUrl(nextValue);
                        if (!imageFile) {
                            setImagePreview(nextValue.trim());
                        }
                    }}
                    disabled={saving}
                    placeholder='Dán URL ảnh (tùy chọn)'
                />
                <input
                    style={{ marginTop: 10 }}
                    type='file'
                    accept='image/*'
                    onChange={handleImageFileChange}
                    disabled={saving}
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt='Post preview'
                        style={{
                            marginTop: 12,
                            maxWidth: '100%',
                            maxHeight: 220,
                            borderRadius: 8,
                            border: '1px solid rgba(95, 117, 165, 0.2)',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </div>
        </Modal>
    );
}
