import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const getQuestionType = (question) => {
    if (question?.type) return String(question.type).toUpperCase();
    const correctCount = (question?.answers || []).filter((a) => Boolean(a?.isCorrect ?? a?.correct)).length;
    return correctCount > 1 ? 'MULTI' : 'SINGLE';
};

const isDiemLietQuestion = (question) => Boolean(
    question?.isDiemLiet ?? false
);

function QuestionDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const questionIdFromPath = params?.questionId || params?.id || location.pathname.split('/').filter(Boolean).pop() || '';
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [license, setLicense] = useState(null);
    useEffect(() => {
        const fetchQuestionDetail = async () => {
            if (location.state && location.state.question) {
                const q = location.state.question;
                 console.log('bbbbbbbbbbbbbbbbbb', q);
                const res = await fetchData(`drivingLicenses/${q?.drivingLicenseId}`, token);
                setLicense(res);
                setQuestion(q);
                setLoading(false);
                return;
            }

            if (!questionIdFromPath) {
                setError('Không tìm thấy mã câu hỏi trên đường dẫn URL.');
                setLoading(false);
                return;
            }

            // Fallback: fetch từ API nếu load trực tiếp link
            setLoading(true);
            setError('');
            try {
                const res = await fetchData(`Questions/${questionIdFromPath}`, token);
                setQuestion(res);
                const licenseId = res?.questionLesson?.questionChapter?.drivingLicenseId;
                const licenseRes = await fetchData(`drivingLicenses/${licenseId}`, token);
                setLicense(licenseRes);
            } catch (err) {
                if (err.status === 401) {
                    refreshNewToken(user);
                } else {
                    setError('Không thể tải dữ liệu câu hỏi. Câu hỏi có thể không tồn tại hoặc lỗi mạng.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionDetail();
    }, [questionIdFromPath, location.state, token, user, refreshNewToken]);

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

    if (error || !question) {
        return (
            <div className='ins-page'>
                <div className='ins-page-header'>
                    <div>
                        <h1>Chi tiết câu hỏi</h1>
                        <p>Không tìm thấy câu hỏi tương ứng.</p>
                    </div>
                </div>

                <div className='ins-detail-empty'>
                    <i className='fa-solid fa-circle-exclamation'></i>
                    <p>{error || 'Câu hỏi không tồn tại hoặc đã bị xoá.'}</p>
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate('/instructor/question-bank')}>
                        Quay lại ngân hàng câu hỏi
                    </button>
                </div>
            </div>
        );
    }

    // Lấy thông tin từ object câu hỏi
    const licenseName = license?.name;
    const licenseDescription = license?.description;
    const chapterName = question?.chapterName || question?.questionLesson?.questionChapter?.name || '—';
    const lessonName = question?.lessonName || question?.questionLesson?.name || '—';
    const categoryName = question?.category || question?.questionCategory?.name || '—';
    const topicName = question?.topicName || question?.questionTopic?.name || '—';
    
    const qType = getQuestionType(question);
    const isDiemLiet = question?.isDiemLiet !== undefined ? question.isDiemLiet : isDiemLietQuestion(question);
    const status = question?.status ?? 1;

    // Build answers
    const answers = (question.answers || []).map((ans, idx) => ({
        index: idx,
        label: String.fromCharCode(65 + idx),
        text: ans.content || ans.text,
        isCorrect: Boolean(ans.isCorrect || ans.correct),
    }));

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Chi tiết câu hỏi</h1>
                    <p>Xem đầy đủ nội dung câu hỏi trước khi thực hiện chỉnh sửa.</p>
                </div>

                <button className='ins-btn ins-btn-secondary' onClick={() => navigate('/instructor/question-bank')}>
                    <i className='fa-solid fa-arrow-left'></i> Quay lại danh sách
                </button>
            </div>

            <div className='ins-detail-card'>
                <div className='ins-detail-grid'>
                    <div className='ins-detail-field' style={{ gridColumn: 'span 2' }}>
                        <span className='ins-detail-label'>Hạng bằng lái</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className='ins-detail-value'>{licenseName}</span>
                            {licenseDescription && (
                                <span style={{ fontSize: '0.85rem', color: 'var(--ins-on-surface-variant)', lineHeight: '1.4' }}>
                                    {licenseDescription}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Chương</span>
                        <span className='ins-detail-value'>{chapterName}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Bài học</span>
                        <span className='ins-detail-value'>{lessonName}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Phân loại</span>
                        <span className='ins-detail-value'>{categoryName}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Chủ đề</span>
                        <span className='ins-detail-value'>{topicName}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Loại câu hỏi</span>
                        <span className='ins-detail-value'>{qType === 'SINGLE' ? 'Đơn lựa chọn' : 'Đa lựa chọn'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Trạng thái</span>
                        <span className={`ins-status-chip ${status === 1 ? 'approved' : 'pending'}`}>
                            <span className='chip-dot'></span>{status === 1 ? 'Hoạt động' : 'Nháp/Đã ẩn'}
                        </span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Điểm liệt</span>
                        <span className={`ins-status-chip ${isDiemLiet ? 'rejected' : 'approved'}`}>
                            <span className='chip-dot'></span>{isDiemLiet ? 'Câu điểm liệt' : 'Bình thường'}
                        </span>
                    </div>
                </div>

                <div className='ins-detail-section'>
                    <h2>Nội dung câu hỏi</h2>
                    <p>{question.content}</p>
                    {question.image && (
                        <div style={{ marginTop: '16px' }}>
                            <img src={question.image} alt='Minh họa câu hỏi' style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
                        </div>
                    )}
                </div>

                <div className='ins-detail-section'>
                    <h2>Danh sách đáp án</h2>
                    <div className='ins-answer-list'>
                        {answers.map((answer) => (
                            <div key={answer.index} className={`ins-answer-item ${answer.isCorrect ? 'correct' : ''}`}>
                                <div className='ins-answer-label'>
                                    {answer.label}
                                    {answer.isCorrect && <span className='ins-answer-badge'>Đúng</span>}
                                </div>
                                <div className='ins-answer-text'>{answer.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {question.explanation && (
                    <div className='ins-detail-section'>
                        <h2>Giải thích</h2>
                        <p>{question.explanation}</p>
                    </div>
                )}

                <div className='ins-detail-actions'>
                    <button className='ins-btn ins-btn-secondary' onClick={() => navigate('/instructor/question-bank')}>
                        Quay lại
                    </button>
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate('/instructor/question-bank')}>
                        Chỉnh sửa câu hỏi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetail;