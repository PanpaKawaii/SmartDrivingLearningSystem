import React, { useState, useEffect } from "react";
import Modal from "../../../components/Shared/Modal";
import { fetchData, postData, putData } from "../../../../mocks/CallingAPI";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import './QuestionModal.css';
const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

export default function QuestionModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) {
  const { user, refreshNewToken } = useAuth();
  const token = user?.token || "";

  const isEdit = !!initialData?.id;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    questionLessonId: "",
    questionTopicId: "",
    questionCategoryId: "",
    content: "",
    image: "",
    explanation: "",
    type: "SINGLE",
    answers: [
      { content: "", isCorrect: true },
      { content: "", isCorrect: false },
    ],
    questionTags: [],
    index: 1,
  });

  const [allLicenses, setAllLicenses] = useState([]);
  const [allChapters, setAllChapters] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [selectedLicenseId, setSelectedLicenseId] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");

  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError("");

      Promise.all([
        fetchData("DrivingLicenses?page=1&pageSize=5000", token).catch(
          () => [],
        ),
        fetchData("QuestionChapters?page=1&pageSize=5000", token).catch(
          () => [],
        ),
        fetchData("QuestionLessons?page=1&pageSize=5000", token).catch(
          () => [],
        ),
        fetchData("QuestionTopics?page=1&pageSize=5000", token).catch(() => []),
        fetchData("QuestionCategories?page=1&pageSize=5000", token).catch(
          () => [],
        ),
        fetchData("Tags?page=1&pageSize=5000", token).catch(() => []),
      ])
        .then(
          ([
            resLicenses,
            resChapters,
            resLessons,
            resTopics,
            resCategories,
            resTags,
          ]) => {
            const licensesData = normalizeItems(resLicenses);
            const chaptersData = normalizeItems(resChapters);
            const lessonsData = normalizeItems(resLessons);

            setAllLicenses(licensesData);
            setAllChapters(chaptersData);
            setAllLessons(lessonsData);

            setTopics(normalizeItems(resTopics));
            setCategories(normalizeItems(resCategories));
            setAllTags(normalizeItems(resTags));

            if (isEdit && initialData?.questionLessonId) {
              const initLesson = lessonsData.find(
                (l) => l.id === initialData.questionLessonId,
              );
              const initChapterId = initLesson?.questionChapterId || "";
              const initChapter = chaptersData.find(
                (c) => c.id === initChapterId,
              );
              const initLicenseId = initChapter?.drivingLicenseId || "";

              setSelectedLicenseId(initLicenseId);
              setSelectedChapterId(initChapterId);
            } else {
              setSelectedLicenseId("");
              setSelectedChapterId("");
            }
          },
        )
        .finally(() => {
          setLoading(false);
        });

      if (isEdit && initialData) {
        setFormData({
          questionLessonId: initialData.questionLessonId || "",
          questionTopicId: initialData.questionTopicId || "",
          questionCategoryId: initialData.questionCategoryId || "",
          content: initialData.content || "",
          image: initialData.image || "",
          explanation: initialData.explanation || "",
          type: initialData.type || "SINGLE",
          answers:
            initialData.answers?.length > 0
              ? initialData.answers.map((a) => ({
                  id: a.id,
                  questionId: a.questionId,
                  content: a.content || a.text,
                  isCorrect: a.isCorrect ?? a.correct ?? false,
                  status: a.status ?? 1,
                }))
              : [
                  { content: "", isCorrect: true },
                  { content: "", isCorrect: false },
                ],
          questionTags: initialData.questionTags || [],
          index: initialData.index || 0,
        });
      } else {
        setFormData({
          questionLessonId: "",
          questionTopicId: "",
          questionCategoryId: "",
          content: "",
          image: "",
          explanation: "",
          type: "SINGLE",
          answers: [
            { content: "", isCorrect: true },
            { content: "", isCorrect: false },
          ],
          questionTags: [],
          index: 0,
        });
      }
    }
  }, [isOpen, isEdit, initialData, token]);

  const handleLicenseChange = (e) => {
    setSelectedLicenseId(e.target.value);
    setSelectedChapterId("");
    setFormData((prev) => ({ ...prev, questionLessonId: "" }));
  };

  const handleChapterChange = (e) => {
    setSelectedChapterId(e.target.value);
    setFormData((prev) => ({ ...prev, questionLessonId: "" }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tagId) => {
    setFormData((prev) => {
      const hasTag = prev.questionTags.some((t) => t.tagId === tagId);
      if (hasTag) {
        return {
          ...prev,
          questionTags: prev.questionTags.filter((t) => t.tagId !== tagId),
        };
      } else {
        return { ...prev, questionTags: [...prev.questionTags, { tagId }] };
      }
    });
  };

  const handleAnswerChange = (index, field, value) => {
    setFormData((prev) => {
      const newAnswers = [...prev.answers];
      if (field === "isCorrect" && formData.type === "SINGLE") {
        if (value) {
          newAnswers.forEach((a, i) => (a.isCorrect = i === index));
        } else {
          newAnswers[index][field] = value;
        }
      } else {
        newAnswers[index][field] = value;
      }
      return { ...prev, answers: newAnswers };
    });
  };

  const addAnswer = () => {
    setFormData((prev) => ({
      ...prev,
      answers: [...prev.answers, { content: "", isCorrect: false }],
    }));
  };

  const removeAnswer = (index) => {
    if (formData.answers.length <= 2) return; //set defaut 2 answers, không cho xóa nếu chỉ còn 2 đáp án
    setFormData((prev) => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== index),
    }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const newAnswers = [...formData.answers];
    if (newType === "SINGLE") {
      let correctFound = false;
      newAnswers.forEach((a) => {
        if (a.isCorrect && !correctFound) {
          correctFound = true;
        } else {
          a.isCorrect = false;
        }
      });
      //set default đáp án đầu tiên là đúng
      if (!correctFound && newAnswers.length > 0)
        newAnswers[0].isCorrect = true;
    }
    setFormData((prev) => ({ ...prev, type: newType, answers: newAnswers }));
  };

  const handleSubmit = async () => {
    try {
      setError("");
      if (!formData.questionLessonId) return setError("Vui lòng chọn bài học");
      if (!formData.questionTopicId) return setError("Vui lòng chọn chủ đề");
      if (!formData.questionCategoryId)
        return setError("Vui lòng chọn phân loại");
      if (!formData.content.trim())
        return setError("Vui lòng nhập nội dung câu hỏi");
      if (formData.answers.some((a) => !a.content.trim()))
        return setError("Vui lòng không để trống nội dung đáp án");
      if (!formData.answers.some((a) => a.isCorrect))
        return setError("Câu hỏi phải có ít nhất 1 đáp án đúng");
      if (Number(formData.index) <= 0)
        return setError("Thứ tự (Index) bắt buộc nhập và phải lớn hơn 0");
      setSubmitting(true);
      const basePayload = {
        questionLessonId: formData.questionLessonId,
        questionTopicId: formData.questionTopicId,
        questionCategoryId: formData.questionCategoryId,
        content: formData.content,
        image: formData.image,
        explanation: formData.explanation,
        type: formData.type,
        index: Number(formData.index),
      };

      if (isEdit) {
        const questionId = initialData?.id;
        const payload = {
          ...basePayload,
          status: initialData?.status ?? 1,
          answers: formData.answers.map((a) => ({
            ...(a?.id ? { id: a.id } : {}),
            questionId: a?.questionId || questionId,
            content: a.content,
            isCorrect: !!a.isCorrect,
            status: a?.status ?? 1,
          })),
          questionTags: formData.questionTags.map((t) => ({
            ...(t?.id ? { id: t.id } : {}),
            questionId: t?.questionId || questionId,
            tagId: t.tagId,
            status: t?.status ?? 1,
          })),
        };
        console.log("Updating question with payload:", payload);
        await putData(`Questions/${initialData.id}`, payload, token);
      } else {
        const payload = {
          ...basePayload,
          answers: formData.answers.map((a) => ({
            content: a.content,
            isCorrect: !!a.isCorrect,
          })),
          questionTags: formData.questionTags.map((t) => ({
            tagId: t.tagId,
          })),
        };
        console.log("Creating question with payload:", payload);
        await postData("Questions", payload, token);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        refreshNewToken(user);
      } else {
        setError(
          error.data?.message ||
            error.message ||
            "Có lỗi xảy ra khi lưu câu hỏi",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const filteredChapters = allChapters.filter(
    (ch) => ch.drivingLicenseId === selectedLicenseId,
  );
  const filteredLessons = allLessons.filter(
    (l) => l.questionChapterId === selectedChapterId,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
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
            disabled={submitting || loading}
          >
            {submitting ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-save"></i>
            )}
            {isEdit ? " Lưu thay đổi" : " Thêm câu hỏi"}
          </button>
        </>
      }
      message={error && (
            <div className="ins-error-banner">
              <i className="fa-solid fa-triangle-exclamation"></i> {error}
            </div>
          )}
    >
      {loading ? (
        <div className="ins-modal-loading">
          <i className="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu...
        </div>
      ) : (
        <div className="ins-form-body ins-question-modal">
          

          <div className="ins-form-grid ins-question-grid-main">
            <div className="ins-form-group">
              <label className="ins-form-label">Bằng</label>
              <select
                className="ins-form-select"
                value={selectedLicenseId}
                onChange={handleLicenseChange}
              >
                <option value="">-- Chọn bằng --</option>
                {allLicenses.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ins-form-group">
              <label className="ins-form-label">Chương</label>
              <select
                className="ins-form-select"
                value={selectedChapterId}
                onChange={handleChapterChange}
                disabled={!selectedLicenseId}
              >
                <option value="">-- Chọn chương --</option>
                {filteredChapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ins-form-group">
              <label className="ins-form-label">
                Bài học <span style={{ color: "var(--ins-error)" }}>*</span>
              </label>
              <select
                className="ins-form-select"
                value={formData.questionLessonId}
                onChange={(e) =>
                  handleChange("questionLessonId", e.target.value)
                }
                disabled={!selectedChapterId}
              >
                <option value="">-- Chọn bài học --</option>
                {filteredLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ins-form-grid ins-question-grid-secondary">
            <div className="ins-form-group">
              <label className="ins-form-label">
                Chủ đề <span style={{ color: "var(--ins-error)" }}>*</span>
              </label>
              <select
                className="ins-form-select"
                value={formData.questionTopicId}
                onChange={(e) =>
                  handleChange("questionTopicId", e.target.value)
                }
              >
                <option value="">-- Chọn chủ đề --</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ins-form-group">
              <label className="ins-form-label">
                Phân loại <span style={{ color: "var(--ins-error)" }}>*</span>
              </label>
              <select
                className="ins-form-select"
                value={formData.questionCategoryId}
                onChange={(e) =>
                  handleChange("questionCategoryId", e.target.value)
                }
              >
                <option value="">-- Chọn phân loại --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ins-form-group">
            <label className="ins-form-label">
              Nội dung câu hỏi{" "}
              <span style={{ color: "var(--ins-error)" }}>*</span>
            </label>
            <textarea
              className="ins-form-textarea"
              rows={3}
              placeholder="Nhập nội dung câu hỏi..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>

          <div className="ins-form-grid ins-form-grid-3">
            <div className="ins-form-group">
              <label className="ins-form-label">Hình ảnh (URL)</label>
              <input
                type="text"
                className="ins-form-input"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </div>
            <div className="ins-form-group">
              <label className="ins-form-label">Loại câu hỏi</label>
              <select
                className="ins-form-select"
                value={formData.type}
                onChange={handleTypeChange}
              >
                <option value="SINGLE">Một đáp án đúng</option>
                <option value="MULTI">Nhiều đáp án đúng</option>
              </select>
            </div>
            <div className="ins-form-group">
              <label className="ins-form-label">
                Thứ tự (Index)
                <span style={{ color: "var(--ins-error)" }}>*</span>
              </label>
              <input
                type="number"
                className="ins-form-input"
                placeholder="0"
                value={formData.index}
                onChange={(e) => handleChange("index", e.target.value)}
              />
            </div>
          </div>

          <div className="ins-form-group">
            <label className="ins-form-label">Giải thích đáp án</label>
            <textarea
              className="ins-form-textarea"
              rows={2}
              placeholder="Giải thích vì sao chọn đáp án này..."
              value={formData.explanation}
              onChange={(e) => handleChange("explanation", e.target.value)}
            />
          </div>

          <div className="ins-form-group">
            <label className="ins-form-label">Tags (Từ khóa)</label>
            {allTags.length === 0 ? (
              <div className="ins-text-empty">
                Không có tag nào trong hệ thống.
              </div>
            ) : (
              <div className="ins-tags-container">
                {allTags.map((tag) => {
                  const isSelected = formData.questionTags.some(
                    (t) => t.tagId === tag.id,
                  );
                  return (
                    <div
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`ins-tag-chip ${isSelected ? "selected" : ""}`}
                      style={
                        tag.colorCode ? { "--tag-color": tag.colorCode } : {}
                      }
                    >
                      {tag.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <hr className="ins-form-divider" />

          <div className="ins-form-group">
            <div className="ins-answers-header">
              <label className="ins-form-label">
                Danh sách đáp án{" "}
                <span style={{ color: "var(--ins-error)" }}>*</span>
              </label>
              <button
                className="ins-btn ins-btn-secondary ins-btn-add"
                onClick={addAnswer}
                type="button"
              >
                <i className="fa-solid fa-plus"></i> Thêm đáp án
              </button>
            </div>

            <div className="ins-answers-list">
              {formData.answers.map((ans, idx) => (
                <div key={idx} className="ins-answer-row">
                  <div
                    className={`ins-answer-marker ${ans.isCorrect ? "correct" : ""}`}
                    onClick={() =>
                      handleAnswerChange(idx, "isCorrect", !ans.isCorrect)
                    }
                    title={
                      formData.type === "SINGLE"
                        ? "Chọn làm đáp án đúng"
                        : "Đánh dấu đúng/sai"
                    }
                  >
                    {ans.isCorrect ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <div className="ins-answer-input-container">
                    <input
                      type="text"
                      className={`ins-form-input ins-answer-input ${ans.isCorrect ? "correct" : ""}`}
                      placeholder={`Nội dung đáp án ${String.fromCharCode(65 + idx)}...`}
                      value={ans.content}
                      onChange={(e) =>
                        handleAnswerChange(idx, "content", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className={`ins-action-btn remove ${formData.answers.length > 2 ? "active" : ""}`}
                    onClick={() => removeAnswer(idx)}
                    disabled={formData.answers.length <= 2}
                    title="Xóa đáp án"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
