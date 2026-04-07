import { useRef, useState } from 'react';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import AutoResizeTextarea from '../AutoResizeTextarea/AutoResizeTextarea';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './ReportModal.css';

export default function ReportModal({
    data = {},
}) {
    const { user } = useAuth();

    const refComment = useRef(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    return (
        <div className='report-modal-container'>
            <div className='report-information'>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Tiêu đề' />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value='' disabled>Chọn loại báo cáo</option>
                </select>
            </div>
            <div className='report-information'>
                <input type='text' value={data.simulationId || data.forumPostId || data.forumCommentId || data.questionId} readOnly />
            </div>
            <form className='comment-area'>
                <AutoResizeTextarea refer={refComment} placeholder={user ? 'Nội dung báo cáo' : 'Vui lòng đăng nhập để báo cáo...'} disable={!user} />
                <button type='button' className='btn' onClick={() => handleSubmitComment(refComment.current.value, null)}>
                    GỬI BÁO CÁO
                </button>
            </form>
        </div>
    )
}
