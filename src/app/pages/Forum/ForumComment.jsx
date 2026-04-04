import { useEffect, useRef, useState } from 'react';
import { deleteData, fetchData, postData } from '../../../mocks/CallingAPI.js';
import { comments } from '../../../mocks/DataSample.js';
import AutoResizeTextarea from '../../components/AutoResizeTextarea.jsx';
import TrafficLight from '../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';

import './ForumComment.css';

export default function ForumComment({
    post = {},
}) {
    const { user } = useAuth();

    const refReply = useRef(null);
    const refComment = useRef(null);

    console.log('post', post);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const [COMMENTs, setCOMMENTs] = useState([]);
    const [inputComment, setInputComment] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const DefaultAvatar = 'https://static.vecteezy.com/system/resources/previews/048/044/477/non_2x/pixel-art-traffic-light-game-asset-design-vector.jpg';

    // ==FIX==
    // useEffect(() => {
    //     (async () => {
    //         setError(null);
    //         setLoading(true);
    //         const token = user?.token || '';
    //         try {
    //             console.log('loading');
    //             if (!user?.id || !token || !post?.id) return;
    //             console.log('access');
    //             const listuser = await fetchData('listuser', token);
    //             const commentData = await fetchData(`api/comment/question/${post?.id}`, token);
    //             console.log('commentData', commentData);

    //             // ==FIX==
    //             const mergedListComment = commentData.map(comment => {
    //                 const matchedUser = listuser.find(user => user.id == comment.userId);
    //                 return {
    //                     ...comment,
    //                     user: matchedUser
    //                 };
    //             });

    //             // setCOMMENTs(mergedListComment.sort((a, b) => new Date(a.commentDate) - new Date(b.commentDate)));
    //         } catch (error) {
    //             console.error('Error', error);
    //             setError(error);
    //         } finally {
    //             setLoading(false);
    //         };
    //     })();
    // }, [refresh, user?.token]);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const forumCommentQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                });
                const ForumCommentResponse = await fetchData(`ForumComments?${forumCommentQuery.toString()}`, token);
                console.log('ForumCommentResponse', ForumCommentResponse);
                const ForumCommentItems = ForumCommentResponse?.items;

                const ForumComment = ForumCommentItems.filter(fc => fc.forumPostId == post?.id).map(fp => ({
                    ...fp,
                }));

                setCOMMENTs(ForumComment);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    // ==FIX==
    const SubmitComment = async (Content, Answer) => {
        const CommentData = {
            id: crypto.randomUUID(),
            content: Content,
            answer: Answer,
            questionId: post?.id,
            userId: user?.id,
            commentDate: new Date().toLocaleDateString()
        };
        console.log('CommentData:', CommentData);
        setCOMMENTs(prev => [...prev, CommentData]);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await postData('api/comment', CommentData, token);
            console.log('result', result);

            setRefresh(p => p + 1);
            await sleep(500);
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
            const el = document.getElementById(CommentData?.id);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
    };

    // ==FIX==
    const TakeDownComment = async (CommentId) => {
        setCOMMENTs(prev => prev.filter(comment => comment.id != CommentId));

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await deleteData(`api/comment/${CommentId}`, token);
            console.log('result', result);

            setRefresh(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const handleSetReplyParent = async (CommentId) => {
        await setInputComment(p => p == CommentId ? null : CommentId);
        refReply.current?.focus();
    };

    const handleSubmitComment = (refReplyContent, answerInputComment) => {
        const Content = refReplyContent;
        const Answer = answerInputComment;
        console.log({
            Content,
            Answer,
        });
        if (!Content) return;
        SubmitComment(Content, Answer);
        setInputComment(null);
        refComment.current.value = '';
        refComment.current.style.height = 'auto';
    };

    function getChildrenComment(Id, num) {
        const ChildrenComment = COMMENTs.filter(comment => comment.answer == Id);
        return (
            <>
                {ChildrenComment.map((comment, i) => (
                    <div key={i} id={`${comment.id}`} className='questions'>
                        {num <= 5 && num > 0 &&
                            <div className='head-block'>
                                <div className={`vertical-line ${i + 1 == ChildrenComment.length ? 'no-line' : 'line-full'}`}></div>
                                <div className='horizon-line'></div>
                            </div>
                        }
                        <div className='next-reply'>
                            <div key={i} className='content'>
                                <div className='image head-block'>
                                    <img src={comment.user?.image || DefaultAvatar} alt={comment.user?.email} />
                                    <div className={`vertical-line ${(COMMENTs.filter(c => c.answer == comment.id)?.length != 0 || comment.id == inputComment) ? 'line-img' : 'no-line'}`}></div>
                                </div>
                                <div>
                                    {/* ==FIX== */}
                                    <div className={`name-comment ${(user?.id && comment.userId == user?.id) ? 'my-comment' : ''}`}>
                                        <div className='name'>{comment.user?.name}</div>
                                        <div className='commentcontent'>{comment.content}</div>
                                        {/* <div>num:{num} - i:{i} - parent-child:{ChildrenComment.length} - {comment.content}</div> */}
                                    </div>
                                    <div className='commentdate-btn'>
                                        <div className='commentdate'>{comment.commentDate}</div>
                                        <button className='btn' onClick={() => handleSetReplyParent(comment.id)}>{comment.id == inputComment ? 'Hủy' : 'Trả lời'}</button>
                                        {/* ==FIX== */}
                                        {user?.id && comment.userId == user?.id && <button className='btn btn-takedown' onClick={() => TakeDownComment(comment.id)}>Gỡ</button>}
                                    </div>
                                </div>
                            </div>
                            {comment.id == inputComment &&
                                <div className='questions'>
                                    <div className='head-block'>
                                        <div className={`vertical-line ${COMMENTs.filter(c => c.answer == comment.id)?.length == 0 ? 'no-line' : 'line-full'}`}></div>
                                        <div className='horizon-line'></div>
                                    </div>
                                    <div className='next-reply'>
                                        <div className='content input-reply'>
                                            <div className='image head-block'>
                                                <img src={user?.image || DefaultAvatar} alt={user?.email} />
                                            </div>
                                            <form className='comment-area'>
                                                <AutoResizeTextarea refer={refReply} placeholder={user ? 'Viết phản hồi' : 'Vui lòng đăng nhập để phản hồi...'} disable={!user} />
                                                <button type='button' className='btn' onClick={() => handleSubmitComment(refReply.current.value, inputComment)}>
                                                    ĐĂNG
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div>
                                {getChildrenComment(comment.id, num + 1)}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    };

    if (loading) return <div><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='forum-comment-container'>
            <div className='forum-content'>
                {getChildrenComment(null, 0)}
            </div>

            <div className='content input-comment'>
                <div className='image head-block'>
                    <img src={user?.image || DefaultAvatar} alt={user?.email} />
                </div>
                <form className='comment-area'>
                    <AutoResizeTextarea refer={refComment} placeholder={user ? 'Viết bình luận' : 'Vui lòng đăng nhập để bình luận...'} disable={!user} />
                    <button type='button' className='btn' onClick={() => handleSubmitComment(refComment.current.value, null)}>
                        ĐĂNG
                    </button>
                </form>
            </div>
        </div>
    )
}
