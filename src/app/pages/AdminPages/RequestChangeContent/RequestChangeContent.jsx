import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import RequestChangeModal from './RequestChangeModal';
import { fetchData, postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../../app/hooks/AuthContext/AuthContext';
import '../Categories/Categories.css';

const TAG_IDS = {
    NEW_CREATED: "763a5be4-963a-487d-a3b4-6a826026c94e",
    NEW_UPDATED: "8317546b-0cc6-43e9-a917-0ae9d090ec16",
    DIEM_LIET: "a8b6d7a5-c21b-47f3-87da-31f718311688"
};

const ADMIN_ROUTE_BASE = "/admin/change-requests";

const getQuestionType = (question) => {
    if (question?.type) return String(question.type).toUpperCase();
    const correctCount = (question?.answers || []).filter((a) =>
        Boolean(a?.isCorrect ?? a?.correct),
    ).length;
    return correctCount > 1 ? "MULTI" : "SINGLE";
};

const isDiemLietQuestion = (question) => {
    const hasTagDiemLiet = question?.questionTags?.some(tag => tag.tagId === TAG_IDS.DIEM_LIET);
    return hasTagDiemLiet || Boolean(question?.isDiemLiet ?? question?.isDanger ?? false);
};

const TAB_CONFIG = {
    QUESTIONS: { label: 'Danh sách Câu hỏi', icon: 'fa-file-lines' },
    MY_REPORTS: { label: 'Yêu cầu của bạn', icon: 'fa-paper-plane' },
};

export default function RequestChangeContent() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('QUESTIONS');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalMode, setModalMode] = useState('view');
    const [refreshKey, setRefreshKey] = useState(0);

    // --- State Phân Trang ---
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const showNotify = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    useEffect(() => {
        const loadData = async () => {
            if (!user?.token) return;
            setLoading(true);
            try {
                if (activeTab === 'QUESTIONS') {
                    // Cập nhật URL dynamic theo phân trang
                    const url = `Questions?sortBy=latest&page=${currentPage}&pageSize=${pageSize}`;
                    const response = await fetchData(url, user.token);

                    const items = Array.isArray(response) ? response : (response?.items || []);
                    setTotalItems(response?.totalCount || items.length);

                    const mapped = items.map((q) => {
                        let contentSuffix = "";
                        const tags = q.questionTags || [];
                        if (tags.some(t => t.tagId === TAG_IDS.NEW_CREATED)) {
                            contentSuffix = " (Câu hỏi mới tạo)";
                        } else if (tags.some(t => t.tagId === TAG_IDS.NEW_UPDATED)) {
                            contentSuffix = " (Câu hỏi mới cập nhật)";
                        }

                        return {
                            id: q.id,
                            content: (q.content || "—") + contentSuffix,
                            category: q?.questionCategory?.name || "—",
                            topicName: q?.questionTopic?.name || "—",
                            status: q.status ?? 1,
                            isDiemLiet: isDiemLietQuestion(q),
                            type: getQuestionType(q),
                            answersCount: q.answers?.length || 0,
                            rawQuestion: q
                        };
                    });
                    setData(mapped);
                } else {
                    const response = await fetchData(`Reports?userId=${user.id}`, user.token);
                    const items = Array.isArray(response) ? response : (response?.items || []);
                    setData(items);
                    setTotalItems(items.length);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [activeTab, user, refreshKey, currentPage, pageSize]);

    const handleOpenCreateRequest = (row) => {
        setSelectedItem({
            questionId: row.id,
            // Lấy content gốc từ rawQuestion để tránh các suffix "(Câu hỏi mới...)"
            questionContent: row.rawQuestion?.content || row.content,
            title: `[Góp ý] ${row.content.substring(0, 50)}...`,
            content: '',
            status: 0
        });
        setModalMode('create');
    };

    const handleViewDetail = (row) => {
        navigate(`${ADMIN_ROUTE_BASE}/detail/${row.id}`);
    };

    const handleSubmit = async (formData) => {
        setIsSaving(true); // Vô hiệu hóa nút và hiện loading
        try {
            if (modalMode === 'create') {
                await postData('Reports', { ...formData, userId: user.id }, user.token);
                showNotify("Gửi yêu cầu thành công!");
            } else {
                // Payload đã lọc cho Update
                const updatePayload = {
                    simulationId: formData.simulationId || null,
                    forumPostId: formData.forumPostId || null,
                    forumCommentId: formData.forumCommentId || null,
                    questionId: formData.questionId || null,
                    reportCategoryId: formData.reportCategoryId,
                    title: formData.title,
                    content: formData.content,
                    image: formData.image || null,
                    status: formData.status
                };
                await putData(`Reports/${formData.id}`, updatePayload, user.token);
                showNotify("Cập nhật yêu cầu thành công!");
            }
            setRefreshKey(prev => prev + 1);
            setSelectedItem(null); // Đóng modal khi thành công
        } catch (error) {
            console.error("Submit error:", error);
            showNotify(error.response?.data?.title || "Đã có lỗi xảy ra", "error");
        } finally {
            setIsSaving(false); // Mở khóa nút bấm
        }
    };

    const columnsMap = {
        QUESTIONS: [
            {
                key: "content",
                label: "Nội dung câu hỏi",
                render: (val, row) => (
                    <div style={{ padding: "4px 0" }}>
                        <div style={{ fontWeight: 600, marginBottom: "4px", lineHeight: "1.4" }}>
                            {val.length > 100 ? `${val.substring(0, 100)}...` : val}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--ins-on-surface)", display: "flex", gap: "12px" }}>
                            <span><i className="fa-solid fa-list-ul" style={{ color: "var(--ins-primary)" }} /> {row.answersCount} đáp án</span>
                            <span><i className={row.type === "SINGLE" ? "fa-regular fa-circle-dot" : "fa-regular fa-square-check"} style={{ color: "var(--ins-primary)" }} /> {row.type === "SINGLE" ? "Đơn lựa chọn" : "Đa lựa chọn"}</span>
                        </div>
                    </div>
                ),
            },
            {
                key: "category",
                label: "Phân loại",
                width: "180px",
                render: (_, row) => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}><i className="fa-solid fa-layer-group" /> {row.category}</span>
                        <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>{row.topicName}</span>
                    </div>
                ),
            },
            {
                key: "isDiemLiet",
                label: "Điểm liệt",
                width: "120px",
                render: (val) => (
                    <span className={`ins-status-chip ${val ? "rejected" : "active"}`}>
                        <span className="chip-dot"></span>
                        {val ? "Điểm liệt" : "Thường"}
                    </span>
                ),
            },
            {
                key: "status",
                label: "Trạng thái",
                width: "120px",
                render: (val) => (
                    <span className={`ins-status-chip ${val === 1 ? "approved" : "rejected"}`}>
                        <span className="chip-dot" />
                        {val === 1 ? "Hoạt động" : "Đã ẩn"}
                    </span>
                ),
            },
            {
                key: 'actions',
                label: 'Thao tác',
                width: "160px",
                render: (_, row) => (
                    <div className="ins-action-cell">
                        <button className='ins-action-btn view' title="Xem chi tiết" onClick={() => handleViewDetail(row)}>
                            <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className='ins-btn ins-btn-primary btn-sm' onClick={() => handleOpenCreateRequest(row)}>
                            <i className="fa-solid fa-plus"></i> Báo lỗi
                        </button>
                    </div>
                )
            }
        ],
        MY_REPORTS: [
            { key: 'title', label: 'Tiêu đề yêu cầu', render: (val) => <b>{val}</b> },
            {
                key: 'createAt', // Đổi từ createdAt thành createAt cho khớp API
                label: 'Ngày gửi',
                render: (val) => {
                    if (!val) return "—";
                    const date = new Date(val);
                    return isNaN(date.getTime()) ? "—" : date.toLocaleDateString('vi-VN');
                }
            },
            {
                key: 'status', label: 'Trạng thái xử lý', width: '140px', render: (val) => {
                    const config = {
                        [-1]: { label: 'Đang chờ duyệt', class: 'pending' },
                        [0]: { label: 'Bị từ chối', class: 'rejected' },
                        [1]: { label: 'Đã được Duyệt', class: 'approved' },
                    }[val] || { label: 'Chờ duyệt', class: 'pending' };
                    return (
                        <span className={`ins-status-chip ${config.class}`}>
                            <span className="chip-dot"></span>
                            {config.label}
                        </span>
                    );
                }
            },
            {
                key: 'actions', label: 'Thao tác', width: '100px', render: (_, row) => (
                    <div className='ins-action-cell'>
                        <button className='ins-action-btn view' title="Xem chi tiết" onClick={() => { setSelectedItem(row); setModalMode('view'); }}>
                            <i className='fa-solid fa-eye'></i>
                        </button>
                        {row.status === -1 && (
                            <button className='ins-action-btn edit' title="Chỉnh sửa" onClick={() => { setSelectedItem(row); setModalMode('edit'); }}>
                                <i className='fa-solid fa-pen'></i>
                            </button>
                        )}
                    </div>
                )
            }
        ]
    };

    return (
        <div className='ins-page'>
            {notification.message && (
                <div className={`sr-toast ${notification.type}`}>
                    <i className={notification.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check'}></i>
                    {notification.message}
                </div>
            )}

            <div className='ins-page-header'>
                <div>
                    <h1>Hệ thống Yêu cầu Thay đổi</h1>
                    <p>Báo cáo nội dung không chính xác trong ngân hàng câu hỏi.</p>
                </div>
            </div>

            <div className="cat-tabs-grid">
                {Object.keys(TAB_CONFIG).map(key => (
                    <button
                        key={key}
                        className={`cat-tab-item ${activeTab === key ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(key);
                            setCurrentPage(1); // Reset trang khi đổi tab
                        }}
                    >
                        <i className={`fa-solid ${TAB_CONFIG[key].icon}`} style={{ marginRight: '8px' }}></i>
                        {TAB_CONFIG[key].label}
                    </button>
                ))}
            </div>

            <DataTable
                title={activeTab === 'QUESTIONS' ? "Chọn câu hỏi để gửi phản hồi" : "Yêu cầu của tôi"}
                columns={columnsMap[activeTab]}
                data={data}
                loading={loading}
                // --- Props cho Pagination ---
                pagination={{
                    currentPage,
                    pageSize,
                    totalItems,
                    onPageChange: (page) => setCurrentPage(page),
                    onPageSizeChange: (size) => { setPageSize(size); setCurrentPage(1); }
                }}
            />

            {selectedItem && (
                <RequestChangeModal
                    isOpen={!!selectedItem}
                    mode={modalMode}
                    report={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onSubmit={handleSubmit}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
}