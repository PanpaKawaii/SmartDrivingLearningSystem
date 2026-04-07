import { useEffect, useRef, useState } from 'react';
import { deleteData, fetchData, postData } from '../../../mocks/CallingAPI.js';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import AutoResizeTextarea from '../../components/AutoResizeTextarea/AutoResizeTextarea.jsx';
import TrafficLight from '../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import ButtonList from '../../components/ButtonList/ButtonList.jsx';
import PopupContainer from '../../components/PopupContainer/PopupContainer.jsx';
import ReportModal from '../../components/ReportModal/ReportModal.jsx';

import './ForumComment.css';

export default function ForumComment({
    post = {},
    setRefreshParent = () => { },
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

    const [openReport, setOpenReport] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const forumCommentQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    forumPostId: post?.id,
                    status: 1,
                });
                const ForumCommentResponse = await fetchData(`ForumComments?${forumCommentQuery.toString()}`, token);
                console.log('ForumCommentResponse', ForumCommentResponse);
                const ForumCommentItems = ForumCommentResponse?.items;

                const ForumComment = ForumCommentItems.map(fp => ({
                    ...fp,
                })).sort((a, b) => new Date(a.updateAt) - new Date(b.updateAt));

                setCOMMENTs(ForumComment);
            } catch (error) {
                console.error('Error', error);
                setError('Error');
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    const SubmitComment = async (Content, ReplyId) => {
        const CommentData = {
            content: Content,
            replyId: ReplyId,
            forumPostId: post?.id,
        };
        console.log('CommentData:', CommentData);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await postData('ForumComments', CommentData, token);
            console.log('result', result);

            setRefresh(p => p + 1);
            setRefreshParent(p => p + 1);
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

    const TakeDownComment = async (CommentId) => {
        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await deleteData(`ForumComments/${CommentId}`, token);
            console.log('result', result);

            setRefresh(p => p + 1);
            setRefreshParent(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            // setLoading(false);
        };
    };

    const handleSetReplyParent = async (CommentId) => {
        await setInputComment(p => p == CommentId ? null : CommentId);
        refReply.current?.focus();
    };

    const handleSubmitComment = (refReplyContent, replyInputComment) => {
        const Content = refReplyContent;
        const ReplyId = replyInputComment;
        console.log({
            Content,
            ReplyId,
        });
        if (!Content) return;
        SubmitComment(Content, ReplyId);
        setInputComment(null);
        refComment.current.value = '';
        refComment.current.style.height = 'auto';
    };

    function getChildrenComment(Id, num) {
        const ChildrenComment = COMMENTs.filter(comment => comment.replyId == Id);
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
                                    <div className={`vertical-line ${(COMMENTs.filter(c => c.replyId == comment.id)?.length != 0 || comment.id == inputComment) ? 'line-img' : 'no-line'}`}></div>
                                </div>
                                <div className='comment-block'>
                                    <div className={`name-comment ${(user?.id && comment.userId == user?.id) ? 'my-comment' : ''}`}>
                                        <div className='name-btn-list'>
                                            <div className='name'>{comment.user?.name}</div>
                                            {/* ==FIX== */}
                                            {comment.userId != user?.id &&
                                                <ButtonList
                                                    list={[
                                                        {
                                                            name: 'report',
                                                            onToggle: () => setOpenReport({
                                                                header: 'Báo cáo bình luận',
                                                                simulationId: null,
                                                                forumPostId: null,
                                                                forumCommentId: comment.id,
                                                                questionId: null,
                                                            }),
                                                        },
                                                        {
                                                            name: 'test',
                                                            onToggle: () => { },
                                                        }
                                                    ]}
                                                />
                                            }
                                        </div>
                                        <div className='commentcontent'>{comment.content}</div>
                                    </div>
                                    <div className='commentdate-btn'>
                                        <div className='vote-icon'>
                                            <div className='vote-number'>{comment.commentVotes?.length >= 1000 ? '999+' : comment.commentVotes?.length?.toLocaleString() || 0}</div>
                                            {/* ==FIX== */}
                                            <button className='vote-btn' onClick={() => { alert('Voted!') }} disabled={!user}>
                                                <i className={`fa-${comment.commentVotes?.some(c => c.userId == user?.id) ? 'solid' : 'regular'} fa-circle-up`} />
                                            </button>
                                        </div>
                                        <div className='commentdate'>{comment.createAt?.split('T')?.[0]}</div>
                                        <button className='btn' onClick={() => handleSetReplyParent(comment.id)}>{comment.id == inputComment ? 'Hủy' : 'Trả lời'}</button>
                                        {user?.id && comment.userId == user?.id && <button className='btn btn-takedown' onClick={() => TakeDownComment(comment.id)}>Gỡ</button>}
                                    </div>
                                </div>
                            </div>
                            {comment.id == inputComment &&
                                <div className='questions'>
                                    <div className='head-block'>
                                        <div className={`vertical-line ${COMMENTs.filter(c => c.replyId == comment.id)?.length == 0 ? 'no-line' : 'line-full'}`}></div>
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

    // if (loading) return <div><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    // if (error) return <div><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='forum-comment-container'>
            <div className='forum-content'>
                {getChildrenComment(null, 0)}
            </div>

            <div className='content input-comment'>
                <div className='image head-block'>
                    <img src={user?.image || DefaultAvatar} alt={user?.email} />
                </div>
                <div className='comment-area'>
                    <AutoResizeTextarea refer={refComment} placeholder={user ? 'Viết bình luận' : 'Vui lòng đăng nhập để bình luận...'} disable={!user} />
                    <button type='button' className='btn' onClick={() => handleSubmitComment(refComment.current.value, null)}>
                        ĐĂNG
                    </button>
                </div>
            </div>

            {openReport &&
                <PopupContainer onClose={() => setOpenReport(null)} titleName={`Báo cáo bình luận`} modalStyle={{}} innerStyle={{ width: 600, scrollbarWidth: 'none' }}>
                    <ReportModal data={openReport} />
                </PopupContainer>
            }
        </div>
    )
}
