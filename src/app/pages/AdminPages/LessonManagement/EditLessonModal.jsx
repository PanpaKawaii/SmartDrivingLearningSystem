import { useEffect, useState } from "react";
import { postData, putData } from "../../../../mocks/CallingAPI";
import { useAuth } from "../../../hooks/AuthContext/AuthContext";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";

import "../EditModal.css";

export default function EditLessonModal({
	lessonProp,
	onClose,
	setRefresh,
	action,
	additionalData,
	onSave,
	onError,
}) {
	const { user } = useAuth();

	const [lesson, setLesson] = useState(lessonProp);
	const [editorInitialHtml, setEditorInitialHtml] = useState(
		lessonProp?.content || "",
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLesson(lessonProp);
		setEditorInitialHtml(lessonProp?.content || "");
		console.log("[EditLessonModal] Prefill content:", lessonProp?.content || "");
	}, [lessonProp]);

	const persistLesson = async (payload) => {
		const enableApiPersistence = false;
		const token = user?.token || "";

		if (!enableApiPersistence) {
			return payload;
		}

		if (action === "edit") {
			return putData(`lessons/${payload.id}`, payload, token);
		}

		return postData("lessons", payload, token);
	};

	const buildLessonPayload = () => {
		const now = new Date().toISOString();

		return {
			...lesson,
			id:
				action === "create"
					? lesson.id || `lesson-${Date.now()}`
					: lesson.id,
			questionChapterId: Number(lesson.questionChapterId) || "",
			name: lesson.name?.trim() || "",
			description: lesson.description?.trim() || "",
			content: lesson.content?.trim() || "",
			status: Number(lesson.status ?? 1),
			createAt: lesson.createAt || now,
			updateAt: now,
		};
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLesson((prev) => ({ ...prev, [name]: value }));
	};

	const handleContentChange = (html) => {
		const outputHtml = typeof html === "string" ? html : "";
		setLesson((prev) => ({ ...prev, content: outputHtml }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const nextLesson = buildLessonPayload();
			console.log("[EditLessonModal] RichText input -> output:", {
				prefill: editorInitialHtml,
				output: nextLesson.content,
			});
			await persistLesson(nextLesson);

			if (onSave) {
				onSave(nextLesson, action);
			}

			setRefresh((prev) => prev);
			onClose();
		} catch {
			onError?.("Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="edit-modal lesson-editor-modal">
			<div className="modal-box">
				<button className="btn close-btn" type="button" onClick={onClose}>
					<i className="fa-solid fa-xmark"></i>
				</button>
				<form onSubmit={handleSubmit}>
					<div className="edit-title">
						{action === "create" ? "Create Lesson" : "Edit Lesson"}
					</div>

					{lesson.id && action === "edit" && (
						<div className="input-group">
							<input name="id" placeholder=" " value={lesson.id} disabled />
							<label htmlFor="id" className="disable">
								ID
							</label>
						</div>
					)}

					<div className="input-group">
						<input
							name="name"
							placeholder=" "
							value={lesson.name || ""}
							onChange={handleChange}
							required
						/>
						<label htmlFor="name">Lesson Name</label>
					</div>

					<div className="input-group">
						<select
							id="lessonChapter"
							name="questionChapterId"
							value={lesson.questionChapterId || ""}
							onChange={handleChange}
							required
						>
							<option value="" disabled>
								Select chapter
							</option>
							{additionalData?.questionChapters?.map((chapter, index) => (
								<option key={index} value={chapter.id}>
									{chapter.name}
								</option>
							))}
						</select>
						<label htmlFor="questionChapterId">Chapter</label>
					</div>

					<div className="input-group flex-1">
						<textarea
							name="description"
							placeholder=" "
							value={lesson.description || ""}
							onChange={handleChange}
							required
						/>
						<label htmlFor="description">Description</label>
					</div>

					<div className="input-group flex-1 rich-editor">
						<label htmlFor="content" className="rich-label">
							Content
						</label>
						<RichTextEditor
							key={`${action}-${lesson.id || "new"}`}
							initialHtml={editorInitialHtml}
							onHtmlChange={handleContentChange}
							placeholder="Nhập nội dung bài học..."
							autoFocus={false}
						/>
					</div>

					<div className="btn-box">
						<button type="submit" className="btn btn-save" disabled={loading}>
							SAVE
						</button>
						<button type="button" className="btn" onClick={onClose}>
							CANCEL
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
