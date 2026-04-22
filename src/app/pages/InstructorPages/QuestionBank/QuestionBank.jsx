import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataTable from "../../../components/Shared/DataTable";
import FilterBar from "../../../components/Shared/FilterBar";
import QuestionModal from "./QuestionModal";
import { fetchData, patchData } from "../../../../mocks/CallingAPI";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import "../InstructorPages.css";

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const getQuestionType = (question) => {
  if (question?.type) return String(question.type).toUpperCase();
  const correctCount = (question?.answers || []).filter((a) =>
    Boolean(a?.isCorrect ?? a?.correct),
  ).length;
  return correctCount > 1 ? "MULTI" : "SINGLE";
};

const isDiemLietQuestion = (question) =>
  Boolean(
    question?.isDiemLiet ??
    question?.isDanger ??
    question?.isCritical ??
    question?.isRequired ??
    false,
  );

const buildAnswersForDetail = (answers = []) =>
  answers.map((answer, index) => ({
    ...answer,
    index: index + 1,
    label: String.fromCharCode(65 + index),
    text: answer?.content || answer?.text || "",
    correct: Boolean(answer?.isCorrect ?? answer?.correct),
  }));

export default function QuestionBank() {
  const { user, refreshNewToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = user?.token || "";

  // Query params từ Quick Navigate
  const lessonIdParam = searchParams.get("lessonId") || "";
  const chapterIdParam = searchParams.get("chapterId") || "";
  const licenseIdParam = searchParams.get("licenseId") || "";

  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [allChapters, setAllChapters] = useState([]);
  const [allLicenses, setAllLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [serverPagination, setServerPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    licenseId: licenseIdParam,
    chapterId: chapterIdParam,
    lessonId: lessonIdParam,
    status: "",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, licenseId: licenseIdParam }));
  }, [licenseIdParam]);

  // Sync filter khi query param thay đổi (browser back/forward)
  useEffect(() => {
    setFilters((prev) => ({ ...prev, lessonId: lessonIdParam }));
  }, [lessonIdParam]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, chapterId: chapterIdParam }));
  }, [chapterIdParam]);

  // Load lessons và chapters khi mở trang
  useEffect(() => {
    (async () => {
      try {
        const subQuery = new URLSearchParams({
          page: "1",
          pageSize: "500",
          status: 1,
        });
        const [lessonRes, chapterRes, dlRes] = await Promise.all([
          fetchData(`QuestionLessons?${subQuery.toString()}`, token),
          fetchData(`QuestionChapters?${subQuery.toString()}`, token),
          fetchData(`DrivingLicenses/all?${subQuery.toString()}`, token),
        ]);
        setAllLessons(normalizeItems(lessonRes));
        setAllChapters(normalizeItems(chapterRes));
        setAllLicenses(normalizeItems(dlRes));
      } catch (error) {
        // Silently fail - not critical
        console.error("Error loading lessons/chapters:", error);
      }
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams({
          page: String(serverPagination.page),
          pageSize: String(serverPagination.pageSize),
        });
        if (filters.search.trim()) query.set("content", filters.search.trim());
        if (filters.status !== "") query.set("status", filters.status);

        let res;
        if (filters.lessonId) {
          query.set("lessonId", filters.lessonId);
          res = await fetchData(`Questions?${query.toString()}`, token);
        } else if (filters.chapterId || filters.licenseId) {
          const chapterIds = filters.chapterId
            ? [filters.chapterId]
            : allChapters
                .filter((c) => c.drivingLicenseId === filters.licenseId)
                .map((c) => c.id);
          const queryAll = new URLSearchParams({ page: "1", pageSize: "5000" });
          if (filters.search.trim())
            queryAll.set("content", filters.search.trim());
          if (filters.status !== "") queryAll.set("status", filters.status);

          const r = await fetchData(`Questions?${queryAll.toString()}`, token);
          const rawItems = normalizeItems(r).filter((q) => {
            const qChapId =
              q?.questionLesson?.questionChapterId ||
              q?.questionLesson?.questionChapter?.id;
            return chapterIds.includes(qChapId);
          });

          res = {
            items: rawItems.slice(
              (serverPagination.page - 1) * serverPagination.pageSize,
              serverPagination.page * serverPagination.pageSize,
            ),
            page: serverPagination.page,
            pageSize: serverPagination.pageSize,
            totalCount: rawItems.length,
            totalPages:
              Math.ceil(rawItems.length / serverPagination.pageSize) || 1,
          };
        } else {
          res = await fetchData(`Questions?${query.toString()}`, token);
        }
        const items = normalizeItems(res);
        const mapped = items.map((question) => {
          const drivingLicenseId =
            question?.questionLesson?.questionChapter?.drivingLicenseId;
          //console.log('Fetching license for drivingLicenseId:', drivingLicenseId);
          const answersForDetail = buildAnswersForDetail(
            question.answers || [],
          );
          const correctAnswer =
            answersForDetail.find((answer) => answer.correct)?.index || null;
          const chapterName =
            question?.questionLesson?.questionChapter?.name || "—";
          const lessonName = question?.questionLesson?.name || "—";
          const categoryName = question?.questionCategory?.name || "—";
          const topicName = question?.questionTopic?.name || "—";
          return {
            id: question.id,
            position: question.position,
            content: question.content || "—",
            chapterName: chapterName,
            lessonName: lessonName,
            category: categoryName,
            topicName: topicName,
            status: question.status ?? 1,
            isDiemLiet: isDiemLietQuestion(question),
            type: getQuestionType(question),
            answersCount: question.answers?.length || 0,
            rawQuestion: {
              id: question.id,
              content: question.content || "—",
              chapterName: chapterName,
              drivingLicenseId: drivingLicenseId,
              lessonName: lessonName,
              category: categoryName,
              topicName: topicName,
              status: question.status ?? 1,
              isDiemLiet: isDiemLietQuestion(question),
              type: getQuestionType(question),
              answers: answersForDetail,
              explanation: question.explanation || "",
              image: question.image || "",
              correctAnswer,
              questionLessonId:
                question.questionLessonId || question.questionLesson?.id || "",
              questionTopicId:
                question.questionTopicId || question.questionTopic?.id || "",
              questionCategoryId:
                question.questionCategoryId ||
                question.questionCategory?.id ||
                "",
              questionTags: question.questionTags || [],
              index: question.index ?? question.position ?? 1,
            },
          };
        });

        setQuestions(mapped);
        setServerPagination((prev) => ({
          ...prev,
          page: res?.page || prev.page,
          pageSize: res?.pageSize || prev.pageSize,
          totalCount: res?.totalCount ?? prev.totalCount,
          totalPages: res?.totalPages || 1,
        }));
      } catch (error) {
        if (error.status === 401) {
          refreshNewToken(user);
        } else {
          setError("Lỗi tải dữ liệu câu hỏi.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [
    token,
    refresh,
    serverPagination.page,
    serverPagination.pageSize,
    filters.search,
    filters.lessonId,
    filters.chapterId,
    filters.licenseId,
    filters.status,
  ]);

  const handlePageChange = (page) => {
    setServerPagination((prev) => ({ ...prev, page }));
  };

  const handleSearch = (search) => {
    setFilters((prev) => ({ ...prev, search }));
    setServerPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterLicense = (val) => {
    setFilters((prev) => ({
      ...prev,
      licenseId: val,
      chapterId: "",
      lessonId: "",
    }));
    setServerPagination((prev) => ({ ...prev, page: 1 }));
    setSearchParams(val ? { licenseId: val } : {});
  };

  const handleFilterChapter = (val) => {
    setFilters((prev) => ({ ...prev, chapterId: val, lessonId: "" }));
    setServerPagination((prev) => ({ ...prev, page: 1 }));
    setSearchParams(
      val
        ? { licenseId: filters.licenseId, chapterId: val }
        : { licenseId: filters.licenseId },
    );
  };

  const handleFilterLesson = (val) => {
    setFilters((prev) => ({ ...prev, lessonId: val }));
    setServerPagination((prev) => ({ ...prev, page: 1 }));
    setSearchParams(
      val
        ? {
            licenseId: filters.licenseId,
            chapterId: filters.chapterId,
            lessonId: val,
          }
        : { licenseId: filters.licenseId, chapterId: filters.chapterId },
    );
  };

  const handleFilterStatus = (val) => {
    setFilters((prev) => ({ ...prev, status: val }));
    setServerPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleClearFilter = () => {
    setFilters((prev) => ({
      ...prev,
      search: "",
      licenseId: "",
      chapterId: "",
      lessonId: "",
      status: "",
    }));
    setSearchParams({});
    setServerPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleToggleStatus = async (id) => {
    try {
      await patchData(`Questions/${id}`, {}, token);
      setRefresh((r) => r + 1);
    } catch (error) {
      if (error.status === 401) {
        refreshNewToken(user);
      } else {
        setError("Lỗi cập nhật trạng thái");
      }
    }
  };

  const columns = [
    {
      key: "position",
      label: "STT",
      width: "60px",
      render: (val, __, rIdx, page, pageSize) =>
        val ?? (page - 1) * pageSize + rIdx + 1,
    },
    {
      key: "content",
      label: "Nội dung câu hỏi",
      render: (val, row) => (
        <div style={{ padding: "4px 0" }}>
          <div
            style={{
              fontWeight: 600,
              color: "var(--ins-on-background)",
              marginBottom: "8px",
              lineHeight: "1.4",
            }}
          >
            {val && val.length > 80 ? (
              <span title={val}>{val.substring(0, 80)}...</span>
            ) : (
              val
            )}
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "var(--ins-on-surface)",
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <span title="Số đáp án">
              <i
                className="fa-solid fa-list-ul"
                style={{ marginRight: "6px", color: "var(--ins-primary)" }}
              ></i>
              {row.answersCount} đáp án
            </span>
            <span title="Loại câu hỏi">
              <i
                className={
                  row.type === "SINGLE"
                    ? "fa-regular fa-circle-dot"
                    : "fa-regular fa-square-check"
                }
                style={{ marginRight: "6px", color: "var(--ins-primary)" }}
              ></i>
              {row.type === "SINGLE" ? "Đơn lựa chọn" : "Đa lựa chọn"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Phân loại & Chủ đề",
      width: "220px",
      render: (_, row) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--ins-on-background)",
            }}
          >
            <i
              className="fa-solid fa-layer-group"
              style={{ marginRight: "6px", opacity: 0.7 }}
            ></i>
            {row.category}
          </span>
          {row.topicName !== "—" && (
            <span
              style={{ fontSize: "0.8rem", color: "var(--ins-on-surface)" }}
            >
              <i
                className="fa-solid fa-hashtag"
                style={{ marginRight: "6px", opacity: 0.5 }}
              ></i>
              {row.topicName}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "isDiemLiet",
      label: "Câu điểm liệt",
      width: "130px",
      render: (val) => (
        <span className={`ins-status-chip ${val ? "rejected" : "active"}`}>
          <span className="chip-dot"></span>
          {val ? "Điểm liệt" : "Bình thường"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      width: "120px",
      render: (val) => (
        <span
          className={`ins-status-chip ${val === 1 ? "approved" : "rejected"}`}
        >
          <span className="chip-dot" />
          {val === 1 ? "Hoạt động" : "Đã ẩn"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Thao tác",
      width: "140px",
      render: (_, row) => (
        <div className="ins-action-cell">
          <button
            className="ins-action-btn view"
            title="Xem chi tiết"
            onClick={() =>
              navigate(`/instructor/question-bank/${row.id}`, {
                state: { question: row.rawQuestion },
              })
            }
          >
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            className="ins-action-btn edit"
            title="Sửa"
            onClick={() => {
              setEditingQuestion(row.rawQuestion);
              setShowModal(true);
            }}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          <button
            className={`ins-action-btn ${row.status === 1 ? "delete" : "view"}`}
            title={row.status === 1 ? "Đặt thành nháp" : "Kích hoạt"}
            onClick={() => handleToggleStatus(row.id)}
          >
            <i
              className={`fa-solid fa-toggle-${row.status === 1 ? "on" : "off"}`}
              style={{ fontSize: "1.2rem" }}
            />
          </button>
        </div>
      ),
    },
  ];

  // Context Badge
  const activeBadge = (() => {
    let badge = [];
    if (filters.search.trim()) {
      badge.push({
        text: `"${filters.search.trim()}"`,
        onClear: () => handleClearFilter(),
      });
    }
    if (filters.status !== "") {
      badge.push({
        text: filters.status === "1" ? "Hoạt động" : "Đã ẩn",
        onClear: () => handleFilterStatus(""),
      });
    }
    if (filters.lessonId) {
      const lesson = allLessons.find((l) => l.id === filters.lessonId);
      badge.push({
        text: lesson?.name || "Bài học",
        onClear: () => handleClearFilter(),
      });
    } else if (filters.chapterId) {
      const chapter = allChapters.find((c) => c.id === filters.chapterId);
      badge.push({
        text: chapter?.name || "Chương",
        onClear: () => handleClearFilter(),
      });
    } else if (filters.licenseId) {
      const license = allLicenses.find((c) => c.id === filters.licenseId);
      badge.push({
        text: license?.name || "Bằng",
        onClear: () => handleClearFilter(),
      });
    }
    return badge;
  })();

  return (
    <div className="ins-page">
      <div className="ins-page-header">
        <div>
          <h1>Ngân hàng Câu hỏi</h1>
          <p>Quản lý danh sách câu hỏi sát hạch lái xe các hạng.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {(filters.lessonId || filters.chapterId) && (
            <button
              className="ins-btn"
              style={{
                background: "var(--ins-surface-high)",
                color: "var(--ins-on-surface)",
              }}
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
          )}
          <button
            className="ins-btn ins-btn-primary"
            onClick={() => {
              setEditingQuestion(null);
              setShowModal(true);
            }}
          >
            <i className="fa-solid fa-plus"></i> Thêm câu hỏi
          </button>
        </div>
      </div>

      <FilterBar
        // searchOptions={[
        //   {
        //     placeholder: "Tìm kiếm câu hỏi...",
        //     value: filters.search,
        //     onChange: (val) => setFilters((prev) => ({ ...prev, search: val })),
        //   },
        // ]}
        selectOptions={[
          {
            placeholder: "— Tất cả bằng lái —",
            value: filters.licenseId,
            options: allLicenses,
            onChange: handleFilterLicense,
          },
          {
            placeholder: filters.licenseId
              ? "— Tất cả chương —"
              : "— Chọn bằng lái —",
            value: filters.chapterId,
            options: filters.licenseId
              ? allChapters.filter(
                  (c) => c.drivingLicenseId === filters.licenseId,
                )
              : [],
            disabled: !filters.licenseId,
            onChange: handleFilterChapter,
          },
          {
            placeholder: filters.chapterId
              ? "— Tất cả bài học —"
              : "— Chọn chương trước —",
            value: filters.lessonId,
            options: filters.chapterId
              ? allLessons.filter(
                  (l) => l.questionChapterId === filters.chapterId,
                )
              : [],
            disabled: !filters.chapterId,
            onChange: handleFilterLesson,
          },
          {
            placeholder: "— Trạng thái —",
            value: filters.status,
            options: [
              { id: "1", name: "Hoạt động" },
              { id: "0", name: "Đã ẩn" },
            ],
            onChange: handleFilterStatus,
          },
        ]}
        onSearch={() => setServerPagination((prev) => ({ ...prev, page: 1 }))}
        onReset={handleClearFilter}
      />

      <DataTable
        title={`Hiển thị ${questions.length}/${serverPagination.totalCount || questions.length} câu hỏi`}
        columns={columns}
        data={questions}
        loading={loading}
        serverPagination={serverPagination}
        onPageChange={handlePageChange}
        contextBadge={activeBadge.length > 0 ? activeBadge : null}
        actions={
          <>
            <button
              className="ins-btn ins-btn-secondary"
              onClick={() => setRefresh((r) => r + 1)}
              disabled={loading}
            >
              <i className="fa-solid fa-rotate-right"></i> Làm mới
            </button>
            {/* <button className="ins-btn ins-btn-secondary" onClick={() => {}}>
              <i className="fa-solid fa-file-import"></i> Nhập Excel
            </button> */}
          </>
        }
      />

      {error && (
        <div className="ins-error-banner" style={{ marginTop: 12 }}>
          <i className="fa-solid fa-triangle-exclamation" /> {error}
        </div>
      )}

      <QuestionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => setRefresh((r) => r + 1)}
        initialData={editingQuestion}
      />
    </div>
  );
}
