import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../../app/hooks/AuthContext/AuthContext';
// Sử dụng chung CSS với hệ thống Admin hoặc Instructor tùy cấu trúc dự án của bạn
import '../../InstructorPages/InstructorPages.css';

// --- Constants Tag ID tương tự trang danh sách ---
const TAG_IDS = {
    NEW_CREATED: "763a5be4-963a-487d-a3b4-6a826026c94e",
    NEW_UPDATED: "8317546b-0cc6-43e9-a917-0ae9d090ec16",
    DIEM_LIET: "a8b6d7a5-c21b-47f3-87da-31f718311688"
};

const getQuestionType = (question) => {
    if (question?.type) return String(question.type).toUpperCase();
    const correctCount = (question?.answers || []).filter((a) => Boolean(a?.isCorrect ?? a?.correct)).length;
    return correctCount > 1 ? 'MULTI' : 'SINGLE';
};

// Cập nhật logic kiểm tra Điểm Liệt theo Tag ID
const checkIsDiemLiet = (question) => {
    const hasTagDiemLiet = question?.questionTags?.some(tag => tag.tagId === TAG_IDS.DIEM_LIET);
    return hasTagDiemLiet || Boolean(question?.isDiemLiet ?? question?.isDanger ?? false);
};

function QuestionDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams(); // Ưu tiên lấy từ URL :id
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [license, setLicense] = useState(null);

    // Đường dẫn gốc cho Admin (Bạn có thể điều chỉnh lại cho đúng Route của bạn)
    const ADMIN_BASE_PATH = '/admin/change-requests';

    useEffect(() => {
        const fetchQuestionDetail = async () => {
            setLoading(true);
            try {
                let qData = null;

                // Ưu tiên fetch mới bằng endpoint Admin để có dữ liệu Tag đầy đủ Name
                if (id) {
                    // SỬA TẠI ĐÂY: Dùng endpoint admin
                    qData = await fetchData(`Questions/admin/${id}`, token);
                } else if (location.state && location.state.question) {
                    qData = location.state.question;
                }

                if (qData) {
                    setQuestion(qData);
                    const licenseId = qData?.drivingLicenseId || qData?.questionLesson?.questionChapter?.drivingLicenseId;
                    if (licenseId) {
                        const licenseRes = await fetchData(`drivingLicenses/${licenseId}`, token);
                        setLicense(licenseRes);
                    }
                } else {
                    setError('Không tìm thấy mã câu hỏi.');
                }
            } catch (err) {
                if (err.status === 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi khi tải chi tiết câu hỏi.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionDetail();
    }, [id, token]);

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
                    <h1>Chi tiết câu hỏi</h1>
                </div>
                <div className='ins-detail-empty'>
                    <i className='fa-solid fa-circle-exclamation'></i>
                    <p>{error || 'Câu hỏi không tồn tại.'}</p>
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    // Logic xử lý Suffix cho nội dung câu hỏi dựa trên Tag
    const tags = question.questionTags || [];
    let contentSuffix = "";
    if (tags.some(t => t.tagId === TAG_IDS.NEW_CREATED)) contentSuffix = " (Câu hỏi mới tạo)";
    else if (tags.some(t => t.tagId === TAG_IDS.NEW_UPDATED)) contentSuffix = " (Câu hỏi mới cập nhật)";

    const isDiemLiet = checkIsDiemLiet(question);
    const qType = getQuestionType(question);

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản trị: Chi tiết câu hỏi</h1>
                    <p>Mã câu hỏi: <strong>{question.id}</strong></p>
                </div>

                <button className='ins-btn ins-btn-secondary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                    <i className='fa-solid fa-arrow-left'></i> Quay lại danh sách
                </button>
            </div>

            <div className='ins-detail-card'>
                <div className='ins-detail-meta-card'>
                    <div className='ins-detail-grid ins-detail-meta-grid'>
                        <div className='ins-detail-field' style={{ gridColumn: 'span 2' }}>
                            <span className='ins-detail-label'>Hạng bằng lái</span>
                            <span className='ins-detail-value'>{license?.name || '—'}</span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Loại câu hỏi</span>
                            <span className='ins-detail-value'>{qType === 'SINGLE' ? 'Đơn lựa chọn' : 'Đa lựa chọn'}</span>
                        </div>
                        <div className='ins-detail-field'>
                            <span className='ins-detail-label'>Điểm liệt</span>
                            <span className={`ins-status-chip ${isDiemLiet ? 'rejected' : 'approved'}`}>
                                <span className='chip-dot'></span>{isDiemLiet ? 'Điểm liệt' : 'Thường'}
                            </span>
                        </div>
                        {/* Hiển thị thêm các Tag ID hiện có cho Admin dễ kiểm soát */}
                        {question.questionTags?.length > 0 && (
                            <div className='ins-detail-field' style={{ gridColumn: 'span 2' }}>
                                <span className='ins-detail-label'>Nhãn câu hỏi (Tags)</span>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                                    {question.questionTags.map(qt => (
                                        <span
                                            key={qt.id}
                                            style={{
                                                backgroundColor: qt.tag?.colorCode || '#eee',
                                                color: '#fff',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <i className="fa-solid fa-tag" style={{ marginRight: '4px' }}></i>
                                            {qt.tag?.name || 'N/A'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='ins-detail-section'>
                    <h2>Nội dung {contentSuffix && <span style={{ color: 'var(--ins-primary)' }}>{contentSuffix}</span>}</h2>
                    <p className='ins-question-content' style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                        {question.content}
                    </p>
                    {question.image && (
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <img src={question.image} alt='Minh họa' style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                    )}
                </div>

                <div className='ins-detail-section'>
                    <h2>Danh sách đáp án</h2>
                    <div className='ins-answer-list'>
                        {(question.answers || []).map((ans, idx) => (
                            <div key={idx} className={`ins-answer-item ${(ans.isCorrect || ans.correct) ? 'correct' : ''}`}>
                                <div className='ins-answer-label'>
                                    <span className='ins-answer-letter'>{String.fromCharCode(65 + idx)}</span>
                                    {(ans.isCorrect || ans.correct) && <span className='ins-answer-badge'>Đúng</span>}
                                </div>
                                <div className='ins-answer-text'>{ans.content || ans.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {question.explanation && (
                    <div className='ins-detail-section ins-explanation-callout'>
                        <div className='ins-callout-header'>
                            <i className='fa-solid fa-lightbulb'></i>
                            <h2>Giải thích của giáo viên</h2>
                        </div>
                        <p>{question.explanation}</p>
                    </div>
                )}

                <div className='ins-detail-actions'>
                    <button className='ins-btn ins-btn-secondary' onClick={() => navigate(ADMIN_BASE_PATH)}>
                        Quay lại trang quản lý
                    </button>
                    {/* Admin có thể có thêm nút duyệt nhanh hoặc vô hiệu hóa ở đây */}
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate(`/admin/questions/edit/${question.id}`)}>
                        <i className="fa-solid fa-pen-to-square"></i> Hiệu chỉnh câu hỏi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestionDetail;