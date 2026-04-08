import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import { pendingPosts } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

import { useState } from 'react';

const STATUS_LABELS = {
    '-1': 'Chờ duyệt',
    '1': 'Đã duyệt',
    '3': 'Đã từ chối',
};

export default function PendingPosts() {
    // Default all pending posts to -1 if not set
    const [items, setItems] = useState(
        pendingPosts.map(item => ({ ...item, status: item.status === undefined ? -1 : item.status }))
    );

    const handleApprove = (id) => {
        setItems((prev) => prev.map((item) =>
            item.id === id ? { ...item, status: 1 } : item
        ));
    };
    const handleReject = (id) => {
        setItems((prev) => prev.map((item) =>
            item.id === id ? { ...item, status: 3 } : item
        ));
    };

    const columns = [
        { key: 'id', label: 'STT', width: '60px' },
        { key: 'title', label: 'Tiêu đề bài viết' },
        { key: 'userId', label: 'Tác giả', width: '120px', render: (val) => `User #${val}` },
        { key: 'forumTopicId', label: 'Chủ đề', width: '100px', render: (val) => `Topic #${val}` },
        { key: 'createAt', label: 'Ngày gửi', width: '130px', render: (val) => val?.split(' ')[0] },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => {
                let cls = 'pending';
                if (val === 1) cls = 'approved';
                else if (val === 3) cls = 'rejected';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
            },
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '120px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
                    <button className='ins-action-btn edit' title='Duyệt' onClick={() => handleApprove(row.id)} disabled={row.status === 1}><i className='fa-solid fa-check'></i></button>
                    <button className='ins-action-btn delete' title='Từ chối' onClick={() => handleReject(row.id)} disabled={row.status === 3}><i className='fa-solid fa-xmark'></i></button>
                </div>
            ),
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Bài viết chờ duyệt</h1>
                    <p>Danh sách bài viết đang chờ phê duyệt từ giảng viên.</p>
                </div>
            </div>
            <InstructorDataTable title={`Bài viết chờ duyệt (${items.length})`} columns={columns} data={items} />
        </div>
    );
}
