import { useEffect, useState } from 'react';
import { fetchData, patchData, deleteData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import TrafficSignModal from './TrafficSignModal';
import DataTable from '../../../components/Shared/DataTable';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

export default function TrafficSignBank() {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    // Data states
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    // Pagination states
    const [serverPagination, setServerPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0
    });

    // Search states
    const [searchTerm, setSearchTerm] = useState(''); // Giá trị đang gõ trong input
    const [appliedSearch, setAppliedSearch] = useState(''); // Giá trị thực tế để gọi API

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);

    // 1. Fetch Categories (Chỉ chạy một lần hoặc khi refresh)
    useEffect(() => {
        (async () => {
            try {
                const catRes = await fetchData('SignCategories/all', token);
                setCategories(normalizeItems(catRes));
            } catch (err) {
                console.error("Lỗi tải danh mục:", err);
            }
        })();
    }, [token]);

    // 2. Fetch Traffic Signs (Chạy khi chuyển trang, refresh, hoặc áp dụng search)
    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                    // Giả sử API hỗ trợ search theo Name
                    ...(appliedSearch && { Name: appliedSearch })
                });

                const signRes = await fetchData(`TrafficSigns?${query.toString()}`, token);
                const signItems = normalizeItems(signRes);

                // Map category name
                const enrichedData = signItems.map(s => ({
                    ...s,
                    categoryName: categories.find(c => c.id === s.signCategoryId)?.name || 'Không xác định'
                }));

                setData(enrichedData);

                // Cập nhật thông tin phân trang từ server
                setServerPagination(prev => ({
                    ...prev,
                    page: signRes?.page || prev.page,
                    pageSize: signRes?.pageSize || prev.pageSize,
                    totalCount: signRes?.totalCount || 0,
                    totalPages: signRes?.totalPages || 1,
                }));
            } catch (err) {
                setError('Lỗi tải dữ liệu biển báo. Vui lòng thử lại.');
                if (err.status === 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, token, serverPagination.page, serverPagination.pageSize, appliedSearch, categories]);

    // Xử lý tìm kiếm
    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setServerPagination(prev => ({ ...prev, page: 1 })); // Reset về trang 1 khi search
        setAppliedSearch(searchTerm);
    };

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    const handleToggleStatus = async (id) => {
        try {
            await patchData(`TrafficSigns/${id}`, {}, token);
            setRefresh(prev => prev + 1);
        } catch (err) {
            alert('Lỗi cập nhật trạng thái.');
            if (err.status === 401) refreshNewToken(user);
        }
    };

    const handleHardDelete = async (id) => {
        if (window.confirm('CẢNH BÁO: Bạn có chắc muốn xóa VĨNH VIỄN biển báo này?')) {
            try {
                await deleteData(`TrafficSigns/${id}`, token);
                setRefresh(prev => prev + 1);
            } catch (err) {
                alert('Xóa thất bại. Biển báo có thể đang được sử dụng ở nơi khác.');
            }
        }
    };

    const columns = [
        {
            key: 'index', label: 'STT', width: '60px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1,
        },
        {
            key: 'image', label: 'Ảnh', width: '70px',
            render: (val) => val ? (
                <img src={`${val}?t=${refresh}`} alt="sign" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
            ) : <i className="fa-solid fa-image" style={{ opacity: 0.2 }}></i>
        },
        { key: 'code', label: 'Mã', width: '90px' },
        { key: 'name', label: 'Tên biển báo' },
        {
            key: 'categoryName', label: 'Loại', width: '150px',
            render: (val) => <span className='ins-status-chip active'>{val}</span>
        },
        {
            key: 'status', label: 'Trạng thái', width: '120px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Ngưng'}
                </span>
            )
        },
        {
            key: 'actions', label: 'Thao tác', width: '150px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn edit' onClick={() => { setSelectedSign(row); setIsModalOpen(true); }} title='Sửa'>
                        <i className='fa-solid fa-pen'></i>
                    </button>
                    <button
                        className={`ins-action-btn ${row.status === 1 ? 'delete' : 'view'}`}
                        onClick={() => handleToggleStatus(row.id)}
                        title={row.status === 1 ? 'Tạm ngưng' : 'Kích hoạt'}
                    >
                        <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`}></i>
                    </button>
                    <button className='ins-action-btn delete' onClick={() => handleHardDelete(row.id)} title='Xóa vĩnh viễn'>
                        <i className='fa-solid fa-trash-can'></i>
                    </button>
                </div>
            )
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Ngân hàng Biển báo</h1>
                    <p>Quản lý danh sách biển báo giao thông.</p>
                </div>
                <button className='ins-btn ins-btn-primary' onClick={() => { setSelectedSign(null); setIsModalOpen(true); }}>
                    <i className='fa-solid fa-plus'></i> Thêm biển báo
                </button>
            </div>

            {/* Thanh tìm kiếm
            <div className='ins-filter-bar' style={{ marginBottom: '20px' }}>
                <form onSubmit={handleSearchSubmit} className='ins-search-wrapper' style={{ display: 'flex', gap: '8px', maxWidth: '400px' }}>
                    <input
                        type="text"
                        className='ins-form-input'
                        placeholder="Tìm kiếm theo tên biển báo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className='ins-btn ins-btn-secondary' title='Tìm kiếm'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div> */}

            <DataTable
                title={`Danh sách biển báo`}
                columns={columns}
                data={data}
                loading={loading}
                error={error}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
            />

            {isModalOpen && (
                <TrafficSignModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setSelectedSign(null); }}
                    selectedData={selectedSign}
                    categories={categories}
                    onRefresh={() => setRefresh(prev => prev + 1)}
                />
            )}
        </div>
    );
}