import { useEffect, useRef, useState } from 'react';
import { fetchData, postData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import AutoResizeTextarea from '../../components/AutoResizeTextarea/AutoResizeTextarea';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './ForumCreatePost.css';

export default function ForumCreatePost({
    onClose = () => { },
    setRefreshParent = () => { },
}) {
    const { user, refreshNewToken } = useAuth();

    const refContent = useRef(null);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
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
                    status: 1,
                });
                const ForumTopicResponse = await fetchData(`ForumTopics/all?${forumTopicQuery.toString()}`, token);
                console.log('ForumTopicResponse', ForumTopicResponse);

                setFORUMTOPICs(ForumTopicResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
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
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const handleSubmitPost = (refContent) => {
        const Content = refContent;
        console.log({
            Content,
            topic,
        });
        if (!Content || !topic) return;
        CreatePost(Content);
    };

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
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
            <form className='content-area'>
                <AutoResizeTextarea
                    refer={refContent}
                    placeholder={user ? 'Nội dung bài viết' : 'Vui lòng đăng nhập để tạo bài viết...'}
                    disable={!user}
                    propContent={content}
                    setContent={setContent}
                />
                <button type='button' className='btn' onClick={() => handleSubmitPost(refContent.current.value)} disabled={loading || !title || !content || !topic}>
                    ĐĂNG
                </button>
            </form>
        </div>
    )
}
