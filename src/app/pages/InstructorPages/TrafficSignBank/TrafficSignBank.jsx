import { useEffect, useState, useCallback } from 'react';
import { fetchData, patchData, deleteData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import TrafficSignModal from './TrafficSignModal';
import DataTable from '../../../components/Shared/DataTable';
import { signCategories, trafficSigns } from '../../../../mocks/DataSample.js';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

// const data = trafficSigns.map((s) => ({
//     ...s,
//     categoryName: signCategories.find((c) => c.id === s.signCategoryId)?.name || '',
// }));

// const columns = [
//     { key: 'code', label: 'Mã', width: '90px' },
//     { key: 'name', label: 'Tên biển báo' },
//     {
//         key: 'categoryName', label: 'Loại', width: '130px', render: (val) => (
//             <span className='ins-status-chip active'>{val}</span>
//         )
//     },
//     {
//         key: 'status', label: 'Trạng thái', width: '110px', render: (val) => (
//             <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
//                 <span className='chip-dot'></span>{val === 1 ? 'Hoạt động' : 'Nháp'}
//             </span>
//         )
//     },
//     {
//         key: 'actions', label: 'Thao tác', width: '110px', render: () => (
//             <div className='ins-action-cell'>
//                 <button className='ins-action-btn view' title='Xem'><i className='fa-solid fa-eye'></i></button>
//                 <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
//                 <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
//             </div>
//         )
//     },
// ];

export default function TrafficSignBank() {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    // State cho Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);

    // Lấy dữ liệu biển báo và danh mục
    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Lấy Categories để map tên loại
                const catRes = await fetchData('SignCategories/all', token);
                const categoriesList = normalizeItems(catRes);
                setCategories(categoriesList);

                // 2. Lấy Traffic Signs
                const query = new URLSearchParams({ page: '1', pageSize: '500' });
                const signRes = await fetchData(`TrafficSigns?${query.toString()}`, token);

                // Map category name vào data
                const signItems = normalizeItems(signRes);
                const enrichedData = signItems.map(s => ({
                    ...s,
                    categoryName: categoriesList.find(c => c.id === s.signCategoryId)?.name || 'Không xác định'
                }));

                setData(enrichedData);
            } catch (error) {
                setError('Lỗi tải dữ liệu biển báo. Vui lòng thử lại.');
                if (error.status === 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, token]);

    // SOFT DELETE (Toggle Status)
    const handleToggleStatus = async (id) => {
        try {
            await patchData(`TrafficSigns/${id}`, {}, token);
            setRefresh(prev => prev + 1);
        } catch (err) {
            alert('Lỗi cập nhật trạng thái.');
            if (err.status === 401) refreshNewToken(user);
        }
    };

    // HARD DELETE
    const handleHardDelete = async (id) => {
        if (window.confirm('CẢNH BÁO: Bạn có chắc muốn xóa VĨNH VIỄN biển báo này? Dữ liệu không thể khôi phục.')) {
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
            key: 'index', label: 'STT', width: '56px',
            render: (_, __, rIdx) => rIdx + 1,
        },
        // Trong mảng columns của TrafficSignBank.jsx
        {
            key: 'image',
            label: 'Ảnh',
            width: '70px',
            render: (val) => val ? (
                <img
                    // Thêm ?t=... vào sau URL để tránh cache
                    src={`${val}?t=${refresh}`}
                    alt="sign"
                    style={{ width: '35px', height: '35px', objectFit: 'contain' }}
                />
            ) : (
                <i className="fa-solid fa-image" style={{ opacity: 0.2 }}></i>
            )
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
                    {/* Sửa */}
                    <button className='ins-action-btn edit' onClick={() => { setSelectedSign(row); setIsModalOpen(true); }} title='Sửa'>
                        <i className='fa-solid fa-pen'></i>
                    </button>

                    {/* Toggle Status (Soft Delete) */}
                    <button
                        className={`ins-action-btn ${row.status === 1 ? 'delete' : 'view'}`}
                        onClick={() => handleToggleStatus(row.id)}
                        title={row.status === 1 ? 'Tạm ngưng' : 'Kích hoạt'}
                    >
                        <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`} style={{ fontSize: '1.1rem' }}></i>
                    </button>

                    {/* Hard Delete */}
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
                <div><h1>Ngân hàng Biển báo</h1><p>Quản lý danh sách biển báo giao thông ({data.length} biển báo).</p></div>
                <button className='ins-btn ins-btn-primary' onClick={() => { setSelectedSign(null); setIsModalOpen(true); }}>
                    <i className='fa-solid fa-plus'></i> Thêm biển báo
                </button>
            </div>

            <DataTable
                title={`Hiển thị ${data.length} biển báo`}
                columns={columns}
                data={data}
                loading={loading}
                error={error}
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