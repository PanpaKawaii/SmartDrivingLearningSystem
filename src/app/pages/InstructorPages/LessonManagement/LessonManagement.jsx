import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';
import LessonModal from './LessonModal';
import '../InstructorPages.css';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

const STATUS_LABELS = {
    '-1': 'Nháp',
    '1': 'Public',
    '0': 'Đã ẩn',
};
const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};
export default function LessonManagement() {
    const { user, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = user?.token || '';
    const chapterIdParam = searchParams.get('chapterId') || '';
    const chapterNameParam = searchParams.get('chapterName') || '';
    const [showModal, setShowModal] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [allChapters, setAllChapters] = useState([]);
    const [drivingLicenses, setDrivingLicenses] = useState([]);
    const [metaLoading, setMetaLoading] = useState(true); // load licenses + chapters
    const [tableLoading, setTableLoading] = useState(true); // load lessons
    const loading = metaLoading || tableLoading;
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const allChaptersRef = useRef([]);
    const [serverPagination, setServerPagination] = useState({ page: 1, pageSize: 10, totalPages: 1, totalCount: 0 });

    const [filters, setFilters] = useState({
        search: '',
        licenseId: '',
        chapterId: chapterIdParam
    });

    const [selectedItem, setSelectedItem] = useState(null);

    // Chỉ cho chọn chương khi đã chọn bằng lái
    const availableChapters = filters.licenseId
        ? allChapters.filter(c => c.drivingLicenseId === filters.licenseId)
        : [];

    // Chỉ pre-fill một lần khi chapters được load lần đầu
    const didPreFill = useRef(false);
    useEffect(() => {
        if (chapterIdParam && allChapters.length > 0 && !didPreFill.current) {
            didPreFill.current = true;
            const preChapter = allChapters.find(c => c.id === chapterIdParam);
            if (preChapter) {
                setFilters(prev => ({
                    ...prev,
                    licenseId: preChapter.drivingLicenseId || '',
                    chapterId: chapterIdParam
                }));
            }
        }
    }, [chapterIdParam, allChapters]);

    // Load licenses + chapters một lần khi mở trang
    useEffect(() => {
        (async () => {
            try {
                const subQuery = new URLSearchParams({ page: '1', pageSize: '500', status: 1 });
                const [dlRes, chRes] = await Promise.all([
                    fetchData(`DrivingLicenses/all?${subQuery.toString()}`, token),
                    fetchData(`QuestionChapters?${subQuery.toString()}`, token),
                ]);
                const chapters = normalizeItems(chRes);
                setDrivingLicenses(normalizeItems(dlRes));
                // Cập nhật cả state lẫn ref cùng lúc
                allChaptersRef.current = chapters;
                setAllChapters(chapters);
            } catch (error) {
                if (error.status == 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi tải dữ liệu bằng lái và chương.');
                }
            } finally {
                setMetaLoading(false);
            }
        })();
    }, [token]);

    // Load lessons khi filter thay đổi hoặc refresh
    useEffect(() => {
        (async () => {
            setTableLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                });
                if (filters.search.trim()) {
                    query.set('name', filters.search.trim());
                }
                let items = [];
                if (filters.chapterId) {
                    query.set('questionChapterId', filters.chapterId);
                    const res = await fetchData(`QuestionLessons?${query.toString()}`, token);
                    items = normalizeItems(res);
                    setServerPagination(prev => ({
                        ...prev,
                        page: res?.page || prev.page,
                        pageSize: res?.pageSize || prev.pageSize,
                        totalCount: res?.totalCount ?? prev.totalCount,
                        totalPages: res?.totalPages || 1,
                    }));
                } else if (filters.licenseId) {
                    const chapterIds = allChaptersRef.current
                        .filter(c => c.drivingLicenseId === filters.licenseId)
                        .map(c => c.id);
                    if (chapterIds.length > 0) {
                        const res = await fetchData(`QuestionLessons?page=1&pageSize=5000`, token);
                        items = normalizeItems(res).filter(lesson => chapterIds.includes(lesson.questionChapterId));
                        // Apply search filter if needed
                        if (filters.search.trim()) {
                            items = items.filter(lesson => lesson.name?.toLowerCase().includes(filters.search.toLowerCase()));
                        }
                        setServerPagination(prev => ({
                            ...prev,
                            page: 1,
                            pageSize: prev.pageSize,
                            totalCount: items.length,
                            totalPages: Math.ceil(items.length / prev.pageSize) || 1,
                        }));
                        const startIdx = (serverPagination.page - 1) * serverPagination.pageSize;
                        items = items.slice(startIdx, startIdx + serverPagination.pageSize);
                    }
                } else {
                    const res = await fetchData(`QuestionLessons?${query.toString()}`, token);
                    items = normalizeItems(res);
                    setServerPagination(prev => ({
                        ...prev,
                        page: res?.page || prev.page,
                        pageSize: res?.pageSize || prev.pageSize,
                        totalCount: res?.totalCount ?? prev.totalCount,
                        totalPages: res?.totalPages || 1,
                    }));
                }
                setLessons(items);
            } catch (error) {
                if (error.status == 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi tải dữ liệu');
                }
            } finally {
                setTableLoading(false);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, token, serverPagination.page, serverPagination.pageSize, filters.chapterId, filters.licenseId, filters.search]);

    const handleNavigateQuestions = (row) => {
        navigate(`/instructor/question-bank?lessonId=${row.id}&chapterId=${row.questionChapterId}`);
    };

    const handlePageChange = (page) => {
        setServerPagination(prev => ({ ...prev, page }));
    };

    const handleToggleStatus = async (id) => {
        try {
            
            setTableLoading(true);
            // Toggle: 1 (Public) <-> 0 (Hidden)
            await patchData(`QuestionLessons/${id}`, { }, token);
            setRefresh(r => r + 1);
        } catch (err) {
            setError('Lỗi cập nhật trạng thái');
        } finally {
            setTableLoading(false);
        }
    };
    
    const handleFilterLicense = (val) => {
        setFilters(prev => ({ ...prev, licenseId: val, chapterId: '' }));
        setSearchParams({});
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleFilterChapter = (val) => {
        setFilters(prev => ({ ...prev, chapterId: val }));
        if (val) {
            const ch = allChapters.find(c => c.id === val);
            setSearchParams({ chapterId: val, chapterName: ch?.name || '' });
        } else {
            setSearchParams({});
        }
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleClearBadge = () => {
        setFilters(prev => ({ ...prev, licenseId: '', chapterId: '' }));
        setSearchParams({});
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };
    const handleClearSearch = () => {
        setFilters(prev => ({ ...prev, search: '' }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleSearch = (search) => {
        setFilters(prev => ({ ...prev, search }));
        setServerPagination(prev => ({ ...prev, page: 1 }));
    };    
    const handleSave = () => {
        setShowModal(false);
        setSelectedItem(null);
        setSearchParams({});
        setServerPagination(prev => ({ ...prev, page: 1 }));
        setRefresh(r => r + 1);
    };


    // Label cho context badge
    const activeBadge = (() => {
        let badge = [];
        if(filters.search.trim()){
            badge.push({ text: `"${filters.search.trim()}"`, onClear: () => handleClearSearch() });
        }
        if (filters.chapterId) {
            const ch = allChapters.find(c => c.id === filters.chapterId);
            badge.push({ text: chapterNameParam || ch?.name || '', onClear: () => handleClearBadge() });
        } else if (filters.licenseId) {
            const license = drivingLicenses.find(l => l.id === filters.licenseId);
            badge.push({ text: license?.name || '', onClear: () => handleClearBadge() });
        }
        return badge;
    })();

    const columns = [
        { key: 'index', label: 'STT', width: '60px',render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1 },
        { key: 'name', label: 'Tên bài học', width: '100px' },
        { key: 'questionChapterId', label: 'Bằng', render: (val) => {
            const drivingLicense = drivingLicenses.find(t => t.id === allChapters.find(t => t.id === val)?.drivingLicenseId);
            return drivingLicense?.name || '---';
        } },
        { key: 'questionChapterId', label: 'Chương', width: '100px', render: (val) => {
            const chapter = allChapters.find(t => t.id === val);
            return chapter?.name || '---';
        } },
        { key: 'content', label: 'Nội dung', render: (val) => {
           return <div dangerouslySetInnerHTML={{ __html: val }}/>;
        }},
        { key: 'status', label: 'Trạng thái', width: '100px', render: (val) => {
                let cls = 'active';
                if (val === 0) cls = 'hidden';
                else if (val === -1) cls = 'draft';
                return <span className={`ins-status-chip ${cls}`}><span className='chip-dot'></span>{STATUS_LABELS[String(val)] || '---'}</span>;
        },},
        { key: 'actions', label: 'Thao tác', width: '230px', render: (_, row) => (
         <div className='ins-action-cell'>
                {/* Quick Navigate → Questions */}
                <button
                    className='ins-nav-btn'
                    title='Quản lý câu hỏi của bài học này'
                    onClick={() => handleNavigateQuestions(row)}
                >
                    <i className='fa-solid fa-circle-question' />
                    Quản lý câu hỏi
                    <i className='fa-solid fa-arrow-right' />
                </button>
                <button className='ins-action-btn edit' title='Sửa' onClick={() => {
                    setSelectedItem(row);
                    setShowModal(true);
                }}><i className='fa-solid fa-pen'></i></button>
                <button 
                    className={`ins-action-btn ${row.status === 1 ? 'active' : 'hidden'}`}
                    title={row.status === 1 ? 'Ẩn bài học' : 'Hiển thị bài học'}
                    onClick={() => handleToggleStatus(row.id,row.status)}
                    disabled={loading}
                >
                    <i className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`} style={{fontSize:'1rem'}}></i>
                </button>
            </div>
        )},
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Bài học</h1>
                    <p>Quản lý danh sách bài học trong hệ thống đào tạo.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {chapterIdParam && (
                        <button className='ins-btn' style={{ background: 'var(--ins-surface-high)', color: 'var(--ins-on-surface)' }} onClick={() => navigate(-1)}>
                            <i className='fa-solid fa-arrow-left'></i> Quay lại
                        </button>
                    )}
                    <button className='ins-btn ins-btn-primary' onClick={() => {
                        setSelectedItem(null);
                        setShowModal(true);
                    }}>
                        <i className='fa-solid fa-plus'></i> Thêm bài học
                    </button>
                </div>
            </div>
            <FilterBar
                searchOptions={[
                    { placeholder: 'Tìm kiếm bài học...', value: filters.search, onChange: (val) => setFilters(prev => ({ ...prev, search: val })) }
                ]}
                selectOptions={[
                    {
                        placeholder: '— Tất cả hạng bằng —',
                        value: filters.licenseId,
                        options: drivingLicenses,
                        onChange: handleFilterLicense
                    },
                    {
                        placeholder: filters.licenseId ? '— Tất cả chương —' : '— Chọn bằng trước —',
                        value: filters.chapterId,
                        options: availableChapters,
                        disabled: !filters.licenseId,
                        onChange: handleFilterChapter
                    }
                ]}
                onSearch={() => setServerPagination(prev => ({ ...prev, page: 1 }))}
                onReset={() => { setFilters({ search: '', licenseId: '', chapterId: '' }); setServerPagination(prev => ({ ...prev, page: 1 })); setSearchParams({}); }}
            />
            <DataTable 
                title={`Danh sách bài học (${serverPagination.totalCount})`} 
                columns={columns} 
                data={lessons}
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
            <LessonModal 
                isOpen={showModal} 
                lesson={selectedItem}
                action={selectedItem ? 'edit' : 'add'}
                listLicenses={drivingLicenses}
                listChapters={allChapters}
                defaultChapterId={filters.chapterId}
                onClose={() => {
                    setShowModal(false);
                    setSelectedItem(null);
                }}
                onSave={handleSave}
            />
        </div>
    );
}
