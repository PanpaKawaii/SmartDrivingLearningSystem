import { useEffect, useRef, useState } from 'react';
import { deleteData, fetchData, postData } from '../../../mocks/CallingAPI.js';
import { comments } from '../../../mocks/DataSample.js';
import AutoResizeTextarea from '../../components/AutoResizeTextarea.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';

import './ForumPopup.css';

export default function ForumPopup({
    SelectedPost = { id: 1 }
}) {
    const { user } = useAuth();

    const refReply = useRef(null);
    const refComment = useRef(null);

    console.log('SelectedPost', SelectedPost);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const [COMMENTs, setCOMMENTs] = useState(comments || []);
    const [InputComment, setInputComment] = useState(null);
    const [YourText, setYourText] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

    useEffect(() => {
        const token = user?.token || '';
        (async () => {
            console.log('loading');
            if (!user?.id || !token || !SelectedPost?.id || loading) return;
            console.log('access');
            try {
                setLoading(true);
                const listuser = await fetchData('listuser', token);
                const commentData = await fetchData(`api/comment/question/${SelectedPost?.id}`, token);
                console.log('commentData', commentData);

                const mergedListComment = commentData.map(comment => {
                    const matchedUser = listuser.find(user => user.id == comment.userId);
                    return {
                        ...comment,
                        user: matchedUser
                    };
                });

                // setCOMMENTs(mergedListComment.sort((a, b) => new Date(a.commentDate) - new Date(b.commentDate)));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            };
        })();
    }, [user?.id, refresh]);

    const SubmitComment = async (Content, Answer) => {
        const CommentData = {
            id: crypto.randomUUID(),
            content: Content,
            answer: Answer,
            questionId: SelectedPost?.id,
            userId: user?.id,
            commentDate: new Date().toLocaleDateString()
        };
        console.log('CommentData:', CommentData);
        setCOMMENTs(prev => [...prev, CommentData]);

        const token = user?.token || '';
        try {
            const result = await postData('api/comment', CommentData, token);
            console.log('result', result);

            setRefresh(p => p + 1);

            await sleep(500);

            const el = document.getElementById(result?.id);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const TakeDownComment = async (CommentId) => {
        setCOMMENTs(prev => prev.filter(comment => comment.id != CommentId));

        const token = user?.token || '';
        try {
            // setLoading(true);
            const result = await deleteData(`api/comment/${CommentId}`, token);
            console.log('result', result);

            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const handleSetAnswer = async (CommentId) => {
        await setInputComment(p => CommentId == InputComment ? null : CommentId);
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

    const handleTakeDownComment = (CommentId) => {
        TakeDownComment(CommentId);
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
                                    <img src={comment.user?.image} alt={comment.user?.email} />
                                    <div className={`vertical-line ${(COMMENTs.filter(c => c.answer == comment.id)?.length != 0 || comment.id == InputComment) ? 'line-img' : 'no-line'}`}></div>
                                </div>
                                <div>
                                    {/* ==FIX== */}
                                    <div className={`name-comment ${(user?.id && comment.userId == user?.id) ? 'my-comment' : ''}`}>
                                        <div className='name'>{comment.user?.name}---CMT:{comment.id}</div>
                                        <div>{comment.content}</div>
                                        {/* <div>num:{num} - i:{i} - parent-child:{ChildrenComment.length} - {comment.content}</div> */}
                                    </div>
                                    <div className='commentdate-btn'>
                                        <div className='commentdate'>{comment.commentDate}</div>
                                        <button className='btn' onClick={() => handleSetAnswer(comment.id)}>{comment.id == InputComment ? 'Hủy' : 'Trả lời'}</button>
                                        {/* ==FIX== */}
                                        {user?.id && comment.userId == user?.id && <button className='btn btn-takedown' onClick={() => handleTakeDownComment(comment.id)}>Gỡ</button>}
                                    </div>
                                </div>
                            </div>
                            {comment.id == InputComment &&
                                <div className='questions'>
                                    <div className='head-block'>
                                        <div className={`vertical-line ${COMMENTs.filter(c => c.answer == comment.id)?.length == 0 ? 'no-line' : 'line-full'}`}></div>
                                        <div className='horizon-line'></div>
                                    </div>
                                    <div className='next-reply'>
                                        <div className='content input-reply'>
                                            <div className='image head-block'>
                                                <img src={user?.image} alt={user?.email} />
                                            </div>
                                            <form className='comment-area'>
                                                <AutoResizeTextarea refer={refReply} placeholder={user ? 'Viết phản hồi' : 'Vui lòng đăng nhập để phản hồi...'} disable={!user} />
                                                <button type='button' className='btn' onClick={() => handleSubmitComment(refReply.current.value, InputComment)}>
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

    return (
        <div className='forum-popup-container'>
            <div className='forum-content'>
                {getChildrenComment(null, 0)}
            </div>

            <div className='content input-comment'>
                <div className='image head-block'>
                    <img src={user?.image} alt={user?.email} />
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
