import { useState } from 'react';
import { deleteData, patchData, postData, putData } from '../../../mocks/CallingAPI';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import ButtonList from '../../components/ButtonList/ButtonList';
import PopupContainer from '../../components/PopupContainer/PopupContainer';
import ReportModal from '../../components/ReportModal/ReportModal';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './ForumCard.css';

export default function ForumCard({
    post = {},
    setSelectedPostId = () => { },
    setRefresh = () => { },
    parentLoading = false,
}) {
    const { user, refreshNewToken } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [openReport, setOpenReport] = useState(null);

    const TogglePostStatus = async (postId, action) => {
        setLoading(true);
        const token = user?.token || '';
        try {
            if (action == 'hidden') {
                await patchData(`ForumPosts/${postId}/toggle-status`, {}, token);
            } else if (action == 'delete') {
                await patchData(`ForumPosts/${postId}`, {}, token);
            }

            setRefresh(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const ReactThePost = async (newReactId, oldReactId, note) => {
        const ReactData = {
            forumPostId: post?.id,
            reactType: newReactId,
            status: 1,
        };
        console.log('ReactData:', ReactData);

        setLoading(true);
        const token = user?.token || '';
        try {
            if (note == 'new') {
                await postData('PostReacts', ReactData, token);
            } else if (note == 'update') {
                await putData(`PostReacts/${oldReactId}`, ReactData, token);
            } else if (note == 'delete') {
                await deleteData(`PostReacts/${oldReactId}`, token);
            }

            setRefresh(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const handleClickReact = (newReact, oldReact) => {
        console.log(newReact, oldReact);
        console.log(newReact?.id, oldReact?.reactType);
        if (oldReact == null) {
            console.log('new');
            ReactThePost(newReact?.id, oldReact?.id, 'new');
        } else if (newReact.force == true) {
            console.log('update');
            ReactThePost(newReact?.id, oldReact?.id, 'update');
        } else {
            console.log('delete');
            ReactThePost(newReact?.id, oldReact?.id, 'delete');
        }
        // setReaction(p => reaction.force ? reaction : (p != null ? null : reaction));
        setOpen(false);
    };

    const actions = [
        { id: 'Like', icon: 'fa-solid fa-thumbs-up', color: '#538DFF', background: 'linear-gradient(to bottom, #538DFF, #538DFF)', force: true, },
        { id: 'Love', icon: 'fa-solid fa-heart', color: '#F74C61', background: 'linear-gradient(to bottom, #F74C61, #F74C61)', force: true, },
        { id: 'Thankful', icon: 'fa-solid fa-circle', color: '#A58BE2', background: 'conic-gradient( #9271DC 0deg 15deg, #A58BE2 15deg 45deg, #9271DC 45deg 75deg, #A58BE2 75deg 105deg, #9271DC 105deg 135deg, #A58BE2 135deg 165deg, #9271DC 165deg 195deg, #A58BE2 195deg 225deg, #9271DC 225deg 255deg, #A58BE2 255deg 285deg, #9271DC 285deg 315deg, #A58BE2 315deg 345deg, #9271DC 345deg 360deg)', force: true, },
        { id: 'Pride', icon: 'fa-solid fa-square', color: '#ffffff', background: 'linear-gradient(to bottom, #E40303 0% 25%, #FF8C00 25% 37.5%, #FFED00 37.5% 50%, #008026 50% 62.5%, #24408E 62.5% 75%, #732982 75% 100%)', force: true, },
        { id: 'Care', icon: 'fa-solid fa-face-kiss-wink-heart', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Haha', icon: 'fa-solid fa-face-laugh-squint', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Wow', icon: 'fa-solid fa-face-surprise', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Sad', icon: 'fa-solid fa-face-frown', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Angry', icon: 'fa-solid fa-angry', color: '#FA8662', background: 'linear-gradient(to bottom, #F74D61, #FFDA61)', force: true, },
    ];

    // const pReacts = [
    //     { reactType: 'Love', },
    //     { reactType: 'Love', },
    //     { reactType: 'Haha', },
    //     { reactType: 'Angry', },
    //     { reactType: 'Love', },
    //     { reactType: 'LIKE', },
    //     { reactType: 'Love', },
    //     { reactType: 'Love', },
    //     { reactType: 'Love', },
    //     { reactType: 'Pride', },
    //     { reactType: 'Care', },
    // ];

    // B1: Đếm số lượng từng reactType
    const reactCountMap = (post.postReacts ?? []).reduce((acc, item) => {
        acc[item.reactType] = (acc[item.reactType] || 0) + 1;
        return acc;
    }, {});
    // B2: Lọc + merge với actions và giữ lại các thuộc tính của post.postReacts
    const postReacts = actions
        .filter(action => reactCountMap[action.id])
        .map(action => ({
            ...action,
            count: reactCountMap[action.id],
            // reactions: post.postReacts.filter(r => r.reactType == action.id)
        }))
        .sort((a, b) => b.count - a.count);

    // console.log('post.postReacts', post.postReacts);
    const myReaction = post.postReacts?.find(r => r.userId == user?.id) || null;
    // console.log('myReaction', myReaction);
    const myReactionIcon = myReaction ? { ...myReaction, action: actions.find(a => a.id == myReaction.reactType) } : null;
    // console.log('myReactionIcon', myReactionIcon);

    return (
        <div className={`forum-card-container ${post.userId == user?.id ? 'my-post' : ''}`}>
            <div className='user-information'>
                <div className='image-name'>
                    <div className='image'>
                        <img src={post.user?.image || DefaultAvatar} alt={post.user?.email} />
                    </div>
                    <div>
                        <div className='name'>{post?.user?.name}</div>
                        <div className='topic'>{post.forumTopic?.name}</div>
                    </div>
                </div>
                {user &&
                    <ButtonList
                        list={[
                            (
                                post.status == 1
                                && post.userId != user?.id
                            ) && {
                                name: 'report',
                                onToggle: () => setOpenReport({
                                    simulationId: null,
                                    forumPostId: post.id,
                                    forumCommentId: null,
                                    questionId: null,
                                }),
                                disabled: false,
                            },
                            (
                                (post.status == 1 || post.status == 4)
                                && post.userId == user?.id
                            ) && {
                                name: post.status == 4 ? 'unhidden' : 'hidden',
                                onToggle: () => TogglePostStatus(post.id, 'hidden'),
                                disabled: loading,
                            },
                            (
                                post.userId == user?.id
                            ) && {
                                name: 'delete',
                                onToggle: () => TogglePostStatus(post.id, 'delete'),
                                disabled: loading,
                            }
                        ].filter(Boolean)}
                    />
                }
            </div>
            <div className='content'>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className='list-post-images'>
                    {post.postImages?.map(pi => (
                        <img key={pi.id} src={pi.imageUrl || DefaultAvatar} alt={`Post ${post.id} Image ${pi.id}`} />
                    ))}
                </div>
            </div>
            <div className='reacts-comments'>
                {postReacts?.length !== 0 ?
                    <button className='react-count' onClick={() => setSelectedPostId(post.id)}>
                        {postReacts?.map((react, index) => (
                            <span
                                key={index}
                                style={{ zIndex: actions?.length - index }}
                            >
                                <i
                                    className={react.icon}
                                    style={{
                                        color: react.color,
                                        '--background': react.background
                                    }}
                                />
                            </span>
                        ))}
                        <span className='count'>{post.postReacts?.length?.toLocaleString() || 0}</span>
                    </button>
                    :
                    <button className='react-zero' onClick={() => setSelectedPostId(post.id)}>
                        <span>
                            <i className='fa-solid fa-thumbs-up' />
                        </span>
                        <span className='count'>0</span>
                    </button>
                }
                {(!postReacts || postReacts?.length == 0) &&
                    <span>
                        <i className='fa-solid fa-thumps-up' />
                    </span>
                }
                <button className='comment-count' onClick={() => setSelectedPostId(post.id)}>
                    <span>
                        <i className='fa-solid fa-comment' />
                    </span>
                    <span className='count'>{post.commentCount?.toLocaleString() || 0}</span>
                </button>
            </div>
            <div className='react-comment'>
                <div
                    className='button-wrapper'
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <button
                        className='main-btn'
                        style={{ backgroundColor: myReactionIcon ? myReactionIcon?.action?.color + '66' : '#ffffff20' }}
                        onClick={() => handleClickReact({ id: 'Like', force: false }, myReactionIcon)}
                        disabled={!user || loading || parentLoading}
                    >
                        {myReactionIcon ?
                            <>
                                <i className={myReactionIcon?.action?.icon} style={{ color: myReactionIcon?.action?.color, '--background': myReactionIcon?.action?.background }} />
                                <span style={{ color: myReactionIcon?.action?.color }}>{myReactionIcon?.action?.id}</span>
                            </>
                            :
                            <i className='fa-regular fa-thumbs-up' />
                        }
                    </button>

                    {open && (
                        <div className='reaction-popup'>
                            {actions.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                    className='reaction-item'
                                >
                                    <button
                                        className='btn-item'
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        onClick={() => handleClickReact(item, myReactionIcon)}
                                        disabled={!user || loading || parentLoading}
                                    >
                                        <i className={item.icon} style={{ color: item.color, animationDelay: `${index * 0.1}s`, '--background': item.background }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='button-wrapper'>
                    <button className='main-btn' onClick={() => setSelectedPostId(post.id)}>
                        <i className='fa-regular fa-comment' />
                    </button>
                </div>
            </div>

            {openReport &&
                <PopupContainer onClose={() => setOpenReport(null)} titleName={`Báo cáo bài viết`} modalStyle={{}} innerStyle={{ width: 700, scrollbarWidth: 'none' }}>
                    <ReportModal data={openReport} onClose={() => setOpenReport(null)} />
                </PopupContainer>
            }
        </div>
    )
}
