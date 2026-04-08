import { useEffect, useRef, useState } from 'react';
import { fetchData, postData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import AutoResizeTextarea from '../../components/AutoResizeTextarea/AutoResizeTextarea';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './ForumCreatePost.css';

export default function ForumCreatePost({
    onClose = () => { },
    setRefreshParent = () => { },
}) {
    const { user } = useAuth();

    const refComment = useRef(null);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [FORUMTOPICs, setFORUMTOPICs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setTopic('');
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const forumTopicQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ForumTopicResponse = await fetchData(`ForumTopics?${forumTopicQuery.toString()}`, token);
                console.log('ForumTopicResponse', ForumTopicResponse);
                const ForumTopicItems = ForumTopicResponse?.items;
                const ForumTopic = ForumTopicItems.map(ft => ({
                    ...ft,
                }));

                setFORUMTOPICs(ForumTopic);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    const CreatePost = async (Content) => {
        const PostData = {
            forumTopicId: topic,
            name: name,
            title: title,
            content: Content,
        };
        console.log('PostData:', PostData);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await postData('ForumPosts', PostData, token);
            console.log('result', result);

            setRefreshParent(p => p + 1);
            onClose();
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const handleSubmitComment = (refReplyContent) => {
        const Content = refReplyContent;
        console.log({
            Content,
            topic,
        });
        if (!Content || !topic) return;
        CreatePost(Content);
    };

    return (
        <div className='forum-create-post-container'>
            <div className='user-information'>
                <div className='image'>
                    <img src={user?.image || DefaultAvatar} alt={user?.email} />
                </div>
                <div className='name'>{user?.name || user?.email}</div>
            </div>
            <div className='post-information'>
                {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Tên bài viết' /> */}
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Tiêu đề bài viết' />
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option value='' disabled>Chọn chủ đề</option>
                    {FORUMTOPICs?.map((topic, index) => (
                        <option key={index} value={topic.id}>{topic.name}</option>
                    ))}
                </select>
                <button className='btn' onClick={() => setRefresh(p => p + 1)}>Refresh</button>
            </div>
            <form className='comment-area'>
                <AutoResizeTextarea refer={refComment} placeholder={user ? 'Viết bình luận' : 'Vui lòng đăng nhập để bình luận...'} disable={!user} />
                <button type='button' className='btn' onClick={() => handleSubmitComment(refComment.current.value)} disabled={loading}>
                    ĐĂNG
                </button>
            </form>
        </div>
    )
}
