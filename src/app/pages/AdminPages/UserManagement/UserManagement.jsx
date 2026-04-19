import { useEffect, useState, useCallback } from 'react';
import { fetchData, patchData } from '../../../../mocks/CallingAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import EditUserModal from './EditUserModal';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';

import './UserManagement.css';

export default function UserManagement() {
    const { user: authUser, logout, refreshNewToken } = useAuth();
    const navigate = useNavigate();

    const [USERs, setUSERs] = useState([]);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);

    const [popupProps, setPopupProps] = useState(null);

    const handleRefreshAction = async (err) => {
        if (err.status === 401) {
            const refreshResult = await refreshNewToken(authUser);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return false;
            }
            return true; // Đã refresh thành công, useEffect sẽ tự chạy lại vì authUser thay đổi
        }
        setError(err);
        return false;
    };

    const handleApiError = async (err, retryFunction) => {
        if (err.status === 401) {
            const refreshResult = await refreshNewToken(authUser);
            if (refreshResult?.message === 'Logout') {
                logout();
                navigate('/', { state: { openLogin: 'true' } });
                return;
            }
            // Nếu refresh thành công, thực thi lại hàm vừa bị lỗi
            if (retryFunction) return await retryFunction();
        }
        setError(err);
        console.error("API Error:", err);
    };

    const loadData = async () => {
        const token = authUser?.token;
        if (!token) return;

        try {
            // Chỉ hiện loading khi không có dữ liệu (tránh nháy màn hình khi retry)
            if (USERs.length === 0) setLoading(true);
            setError(null);

            const [roleRes, userRes] = await Promise.all([
                fetchData('roles/all', token),
                fetchData('user/paged?page=1&pageSize=100', token)
            ]);

            setRoles(roleRes);
            const mappedUsers = userRes.items.map(u => ({
                ...u,
                role: roleRes.find(r => r.id === u.roleId) || null
            }));
            setUSERs(mappedUsers);
        } catch (err) {
            console.error("Fetch error:", err);
            await handleRefreshAction(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authUser?.token) {
            loadData();
        }
    }, [authUser?.id, authUser?.token, refresh]);

    // Hàm Toggle Active Status
    const handleToggleActive = async (targetUser) => {
        try {
            await patchData(`user/${targetUser.id}/toggle-active`, {}, authUser.token);
            setRefresh(p => p + 1);
        } catch (err) {
            const canRetry = await handleRefreshAction(err);
            if (canRetry) await handleToggleActive(targetUser);
        }
    };

    const handleToggleLock = async (targetUser) => {
        try {
            await patchData(`user/${targetUser.id}/toggle-lock`, {}, authUser.token);
            setRefresh(p => p + 1);
        } catch (err) {
            const canRetry = await handleRefreshAction(err);
            if (canRetry) await handleToggleLock(targetUser);
        }
    };

    // Filter logic giữ nguyên nhưng sửa field check phù hợp với DTO (status là int)
    const [searchUser, setSearchUser] = useState('');
    const usersFilter = USERs.filter((u) => {
        const matchSearch = !searchUser
            || u.name?.toLowerCase().includes(searchUser.toLowerCase())
            || u.email?.toLowerCase().includes(searchUser.toLowerCase());
        return matchSearch;
    });

    if (loading) return <div className='admin-container'><TrafficLight text={'loading'} /></div>;
    if (error) return <div className='admin-container'><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>

    return (
        <div className='admin-container'>
            <div className='inner-container management-container user-management-container'>
                <header className='main-header'>
                    <h1>User Management</h1>
                    <button className='btn-primary' onClick={() => setCreating(true)}>
                        <i className='fa-solid fa-plus' /> Add more account
                    </button>
                </header>

                <section className='admin-table-container'>
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>USER</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersFilter.map((u, index) => (
                                <tr key={u.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className='user-name-cell'>
                                            <div className='avatar'>
                                                <img src={u.avatar || DefaultAvatar} alt='avatar' />
                                            </div>
                                            <span className='name'>{u.name}</span>
                                        </div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>{u.roleName || u.role?.name}</td>
                                    <td>
                                        {/* Hiển thị badge trạng thái */}
                                        <span className={`badge ${u.status === 1 ? 'active' : 'inactive'}`}>
                                            {u.status === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className='action-buttons'>
                                            <button onClick={() => setEditing(u)} title="Edit">
                                                <i className='fa-solid fa-pencil' />
                                            </button>

                                            {/* Nút Toggle Active/Inactive */}
                                            <button className='btn-toggle' onClick={() => handleToggleActive(u)}>
                                                <i className={u.status === 1 ? 'fa-solid fa-lock' : 'fa-solid fa-unlock'} />
                                                {u.status === 1 ? ' Inactive' : ' Active'}
                                            </button>
                                            <button className='btn-ban' onClick={() => handleToggleLock(u)}>
                                                <i className="fa-solid fa-user-slash" style={{ color: u.isLocked ? 'red' : 'gray' }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

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
        </div>
    );
}