import { useRef, useState } from 'react';
import AutoResizeTextarea from '../../components/AutoResizeTextarea';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './ForumCreatePost.css';

export default function ForumCreatePost() {
    const { user } = useAuth();

    const refComment = useRef(null);

    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const DefaultAvatar = 'https://static.vecteezy.com/system/resources/previews/048/044/477/non_2x/pixel-art-traffic-light-game-asset-design-vector.jpg';

    return (
        <div className='forum-create-post-container'>
            <div className='user-information'>
                <div className='image'>
                    <img src={user?.image || DefaultAvatar} alt={user?.email} />
                </div>
                <div className='name'>{user?.name || user?.email}</div>
            </div>
            <div className='post-information'>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Tên bài viết' />
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option value='' disabled>Chọn chủ đề</option>
                    <option value='giao-thong'>Giao thông</option>
                    <option value='luat-lai-xe'>Luật lái xe</option>
                    <option value='kinh-nghiem-lai-xe'>Kinh nghiệm lái xe</option>
                </select>
            </div>
            <form className='comment-area'>
                <AutoResizeTextarea refer={refComment} placeholder={user ? 'Viết bình luận' : 'Vui lòng đăng nhập để bình luận...'} disable={!user} />
                <button type='button' className='btn' onClick={() => handleSubmitComment(refComment.current.value, null)}>
                    ĐĂNG
                </button>
            </form>
        </div>
    )
}
