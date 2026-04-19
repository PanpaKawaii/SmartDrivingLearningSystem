import React, { useState, useEffect } from 'react';
import './Categories.css';
// Đảm bảo đường dẫn này trỏ đúng đến file chứa các hàm fetch, post, put, patch của bạn
import { fetchData as callGet, postData, putData, patchData } from '../../../../mocks/CallingAPI';

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

const Categories = () => {
    const [activeTab, setActiveTab] = useState('TAGS');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', colorCode: '', status: 1 });

    const currentConfig = CATEGORY_CONFIG[activeTab];
    const token = localStorage.getItem('token');

    // Load dữ liệu từ API
    const loadData = async () => {
        setLoading(true);
        try {
            const result = await callGet(`${currentConfig.endpoint}/all`, token);
            setData(result || []);
        } catch (error) {
            console.error("Fetch error:", error);
            alert(`Không thể tải dữ liệu cho ${currentConfig.label}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);

    // Xử lý mở Modal
    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description || '',
                colorCode: item.colorCode || '',
                status: item.status
            });
        } else {
            setEditingItem(null);
            setFormData({ name: '', description: '', colorCode: '', status: 1 });
        }
        setIsModalOpen(true);
    };

    // Xử lý Submit Form (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await putData(`${currentConfig.endpoint}/${editingItem.id}`, formData, token);
            } else {
                await postData(`${currentConfig.endpoint}`, formData, token);
            }
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert('Lỗi khi lưu dữ liệu. Vui lòng kiểm tra lại.');
        }
    };

    // Xử lý Thay đổi trạng thái (Soft Delete)
    const handleToggleStatus = async (id) => {
        if (window.confirm('Bạn có muốn thay đổi trạng thái hoạt động của mục này?')) {
            try {
                await patchData(`${currentConfig.endpoint}/${id}`, {}, token);
                loadData();
            } catch (error) {
                alert('Cập nhật trạng thái thất bại.');
            }
        }
    };

    return (
        <div className="cat-page-container">
            <header className="cat-page-header">
                <div className="header-title">
                    <h1>Quản lý danh mục</h1>
                    <p>Quản lý các loại tag, chủ đề và cấp độ trong hệ thống</p>
                </div>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    + Thêm {currentConfig.label}
                </button>
            </header>

            <nav className="cat-tabs">
                {Object.keys(CATEGORY_CONFIG).map(key => (
                    <button
                        key={key}
                        className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {CATEGORY_CONFIG[key].label}
                    </button>
                ))}
            </nav>

            <main className="cat-content">
                {loading ? (
                    <div className="loader">Đang tải dữ liệu...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="cat-table">
                            <thead>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <th>Mô tả</th>
                                    {currentConfig.hasColor && <th>Màu sắc</th>}
                                    <th>Trạng thái</th>
                                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map(item => (
                                    <tr key={item.id}>
                                        <td className="col-name">{item.name}</td>
                                        <td className="col-desc">{item.description || '---'}</td>
                                        {currentConfig.hasColor && (
                                            <td>
                                                <div className="color-preview">
                                                    <span className="color-circle" style={{ backgroundColor: item.colorCode }}></span>
                                                    {item.colorCode}
                                                </div>
                                            </td>
                                        )}
                                        <td>
                                            <span className={`badge ${item.status === 1 ? 'status-active' : 'status-locked'}`}>
                                                {item.status === 1 ? 'Hoạt động' : 'Đang khóa'}
                                            </span>
                                        </td>
                                        <td className="col-actions">
                                            <button className="btn-text edit" onClick={() => handleOpenModal(item)}>Sửa</button>
                                            <button className="btn-text delete" onClick={() => handleToggleStatus(item.id)}>
                                                {item.status === 1 ? 'Khóa' : 'Mở'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Modal Components */}
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <div className="modal-header">
                            <h3>{editingItem ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-item">
                                    <label>Tên hiển thị <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ví dụ: Câu hỏi điểm liệt"
                                        required
                                    />
                                </div>
                                <div className="form-item">
                                    <label>Mô tả chi tiết</label>
                                    <textarea
                                        rows="3"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Nhập mô tả ngắn gọn..."
                                    />
                                </div>
                                {currentConfig.hasColor && (
                                    <div className="form-item">
                                        <label>Mã màu hiển thị (HEX)</label>
                                        <div className="color-input-group">
                                            <input
                                                type="color"
                                                value={formData.colorCode || '#1890ff'}
                                                onChange={e => setFormData({ ...formData, colorCode: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                value={formData.colorCode}
                                                onChange={e => setFormData({ ...formData, colorCode: e.target.value })}
                                                placeholder="#ffffff"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
                                <button type="submit" className="btn-primary">Lưu thông tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;