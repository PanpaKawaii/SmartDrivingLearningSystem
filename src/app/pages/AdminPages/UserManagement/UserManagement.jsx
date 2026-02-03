import { useEffect, useState } from 'react';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { GlobalColor } from '../../../../mocks/GlobalVar';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Cube from '../../../components/Cube/Cube';
import EditUserModal from './EditUserModal';
import { users, roles, permissions, rolePermissions } from '../../../../mocks/DataSample';

import './UserManagement.css';

export default function UserManagement() {
    const [USERs, setUSERs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [popupProps, setPopupProps] = useState(null);
    const DefaultAvatar = 'https://static.vecteezy.com/system/resources/previews/048/044/477/non_2x/pixel-art-traffic-light-game-asset-design-vector.jpg';

    useEffect(() => {
        const fetchDataAPI = async () => {
            setError(null);
            setLoading(true);
            const token = '';
            try {
                // const UserResponse = await fetchData('users', token);
                // console.log('UserResponse', UserResponse);
                // const RoleResponse = await fetchData('roles', token);
                // console.log('RoleResponse', RoleResponse);
                // const PermissionResponse = await fetchData('permissions', token);
                // console.log('PermissionResponse', PermissionResponse);
                // const RolePermissionResponse = await fetchData('role-permissions', token);
                // console.log('RolePermissionResponse', RolePermissionResponse);

                const UserResponse = users;
                const RoleResponse = roles;
                const PermissionResponse = permissions;
                const RolePermissionResponse = rolePermissions;

                const Roles = RoleResponse.filter(r => r.status === 1).map(role => {
                    const permissionIds = RolePermissionResponse.filter(rp => rp.roleId === role.id).map(rp => rp.permissionId);
                    const permissions = PermissionResponse.filter(p => p.status === 1 && permissionIds.includes(p.id));
                    return { ...role, permissions }
                })
                console.log('Roles', Roles);
                const Users = UserResponse.map(user => ({
                    ...user,
                    role: Roles.find(r => r.id === user.roleId) || null
                }));
                console.log('Users', Users);

                setUSERs(Users);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [refresh]);

    const openEditModal = (data) => { setEditing(data); };
    const closeEditModal = () => { setEditing(null); };
    const openCreateModal = () => { setCreating(true); };
    const closeCreateModal = () => { setCreating(false); };

    const banUser = async (user) => {
        const token = '';
        const newUser = { ...user, status: user.status === 1 ? 0 : 1 };
        try {
            const UserResult = await putData(`users/${newUser.id}`, newUser, token);
            console.log('UserResult', UserResult);
            setRefresh(p => p + 1);
        } catch (error) {
            setErrorFunction('Error');
        }
    };

    const [searchUser, setSearchUser] = useState('');
    const [select, setSelect] = useState('');
    const usersFilter = USERs.filter((user) => {
        const userName = user.name?.toLowerCase();
        const userEmail = user.email?.toLowerCase();
        const userPhone = user.phone?.toLowerCase();

        const userType = user.type?.toLowerCase();
        const userStatus = user.status;

        const matchSearch = !searchUser
            || userName?.includes(searchUser.toLowerCase())
            || userEmail?.includes(searchUser.toLowerCase())
            || userPhone?.includes(searchUser.toLowerCase());
        const matchSelect = !select || userType?.includes(select.toLowerCase()) || userStatus == select;

        return matchSearch && matchSelect;
    });
    console.log('usersFilter', usersFilter);
    const handleClear = () => {
        setSearchUser('');
        setSelect('');
    };

    if (loading) return <div className='admin-container'><Cube color={'#007bff'} setRefresh={() => { }} /></div>
    if (error) return <div className='admin-container'><Cube color={'#dc3545'} setRefresh={setRefresh} /></div>
    return (
        <div className='admin-container'>
            {/* {JSON.stringify(usersFilter?.[0], null, 0)} */}
            <div className='inner-container management-container user-management-container'>

                <header className='main-header'>
                    <h1>User Management</h1>
                    <button className='btn-primary' onClick={() => openCreateModal(true)}>
                        <i className='fa-solid fa-plus' />
                        Add more account
                    </button>
                </header>

                <form className='controls'>
                    <div className='count'>{usersFilter?.length} results</div>
                    <div className='search-bar'>
                        <i className='fa-solid fa-magnifying-glass' />
                        <input type='text' placeholder='Search by name, email, phone...' value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                    </div>
                    <div className='field'>
                        <select id='formSelect' value={select} onChange={(e) => setSelect(e.target.value)}>
                            <option className='option' value={''}>-- Type / Status --</option>
                            <option className='option-vip' value={'Vip'}>Vip</option>
                            <option className='option-regular' value={'Regular'}>Regular</option>
                            <option className='option-active' value={'1'}>Active</option>
                            <option className='option-banned' value={'0'}>Banned</option>
                        </select>
                    </div>
                    <button type='button' className='btn-secondary' onClick={handleClear}>
                        CLEAR
                    </button>
                    <button type='button' className='btn-secondary' onClick={() => setRefresh(p => p + 1)}>
                        Refresh
                    </button>
                </form>

                <section className='admin-table-container'>
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>USER</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>POINT</th>
                                <th>TYPE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersFilter?.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className='user-name-cell'>
                                            <div className='avatar'>
                                                <img src={`${user.account?.image || DefaultAvatar}`} alt='avatar' />
                                            </div>
                                            <div className='user-info'>
                                                <span className='name'>{user.account?.name}</span>
                                                <span className='role'>{user.account?.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='email'>
                                            <span>{user.account?.email}</span>
                                        </div>
                                    </td>
                                    <td><span>{user.account?.phone}</span></td>
                                    <td><span>{user.point}</span></td>
                                    <td><span>{user.type}</span></td>
                                    <td>
                                        <div className='action-buttons'>
                                            <button onClick={() => openEditModal(user)}>
                                                <span>Modify</span>
                                                <i className='fa-solid fa-pencil' />
                                            </button>
                                            <button className={`btn-active ${user.account?.status == 0 && 'abb'}`} onClick={() => setPopupProps(user)} disabled={user.account?.status == 1}>
                                                <span>Active</span>
                                                <i className='fa-solid fa-unlock' />
                                            </button>
                                            <button className={`btn-banned ${user.account?.status == 1 && 'abb'}`} onClick={() => setPopupProps(user)} disabled={user.account?.status == 0}>
                                                <span>Banned</span>
                                                <i className='fa-solid fa-lock' />
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
                        onClose={closeEditModal}
                        setRefresh={setRefresh}
                        action={'edit'}
                    />
                )}

                {creating && (
                    <EditUserModal
                        userprop={{
                            point: 0,
                            type: 'Regular',
                            account: {
                                name: '',
                                email: '',
                                password: '123456',
                                phone: '',
                                image: '',
                                role: 'User',
                                description: '',
                                status: 1,
                            }
                        }}
                        onClose={closeCreateModal}
                        setRefresh={setRefresh}
                        action={'create'}
                    />
                )}

                {popupProps && (
                    <ConfirmDialog
                        title={'CONFIRMATION'}
                        message={`Are you sure you want to ${popupProps.account?.status == 1 ? 'ban' : 'active'} this user?`}
                        confirm={popupProps.account?.status == 1 ? 'BAN' : 'ACTIVE'}
                        cancel={'CANCEL'}
                        color={popupProps.account?.status == 1 ? GlobalColor.red + '80' : GlobalColor.green + '80'}
                        onConfirm={() => { banUser(popupProps), setPopupProps(null) }}
                        onCancel={() => setPopupProps(null)}
                    />
                )}

                {errorFunction && (
                    <ConfirmDialog
                        title={'ERROR'}
                        message={`An error has occurred!`}
                        confirm={'OKAY'}
                        cancel={''}
                        color={GlobalColor.red + '80'}
                        onConfirm={() => setErrorFunction(null)}
                        onCancel={() => setErrorFunction(null)}
                    />
                )}
            </div>
        </div>
    )
}
