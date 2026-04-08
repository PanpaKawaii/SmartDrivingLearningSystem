import { useNavigate, useParams } from 'react-router-dom';
import ReportEntityDetailModal from '../../../components/ReportEntityDetail/ReportEntityDetailModal.jsx';

export default function ReportEntityDetail() {
    const navigate = useNavigate();
    const { entityType = '', entityId = '' } = useParams();

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <ReportEntityDetailModal
            isOpen={Boolean(entityType && entityId)}
            onClose={handleClose}
            entityType={entityType}
            entityId={entityId}
        />
    );
}
