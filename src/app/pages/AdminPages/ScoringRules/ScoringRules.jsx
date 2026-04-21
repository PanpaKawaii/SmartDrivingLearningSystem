import React, { useState, useEffect, useCallback } from 'react';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

// Shared Components
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';

import './ScoringRules.css';

const ScoringRules = () => {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('exam');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotify = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    // Hàm xử lý Refresh Token
    const handleRefreshAction = async (err) => {
        if (err.status === 401) {
            // Quan trọng: Phải truyền authUser vào để lấy refresh token cũ
            const refreshResult = await refreshNewToken(authUser);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return false;
            }
            return true;
        }
        showNotify(err.data?.message || 'Lỗi kết nối hệ thống', 'error');
        return false;
    };

    // Sử dụng useCallback để tránh tạo lại hàm liên tục
    const loadData = useCallback(async () => {
        if (!authUser?.token) return;
        setLoading(true);
        try {
            const endpoint = activeTab === 'exam' ? 'Exams' : 'SituationExams';
            const res = await fetchData(endpoint, authUser.token);
            setData(res?.items || res || []);
        } catch (error) {
            const canRetry = await handleRefreshAction(error);
            // Nếu refresh thành công, fetch lại với token mới trong AuthContext sẽ tự động được lấy
            if (canRetry) {
                // Đợi một chút để context kịp cập nhật state nếu cần, 
                // hoặc gọi lại chính nó để thử với token vừa lưu
                loadData();
            }
        } finally {
            setLoading(false);
        }
    }, [activeTab, authUser, refreshNewToken]); // Các dependency cần thiết cho logic load

    useEffect(() => {
        loadData();
        // KHÔNG đưa authUser.token vào đây để tránh loop
    }, [activeTab, authUser?.id, loadData]);

    const handleEdit = async (id) => {
        try {
            const endpoint = activeTab === 'exam' ? `Exams/${id}` : `SituationExams/${id}`;
            const detail = await fetchData(endpoint, authUser.token);
            setSelectedItem(detail);
            setIsModalOpen(true);
        } catch (error) {
            const canRetry = await handleRefreshAction(error);
            if (canRetry) handleEdit(id);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const endpoint = activeTab === 'exam' ? `Exams/${selectedItem.id}` : `SituationExams/${selectedItem.id}`;
            const payload = { ...selectedItem, passScore: parseInt(selectedItem.passScore) };
            await putData(endpoint, payload, authUser.token);
            showNotify("Cập nhật ngưỡng điểm thành công!");
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            const canRetry = await handleRefreshAction(error);
            if (canRetry) return handleUpdate(e);
        } finally {
            setIsSaving(false);
        }
    };

    // ... Giữ nguyên phần columns và return bên dưới ...
    const columns = [
        {
            label: 'Bộ đề',
            key: 'title',
            render: (val, row) => (
                <div className="sr-title-column">
                    <span className="sr-main-title">{val}</span>
                    <code className="sr-id-tag">{row.id.substring(0, 8)}</code>
                </div>
            )
        },
        {
            label: 'Cấu hình',
            key: 'duration',
            render: (val, row) => (
                <div className="sr-config-badges">
                    <span><i className="fa-regular fa-clock"></i> {val}p</span>
                    <span>
                        <i className="fa-solid fa-layer-group"></i>
                        {activeTab === 'exam' ? ` ${row.examQuestionCount || 0} câu` : ` ${row.simulationExams?.length || 0} cảnh`}
                    </span>
                </div>
            )
        },
        {
            label: 'Điểm đạt',
            key: 'passScore',
            render: (val) => <b className="sr-score-val">{val}%</b>
        },
        {
            label: 'Trạng thái',
            key: 'status',
            render: (val) => (
                <span className={`sr-status ${val === 1 ? 'is-active' : 'is-hidden'}`}>
                    <span className="chip-dot"></span>
                    {val === 1 ? 'Đang áp dụng' : 'Tạm dừng'}
                </span>
            )
        },
        {
            label: 'Thao tác',
            key: 'id',
            width: '80px',
            render: (id) => (
                <button className="sr-edit-btn" onClick={() => handleEdit(id)}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
            )
        }
    ];

    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sr-page-wrapper">
            {notification.message && (
                <div className={`sr-toast ${notification.type}`}>
                    <i className={notification.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check'}></i>
                    {notification.message}
                </div>
            )}

            <div className="sr-header-section">
                <div className="sr-header-text">
                    <h1>Thiết lập điểm đạt</h1>
                    <p>Quản lý ngưỡng điểm vượt qua và xem chi tiết cấu trúc đề thi.</p>
                </div>

                <div className="sr-tabs">
                    <button className={activeTab === 'exam' ? 'active' : ''} onClick={() => setActiveTab('exam')}>
                        <i className="fa-solid fa-book"></i> Lý thuyết
                    </button>
                    <button className={activeTab === 'situation' ? 'active' : ''} onClick={() => setActiveTab('situation')}>
                        <i className="fa-solid fa-car-side"></i> Mô phỏng
                    </button>
                </div>
            </div>

            <FilterBar
                searchOptions={[{
                    placeholder: 'Tìm kiếm tên bộ đề...',
                    value: searchTerm,
                    onChange: setSearchTerm
                }]}
                onReset={() => setSearchTerm('')}
                onSearch={loadData}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                loading={loading}
                pageSize={10}
                contextBadge={searchTerm ? [{ text: searchTerm, onClear: () => setSearchTerm('') }] : []}
            />

            {isModalOpen && selectedItem && (
                <div className="sr-modal-overlay">
                    <div className="sr-modal-box">
                        <div className="sr-modal-header">
                            <div className="header-left">
                                <i className="fa-solid fa-pen-to-square"></i>
                                <div>
                                    <h3>Cập nhật cấu hình</h3>
                                    <span>{selectedItem.title}</span>
                                </div>
                            </div>
                            <button className="close-x" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="sr-modal-body">
                                <div className="sr-score-config-card">
                                    <label>Ngưỡng điểm đạt tối thiểu</label>
                                    <div className="sr-input-group">
                                        <input
                                            type="number"
                                            value={selectedItem.passScore}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, passScore: e.target.value })}
                                            min="0" max="100"
                                            required
                                        />
                                        <span className="unit">%</span>
                                    </div>
                                    <p className="hint">Học viên cần đạt tối thiểu mức này để được công nhận "ĐẠT".</p>
                                </div>

                                <div className="sr-preview-list">
                                    <h4><i className="fa-solid fa-magnifying-glass-chart"></i> Nội dung đề thi</h4>
                                    <div className="sr-scroll-area">
                                        {activeTab === 'exam' ? (
                                            selectedItem.examQuestions?.map((eq, idx) => (
                                                <div key={eq.id} className="sr-q-item">
                                                    <div className="q-title">
                                                        <span className="q-badge">Câu {idx + 1}</span>
                                                        {eq.question?.content}
                                                    </div>
                                                    <div className="q-answers">
                                                        {eq.question?.answers?.map(ans => (
                                                            <div key={ans.id} className={`q-ans ${ans.isCorrect ? 'correct' : ''}`}>
                                                                <i className={ans.isCorrect ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}></i>
                                                                {ans.content}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="simulation-list-grid">
                                                {selectedItem.simulationExams?.map((se, idx) => (
                                                    <div key={se.id} className="sr-s-item">
                                                        <span className="idx">{idx + 1}</span>
                                                        <span className="name">{se.simulation?.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="sr-modal-footer">
                                <button type="button" className="sr-btn-secondary" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
                                <button type="submit" className="sr-btn-primary" disabled={isSaving}>
                                    {isSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
                                    {isSaving ? ' Đang lưu...' : ' Lưu thay đổi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScoringRules;