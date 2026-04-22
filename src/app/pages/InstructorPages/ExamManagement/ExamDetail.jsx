import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchData } from "../../../../mocks/CallingAPI";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import ExamModal from "./ExamModal";
import "../InstructorPages.css";
import "./ExamDetail.css";

const formatDateTimeLines = (value) => {
  if (!value) return { time: "", date: "" };

  const normalizedValue = String(value).replace("T", " ").trim();
  const [datePart = "", timePart = ""] = normalizedValue.split(" ");
  const [year = "", month = "", day = ""] = datePart.split("-");

  return {
    time: timePart.slice(0, 5),
    date: day && month && year ? `${day}/${month}/${year}` : datePart,
  };
};

function StatusChip({ active, activeText, inactiveText, className = "" }) {
  return (
    <span
      className={`ins-status-chip ${className} ${active ? "approved" : "pending"}`.trim()}
    >
      <span className="chip-dot" />
      {active ? activeText : inactiveText}
    </span>
  );
}

function DetailField({ label, children, wide = false }) {
  return (
    <div
      className={`ins-detail-field ${wide ? "ins-exam-detail-field-wide" : ""}`.trim()}
    >
      <span className="ins-detail-label">{label}</span>
      <span className="ins-detail-value">{children}</span>
    </div>
  );
}

function ExamDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { examId } = useParams();
  const { user, refreshNewToken } = useAuth();
  const token = user?.token || "";

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Map questionId -> question object (fetch riêng khi question = null)
  const [questionsMap, setQuestionsMap] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const fetchExamDetail = async () => {
      if (location.state?.exam) {
        setExam(location.state.exam);
        setLoading(false);
        return;
      }

      if (!examId) {
        setError("Không tìm thấy mã đề thi trên đường dẫn URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await fetchData(`Exams/${examId}`, token);
        setExam(res);
      } catch (err) {
        if (err.status === 401) {
          refreshNewToken(user);
        } else {
          setError(
            "Không thể tải dữ liệu đề thi. Đề thi có thể không tồn tại hoặc lỗi mạng.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetail();
  }, [examId, location.state, token, refreshNewToken, user]);

  // Fetch câu hỏi còn thiếu (question = null) sau khi có exam
  useEffect(() => {
    if (!exam) return;
    const missingIds = (exam.examQuestions || [])
      .filter((eq) => eq.question === null || eq.question === undefined)
      .map((eq) => eq.questionId)
      .filter(Boolean);

    if (missingIds.length === 0) return;

    setLoadingQuestions(true);
    Promise.all(
      missingIds.map((qId) =>
        fetchData(`Questions/${qId}`, token).catch(() => null)
      )
    ).then((results) => {
      const map = {};
      results.forEach((q) => {
        if (q && q.id) map[q.id] = q;
      });
      setQuestionsMap(map);
      setLoadingQuestions(false);
    });
  }, [exam, token]);

  const handleGoBack = () => navigate("/instructor/exam-management");

  const [showModal, setShowModal] = useState(false);
  const handleEditExam = () => setShowModal(true);

  // Reload exam sau khi sửa thành công
  const handleModalSuccess = async () => {
    try {
      const res = await fetchData(`Exams/${examId || exam?.id}`, token);
      setExam(res);
      setQuestionsMap({});
    } catch { /* ignore */ }
  };

  const renderDateTimeLines = (value) => {
    const { time, date } = formatDateTimeLines(value);
    return (
      <span className="ins-exam-datetime-lines">
        <span>{time || "--:--"}</span>
        <span>{date || "--/--/----"}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="ins-page">
        <div className="ins-detail-card ins-exam-loading-card">
          <i className="fa-solid fa-spinner fa-spin ins-exam-loading-icon" />
          <p className="ins-exam-loading-text">Đang tải dữ liệu đề thi...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="ins-page">
        <div className="ins-page-header">
          <div>
            <h1>Chi tiết đề thi</h1>
            <p>Không tìm thấy đề thi tương ứng.</p>
          </div>
        </div>
        <div className="ins-detail-empty">
          <i className="fa-solid fa-circle-exclamation" />
          <p>{error || "Đề thi không tồn tại hoặc đã bị xoá."}</p>
          <button className="ins-btn ins-btn-primary" onClick={handleGoBack}>
            Quay lại danh sách đề thi
          </button>
        </div>
      </div>
    );
  }

  // Merge questionsMap vào examQuestions
  const allQuestions = (exam.examQuestions || []).map((eq) => ({
    ...eq,
    question: eq.question ?? questionsMap[eq.questionId] ?? null,
  }));

  return (
    <div className="ins-page">
      <div className="ins-page-header">
        <div>
          <h1>Chi tiết đề thi</h1>
          <p>Xem đầy đủ thông tin và danh sách câu hỏi thuộc đề thi.</p>
        </div>
        <div className="ins-exam-header-actions">
          <button className="ins-btn ins-btn-secondary" onClick={handleGoBack}>
            <i className="fa-solid fa-arrow-left" /> Quay lại danh sách
          </button>
          <button className="ins-btn ins-btn-primary" onClick={handleEditExam}>
            <i className="fa-solid fa-pen" /> Chỉnh sửa đề thi
          </button>
        </div>
      </div>

      <div className="ins-detail-card">
        <div className="ins-detail-meta-card">
          <div className="ins-detail-grid ins-detail-meta-grid">
            <DetailField label="Tên đề thi" wide>
              <span className="ins-exam-title-value">{exam.title}</span>
            </DetailField>

            {exam.description && (
              <DetailField label="Mô tả" wide>
                {exam.description}
              </DetailField>
            )}

            <DetailField label="Thời gian làm bài">
              <>
                <i className="fa-regular fa-clock ins-exam-meta-icon" />
                {exam.duration} phút
              </>
            </DetailField>

            <DetailField label="Điểm đạt">
              <span className="ins-exam-pass-score">{exam.passScore} %</span>
            </DetailField>

            <DetailField label="Số câu hỏi">
              <>
                <i className="fa-solid fa-list-ol ins-exam-meta-icon" />
                {exam.examQuestionCount ?? allQuestions.length} câu
              </>
            </DetailField>

            {/* <DetailField label="Ngẫu nhiên câu hỏi">
              <StatusChip
                active={exam.isRandom}
                activeText="Có"
                inactiveText="Không"
                className="ins-metadata-badge"
              />
            </DetailField> */}

            <DetailField label="Trạng thái">
              <StatusChip
                active={exam.status === 1}
                activeText="Hoạt động"
                inactiveText="Ngưng"
                className="ins-metadata-badge"
              />
            </DetailField>

            <DetailField label="Ngày tạo">
              {renderDateTimeLines(exam.createAt)}
            </DetailField>

            <DetailField label="Cập nhật lần cuối">
              {renderDateTimeLines(exam.updateAt)}
            </DetailField>
          </div>
        </div>

        <div className="ins-detail-section">
          <h2>
            Danh sách câu hỏi
            <span className="ins-exam-question-count">
              ({allQuestions.length} câu)
            </span>
            {loadingQuestions && (
              <span style={{ marginLeft: '12px', fontSize: '0.8rem', fontWeight: 400, color: 'var(--ins-on-surface)', opacity: 0.7 }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '6px' }} />
                Đang tải nội dung câu hỏi...
              </span>
            )}
          </h2>

          {allQuestions.length === 0 ? (
            <div className="ins-exam-empty-questions">
              <i className="fa-solid fa-inbox ins-exam-empty-icon" />
              <p>Chưa có câu hỏi nào trong đề thi này.</p>
            </div>
          ) : (
            <div className="ins-exam-question-list">
              {allQuestions.map((eq, idx) => {
                const q = eq.question;
                return (
                  <div key={eq.id} className="ins-exam-question-item">
                    <div className="ins-exam-question-index">{idx + 1}</div>

                    <div className="ins-exam-question-content-wrap">
                      {q ? (
                        <>
                          <div className="ins-exam-question-content">
                            {q.content || "—"}
                          </div>
                          {q.answers && q.answers.length > 0 && (
                            <div className="ins-exam-answer-list">
                              {q.answers.map((ans, aIdx) => (
                                <div
                                  key={ans.id || aIdx}
                                  className={`ins-exam-answer-row ${ans.isCorrect ? "is-correct" : ""}`.trim()}
                                >
                                  <span className="ins-exam-answer-letter">
                                    {String.fromCharCode(65 + aIdx)}
                                  </span>
                                  {ans.content}
                                  {ans.isCorrect && (
                                    <i className="fa-solid fa-check ins-exam-answer-check" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="ins-exam-question-missing">
                          <i className="fa-solid fa-link ins-exam-link-icon" />
                          Câu hỏi ID:{" "}
                          <code className="ins-exam-question-id">
                            {eq.questionId}
                          </code>
                        </div>
                      )}
                    </div>

                    <StatusChip
                      active={eq.status === 1}
                      activeText="Hoạt động"
                      inactiveText="Ngưng"
                      className="ins-exam-question-status"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="ins-detail-actions">
          <button className="ins-btn ins-btn-secondary" onClick={handleGoBack}>
            Quay lại
          </button>
          <button className="ins-btn ins-btn-primary" onClick={handleEditExam}>
            <i className="fa-solid fa-pen" /> Chỉnh sửa đề thi
          </button>
        </div>
      </div>

      <ExamModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleModalSuccess}
        initialData={exam}
      />
    </div>
  );
}

export default ExamDetail;
