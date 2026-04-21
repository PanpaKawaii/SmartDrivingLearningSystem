import { useState, useEffect, useCallback } from "react";
import Modal from "../../../components/Shared/Modal";
import { fetchData, postData, putData } from "../../../../mocks/CallingAPI";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import "./ExamModal.css";

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const FORM = {
  title: "",
  description: "",
  duration: 19,
  passScore: 25,
  isRandom: false,
};

const buildInitialForm = (data) => ({
  title: data?.title || "",
  description: data?.description || "",
  duration: data?.duration ?? 19,
  passScore: data?.passScore ?? 25,
  isRandom: data?.isRandom ?? false,
});

const buildSelectedQuestions = (data) =>
  (data?.examQuestions || []).map((eq) => ({
    id: eq.id || "",
    examId: eq.examId || data.id,
    questionId: eq.questionId,
    status: eq.status ?? 1,
    question: eq.question || null,
  }));

const buildSubmitPayload = ({ formData, selectedQuestions, initialData, isEdit }) => ({
  title: formData.title.trim(),
  description: formData.description.trim(),
  duration: Number(formData.duration),
  passScore: Number(formData.passScore),
  isRandom: formData.isRandom,
  examQuestions: selectedQuestions.map((sq) =>
    isEdit
      ? {
          id: sq.id || undefined,
          examId: sq.examId || initialData.id,
          questionId: sq.questionId,
          status: sq.status ?? 1,
        }
      : {
          questionId: sq.questionId,
        },
  ),
});

function RandomToggle({ value, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ins-exam-modal-random-toggle ${value ? "is-on" : ""}`.trim()}
    >
      <span className="ins-exam-modal-random-thumb" />
    </button>
  );
}

function PickerQuestionItem({ question, selected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`ins-exam-modal-picker-item ${selected ? "is-selected" : ""}`.trim()}
    >
      <span
        className={`ins-exam-modal-picker-checkbox ${selected ? "is-selected" : ""}`.trim()}
      >
        {selected && <i className="fa-solid fa-check ins-exam-modal-picker-check" />}
      </span>
      <div className="ins-exam-modal-picker-item-main">
        <div className="ins-exam-modal-picker-item-content">
          {question.content && question.content.length > 100
            ? question.content.substring(0, 100) + "…"
            : question.content || "—"}
        </div>
        <div className="ins-exam-modal-picker-item-meta">
          {question.answers?.length ?? 0} đáp án
          {question.questionLesson?.name ? ` · ${question.questionLesson.name}` : ""}
        </div>
      </div>
    </div>
  );
}

function SelectedQuestionItem({ item, index, onRemove }) {
  const question = item.question;
  const answers = question?.answers || [];
  return (
    <div className="ins-exam-modal-selected-item">
      <span className="ins-exam-modal-selected-index">{index + 1}</span>
      <div className="ins-exam-modal-selected-main">
        <div className="ins-exam-modal-selected-content">
          {question?.content
            ? question.content.length > 90
              ? question.content.substring(0, 90) + "…"
              : question.content
            : `ID: ${item.questionId}`}
        </div>
        {question?.answers && question.answers.length > 0 && (
          <div className="ins-exam-modal-selected-meta">
            {question.answers.length} đáp án · {question.answers.filter((a) => a.isCorrect).length} đúng
          </div>
        )}
        {answers.length > 0 && (
          <div className="ins-exam-modal-answer-list">
            {answers.map((answer, answerIndex) => (
              <div
                key={answer.id || `${item.questionId}-${answerIndex}`}
                className={`ins-exam-modal-answer-item ${answer.isCorrect ? "is-correct" : ""}`.trim()}
              >
                <span className="ins-exam-modal-answer-letter">
                  {String.fromCharCode(65 + answerIndex)}
                </span>
                <span className="ins-exam-modal-answer-content">
                  {answer.content || "—"}
                </span>
                {answer.isCorrect && (
                  <i className="fa-solid fa-check ins-exam-modal-answer-check" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        className="ins-action-btn delete ins-exam-modal-selected-remove"
        title="Xóa khỏi đề thi"
        onClick={onRemove}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}

export default function ExamModal({ isOpen, onClose, onSuccess, initialData }) {
  const { user, refreshNewToken } = useAuth();
  const token = user?.token || "";
  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState(FORM);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // [{id, examId, questionId, status, question}]

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState("");
  const [pickerPage, setPickerPage] = useState(1);
  const [pickerList, setPickerList] = useState([]);
  const [pickerTotal, setPickerTotal] = useState(0);
  const [pickerTotalPages, setPickerTotalPages] = useState(1);
  const [pickerLoading, setPickerLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hydrateSelectedQuestions = useCallback(async (baseQuestions) => {
    const ids = [...new Set(baseQuestions.map((sq) => sq.questionId).filter(Boolean))];
    if (ids.length === 0) return;

    try {
      const entries = await Promise.all(
        ids.map(async (id) => {
          try {
            const detail = await fetchData(`Questions/${id}`, token);
            return [id, detail || null];
          } catch (err) {
            if (err?.status === 401) {
              refreshNewToken(user);
            }
            return [id, null];
          }
        }),
      );

      const detailsMap = new Map(entries);
      setSelectedQuestions((prev) =>
        prev.map((sq) => ({
          ...sq,
          question: detailsMap.get(sq.questionId) || sq.question,
        })),
      );
    } catch {
      
    }
  }, [token, refreshNewToken, user]);

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setPickerOpen(false);
    setPickerSearch("");
    setPickerPage(1);

    if (isEdit && initialData) {
      setFormData(buildInitialForm(initialData));
      const baseQuestions = buildSelectedQuestions(initialData);
      setSelectedQuestions(baseQuestions);
      hydrateSelectedQuestions(baseQuestions);
    } else {
      setFormData(FORM);
      setSelectedQuestions([]);
    }
  }, [isOpen, isEdit, initialData, hydrateSelectedQuestions]);

  const fetchPickerList = useCallback(async () => {
    setPickerLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(pickerPage),
        pageSize: "10",
        status: "1",
      });
      if (pickerSearch.trim()) query.set("content", pickerSearch.trim());
      const res = await fetchData(`Questions?${query.toString()}`, token);
      setPickerList(normalizeItems(res));
      setPickerTotal(res?.totalCount ?? 0);
      setPickerTotalPages(res?.totalPages ?? 1);
    } catch {
      setPickerList([]);
    } finally {
      setPickerLoading(false);
    }
  }, [token, pickerPage, pickerSearch]);

  useEffect(() => {
    if (pickerOpen) fetchPickerList();
  }, [pickerOpen, fetchPickerList]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isQuestionSelected = (questionId) =>
    selectedQuestions.some((q) => q.questionId === questionId);

  const togglePickerQuestion = (q) => {
    if (isQuestionSelected(q.id)) {
      setSelectedQuestions((prev) =>
        prev.filter((sq) => sq.questionId !== q.id),
      );
    } else {
      setSelectedQuestions((prev) => [
        ...prev,
        {
          id: "",
          examId: initialData?.id || "",
          questionId: q.id,
          status: 1,
          question: q,
        },
      ]);
    }
  };

  const removeQuestion = (questionId) =>
    setSelectedQuestions((prev) =>
      prev.filter((sq) => sq.questionId !== questionId),
    );

  const handlePickerSearch = () => {
    setPickerPage(1);
    fetchPickerList();
  };

  const handleSubmit = async () => {
    setError("");
    if (!formData.title.trim()) return setError("Vui lòng nhập tên đề thi.");
    if (!formData.duration || Number(formData.duration) <= 0)
      return setError("Thời gian làm bài phải lớn hơn 0.");
    if (!formData.passScore || Number(formData.passScore) <= 0)
      return setError("Điểm đạt phải lớn hơn 0.");
    if (selectedQuestions.length === 0)
      return setError("Đề thi phải có ít nhất 1 câu hỏi.");

    setSubmitting(true);
    try {
      const payload = buildSubmitPayload({
        formData,
        selectedQuestions,
        initialData,
        isEdit,
      });

      if (isEdit) await putData(`Exams/${initialData.id}`, payload, token);
      else await postData("Exams", payload, token);

      onSuccess?.();
      onClose();
    } catch (err) {
      if (err.status === 401) {
        refreshNewToken(user);
      } else {
        setError(
          err.data?.message || err.message || "Có lỗi xảy ra khi lưu đề thi.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa đề thi" : "Tạo đề thi mới"}
      wide
      footer={
        <>
          <button
            className="ins-btn ins-btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Hủy
          </button>
          <button
            className="ins-btn ins-btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <i className="fa-solid fa-spinner fa-spin" />
            ) : (
              <i className="fa-solid fa-save" />
            )}
            {isEdit ? " Lưu thay đổi" : " Tạo đề thi"}
          </button>
        </>
      }
      message={error && (
          <div className="ins-error-banner">
            <i className="fa-solid fa-triangle-exclamation" /> {error}
          </div>
        )}
    >
      <div className="ins-form-body">
        

        <div className="ins-form-group">
          <label className="ins-form-label">
            Tên đề thi <span className="ins-exam-modal-required">*</span>
          </label>
          <input
            type="text"
            className="ins-form-input"
            placeholder="Ví dụ: Đề thi thử B2 số 01"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="ins-form-group">
          <label className="ins-form-label">Mô tả</label>
          <textarea
            className="ins-form-textarea"
            rows={2}
            placeholder="Mô tả ngắn về đề thi..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="ins-exam-modal-metrics-grid">
          <div className="ins-form-group">
            <label className="ins-form-label">
              Thời gian (phút){" "}
              <span className="ins-exam-modal-required">*</span>
            </label>
            <input
              type="number"
              className="ins-form-input"
              min={1}
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          <div className="ins-form-group">
            <label className="ins-form-label">
              Điểm đạt <span className="ins-exam-modal-required">*</span>
            </label>
            <input
              type="number"
              className="ins-form-input"
              min={1}
              value={formData.passScore}
              onChange={(e) => handleChange("passScore", e.target.value)}
            />
          </div>

          {/* <div className="ins-form-group">
            <label className="ins-form-label">Ngẫu nhiên câu hỏi</label>
            <div className="ins-exam-modal-random-toggle-row">
              <RandomToggle
                value={formData.isRandom}
                onToggle={() => handleChange("isRandom", !formData.isRandom)}
              />
              <span className="ins-exam-modal-random-text">
                {formData.isRandom ? "Có" : "Không"}
              </span>
            </div>
          </div> */}
        </div>

        <div className="ins-exam-modal-selected-section">
          <div className="ins-exam-modal-selected-header">
            <label className="ins-form-label ins-exam-modal-selected-label">
              Câu hỏi ({selectedQuestions.length} câu){" "}
              <span className="ins-exam-modal-required">*</span>
            </label>
            <button
              type="button"
              className="ins-btn ins-btn-secondary ins-exam-modal-picker-toggle-btn"
              onClick={() => setPickerOpen((o) => !o)}
            >
              <i
                className={`fa-solid fa-${pickerOpen ? "chevron-up" : "plus"}`}
              />{" "}
              {pickerOpen ? "Thu gọn picker" : "Thêm câu hỏi"}
            </button>
          </div>

          {pickerOpen && (
            <div className="ins-exam-modal-picker-panel">
              <div className="ins-exam-modal-picker-search-row">
                <input
                  type="text"
                  className="ins-form-input ins-exam-modal-picker-search-input"
                  placeholder="Tìm kiếm câu hỏi..."
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePickerSearch()}
                />
                <button
                  type="button"
                  className="ins-btn ins-btn-secondary ins-exam-modal-picker-search-btn"
                  onClick={handlePickerSearch}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>

              {pickerLoading ? (
                <div className="ins-exam-modal-picker-loading">
                  <i className="fa-solid fa-spinner fa-spin" /> Đang tải...
                </div>
              ) : (
                <div className="ins-exam-modal-picker-list">
                  {pickerList.length === 0 ? (
                    <p className="ins-exam-modal-picker-empty">
                      Không tìm thấy câu hỏi nào.
                    </p>
                  ) : (
                    pickerList.map((q) => {
                      const selected = isQuestionSelected(q.id);
                      return (
                        <PickerQuestionItem
                          key={q.id}
                          question={q}
                          selected={selected}
                          onToggle={() => togglePickerQuestion(q)}
                        />
                      );
                    })
                  )}
                </div>
              )}

              {pickerTotalPages > 1 && (
                <div className="ins-exam-modal-picker-pagination">
                  <button
                    type="button"
                    className="ins-btn ins-btn-secondary ins-exam-modal-picker-page-btn"
                    disabled={pickerPage <= 1}
                    onClick={() => setPickerPage((p) => p - 1)}
                  >
                    ‹
                  </button>
                  <span className="ins-exam-modal-picker-page-indicator">
                    {pickerPage} / {pickerTotalPages}
                  </span>
                  <button
                    type="button"
                    className="ins-btn ins-btn-secondary ins-exam-modal-picker-page-btn"
                    disabled={pickerPage >= pickerTotalPages}
                    onClick={() => setPickerPage((p) => p + 1)}
                  >
                    ›
                  </button>
                </div>
              )}

              <div className="ins-exam-modal-picker-summary">
                Tổng {pickerTotal} câu hỏi · Đã chọn {selectedQuestions.length}
              </div>
            </div>
          )}

          {selectedQuestions.length === 0 ? (
            <div className="ins-exam-modal-selected-empty">
              <i className="fa-solid fa-inbox ins-exam-modal-selected-empty-icon" />
              Chưa có câu hỏi nào. Nhấn "Thêm câu hỏi" để chọn.
            </div>
          ) : (
            <div className="ins-exam-modal-selected-list">
              {selectedQuestions.map((sq, idx) => (
                <SelectedQuestionItem
                  key={sq.questionId}
                  item={sq}
                  index={idx}
                  onRemove={() => removeQuestion(sq.questionId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
