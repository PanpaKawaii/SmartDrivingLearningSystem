import { useEffect, useState } from 'react';
import { fetchData, patchData, deleteData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import TrafficSignModal from './TrafficSignModal';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar'; // Import FilterBar
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

export default function TrafficSignBank() {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const [serverPagination, setServerPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0
    });

    // Cập nhật State cho bộ lọc để khớp với backend API
    const [filters, setFilters] = useState({
        code: '',
        name: '',
        signCategoryId: ''
    });
    // State này dùng để trigger việc gọi API sau khi nhấn "Lọc"
    const [appliedFilters, setAppliedFilters] = useState({
        code: '',
        name: '',
        signCategoryId: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);

    // Fetch Categories
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

    // Fetch Traffic Signs
    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });

                // Gắn các filter vào query nếu có giá trị
                if (appliedFilters.code.trim()) query.set('code', appliedFilters.code.trim());
                if (appliedFilters.name.trim()) query.set('name', appliedFilters.name.trim());
                if (appliedFilters.signCategoryId) query.set('signCategoryId', appliedFilters.signCategoryId);

                const signRes = await fetchData(`TrafficSigns?${query.toString()}`, token);
                const signItems = normalizeItems(signRes);

                const enrichedData = signItems.map(s => ({
                    ...s,
                    categoryName: categories.find(c => c.id === s.signCategoryId)?.name || 'Không xác định'
                }));

                setData(enrichedData);

                setServerPagination(prev => ({
                    ...prev,
                    totalCount: signRes?.totalCount || 0,
                    totalPages: signRes?.totalPages || 1,
                }));
            } catch (err) {
                setError('Lỗi tải dữ liệu biển báo.');
                if (err.status === 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, token, serverPagination.page, serverPagination.pageSize, appliedFilters, categories]);

    // Xử lý khi nhấn nút Lọc
    const handleSearch = () => {
        setServerPagination(prev => ({ ...prev, page: 1 }));
        setAppliedFilters(filters);
    };

    // Xử lý khi nhấn nút Xóa lọc (Reset)
    const handleReset = () => {
        const resetFilters = { code: '', name: '', signCategoryId: '' };
        setFilters(resetFilters);
        setAppliedFilters(resetFilters);
        setServerPagination(prev => ({ ...prev, page: 1 }));
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
            key: 'categoryName', label: 'Loại', width: '180px',
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

            {/* Tích hợp FilterBar */}
            <FilterBar
                searchOptions={[
                    {
                        placeholder: 'Mã biển báo...',
                        value: filters.code,
                        onChange: (val) => setFilters(prev => ({ ...prev, code: val }))
                    },
                    {
                        placeholder: 'Tên biển báo...',
                        value: filters.name,
                        onChange: (val) => setFilters(prev => ({ ...prev, name: val }))
                    }
                ]}
                selectOptions={[
                    {
                        placeholder: 'Tất cả danh mục',
                        value: filters.signCategoryId,
                        options: categories, // Sử dụng danh sách categories đã fetch
                        onChange: (val) => setFilters(prev => ({ ...prev, signCategoryId: val }))
                    }
                ]}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <DataTable
                title={`Danh sách biển báo (${serverPagination.totalCount})`}
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