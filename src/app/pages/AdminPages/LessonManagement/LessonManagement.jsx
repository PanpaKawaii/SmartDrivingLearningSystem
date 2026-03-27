import { useEffect, useState } from "react";
import { deleteData, fetchData, putData } from "../../../../mocks/CallingAPI";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import MovingLabelInput from "../../../components/MovingLabelInput/MovingLabelInput";
import StyleLabelSelect from "../../../components/StyleLabelSelect/StyleLabelSelect";
import EditLessonModal from "./EditLessonModal";
import TrafficLight from "../../../components/TrafficLight/TrafficLight";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import "./LessonManagement.css";
export default function LessonManagement() {
  const { user } = useAuth();

  const [LESSONs, setLESSONs] = useState([]);
  const [QUESTIONCHAPTERs, setQUESTIONCHAPTERs] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorFunction, setErrorFunction] = useState(null);
  const [popupProps, setPopupProps] = useState(null);
  const [deletePopupProps, setDeletePopupProps] = useState(null);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const [searchLesson, setSearchLesson] = useState("");
  const [selectChapter, setSelectChapter] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const statusOptions = [
    { id: 1, name: "Active" },
    { id: 0, name: "Inactive" },
  ];

  useEffect(() => {
    (async () => {
      setError(null);
      setLoading(true);
      try {
        const token = user?.token || "";
        const chapterQuery = new URLSearchParams({
          page: "1",
          pageSize: "500",
        });
        const lessonQuery = new URLSearchParams({
          page: "1",
          pageSize: "500",
        });
        const activeLessonQuery = new URLSearchParams({
          page: "1",
          pageSize: "500",
          status: "1",
        });
        const inactiveLessonQuery = new URLSearchParams({
          page: "1",
          pageSize: "500",
          status: "0",
        });

        const chapterResponseRaw = await fetchData(
          `api/questionchapters?${chapterQuery.toString()}`,
          token,
        );
        const lessonResponseRaw = await fetchData(
          `api/questionlessons?${lessonQuery.toString()}`,
          token,
        );
        const [activeLessonResponseRaw, inactiveLessonResponseRaw] = await Promise.all([
          fetchData(`api/questionlessons?${activeLessonQuery.toString()}`, token),
          fetchData(`api/questionlessons?${inactiveLessonQuery.toString()}`, token),
        ]);

        const chapterResponse = Array.isArray(chapterResponseRaw?.items)
          ? chapterResponseRaw.items
          : [];
        const lessonResponse = Array.isArray(lessonResponseRaw?.items)
          ? lessonResponseRaw.items
          : [];
        const activeLessonResponse = Array.isArray(activeLessonResponseRaw?.items)
          ? activeLessonResponseRaw.items
          : [];
        const inactiveLessonResponse = Array.isArray(inactiveLessonResponseRaw?.items)
          ? inactiveLessonResponseRaw.items
          : [];

        const lessonById = new Map();
        [...lessonResponse, ...activeLessonResponse, ...inactiveLessonResponse].forEach(
          (item) => {
            if (item?.id !== undefined && item?.id !== null) {
              lessonById.set(String(item.id), item);
            }
          },
        );
        const mergedLessons = Array.from(lessonById.values());

        const lessonsWithChapter = mergedLessons.map((lesson) => ({
          ...lesson,
          chapter:
            chapterResponse.find(
              (c) => String(c.id) === String(lesson.questionChapterId),
            ) || null,
        }));

        setQUESTIONCHAPTERs(chapterResponse);
        setLESSONs(lessonsWithChapter);
      } catch (error) {
        setError(error?.message || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh, user?.token]);

  const lessonsFilter = LESSONs.filter((lesson) => {
    const matchSearch =
      !searchLesson ||
      lesson.name?.toLowerCase().includes(searchLesson.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchLesson.toLowerCase());
    const matchChapter =
      !selectChapter ||
      Number(lesson.questionChapterId) === Number(selectChapter);
    const matchStatus =
      selectStatus === "" || Number(lesson.status) === Number(selectStatus);

    return matchSearch && matchChapter && matchStatus;
  });

  const handleClear = () => {
    setSearchLesson("");
    setSelectChapter("");
    setSelectStatus("");
  };

  const openEditModal = (lesson) => {
    setEditing(lesson);
  };

  const closeEditModal = () => {
    setEditing(null);
  };

  const openCreateModal = () => {
    setCreating(true);
  };

  const closeCreateModal = () => {
    setCreating(false);
  };

  const handleLessonSaved = (lessonData, action) => {
    const chapter =
      QUESTIONCHAPTERs.find(
        (item) => String(item.id) === String(lessonData.questionChapterId),
      ) || null;

    const normalizedLesson = {
      ...lessonData,
      chapter,
    };

    if (action === "edit") {
      setLESSONs((prev) =>
        prev.map((lesson) =>
          String(lesson.id) === String(normalizedLesson.id)
            ? normalizedLesson
            : lesson,
        ),
      );
      return;
    }

    setLESSONs((prev) => [normalizedLesson, ...prev]);
  };

  const toggleLessonStatus = async (lesson) => {
    const token = user?.token || "";
    const nextLesson = {
      id: lesson.id,
      status: Number(lesson.status) === 1 ? 0 : 1,
    };

    try {
      await putData(`api/questionlessons/${nextLesson.id}`, nextLesson, token);

      setLESSONs((prev) =>
        prev.map((item) =>
          String(item.id) === String(nextLesson.id)
            ? { ...item, ...nextLesson }
            : item,
        ),
      );
    } catch (error) {
      setErrorFunction(error?.message || "Error");
    }
  };

  const handleDeleteLesson = async (lesson) => {
    const token = user?.token || "";

    try {
      await deleteData(`api/questionlessons/${lesson.id}`, token);
      setLESSONs((prev) =>
        prev.filter((item) => String(item.id) !== String(lesson.id)),
      );
    } catch (error) {
      setErrorFunction(error?.message || "Error");
    }
  };

  if (loading)
    return (
      <div className="admin-container">
        <TrafficLight text={"loading"} setRefresh={() => {}} />
      </div>
    );
  if (error)
    return (
      <div className="admin-container">
        <TrafficLight text={"error"} setRefresh={setRefresh} />
      </div>
    );

  return (
    <div className="admin-container">
      <div className="inner-container management-container lesson-management-container">
        <header className="main-header">
          <h1>Lesson Management</h1>
          <button className="btn-primary" type="button" onClick={openCreateModal}>
            <i className="fa-solid fa-plus" />
            Add more lesson
          </button>
        </header>

        <form className="controls">
          <div className="count">{lessonsFilter?.length} results</div>
          <div className="search-bar">
            <MovingLabelInput
              type={"text"}
              value={searchLesson || ""}
              onValueChange={(propE) => setSearchLesson(propE)}
              extraClassName={""}
              extraStyle={{}}
              label={"Name or description"}
              labelStyle={"left moving"}
            />
          </div>
          <div className="field">
            <StyleLabelSelect
              id={"chapter-select"}
              list={QUESTIONCHAPTERs}
              value={selectChapter}
              onValueChange={(propE) => setSelectChapter(propE)}
              extraClassName={""}
              extraStyle={{}}
              label={"Chapter"}
              labelStyle={"left"}
            />
            <StyleLabelSelect
              id={"status-select"}
              list={statusOptions}
              value={selectStatus}
              onValueChange={(propE) => setSelectStatus(propE)}
              extraClassName={""}
              extraStyle={{}}
              label={"Status"}
              labelStyle={"left"}
            />
          </div>
          <button type="button" className="btn-secondary" onClick={handleClear}>
            CLEAR
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setRefresh((p) => p + 1)}
          >
            Refresh
          </button>
        </form>

        <section className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>LESSON</th>
                <th>CHAPTER</th>
                <th>DESCRIPTION</th>
                <th>CONTENT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {lessonsFilter?.map((lesson, index) => (
                <tr key={lesson.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{lesson.name}</div>
                  </td>
                  <td>
                    <span>{lesson.chapter?.name || "--"}</span>
                  </td>
                  <td>
                    <span>{lesson.description || "--"}</span>
                  </td>
                  <td>
                    {lesson.content ? (
                      <span
                        className="lesson-content-ellipsis"
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                      />
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td>
                    <span className={lesson.status == 1 ? "status-tag status-active" : "status-tag status-inactive"}>
                      {lesson.status == 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button type="button" onClick={() => openEditModal(lesson)}>
                        <span>Modify</span>
                        <i className="fa-solid fa-pencil" />
                      </button>
                      <button
                        type="button"
                        className={`btn-active ${lesson.status == 0 && "abb"}`}
                        onClick={() => setPopupProps(lesson)}
                        disabled={lesson.status == 1}
                      >
                        <span>Active</span>
                        <i className="fa-solid fa-unlock" />
                      </button>
                      <button
                        type="button"
                        className={`btn-inactive ${lesson.status == 1 && "abb"}`}
                        onClick={() => setPopupProps(lesson)}
                        disabled={lesson.status == 0}
                      >
                        <span>Inactive</span>
                        <i className="fa-solid fa-lock" />
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => setDeletePopupProps(lesson)}
                      >
                        <span>Delete</span>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {editing && (
          <EditLessonModal
            lessonProp={editing}
            onClose={closeEditModal}
            setRefresh={setRefresh}
            action={"edit"}
            additionalData={{ questionChapters: QUESTIONCHAPTERs }}
            onSave={handleLessonSaved}
            onError={setErrorFunction}
          />
        )}

        {creating && (
          <EditLessonModal
            lessonProp={{
              id: "",
              questionChapterId: QUESTIONCHAPTERs[0]?.id || "",
              name: "",
              description: "",
              content: "",
              status: 1,
            }}
            onClose={closeCreateModal}
            setRefresh={setRefresh}
            action={"create"}
            additionalData={{ questionChapters: QUESTIONCHAPTERs }}
            onSave={handleLessonSaved}
            onError={setErrorFunction}
          />
        )}

        {popupProps && (
          <ConfirmDialog
            title={"CONFIRMATION"}
            message={`Are you sure you want to ${popupProps.status == 1 ? "inactive" : "active"} this lesson?`}
            confirm={popupProps.status == 1 ? "INACTIVE" : "ACTIVE"}
            cancel={"CANCEL"}
            color={popupProps.status == 1 ? "#ff4d4f80" : "#52c41a80"}
            onConfirm={() => {
              toggleLessonStatus(popupProps);
              setPopupProps(null);
            }}
            onCancel={() => setPopupProps(null)}
          />
        )}

        {deletePopupProps && (
          <ConfirmDialog
            title={"CONFIRMATION"}
            message={`Are you sure you want to delete lesson \"${deletePopupProps.name || ""}\"?`}
            confirm={"DELETE"}
            cancel={"CANCEL"}
            color={"#ff4d4f80"}
            onConfirm={() => {
              handleDeleteLesson(deletePopupProps);
              setDeletePopupProps(null);
            }}
            onCancel={() => setDeletePopupProps(null)}
          />
        )}

        {errorFunction && (
          <ConfirmDialog
            title={"ERROR"}
            message={"An error has occurred!"}
            confirm={"OKAY"}
            cancel={""}
            color={"#ff4d4f80"}
            onConfirm={() => setErrorFunction(null)}
            onCancel={() => setErrorFunction(null)}
          />
        )}
      </div>
    </div>
  );
}
