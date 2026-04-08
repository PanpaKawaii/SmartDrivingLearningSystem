import Modal from '../Shared/Modal.jsx';
import EntityDetails from './EntityDetails.jsx';

const titleByType = {
    question: 'Chi tiet cau hoi',
    simulation: 'Chi tiet tinh huong mo phong',
    'forum-post': 'Chi tiet bai viet cong dong',
    'forum-comment': 'Chi tiet binh luan cong dong',
};

export default function ReportEntityDetailModal({ isOpen, onClose, entityType, entityId }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={titleByType[entityType] || 'Chi tiet doi tuong bao cao'}
            wide
            footer={
                <button className='ins-btn ins-btn-secondary' onClick={onClose}>
                    Dong
                </button>
            }
        >
            <EntityDetails entityType={entityType} entityId={entityId} />
        </Modal>
    );
}
