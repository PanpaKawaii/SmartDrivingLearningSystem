import { useEffect, useState } from 'react';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar';
import CreateSituationExamModal from './CreateSituationExamModal';
import SituationExamDetailModal from './SituationExamDetailModal';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import './SimulationExamManagement.css';
import '../InstructorPages.css';

const normalizeItems = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
};

export default function SimulationExamManagement() {
    const { user, refreshNewToken } = useAuth();
    const token = user?.token || '';

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(0);

    const [showCreate, setShowCreate] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [startEditMode, setStartEditMode] = useState(false);

    const [serverPagination, setServerPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0,
    });

    const [filters, setFilters] = useState({
        search: '',
        status: '',
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError('');
            try {
                const query = new URLSearchParams({
                    page: String(serverPagination.page),
                    pageSize: String(serverPagination.pageSize),
                });
                if (filters.search.trim()) query.set('title', filters.search.trim());
                if (filters.status !== '') query.set('status', filters.status);

                const res = await fetchData(`SituationExams?${query.toString()}`, token);
                const items = normalizeItems(res);

                setExams(items);
                setServerPagination((prev) => ({
                    ...prev,
                    page: res?.page || prev.page,
                    pageSize: res?.pageSize || prev.pageSize,
                    totalCount: res?.totalCount ?? prev.totalCount,
                    totalPages: res?.totalPages || 1,
                }));
            } catch (err) {
                if (err.status === 401) {
                    refreshNewToken(user);
                } else {
                    setError('Lỗi tải dữ liệu đề thi mô phỏng.');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [
        token,
        refresh,
        serverPagination.page,
        serverPagination.pageSize,
        filters.search,
        filters.status,
    ]);

    const handlePageChange = (page) => {
        setServerPagination((prev) => ({ ...prev, page }));
    };

    const handleSearch = () => {
        setServerPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handleClearFilter = () => {
        setFilters({ search: '', status: '' });
        setServerPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handleToggleStatus = async (id) => {
        try {
            await patchData(`SituationExams/${id}`, {}, token);
            setRefresh((r) => r + 1);
        } catch (err) {
            if (err.status === 401) {
                refreshNewToken(user);
            } else {
                setError('Lỗi cập nhật trạng thái.');
            }
        }
    };

    const columns = [
        {
            key: 'position',
            label: 'STT',
            width: '60px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1,
        },
        {
            key: 'title',
            label: 'Tên bộ đề thi mô phỏng',
            render: (val, row) => (
                <div style={{ padding: '4px 0' }}>
                    <div
                        style={{
                            fontWeight: 600,
                            color: 'var(--ins-on-background)',
                            marginBottom: '4px',
                            lineHeight: '1.4',
                        }}
                    >
                        {val && val.length > 70 ? (
                            <span title={val}>{val.substring(0, 70)}…</span>
                        ) : (
                            val
                        )}
                    </div>
                    {row.description && (
                        <div
                            style={{
                                fontSize: '0.8rem',
                                color: 'var(--ins-on-surface)',
                                opacity: 0.8,
                            }}
                        >
                            {row.description.length > 80
                                ? row.description.substring(0, 80) + '…'
                                : row.description}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'simulationExams',
            label: 'Số tình huống',
            width: '130px',
            render: (val) => (
                <span style={{ fontWeight: 600 }}>
                    <i
                        className='fa-solid fa-film'
                        style={{ marginRight: '6px', color: 'var(--ins-primary)', opacity: 0.8 }}
                    />
                    {val?.length ?? 0} tình huống
                </span>
            ),
        },
        {
            key: 'duration',
            label: 'Thời gian',
            width: '110px',
            render: (val) => (
                <span>
                    <i
                        className='fa-regular fa-clock'
                        style={{ marginRight: '6px', color: 'var(--ins-primary)', opacity: 0.8 }}
                    />
                    ~{Math.ceil(val / 60)} phút
                </span>
            ),
        },
        {
            key: 'passScore',
            label: 'Điểm đạt (%)',
            width: '110px',
            render: (val) => (
                <span style={{ fontWeight: 600, color: 'var(--ins-primary)' }}>{val} %</span>
            ),
        },
        // {
        //     key: 'isRandom',
        //     label: 'Ngẫu nhiên',
        //     width: '110px',
        //     render: (val) => (
        //         <span className={`ins-status-chip ${val ? 'approved' : 'pending'}`}>
        //             <span className='chip-dot'></span>
        //             {val ? 'Có' : 'Không'}
        //         </span>
        //     ),
        // },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    <span className='chip-dot'></span>
                    {val === 1 ? 'Hoạt động' : 'Ngưng'}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '140px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button
                        className='ins-action-btn view'
                        title='Xem chi tiết'
                        onClick={() => {
                            setStartEditMode(false);
                            setSelectedExam(row);
                        }}
                    >
                        <i className='fa-solid fa-eye' />
                    </button>
                    <button
                        className='ins-action-btn edit'
                        title='Chỉnh sửa'
                        onClick={() => {
                            setStartEditMode(true);
                            setSelectedExam(row);
                        }}
                    >
                        <i className='fa-solid fa-pen' />
                    </button>
                    <button
                        className={`ins-action-btn ${row.status === 1 ? 'delete' : 'view'}`}
                        title={row.status === 1 ? 'Đặt thành Ngưng' : 'Kích hoạt'}
                        onClick={() => handleToggleStatus(row.id)}
                    >
                        <i
                            className={`fa-solid fa-toggle-${row.status === 1 ? 'on' : 'off'}`}
                            style={{ fontSize: '1.2rem' }}
                        />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý Đề thi Mô phỏng</h1>
                    <p>
                        Tạo và quản lý bộ đề thi mô phỏng lái xe từ các tình huống trong Ngân hàng
                        Mô phỏng.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className='ins-btn ins-btn-primary'
                        onClick={() => setShowCreate(true)}
                    >
                        <i className='fa-solid fa-plus' /> Tạo đề thi mới
                    </button>
                </div>
            </div>

            <FilterBar
                searchOptions={[
                    {
                        placeholder: 'Tìm kiếm tên đề thi...',
                        value: filters.search,
                        onChange: (val) => setFilters((prev) => ({ ...prev, search: val })),
                    },
                ]}
                selectOptions={[
                    {
                        placeholder: '— Trạng thái —',
                        value: filters.status,
                        options: [
                            { id: '1', name: 'Hoạt động' },
                            { id: '0', name: 'Ngưng' },
                        ],
                        onChange: (val) => {
                            setFilters((prev) => ({ ...prev, status: val }));
                            setServerPagination((prev) => ({ ...prev, page: 1 }));
                        },
                    },
                ]}
                onSearch={handleSearch}
                onReset={handleClearFilter}
            />

            {error && (
                <div className='ins-error-banner' style={{ marginBottom: 12 }}>
                    <i className='fa-solid fa-triangle-exclamation' /> {error}
                </div>
            )}

            <DataTable
                title={`Hiển thị ${exams.length}/${serverPagination.totalCount || exams.length} bộ đề thi mô phỏng`}
                columns={columns}
                data={exams}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={handlePageChange}
                actions={
                    <button
                        className='ins-btn ins-btn-secondary'
                        onClick={() => setRefresh((r) => r + 1)}
                        disabled={loading}
                    >
                        <i className='fa-solid fa-rotate-right' /> Làm mới
                    </button>
                }
            />

            {/* Modal Tạo mới */}
            <CreateSituationExamModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={() => setRefresh((r) => r + 1)}
            />

            {/* Modal Xem chi tiết / Chỉnh sửa */}
            <SituationExamDetailModal
                isOpen={!!selectedExam}
                exam={selectedExam}
                startInEditMode={startEditMode}
                onClose={() => {
                    setSelectedExam(null);
                    setStartEditMode(false);
                }}
                onSuccess={() => setRefresh((r) => r + 1)}
            />
        </div>
    );
}
