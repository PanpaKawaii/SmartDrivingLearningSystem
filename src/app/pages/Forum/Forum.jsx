import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import PopupContainer from '../../components/PopupContainer/PopupContainer';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ForumCard from './ForumCard';
import ForumComment from './ForumComment';
import ForumCreatePost from './ForumCreatePost';

import './Forum.css';

export default function Forum() {
    const { user } = useAuth();

    const [FORUMPOSTs, setFORUMPOSTs] = useState([]);
    const [FORUMTOPICs, setFORUMTOPICs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [openCreatePost, setOpenCreatePost] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedTopicId, setSelectedTopicId] = useState('');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const forumPostQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                });
                const forumTopicQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const postReactQuery = new URLSearchParams({
                    status: 1,
                });
                const ForumPostResponse = await fetchData(`ForumPosts?${forumPostQuery.toString()}`, token);
                const ForumTopicResponse = await fetchData(`ForumTopics?${forumTopicQuery.toString()}`, token);
                const PostReactResponse = await fetchData(`PostReacts/all?${postReactQuery.toString()}`, token);
                console.log('ForumPostResponse', ForumPostResponse);
                console.log('ForumTopicResponse', ForumTopicResponse);
                console.log('PostReactResponse', PostReactResponse);
                const ForumPostItems = ForumPostResponse?.items;
                const ForumTopicItems = ForumTopicResponse?.items;

                const ForumPosts = ForumPostItems.map(fp => ({
                    ...fp,
                    forumTopic: ForumTopicItems.find(ft => ft.id == fp.forumTopicId) || null,
                    postReacts: PostReactResponse.filter(pr => pr.forumPostId == fp.id),
                }));

                setFORUMPOSTs(ForumPosts);
                setFORUMTOPICs(ForumTopicItems);
            } catch (error) {
                console.error('Error', error);
                setError(error);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    const filteredFORUMPOSTs = FORUMPOSTs.filter(fp => {
        let matchStatus = false;
        if (selectedStatus == '') matchStatus = fp.status == '1';
        else if (selectedStatus == '1') matchStatus = fp.userId == user?.id && fp.status == '1';
        else if (selectedStatus == '-2') matchStatus = fp.postReacts?.some(r => r.userId == user?.id) && fp.status == '1';
        else matchStatus = selectedStatus == fp.status;

        const matchTopic = !selectedTopicId || fp.forumTopicId == selectedTopicId;

        return matchStatus && matchTopic;
    }).sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt));
    console.log('filteredFORUMPOSTs', filteredFORUMPOSTs);
    const selectedPost = filteredFORUMPOSTs.find(f => f.id == selectedPostId);
    console.log('selectedPost', selectedPost);

    return (
        <div className='forum-container'>
            <StarsBackground />
            <div className='left'></div>
            <div className='center'>
                <div className='list-forum-card'>
                    <div className='control-heading'>
                        <div className='create-post'>
                            <div className='image'>
                                <img src={user?.image || DefaultAvatar} alt={user?.email} />
                            </div>
                            <button className='btn' onClick={() => setOpenCreatePost(true)} disabled={!user}>
                                Tạo bài viết
                            </button>
                        </div>
                        <div className='result'>
                            {filteredFORUMPOSTs?.length}
                        </div>
                        <div className='filters'>
                            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='-2'>Đã thích</option>
                                <option value='1'>Của tôi</option>
                                <option value='2'>Bị gỡ</option>
                                <option value='3'>Bị từ chối</option>
                                <option value='-1'>Đang duyệt</option>
                            </select>
                            <select value={selectedTopicId} onChange={(e) => setSelectedTopicId(e.target.value)}>
                                <option value=''>Tất cả</option>
                                {FORUMTOPICs?.map((topic, index) => (
                                    <option key={index} value={topic.id}>{topic.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filteredFORUMPOSTs.map((post, i) => (
                        <React.Fragment key={i}>
                            <ForumCard post={post} setSelectedPostId={setSelectedPostId} setRefresh={setRefresh} parentLoading={loading} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className='right'></div>

            {openCreatePost && user && (
                <PopupContainer onClose={() => setOpenCreatePost(false)} titleName={'Tạo bài viết'} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCreatePost onClose={() => setOpenCreatePost(false)} setRefreshParent={setRefresh} />
                </PopupContainer>
            )}

            {selectedPost && (
                <PopupContainer onClose={() => setSelectedPostId('')} titleName={`Bài viết của ${selectedPost?.user?.name}`} modalStyle={{}} innerStyle={{ width: 700 }}>
                    <ForumCard post={selectedPost} setSelectedPostId={setSelectedPostId} setRefresh={setRefresh} parentLoading={loading} />
                    <ForumComment post={selectedPost} setRefreshParent={setRefresh} />
                </PopupContainer>
            )}
        </div>
    )
}
