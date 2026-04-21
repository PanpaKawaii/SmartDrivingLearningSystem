import { useEffect, useState, useCallback } from 'react';
import DataTable from '../../../components/Shared/DataTable';
import FilterBar from '../../../components/Shared/FilterBar'; // Đảm bảo đúng đường dẫn
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import SimulationScenarioModal from './SimulationScenarioModal';
import '../InstructorPages.css';

export default function SimulationBank() {
    const { user, logout, refreshNewToken } = useAuth();
    const [scenarios, setScenarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Phân trang
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [filters, setFilters] = useState({
        name: '',
        simulationChapterId: '',
        simulationCategoryId: '',
        simulationDifficultyLevelId: ''
    });

    const [filterOptions, setFilterOptions] = useState({
        chapters: [],
        categories: [],
        levels: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalAction, setModalAction] = useState('create');

    // Load danh mục cho bộ lọc (chạy 1 lần khi mount)
    useEffect(() => {
        const loadFilterOptions = async () => {
            if (!user?.token) return;
            try {
                const [chaps, cats, lvls] = await Promise.all([
                    fetchData('SimulationChapters/all', user.token),
                    fetchData('SimulationCategories/all', user.token),
                    fetchData('SimulationDifficultyLevels/all', user.token)
                ]);
                setFilterOptions({
                    chapters: chaps || [],
                    categories: cats || [],
                    levels: lvls || []
                });
            } catch (error) {
                console.error("Lỗi load options lọc:", error);
            }
        };
        loadFilterOptions();
    }, [user?.token]);

    const loadData = useCallback(async () => {
        if (!user?.token) return;
        setIsLoading(true);
        try {
            //filters
            let query = `SimulationScenarios?page=${page}&pageSize=${pageSize}`;

            if (filters.name) query += `&name=${encodeURIComponent(filters.name)}`;
            if (filters.simulationChapterId) query += `&simulationChapterId=${filters.simulationChapterId}`;
            if (filters.simulationCategoryId) query += `&simulationCategoryId=${filters.simulationCategoryId}`;
            if (filters.simulationDifficultyLevelId) query += `&simulationDifficultyLevelId=${filters.simulationDifficultyLevelId}`;

            const result = await fetchData(query, user.token);

            setScenarios(result.items || []);
            setTotalItems(result.totalCount || 0);
            const calculatedPages = result.totalPages || Math.ceil((result.totalCount || 0) / pageSize);
            setTotalPages(calculatedPages);

        } catch (error) {
            if (error.status === 401) {
                const refresh = await refreshNewToken(user);
                if (refresh?.message === 'Refreshed') loadData();
                else logout();
            }
        } finally {
            setIsLoading(false);
        }
    }, [user, refreshNewToken, logout, page, pageSize, filters]);

    useEffect(() => { loadData(); }, [loadData]);

    // Xử lý Lọc và Reset
    const handleSearch = () => {
        setPage(1); // Reset về trang 1 khi lọc
        loadData();
    };

    const handleReset = () => {
        setFilters({ name: '', simulationChapterId: '', simulationCategoryId: '', simulationDifficultyLevelId: '' });
        setPage(1);
    };

    const handleToggleStatus = async (id) => {
        try {
            await patchData(`SimulationScenarios/${id}`, {}, user.token);
            loadData();
        } catch (error) {
            alert("Không thể thay đổi trạng thái kịch bản.");
        }
    };

    const columns = [
        { key: 'name', label: 'Tên tình huống' },
        { key: 'chapter', label: 'Chương', render: (_, row) => row.simulationChapter?.name },
        { key: 'difficulty', label: 'Độ khó', render: (_, row) => row.simulationDifficultyLevel?.name },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'pending'}`}>
                    {val === 1 ? 'Hoạt động' : 'Đã ẩn'}
                </span>
            )
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '160px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button
                        className={`ins-action-btn ${row.status === 1 ? 'delete' : 'view'}`}
                        onClick={() => handleToggleStatus(row.id)}
                    >
                        <i className={`fa-solid ${row.status === 1 ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                    </button>
                    <button
                        className='ins-action-btn edit'
                        onClick={() => { setSelectedItem(row); setModalAction('edit'); setIsModalOpen(true); }}
                    >
                        <i className='fa-solid fa-pen'></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Ngân hàng Mô phỏng</h1>
                    <p>Quản lý kịch bản lái xe (Tổng số: {totalItems})</p>
                </div>
                <button className='ins-btn ins-btn-primary' onClick={() => { setSelectedItem(null); setModalAction('create'); setIsModalOpen(true); }}>
                    <i className='fa-solid fa-plus'></i> Thêm mới
                </button>
            </div>

            {/* Tích hợp FilterBar */}
            <FilterBar
                searchOptions={[
                    {
                        placeholder: 'Tìm tên tình huống...',
                        value: filters.name,
                        onChange: (val) => setFilters({ ...filters, name: val })
                    }
                ]}
                selectOptions={[
                    {
                        placeholder: 'Chọn Chương',
                        value: filters.simulationChapterId,
                        options: filterOptions.chapters,
                        onChange: (val) => setFilters({ ...filters, simulationChapterId: val })
                    },
                    {
                        placeholder: 'Chọn Thể loại',
                        value: filters.simulationCategoryId,
                        options: filterOptions.categories,
                        onChange: (val) => setFilters({ ...filters, simulationCategoryId: val })
                    },
                    {
                        placeholder: 'Chọn Độ khó',
                        value: filters.simulationDifficultyLevelId,
                        options: filterOptions.levels,
                        onChange: (val) => setFilters({ ...filters, simulationDifficultyLevelId: val })
                    }
                ]}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <DataTable
                columns={columns}
                data={scenarios}
                loading={isLoading}
                serverPagination={{
                    page: page,
                    pageSize: pageSize,
                    totalPages: totalPages
                }}
                onPageChange={(nextPage) => setPage(nextPage)}
            />

            <SimulationScenarioModal
                isOpen={isModalOpen}
                action={modalAction}
                item={selectedItem}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => { setIsModalOpen(false); loadData(); }}
            />
        </div>
    );
}