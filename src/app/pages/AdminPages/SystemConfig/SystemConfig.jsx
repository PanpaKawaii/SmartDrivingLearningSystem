import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom'; // Thêm navigate
import EditConfigModal from './EditConfigModal';
import DataTable from '../../../components/Shared/DataTable';
import '../AdminPages.css';
import './SystemConfig.css';

export default function SystemConfig() {
    const { user, logout, refreshNewToken } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [action, setAction] = useState('create');

    const [serverPagination, setServerPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0
    });

    // Hàm xử lý Refresh Token tương tự User Management
    const handleRefreshAction = async (err) => {
        if (err.status === 401) {
            const refreshResult = await refreshNewToken(user);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return false;
            }
            return true; // Có thể retry
        }
        setError("Không thể kết nối đến hệ thống");
        return false;
    };

    useEffect(() => {
        const getConfigs = async () => {
            if (!user?.token) return;
            setLoading(true);
            try {
                const res = await fetchData(`SystemConfigs?page=${serverPagination.page}&pageSize=${serverPagination.pageSize}`, user?.token);
                setItems(res?.items || []);
                setServerPagination(prev => ({
                    ...prev,
                    totalCount: res?.totalItems || 0,
                    totalPages: res?.totalPages || 1,
                }));
            } catch (err) {
                const canRetry = await handleRefreshAction(err);
                if (canRetry) setRefresh(r => r + 1); // Kích hoạt chạy lại useEffect
            } finally {
                setLoading(false);
            }
        };
        getConfigs();
    }, [refresh, serverPagination.page, serverPagination.pageSize, user?.token]);

    const columns = [
        {
            key: '',
            label: 'STT',
            width: '60px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1
        },
        {
            key: 'name',
            label: 'Tên tham số',
            render: (val) => <strong style={{ color: 'var(--ins-on-surface)' }}>{val}</strong>
        },
        {
            key: 'value',
            label: 'Giá trị',
            render: (val) => <code className='ins-value-code'>{val}</code>
        },
        {
            key: 'description',
            label: 'Mô tả',
            render: (val) => <span className='text-truncate' title={val}>{val || '---'}</span>
        },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '140px',
            render: (val) => (
                <span className={`ins-status-chip ${val === 1 ? 'approved' : 'rejected'}`}>
                    <span className='chip-dot'></span>
                    {val === 1 ? 'Hoạt động' : 'Vô hiệu'}
                </span>
            )
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '120px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    <button className='ins-action-btn view' title='Sửa' onClick={() => {
                        setAction('edit');
                        setSelectedConfig(row);
                        setIsModalOpen(true);
                    }}>
                        <i className='fa-solid fa-pencil'></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Cấu hình hệ thống</h1>
                    <p>Quản lý các tham số vận hành và quy tắc kỹ thuật của hệ thống.</p>
                </div>
            </div>

            {error && <div className='ins-error-banner'>{error}</div>}

            <DataTable
                columns={columns}
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={(page) => setServerPagination(prev => ({ ...prev, page }))}
            />

            {isModalOpen && (
                <EditConfigModal
                    configProp={selectedConfig}
                    action={action}
                    onClose={() => setIsModalOpen(false)}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    );
}