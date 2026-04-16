import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
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
    const { user } = useAuth();
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
    const [searchTerm, setSearchTerm] = useState('');
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });
    // Filter state — pre-filled từ query param
    const [filterLicense, setFilterLicense] = useState(licenseIdParam);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sync filterLicense khi query param thay đổi (browser back/forward)
    useEffect(() => {
        setFilterLicense(licenseIdParam);
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
                if (searchTerm.trim()) {
                    query.set('name', searchTerm.trim());
                }
                if (filterLicense) {
                    query.set('drivingLicenseId', filterLicense);   
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
    }, [refresh, token, filterLicense, searchTerm, serverPagination.page, serverPagination.pageSize]);

    const handleClearFilter = () => {
        if(filterLicense){
            setFilterLicense('');
        }
        if(searchTerm.trim()){
            setSearchTerm('');
        }
        setServerPagination(prev => ({ ...prev, page: 1 }));
        setSearchParams({});
    };

    const handleFilterChange = (e) => {
        const val = e.target.value;
        setFilterLicense(val);
        setServerPagination(prev => ({ ...prev, page: 1 }));
        if (val) {
            const selectedLicense = licenses.find(l => l.id === val);
            setSearchParams({ licenseId: val, licenseName: selectedLicense?.name || '' });
            
        } else {
            setSearchParams({});
        }
    };
    
    const handleSearch = (search) => {
            setSearchTerm(search);
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
        } catch (err) {
            setError('Lỗi cập nhật trạng thái');
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
            render: (_, __, rIdx) => rIdx + 1,
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
        if(searchTerm.trim()){
            badge.push({ text: `"${searchTerm.trim()}"`, onClear: () => handleClearFilter() });
        }
        if (filterLicense) {
            const license = licenses.find(l => l.id === filterLicense);
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

            <DataTable
                title={`Danh sách chương (${serverPagination.totalCount})`}
                columns={columns}
                data={chapters}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                filters={[
                    {
                        id: 'license-filter',
                        value: filterLicense,
                        onChange: handleFilterChange,
                        options: licenses,
                        placeholder: '— Tất cả hạng bằng —',
                    },
                ]}
                contextBadge={ activeBadge.length > 0 ? activeBadge : null }
                    searchValue={searchTerm}
                    onSearchValueChange={setSearchTerm}
                />

            <ChapterModal
                isOpen={showModal}
                chapter={selectedItem}
                action={selectedItem ? 'edit' : 'create'}
                defaultLicenseId={filterLicense} // Pre-fill license khi tạo từ context
                onClose={() => { setShowModal(false); setSelectedItem(null); }}
                onSave={handleSave}
            />
        </div>
    );
}
