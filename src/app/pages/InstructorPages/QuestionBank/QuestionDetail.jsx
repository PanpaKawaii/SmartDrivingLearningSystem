import { useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { QUIZ_DATA } from '../../../../mocks/QUIZ_DATA.js';
import '../InstructorPages.css';

const getQuestionType = (question) => (question.answers.length > 3 ? 'MULTI' : 'SINGLE');

const getQuestionDifficulty = (number) => {
    if (number <= 200) return 'Dễ';
    if (number <= 400) return 'Trung bình';
    return 'Khó';
};

function QuestionDetail() {
    const navigate = useNavigate();
    const { questionId } = useParams();
    const location = useLocation();

    // Ưu tiên lấy từ state nếu có
    const question = useMemo(() => {
        if (location.state && location.state.question) {
            return location.state.question;
        }
        // fallback: lấy từ QUIZ_DATA cũ (hoặc có thể fetch từ API nếu cần)
        const matched = Object.values(QUIZ_DATA).find((item) => String(item.number) === String(questionId));
        if (!matched) return null;
        return {
            id: matched.number,
            content: matched.question,
            category: matched.category,
            isDiemLiet: matched.isDiemLiet,
            type: getQuestionType(matched),
            difficulty: getQuestionDifficulty(matched.number),
            answers: matched.answers,
            explanation: matched.explanation,
            image: matched.image,
            correctAnswer: matched.correctAnswer,
        };
    }, [questionId, location.state]);

    if (!question) {
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
                    <p>Câu hỏi không tồn tại hoặc đã bị xoá.</p>
                    <button className='ins-btn ins-btn-primary' onClick={() => navigate('/instructor/question-bank')}>
                        Quay lại ngân hàng câu hỏi
                    </button>
                </div>
            </div>
        );
    }

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
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Chương</span>
                        <span className='ins-detail-value'>{question.chapterName || question.category}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Bài học</span>
                        <span className='ins-detail-value'>{question.lessonName || '—'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Phân loại</span>
                        <span className='ins-detail-value'>{question.category || '—'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Chủ đề</span>
                        <span className='ins-detail-value'>{question.topicName || '—'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Loại câu hỏi</span>
                        <span className='ins-detail-value'>{question.type === 'SINGLE' ? 'Đơn lựa chọn' : 'Đa lựa chọn'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Trạng thái</span>
                        <span className={`ins-status-chip ${question.status === 1 ? 'approved' : 'pending'}`}>
                            <span className='chip-dot'></span>{question.status === 1 ? 'Hoạt động' : 'Nháp'}
                        </span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Độ khó</span>
                        <span className='ins-detail-value'>{question.difficulty || '—'}</span>
                    </div>
                    <div className='ins-detail-field'>
                        <span className='ins-detail-label'>Điểm liệt</span>
                        <span className={`ins-status-chip ${question.isDiemLiet ? 'rejected' : 'approved'}`}>
                            <span className='chip-dot'></span>{question.isDiemLiet ? 'Câu điểm liệt' : 'Không'}
                        </span>
                    </div>
                    <div className='ins-detail-field' style={{ gridColumn: 'span 2' }}>
                        <span className='ins-detail-label'>Đáp án đúng</span>
                        <span className='ins-detail-value'>
                            {question.answers?.find((answer) => answer.index === question.correctAnswer || answer.correct)?.label || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className='ins-detail-section'>
                    <h2>Nội dung câu hỏi</h2>
                    <p>{question.content}</p>
                </div>

                <div className='ins-detail-section'>
                    <h2>Danh sách đáp án</h2>
                    <div className='ins-answer-list'>
                        {question.answers.map((answer) => (
                            <div key={answer.index} className={`ins-answer-item ${answer.correct ? 'correct' : ''}`}>
                                <div className='ins-answer-label'>
                                    {answer.label}
                                    {answer.correct && <span className='ins-answer-badge'>Đúng</span>}
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