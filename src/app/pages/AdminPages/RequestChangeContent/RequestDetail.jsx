import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../../app/hooks/AuthContext/AuthContext';
import RequestChangeModal from './RequestChangeModal'; // Import modal để dùng chung logic edit
import '../../InstructorPages/InstructorPages.css';

const RequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const ADMIN_BASE_PATH = '/admin/change-requests';

    const showNotify = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const fetchReportDetail = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetchData(`Reports/${id}`, token);
            setReport(res);
        } catch (err) {
            if (err.status === 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi khi tải chi tiết yêu cầu.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportDetail();
    }, [id, token]);

    const handleUpdateSubmit = async (formData) => {
        setIsSaving(true);
        try {
            const updatePayload = {
                simulationId: formData.simulationId || null,
                forumPostId: formData.forumPostId || null,
                forumCommentId: formData.forumCommentId || null,
                questionId: formData.questionId || null,
                reportCategoryId: formData.reportCategoryId,
                title: formData.title,
                content: formData.content,
                image: formData.image || null,
                status: formData.status
            };
            await putData(`Reports/${formData.id}`, updatePayload, token);
            showNotify("Cập nhật yêu cầu thành công!");
            setIsEditModalOpen(false);
            fetchReportDetail(); // Tải lại dữ liệu sau khi sửa thành công
        } catch (error) {
            console.error("Update error:", error);
            showNotify(error.response?.data?.title || "Lỗi khi cập nhật", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            [-1]: { label: 'Đang chờ duyệt', class: 'pending' },
            [0]: { label: 'Bị từ chối', class: 'rejected' },
            [1]: { label: 'Đã xử lý', class: 'approved' },
        };
        return configs[status] || { label: 'Chờ duyệt', class: 'pending' };
    };

    if (loading) {
        return (
            <div className='ins-page'>
                <div className='ins-detail-card' style={{ textAlign: 'center', padding: '40px' }}>
                    <i className='fa-solid fa-spinner fa-spin' style={{ fontSize: '2rem', color: 'var(--ins-primary)' }}></i>
                    <p style={{ marginTop: '16px' }}>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className='ins-page'>
                <div className='ins-detail-empty'>
                    <i className='fa-solid fa-circle-exclamation'></i>
                    <p>{error || 'Yêu cầu không tồn tại.'}</p>
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    const statusObj = getStatusConfig(report.status);

    return (
        <div className='ins-page'>
            {notification.message && (
                <div className={`sr-toast ${notification.type}`}>
                    <i className={notification.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check'}></i>
                    {notification.message}
                </div>
            )}

            <div className='ins-page-header'>
                <div>
                    <h1>Chi tiết yêu cầu thay đổi</h1>
                    <p>Mã yêu cầu: <strong>#{report.id.substring(0, 8)}</strong></p>
                </div>
                <button className='ins-btn ins-btn-secondary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                    <i className='fa-solid fa-arrow-left'></i> Quay lại danh sách
                </button>
            </div>

            <div className='ins-detail-card'>
                <div className='ins-detail-meta-card'>
                    <div className='ins-detail-grid ins-detail-meta-grid'>
                        <div className='ins-detail-field' style={{ gridColumn: 'span 2' }}>
                            <span className='ins-detail-label'>Tiêu đề yêu cầu</span>
                            <span className='ins-detail-value' style={{ fontWeight: '600', color: 'var(--ins-primary)' }}>
                                {report.title}
                            </span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Loại danh mục</span>
                            <span className='ins-detail-value'>{report.reportCategory?.name || 'N/A'}</span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Trạng thái</span>
                            <span className={`ins-status-chip ${statusObj.class}`}>
                                <span className='chip-dot'></span>{statusObj.label}
                            </span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Ngày tạo</span>
                            <span className='ins-detail-value'>
                                {new Date(report.createAt).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Người gửi</span>
                            <span className='ins-detail-value'>{report.user?.name || 'Học viên'}</span>
                        </div>
                    </div>
                </div>

                <div className='ins-detail-section'>
                    <h2><i className="fa-solid fa-file-lines" style={{ marginRight: '8px' }}></i> Nội dung yêu cầu</h2>
                    <p className='ins-question-content' style={{ fontSize: '1.1rem', backgroundColor: '#002c58', padding: '16px', borderRadius: '8px', color: '#ffffff' }}>
                        {report.content}
                    </p>
                    {report.image && (
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <img src={report.image} alt='Minh họa lỗi' style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                    )}
                </div>

                {report.question && (
                    <div className='ins-detail-section ins-explanation-callout' style={{ borderLeftColor: '#007bff' }}>
                        <div className='ins-callout-header'>
                            <i className='fa-solid fa-question-circle' style={{ color: '#007bff' }}></i>
                            <h2>Câu hỏi liên quan</h2>
                        </div>
                        <p style={{ fontWeight: '500' }}>{report.question.content}</p>
                        <button
                            className='ins-btn ins-btn-secondary btn-sm'
                            style={{ marginTop: '10px' }}
                            onClick={() => navigate(`/admin/questions/detail/${report.questionId}`)}
                        >
                            Xem chi tiết câu hỏi
                        </button>
                    </div>
                )}

                <div className='ins-detail-section'>
                    <h2><i className="fa-solid fa-clock-rotate-left" style={{ marginRight: '8px' }}></i> Lịch sử xử lý ({report.resolves?.length || 0})</h2>
                    <div className='ins-answer-list'>
                        {report.resolves && report.resolves.length > 0 ? (
                            report.resolves.map((resolve, idx) => (
                                <div key={idx} className="ins-answer-item" style={{ borderColor: 'var(--ins-primary)', cursor: 'default' }}>
                                    <div className='ins-answer-label'>
                                        <span className='ins-answer-letter'>{idx + 1}</span>
                                        <span className='ins-answer-badge'>Phản hồi</span>
                                    </div>
                                    <div className='ins-answer-text'>
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{resolve.title}</div>
                                        <div style={{ fontSize: '0.95rem', color: '#555' }}>{resolve.content}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '8px' }}>
                                            Thời gian: {new Date(resolve.createAt).toLocaleString('vi-VN')}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontStyle: 'italic', color: '#999', textAlign: 'center', padding: '20px' }}>
                                Chưa có phản hồi từ bộ phận quản trị.
                            </p>
                        )}
                    </div>
                </div>

                <div className='ins-detail-actions'>
                    <button className='ins-btn ins-btn-secondary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                        Quay lại danh sách
                    </button>

                    {/* Chỉ cho phép sửa nếu đang chờ duyệt (-1) */}
                    {report.status === -1 && (
                        <button className='ins-btn ins-btn-primary' onClick={() => setIsEditModalOpen(true)}>
                            <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa yêu cầu
                        </button>
                    )}
                </div>
            </div>

            {/* Modal chỉnh sửa - Sử dụng chung với trang danh sách */}
            {isEditModalOpen && (
                <RequestChangeModal
                    isOpen={isEditModalOpen}
                    mode="edit"
                    report={report}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleUpdateSubmit}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
};

export default RequestDetail;