import { useEffect, useState } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import EditUserModal from './EditUserModal';
import DataTable from '../../../components/Shared/DataTable'; // Import DataTable
import '../AdminPages.css'; // Sử dụng chung style với trang AdminPendingPosts

export default function UserManagement() {
    const { user: authUser, logout, refreshNewToken } = useAuth();
    const navigate = useNavigate();

    // Dữ liệu và trạng thái
    const [items, setItems] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    // Phân trang chuẩn theo DataTable
    const [serverPagination, setServerPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0
    });

    // Filter tách biệt Name và Email
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        roleId: ''
    });

    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);

    // Hàm xử lý Refresh Token & Retry
    const handleRefreshAction = async (err) => {
        if (err.status === 401) {
            const refreshResult = await refreshNewToken(authUser);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return false;
            }
            return true;
        }
        setError('Lỗi kết nối hệ thống');
        return false;
    };

    useEffect(() => {
        (async () => {
            if (!authUser?.token) return;
            setLoading(true);
            setError(null);
            try {
                // Fetch Roles một lần duy nhất
                if (roles.length === 0) {
                    const roleRes = await fetchData('roles/all', authUser.token);
                    setRoles(roleRes);
                }

                const query = new URLSearchParams({
                    page: serverPagination.page,
                    pageSize: serverPagination.pageSize,
                    name: filters.name,
                    email: filters.email,
                    roleId: filters.roleId
                });

                const res = await fetchData(`user/paged?${query.toString()}`, authUser.token);

                setItems(res?.items || []);
                setServerPagination(prev => ({
                    ...prev,
                    totalCount: res?.totalItems || 0,
                    totalPages: res?.totalPages || 1,
                }));
            } catch (err) {
                await handleRefreshAction(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, authUser?.token, serverPagination.page, serverPagination.pageSize]);

    const handleResetFilter = () => {
        setFilters({ name: '', email: '', roleId: '' });
        setServerPagination(prev => ({ ...prev, page: 1 }));
        setRefresh(r => r + 1);
    };

    const handleToggleActive = async (targetUser) => {
        try {
            await patchData(`user/${targetUser.id}/toggle-active`, {}, authUser.token);
            setRefresh(r => r + 1);
        } catch (err) {
            const canRetry = await handleRefreshAction(err);
            if (canRetry) handleToggleActive(targetUser);
        }
    };

    const handleToggleLock = async (targetUser) => {
        try {
            await patchData(`user/${targetUser.id}/toggle-lock`, {}, authUser.token);
            setRefresh(r => r + 1);
        } catch (err) {
            const canRetry = await handleRefreshAction(err);
            if (canRetry) handleToggleLock(targetUser);
        }
    };

    // Định nghĩa các cột cho DataTable giống Pending Posts
    const columns = [
        {
            key: '',
            label: 'STT',
            width: '60px',
            render: (_, __, rIdx, page, pageSize) => (page - 1) * pageSize + rIdx + 1
        },
        {
            key: 'name',
            label: 'Người dùng',
            render: (val, row) => (
                <div className='user-name-cell' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={row.avatar || DefaultAvatar} alt='avt' style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <span>{val}</span>
                </div>
            )
        },
        { key: 'email', label: 'Email' },
        {
            key: 'roleName',
            label: 'Vai trò',
            width: '120px',
            render: (val, row) => val || roles.find(r => r.id === row.roleId)?.name || '---'
        },
        {
            key: 'status',
            label: 'Trạng thái',
            width: '120px',
            render: (val) => {
                let statusCls = 'pending'; // Mặc định Inactive
                let statusText = 'Inactive';

                if (val === 1) {
                    statusCls = 'approved';
                    statusText = 'Active';
                } else if (val === 2) {
                    statusCls = 'rejected'; // Dùng màu đỏ của trang pending posts
                    statusText = 'Banned';
                }

                return (
                    <span className={`ins-status-chip ${statusCls}`}>
                        <span className='chip-dot'></span>
                        {statusText}
                    </span>
                );
            }
        },
        {
            key: 'actions',
            label: 'Thao tác',
            width: '150px',
            render: (_, row) => (
                <div className='ins-action-cell'>
                    {/* Nút Sửa: Vô hiệu hóa nếu bị Ban */}
                    <button
                        className='ins-action-btn view'
                        title='Sửa'
                        onClick={() => setEditing(row)}
                        disabled={row.status === 2}
                        style={row.status === 2 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        <i className='fa-solid fa-pencil'></i>
                    </button>

                    {/* Nút Kích hoạt/Khóa: ẨN HOÀN TOÀN nếu status là 2 (Bị ban) */}
                    {row.status !== 2 && (
                        <button
                            className='ins-action-btn edit'
                            title={row.status === 1 ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            onClick={() => handleToggleActive(row)}
                        >
                            <i className={row.status === 1 ? 'fa-solid fa-lock' : 'fa-solid fa-unlock'}></i>
                        </button>
                    )}

                    {/* Nút Ban: Dựa vào status === 2 để đổi màu icon */}
                    <button
                        className='ins-action-btn delete'
                        title={row.status === 2 ? 'Gỡ Ban' : 'Ban tài khoản'}
                        onClick={() => handleToggleLock(row)}
                    >
                        <i
                            className="fa-solid fa-user-slash"
                            style={{ color: row.status === 2 ? '#d32f2f' : 'inherit' }}
                        ></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Quản lý tài khoản</h1>
                    <p>Quản lý danh sách người dùng và phân quyền hệ thống.</p>
                </div>
                <button className='btn-primary' onClick={() => setCreating(true)}>
                    <i className='fa-solid fa-plus' /> Thêm tài khoản
                </button>
            </div>

            {error && <div className='ins-error-banner'>{error}</div>}

            {/* Thanh Filter */}
            <div className='ins-filter-bar' style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                    className='ins-input'
                    placeholder='Tìm theo tên...'
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
                <input
                    className='ins-input'
                    placeholder='Tìm theo email...'
                    value={filters.email}
                    onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                />
                <select
                    className='ins-select'
                    value={filters.roleId}
                    onChange={(e) => setFilters({ ...filters, roleId: e.target.value })}
                >
                    <option value="">Tất cả vai trò</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>

                <button className='ins-btn-search' onClick={() => { setServerPagination({ ...serverPagination, page: 1 }); setRefresh(r => r + 1); }}>
                    <i className="fa-solid fa-magnifying-glass"></i> Lọc
                </button>
                <button className='ins-btn-reset' title="Reset filter" onClick={handleResetFilter}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <DataTable
                title={`Danh sách người dùng`}
                columns={columns}
                data={items}
                loading={loading}
                serverPagination={serverPagination}
                onPageChange={(page) => setServerPagination(prev => ({ ...prev, page }))}
            />

            {editing && (
                <EditUserModal
                    userprop={editing}
                    roles={roles}
                    onClose={() => setEditing(null)}
                    setRefresh={setRefresh}
                    action={'edit'}
                />
            )}
            {creating && (
                <EditUserModal
                    userprop={{ roleId: '', email: '', password: '', name: '', status: 1 }}
                    roles={roles}
                    onClose={() => setCreating(false)}
                    setRefresh={setRefresh}
                    action={'create'}
                />
            )}
        </div>
    );
}