import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import { fetchData, patchData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import LicenseModal from './LicenseModal';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};
export default function LicenseManagement() {
    const { user, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const token = user?.token || '';

    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });
                if (searchTerm.trim()) {
                    query.set('name', searchTerm.trim());
                }
                const res = await fetchData(`DrivingLicenses/all?${query.toString()}`, token);
                const items = normalizeItems(res);
                setLicenses(items);
                setServerPagination(prev => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount ?? prev.totalCount,
                    totalPages: res?.totalPages || 1,
                }));
            } catch (error) {
                if (error.status == 401) refreshNewToken(user);
                else setError('Lỗi tải dữ liệu bằng lái. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, token, searchTerm, serverPagination.page, serverPagination.pageSize]);

    const handleToggleStatus = async (id) => {
        try {
            // Toggle: 1 (Public) <-> 0 (Hidden)
            await patchData(`DrivingLicenses/${id}`, { }, token);
            setRefresh(r => r + 1);
        } catch (error) { 
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
            setError('Lỗi cập nhật trạng thái, vui lòng thử lại.');
            }
        }
    };

    const handleSave = (savedData, action) => {
        if (action === 'edit') {
            setLicenses(prev => prev.map(item => item.id === savedData.id ? { ...item, ...savedData } : item));
        } else {
            setRefresh(r => r + 1);
        }
    };

    const handleSearch = (search) => {
        setSearchTerm(search);
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    const handleClearFilter = () => {
        if(searchTerm.trim()){
            setSearchTerm('');
        }
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleNavigateChapters = (row) => {
        navigate(`/instructor/chapter-management?licenseId=${row.id}&licenseName=${encodeURIComponent(row.name)}`);
    };

    const columns = [
        {
            key: 'index', label: 'STT', width: '56px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1,
        },
        { key: 'name', label: 'Tên bằng lái' },
        { key: 'description', label: 'Mô tả' },
        {
            key: 'vehicles', label: 'Phương tiện', width: '120px',
            render: (val) => {
                const list = Array.isArray(val) ? val : [];
                if (list.length === 0) return <span style={{ opacity: 0.4 }}>—</span>;
                return (
                    <span title={list.map(v => v.name).join(', ')} style={{ fontSize: '0.8rem', color: 'var(--ins-on-surface-variant)' }}>
                        {list.length} loại xe
                    </span>
                );
            },
        },
        {
            key: 'status', label: 'Trạng thái', width: '110px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    <span className='chip-dot' />
                    {val === 1 ? 'Hoạt động' : 'Ngưng'}
                </span>
            ),
        },
        {
            key: 'actions', label: 'Thao tác', width: '220px',
            render: (_, row) => {
                if (!row || typeof row.status === 'undefined') {
                    return <div className='ins-action-cell' style={{ color: 'var(--ins-error)' }}>Không có dữ liệu</div>;
                }
                return (
                    <div className='ins-action-cell'>
                        <button
                            className='ins-nav-btn'
                            title='Quản lý chương của bằng này'
                            onClick={() => handleNavigateChapters(row)}
                        >
                            <i className='fa-solid fa-book-open' />
                            Quản lý chương
                            <i className='fa-solid fa-arrow-right' />
                        </button>
                        {/* Edit */}
                        <button
                            className='ins-action-btn edit'
                            title='Sửa'
                            onClick={() => { setSelectedItem(row); setShowModal(true); }}
                        >
                            <i className='fa-solid fa-pen' />
                        </button>
                        {/* Toggle status */}
                        <button
                            className={`ins-action-btn ${row.status === 1 ? 'delete' : 'view'}`}
                            title={row.status === 1 ? 'Ngưng hoạt động' : 'Kích hoạt'}
                            onClick={() => handleToggleStatus(row.id)}
                        >
                            <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`} style={{ fontSize: '1rem' }} />
                        </button>
                    </div>
                );
            },
        },
    ];

    // Context Badge 
    const activeBadge = (() => {
        let badge = [];
        if(searchTerm.trim()){
            badge.push({ text: `"${searchTerm.trim()}"`, onClear: () => handleClearFilter() });
        }
        return badge;
    })();

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Bằng lái</h1>
                    <p>Quản lý danh sách các hạng giấy phép lái xe ({licenses.length} hạng).</p>
                </div>
                <button
                    className='ins-btn ins-btn-primary'
                    onClick={() => { setSelectedItem(null); setShowModal(true); }}
                >
                    <i className='fa-solid fa-plus' /> Thêm hạng
                </button>
            </div>

            <DataTable
                title={`Danh sách bằng lái (${serverPagination.totalCount})`}
                columns={columns}
                data={licenses}
                loading={loading}
                error={error}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                searchValue={searchTerm}
                onSearchValueChange={setSearchTerm}
                contextBadge={ activeBadge.length > 0 ? activeBadge : null }
                actions={
                    <>
                    <button className='ins-btn ins-btn-secondary' onClick={() => setRefresh((r) => r + 1)} disabled={loading}>
                            <i className='fa-solid fa-rotate-right'></i> Làm mới
                        </button>
                    </>
                }
            />

            <LicenseModal
                isOpen={showModal}
                license={selectedItem}
                action={selectedItem ? 'edit' : 'create'}
                onClose={() => { setShowModal(false); setSelectedItem(null); }}
                onSave={handleSave}
            />
        </div>
    );
}
