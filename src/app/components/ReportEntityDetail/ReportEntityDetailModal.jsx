import Modal from '../Shared/Modal.jsx';
import EntityDetails from './EntityDetails.jsx';

const titleByType = {
    question: 'Chi tiết câu hỏi',
    simulation: 'Chi tiết tình huống mô phỏng',
    'forum-post': 'Chi tiết bài viết cộng đồng',
    'forum-comment': 'Chi tiết bình luận cộng đồng',
};

export default function ReportEntityDetailModal({ isOpen, onClose, entityType, entityId }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={titleByType[entityType] || 'Chi tiết đối tượng báo cáo'}
            wide
            footer={
                <button className='ins-btn ins-btn-secondary' onClick={onClose}>
                    Đóng
                </button>
            }
        >
            <EntityDetails entityType={entityType} entityId={entityId} />
        </Modal>
    );
}
