import { useEffect, useState } from 'react';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { roles, users } from '../../../../mocks/DataSample';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Cube from '../../../components/Cube/Cube';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';
import EditUserModal from './EditUserModal';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './UserManagement.css';

export default function UserManagement() {
    const { user } = useAuth();

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
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const UserResponse = await fetchData('users', token);
                // console.log('UserResponse', UserResponse);
                // const RoleResponse = await fetchData('roles', token);
                // console.log('RoleResponse', RoleResponse);

                const UserResponse = users;
                const RoleResponse = roles;

                console.log('RoleResponse', RoleResponse);
                const Users = UserResponse.map(user => ({
                    ...user,
                    role: RoleResponse.find(r => r.id === user.roleId) || null
                }));
                console.log('Users', Users);

                setUSERs(Users);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const openEditModal = (data) => { setEditing(data); };
    const closeEditModal = () => { setEditing(null); };
    const openCreateModal = () => { setCreating(true); };
    const closeCreateModal = () => { setCreating(false); };

    const inactiveUser = async (user) => {
        // const token = user?.token || ''; ==FIX==
        const token = '';
        const newUser = { ...user, status: user.status == 1 ? 0 : 1 };
        try {
            const UserResult = await putData(`users/${newUser.id}`, newUser, token);
            console.log('UserResult', UserResult);
            setRefresh(p => p + 1);
        } catch (error) {
            setErrorFunction('Error');
        }
    };

    const [searchUser, setSearchUser] = useState('');
    const [selectType, setSelectType] = useState('');
    const [selectStatus, setSelectStatus] = useState('');
    const usersFilter = USERs.filter((user) => {
        const userName = user.name?.toLowerCase();
        const userEmail = user.email?.toLowerCase();
        const userPhone = user.phone?.toLowerCase();

        const userType = user.type?.toLowerCase();
        const userStatus = user.status === 1 ? 'Active' : 'Inactive';

        const matchSearch = !searchUser
            || userName?.includes(searchUser.toLowerCase())
            || userEmail?.includes(searchUser.toLowerCase())
            || userPhone?.includes(searchUser.toLowerCase());
        const matchSelectType = !selectType || userType === selectType.toLowerCase();
        const matchSelectStatus = !selectStatus || userStatus == selectStatus;

        return matchSearch && matchSelectType && matchSelectStatus;
    });
    console.log('usersFilter', usersFilter);
    const handleClear = () => {
        setSearchUser('');
        setSelectType('');
        setSelectStatus('');
    };
    console.log('selectType', selectType);
    console.log('selectStatus', selectStatus);

    // if (loading) return <div className='admin-container'><Cube color={'#007bff'} setRefresh={() => { }} /></div>
    // if (error) return <div className='admin-container'><Cube color={'#dc3545'} setRefresh={setRefresh} /></div>
    if (loading) return <div className='admin-container'><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div className='admin-container'><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
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
                        <MovingLabelInput
                            type={'text'}
                            value={searchUser || ''}
                            onValueChange={(propE) => setSearchUser(propE)}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Name'}
                            labelStyle={'left moving'}
                        />
                    </div>
                    <div className='field'>
                        <StyleLabelSelect
                            id={`selectType`}
                            list={[
                                { id: 'Vip', name: 'Vip', extraOptionClassName: 'option-vip' },
                                { id: 'Regular', name: 'Regular', extraOptionClassName: 'option-regular' },
                            ]}
                            value={selectType}
                            onValueChange={(propE) => {
                                setSelectType(propE);
                            }}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Type'}
                            labelStyle={'left'}
                        />
                        <StyleLabelSelect
                            id={`selectStatus`}
                            list={[
                                { id: 'Active', name: 'Active', extraOptionClassName: 'option-active' },
                                { id: 'Inactive', name: 'Inactive', extraOptionClassName: 'option-inactive' },
                            ]}
                            value={selectStatus}
                            onValueChange={(propE) => {
                                setSelectStatus(propE);
                            }}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Status'}
                            labelStyle={'left'}
                        />
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
                                                <img src={`${user.avatar || DefaultAvatar}`} alt='avatar' />
                                            </div>
                                            <div className='user-info'>
                                                <span className='name'>{user.name}</span>
                                                <span className='role'>{user.role?.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='email'>
                                            <span>{user.email}</span>
                                        </div>
                                    </td>
                                    <td><span>{user.phone}</span></td>
                                    <td>
                                        <div className='action-buttons'>
                                            <button onClick={() => openEditModal(user)}>
                                                <span>Modify</span>
                                                <i className='fa-solid fa-pencil' />
                                            </button>
                                            <button className={`btn-active ${user.status == 0 && 'abb'}`} onClick={() => setPopupProps(user)} disabled={user.status == 1}>
                                                <span>Active</span>
                                                <i className='fa-solid fa-unlock' />
                                            </button>
                                            <button className={`btn-inactive ${user.status == 1 && 'abb'}`} onClick={() => setPopupProps(user)} disabled={user.status == 0}>
                                                <span>Inactive</span>
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
                            roleId: '',
                            email: '',
                            password: '123456',
                            name: '',
                            avatar: '',
                            phone: '',
                            gender: '',
                            type: 'Regular',
                            description: '',
                            dateOfBirth: '',
                            licenseType: '',
                        }}
                        onClose={closeCreateModal}
                        setRefresh={setRefresh}
                        action={'create'}
                    />
                )}

                {popupProps && (
                    <ConfirmDialog
                        title={'CONFIRMATION'}
                        message={`Are you sure you want to ${popupProps.status == 1 ? 'inactive' : 'active'} this user?`}
                        confirm={popupProps.status == 1 ? 'INACTIVE' : 'ACTIVE'}
                        cancel={'CANCEL'}
                        color={popupProps.status == 1 ? '#ff4d4f80' : '#52c41a80'}
                        onConfirm={() => { inactiveUser(popupProps), setPopupProps(null) }}
                        onCancel={() => setPopupProps(null)}
                    />
                )}

                {errorFunction && (
                    <ConfirmDialog
                        title={'ERROR'}
                        message={`An error has occurred!`}
                        confirm={'OKAY'}
                        cancel={''}
                        color={'#ff4d4f80'}
                        onConfirm={() => setErrorFunction(null)}
                        onCancel={() => setErrorFunction(null)}
                    />
                )}
            </div>
        </div>
    )
}
