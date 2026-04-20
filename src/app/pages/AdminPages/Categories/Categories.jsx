import React, { useState, useEffect, useCallback } from 'react';
import DataTable from '../../../components/Shared/DataTable';
import EditCategoryModal from './EditCategoryModal';
import { fetchData as callGet, patchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const CATEGORY_CONFIG = {
    TAGS: { label: 'Tags', endpoint: 'Tags', hasColor: true },
    SIM_DIFF: { label: 'Độ khó mô phỏng', endpoint: 'SimulationDifficultyLevels' },
    SIM_CAT: { label: 'Danh mục mô phỏng', endpoint: 'SimulationCategories' },
    SIGN_CAT: { label: 'Danh mục biển báo', endpoint: 'SignCategories' },
    REPORT_CAT: { label: 'Danh mục báo cáo', endpoint: 'ReportCategories' },
    QUES_TOPIC: { label: 'Chủ đề câu hỏi', endpoint: 'QuestionTopics' },
    QUES_CAT: { label: 'Danh mục câu hỏi', endpoint: 'QuestionCategories' },
    FORUM_TOPIC: { label: 'Chủ đề diễn đàn', endpoint: 'ForumTopics' },
};

export default function Categories() {
    const { user: authUser, logout, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('TAGS');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalAction, setModalAction] = useState('create');

    // State cho feedback thông báo
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });

    const currentConfig = CATEGORY_CONFIG[activeTab];

    // Hàm hiển thị thông báo giống Profile
    const showFeedback = (type, message) => {
        setFeedback({ show: true, type, message });
        setTimeout(() => {
            setFeedback(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleRefreshAction = async (err) => {
        if (err.status === 401) {
            const refreshResult = await refreshNewToken(authUser);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return false;
            }
            return true;
        }
        return false;
    };

    const loadData = useCallback(async () => {
        if (!authUser?.token) return;
        setLoading(true);
        try {
            const result = await callGet(`${currentConfig.endpoint}/all`, authUser.token);
            setData(Array.isArray(result) ? result : (result?.items || []));
        } catch (error) {
            const canRetry = await handleRefreshAction(error);
            if (canRetry) setRefresh(prev => prev + 1);
        } finally {
            setLoading(false);
        }
    }, [activeTab, authUser?.token, currentConfig.endpoint]);

    useEffect(() => {
        loadData();
    }, [loadData, refresh]);

    // Hàm thay đổi trạng thái (Đã bỏ alert/confirm)
    const handleToggleStatus = async (id) => {
        try {
            await patchData(`${currentConfig.endpoint}/${id}`, {}, authUser.token);
            showFeedback('success', 'Cập nhật trạng thái thành công!');
            setRefresh(p => p + 1);
        } catch (error) {
            if (error.status === 401) {
                const canRetry = await handleRefreshAction(error);
                if (canRetry) {
                    // Thử lại một lần duy nhất với token mới từ authUser (đã được update bởi refreshNewToken)
                    try {
                        await patchData(`${currentConfig.endpoint}/${id}`, {}, authUser.token);
                        showFeedback('success', 'Cập nhật trạng thái thành công!');
                        setRefresh(p => p + 1);
                    } catch (retryError) {
                        showFeedback('error', 'Phiên đăng nhập hết hạn');
                    }
                }
            } else {
                showFeedback('error', 'Thao tác thất bại!');
            }
        }
    };

    const columns = [
        { key: '', label: 'STT', width: '60px', render: (_, __, idx) => idx + 1 },
        { key: 'name', label: 'Tên danh mục', render: (val) => <b style={{ color: 'var(--ins-on-surface)' }}>{val}</b> },
        { key: 'description', label: 'Mô tả', render: (val) => val || '---' },
        ...(currentConfig.hasColor ? [{
            key: 'colorCode', label: 'Màu sắc', width: '120px',
            render: (val) => (
                <div className="cat-color-cell">
                    <span className="cat-color-dot" style={{ backgroundColor: val }}></span>
                    {val}
                </div>
            )
        }] : []),
        {
            key: 'status', label: 'Trạng thái', width: '140px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'rejected'}`}>
                    <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Đang khóa'}
                </span>
            )
        },
        {
            key: 'actions', label: 'Thao tác', width: '120px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Sửa' onClick={() => {
                        setSelectedItem(row);
                        setModalAction('edit');
                        setShowModal(true);
                    }}>
                        <i className='fa-solid fa-pen-to-square'></i>
                    </button>
                    <button
                        className={`ins-action-btn ${row.status === 1 ? 'delete' : 'edit'}`}
                        title={row.status === 1 ? 'Khóa' : 'Mở khóa'}
                        onClick={() => handleToggleStatus(row.id)}
                    >
                        <i className={`fa-solid ${row.status === 1 ? 'fa-lock' : 'fa-lock-open'}`}></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className='ins-page'>
            {/* Render Feedback Popup tương tự Profile */}
            {feedback.show && (
                <div className={`feedback-popup ${feedback.type} slide-in`}>
                    <i className={feedback.type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                    <span>{feedback.message}</span>
                </div>
            )}

            <div className='ins-page-header'>
                <div>
                    <h1>Cấu hình hệ thống</h1>
                    <p>Quản lý các danh mục và tag hệ thống.</p>
                </div>
                <button className='btn-add-category' onClick={() => {
                    setSelectedItem(null);
                    setModalAction('create');
                    setShowModal(true);
                }}>
                    <i className="fa-solid fa-plus"></i> Thêm {currentConfig.label}
                </button>
            </div>

            <div className="cat-tabs-grid">
                {Object.keys(CATEGORY_CONFIG).map(key => (
                    <button
                        key={key}
                        className={`cat-tab-item ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {CATEGORY_CONFIG[key].label}
                    </button>
                ))}
            </div>

            <DataTable title={`Danh sách ${currentConfig.label}`} columns={columns} data={data} loading={loading} />

            {showModal && (
                <EditCategoryModal
                    item={selectedItem}
                    config={currentConfig}
                    action={modalAction}
                    onClose={() => setShowModal(false)}
                    setRefresh={setRefresh}
                    showFeedback={showFeedback} // Truyền hàm thông báo vào modal
                />
            )}
        </div>
    );
}