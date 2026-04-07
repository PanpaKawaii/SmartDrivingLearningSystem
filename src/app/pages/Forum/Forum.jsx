import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import PopupContainer from '../../components/PopupContainer/PopupContainer';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ForumCard from './ForumCard';
import ForumComment from './ForumComment';
import ForumCreatePost from './ForumCreatePost';

import './Forum.css';

export default function Forum() {
    const { user } = useAuth();

    const [FORUMPOSTs, setFORUMPOSTs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPost, setSelectedPost] = useState(null);
    const [openCreatePost, setOpenCreatePost] = useState(false);

    const [selectedType, setSelectedType] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const forumPostQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const forumTopicQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const postReactQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ForumPostResponse = await fetchData(`ForumPosts?${forumPostQuery.toString()}`, token);
                const ForumTopicResponse = await fetchData(`ForumTopics?${forumTopicQuery.toString()}`, token);
                const PostReactResponse = await fetchData(`PostReacts?${postReactQuery.toString()}`, token);
                console.log('ForumPostResponse', ForumPostResponse);
                console.log('ForumTopicResponse', ForumTopicResponse);
                console.log('PostReactResponse', PostReactResponse);
                const ForumPostItems = ForumPostResponse?.items;
                const ForumTopicItems = ForumTopicResponse?.items;
                const PostReactItems = PostReactResponse?.items;

                const ForumPost = ForumPostItems.map(fp => ({
                    ...fp,
                    forumTopic: ForumTopicItems.find(ft => ft.id == fp.forumTopicId) || null,
                    postReacts: PostReactItems.filter(pr => pr.forumPostId == fp.id),
                }));

                setFORUMPOSTs(ForumPost);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='forum-container'>
            <StarsBackground />
            <div className='left'></div>
            <div className='center'>
                <div className='list-forum-card'>
                    <div className='control-header'>
                        <div className='create-post'>
                            <div className='image'>
                                <img src={user?.image || DefaultAvatar} alt={user?.email} />
                            </div>
                            <button className='btn' onClick={() => setOpenCreatePost(true)} disabled={!user}>
                                Tạo bài viết mới
                            </button>
                        </div>
                        <div className='filters'>
                            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='likes'>Đã thích</option>
                                <option value='mine'>Của tôi</option>
                            </select>
                            <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='giao-thong'>Giao thông</option>
                                <option value='luat-lai-xe'>Luật lái xe</option>
                                <option value='kinh-nghiem-lai-xe'>Kinh nghiệm lái xe</option>
                            </select>
                        </div>
                    </div>
                    {FORUMPOSTs.map((post, i) => (
                        <React.Fragment key={i}>
                            <ForumCard post={post} setSelectedPost={setSelectedPost} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className='right'></div>

            {openCreatePost && user && (
                <PopupContainer onClose={() => setOpenCreatePost(false)} titleName={'Tạo bài viết'} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCreatePost onClose={() => setOpenCreatePost(false)} />
                </PopupContainer>
            )}

            {selectedPost && (
                <PopupContainer onClose={() => setSelectedPost(null)} titleName={`Bài viết của ${selectedPost?.user?.name}`} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCard post={selectedPost} setSelectedPost={setSelectedPost} showReportButton={false} />
                    <ForumComment post={selectedPost} setSelectedPost={setSelectedPost} />
                </PopupContainer>
            )}
        </div>
    )
}
