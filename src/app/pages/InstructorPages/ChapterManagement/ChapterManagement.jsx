import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import ChapterModal from './ChapterModal';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};
export default function ChapterManagement() {
    const { user, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = user?.token || '';

    // Query params từ Quick Navigate
    const licenseIdParam = searchParams.get('licenseId') || '';
    const licenseNameParam = searchParams.get('licenseName') || '';

    const [chapters, setChapters] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    const [filters, setFilters] = useState({
        search: '',
        licenseId: licenseIdParam
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sync filterLicense khi query param thay đổi (browser back/forward)
    useEffect(() => {
        setFilters(prev => ({ ...prev, licenseId: licenseIdParam }));
    }, [licenseIdParam]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchData(`DrivingLicenses/all`, token);
                const items = normalizeItems(res);
                setLicenses(items);
            } catch (err) {
                setError('Lỗi tải dữ liệu bằng lái.');
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);

    // Load chapters
    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });
                if (filters.search.trim()) {
                    query.set('name', filters.search.trim());
                }
                if (filters.licenseId) {
                    query.set('drivingLicenseId', filters.licenseId);   
                } 
                const res = await fetchData(`QuestionChapters?${query.toString()}`, token);
                const items = normalizeItems(res);
                console.log('totalPages:', res?.totalPages);
                setServerPagination(prev => ({
                        ...prev,
                        page: res?.page || prev.page,
                        pageSize: res?.pageSize || prev.pageSize,
                        totalCount: res?.totalCount ?? prev.totalCount,
                        totalPages: res?.totalPages || 1,
                }));
                setChapters(items);
                
            } catch (err) {
                setError('Lỗi tải dữ liệu chương.');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, token, filters.licenseId, filters.search, serverPagination.page, serverPagination.pageSize]);

    const handleClearFilter = () => {
        setFilters(prev => ({ ...prev, licenseId: '' }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
        //setSearchParams({});
    };
    const handleClearSearch = () => {
        setFilters(prev => ({ ...prev, search: '' }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
        //setSearchParams({});
    };


    const handleFilterChange = (val) => {
        setFilters(prev => ({ ...prev, licenseId: val }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
        if (val) {
            const selectedLicense = licenses.find(l => l.id === val);
            setSearchParams({ licenseId: val, licenseName: selectedLicense?.name || '' });
        } else {
            setSearchParams({});
        }
    };
    
    const handleSearch = (search) => {
            setFilters(prev => ({ ...prev, search }));
            setServerPagination(prev => ({ ...prev, page: 1 }));
    };
    const handlePageChange = (page) => {
            setServerPagination(prev => ({ ...prev, page }));
    };

    const handleToggleStatus = async (id) => {
        try {
            setLoading(true);
            // Toggle: 1 (Public) <-> 0 (Hidden)
            await putData(`QuestionChapters/${id}`, { }, token);
            setRefresh(r => r + 1);
        } catch (error) {
            if (error.status === 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi cập nhật trạng thái');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = (savedData, action) => {
        if (action === 'edit') {
            setChapters(prev => prev.map(item => item.id === savedData.id ? { ...item, ...savedData } : item));
        } else {
            setRefresh(r => r + 1);
        }
    };

    const handleNavigateLessons = (row) => {
        navigate(`/instructor/lesson-management?chapterId=${row.id}&chapterName=${encodeURIComponent(row.name)}`);
    };

    // Tên license theo ID (cho hiển thị trong table)
    const getLicenseName = (id) => licenses.find(l => l.id === id)?.name || '—';

    const columns = [
        {
            key: 'index_col', label: 'STT', width: '56px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1,
        },
        {
            key: 'index', label: 'Vị trí', width: '70px',
            render: (val) => <span style={{ fontWeight: 600 }}>{val ?? '—'}</span>,
        },
        { key: 'name', label: 'Tên chương' },
        {
            key: 'drivingLicenseId', label: 'Hạng bằng', width: '110px',
            render: (val) => getLicenseName(val),
        },
        { key: 'description', label: 'Mô tả', render: (val) => {
            const maxLength = 50;
            const truncated = val && val.length > maxLength ? val.substring(0, maxLength) + '...' : val;
            return truncated ? <span title={val}>{truncated}</span> : <span>—</span>;
        } },
        {
            key: 'status', label: 'Trạng thái', width: '110px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    <span className='chip-dot' />
                    {val === 1 ? 'Hoạt động' : 'Nháp'}
                </span>
            ),
        },
        {
            key: 'actions', label: 'Thao tác', width: '230px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    {/* Quick Navigate → Lessons */}
                    <button
                        className='ins-nav-btn'
                        title='Quản lý bài học của chương này'
                        onClick={() => handleNavigateLessons(row)}
                    >
                        <i className='fa-solid fa-file-lines' />
                        Quản lý bài học
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
                        title={row.status === 1 ? 'Đặt thành nháp' : 'Kích hoạt'}
                        onClick={() => handleToggleStatus(row.id)}
                    >
                        <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`} style={{ fontSize: '1rem' }} />
                    </button>
                </div>
            ),
        },
    ];

    // Tên thuộc tính đang filter 
    // const activeFilterName =  licenseNameParam || licenses.find(l => l.id === filterLicense)?.name || '';
     const activeBadge = (() => {
        let badge = [];
        if(filters.search.trim()){
            badge.push({ text: `"${filters.search.trim()}"`, onClear: () => handleClearSearch() });
        }
        if (filters.licenseId) {
            const license = licenses.find(l => l.id === filters.licenseId);
            badge.push({ text: licenseNameParam || license?.name, onClear: () => handleClearFilter() });
        }
        return badge;
    })();

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Chương</h1>
                    <p>Quản lý danh sách chương trong chương trình đào tạo ({chapters.length} chương).</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {licenseIdParam && (
                        <button className='ins-btn' style={{ background: 'var(--ins-surface-high)', color: 'var(--ins-on-surface)' }} onClick={() => navigate(-1)}>
                            <i className='fa-solid fa-arrow-left'></i> Quay lại
                        </button>
                    )}
                    <button
                        className='ins-btn ins-btn-primary'
                        onClick={() => { setSelectedItem(null); setShowModal(true); }}
                    >
                        <i className='fa-solid fa-plus' /> Thêm chương
                    </button>
                </div>
            </div>

            <FilterBar
                searchOptions={[
                    { placeholder: 'Tìm kiếm chương...', value: filters.search, onChange: (val) => setFilters(prev => ({ ...prev, search: val })) }
                ]}
                selectOptions={[
                    {
                        placeholder: '— Tất cả hạng bằng —',
                        value: filters.licenseId,
                        options: licenses,
                        onChange: handleFilterChange
                    }
                ]}
                onSearch={() => setServerPagination(prev => ({ ...prev, page: 1 }))}
                onReset={() => { setFilters({ search: '', licenseId: '' }); setServerPagination(prev => ({ ...prev, page: 1 })); setSearchParams({}); }}
            />

            <DataTable
                title={`Danh sách chương (${serverPagination.totalCount})`}
                columns={columns}
                data={chapters}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                contextBadge={ activeBadge.length > 0 ? activeBadge : null }
                actions={
                    <>
                    <button className='ins-btn ins-btn-secondary' onClick={() => setRefresh((r) => r + 1)} disabled={loading}>
                            <i className='fa-solid fa-rotate-right'></i> Làm mới
                        </button>
                    </>
                }
                />

            <ChapterModal
                isOpen={showModal}
                chapter={selectedItem}
                action={selectedItem ? 'edit' : 'create'}
                defaultLicenseId={filters.licenseId} // Pre-fill license khi tạo từ context
                onClose={() => { setShowModal(false); setSelectedItem(null); }}
                onSave={handleSave}
            />
        </div>
    );
}
