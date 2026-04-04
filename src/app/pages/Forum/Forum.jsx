import React, { useState } from 'react';
import PopupContainer from '../../components/PopupContainer/PopupContainer';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ForumCard from './ForumCard';
import ForumComment from './ForumComment';
import ForumCreatePost from './ForumCreatePost';

import './Forum.css';

//TEST DEMO RICH TEXT EDITOR
// import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
//TEST DEMO RICH TEXT EDITOR

export default function Forum() {
    const { user } = useAuth();

    const [FORUMPOSTs, setFORUMPOSTs] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const DefaultAvatar = 'https://static.vecteezy.com/system/resources/previews/048/044/477/non_2x/pixel-art-traffic-light-game-asset-design-vector.jpg';

    //TEST DEMO RICH TEXT EDITOR
    const [htmlContent, setHtmlContent] = useState('');
    //TEST DEMO RICH TEXT EDITOR

    const ListPost = [
        {
            id: 1,
            title: 'Forum 1',
            content: 'Content 1',
        },
        {
            id: 2,
            title: 'Forum 2',
            content: 'Content 2',
        },
    ];

    //TEST DEMO RICH TEXT EDITOR
    const handleHtmlChange = (value) => {
        // Chỉ nhận string HTML, còn lại set rỗng
        setHtmlContent(typeof value === 'string' ? value : '');
    };

    const getContent = () => {
        if (typeof htmlContent !== 'string') return null;
        const html = htmlContent.trim();
        return html ? html : null;
    };
    //TEST DEMO RICH TEXT EDITOR

    return (
        <div className='forum-container'>
            <StarsBackground />
            <div className='left'></div>
            <div className='center'>
                <div className='list'>
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
                    {ListPost.map((post, i) => (
                        <React.Fragment key={i}>
                            <ForumCard post={post} setSelectedPost={setSelectedPost} />
                        </React.Fragment>
                    ))}
                </div>
                {/* TEST DEMO RICH TEXT EDITOR */}
                {/* <RichTextEditor
          initialHtml='<h2>Tiêu đề</h2><ul><li value='1'>chấm</li></ul><p><br></p><ol><li value='1'>số</li></ol><p><br></p><h1><strong>IN ĐÂM</strong></h1>' //test prefill
          onHtmlChange={handleHtmlChange}
          placeholder='Viết bình luận của bạn...'
          autoFocus
        /> */}
                {/* <button
          onClick={() =>
            console.log(
              'Editor content:',
              getContent(),
            )
          }
        >
          {' '}
          Log Content{' '}
        </button> */}
                {/* TEST DEMO RICH TEXT EDITOR */}
            </div>
            <div className='right'></div>

            {openCreatePost && user && (
                <PopupContainer onClose={() => setOpenCreatePost(false)}>
                    <div className='inner-popup'>
                        <ForumCreatePost />
                    </div>
                </PopupContainer>
            )}

            {selectedPost && (
                <PopupContainer onClose={() => setSelectedPost(null)}>
                    <div className='inner-popup'>
                        <ForumCard post={selectedPost} setSelectedPost={setSelectedPost} />
                        <ForumComment SelectedPost={selectedPost} />
                    </div>
                </PopupContainer>
            )}
        </div>
    )
}
