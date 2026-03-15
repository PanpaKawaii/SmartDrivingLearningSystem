import "./LessonContent.css";

export default function LessonContent({
  lessonName = "",
  lessonContentHtml = "",
  progress = null,
  onMarkLessonContentComplete = () => {},
}) {
  const hasLessonContent =
    typeof lessonContentHtml === "string" && lessonContentHtml.trim().length > 0;

  return (
    <div className="lesson-content-viewer">
      <div className="header">
        <div className="title">
          <div className="icon-box">
            <i className="fa-solid fa-book-open" />
          </div>
          <div>
            <h2>Lesson Content</h2>
            <p>HTML lesson content</p>
          </div>
        </div>
        {progress?.theory_completed && (
          <div className="completed">
            <span>Completed</span>
          </div>
        )}
      </div>

      {hasLessonContent ? (
        <>
          <div className="lesson-content-detail">
            <h3>{lessonName || "Lesson"}</h3>
            <div
              className="lesson-content-body"
              dangerouslySetInnerHTML={{ __html: lessonContentHtml }}
            />
          </div>

          {!progress?.theory_completed && (
            <div className="footer">
              <button
                onClick={onMarkLessonContentComplete}
                className="complete-button compact"
              >
                <i className="fa-regular fa-check-circle" />
                <span>Mark Complete</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty">
          <div className="empty-icon" />
          <p>No lesson content available</p>
        </div>
      )}
    </div>
  );
}