import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';
import '../EditModal.css';

export default function EditUserModal({ userprop, onClose, setRefresh, action }) {
    const [user, setUser] = useState(userprop);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const DefaultAvatar = 'https://cdn-icons-png.flaticon.com/512/11485/11485970.png';

    const Update = async (user) => {
        const token = '';
        const newAccount = { ...user.account };
        const newUser = { id: user.id, point: Number(user.point) || 0, type: user.type, accountId: user.accountId };
        try {
            const AccountResult = await putData(`accounts/${newAccount.id}`, newAccount, token);
            const UserResult = await putData(`users/${newUser.id}`, newUser, token);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            setError('Error');
        } finally {
            setLoading(false);
        }
    };

    const Upload = async (user) => {
        const token = '';
        const newAccount = { ...user.account };
        try {
            const AccountResult = await postData('accounts', newAccount, token);
            if (AccountResult) {
                const newUser = { point: Number(user.point) || 0, type: user.type, accountId: AccountResult.id };
                const UserResult = await postData('users', newUser, token);
            }
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            setError('Error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('account.')) {
            const key = name.split('.')[1];
            setUser((prev) => ({
                ...prev,
                account: { ...prev.account, [key]: value },
            }));
        } else {
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (action == 'edit') Update(user);
        else if (action == 'create') Upload(user);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <button className='btn close-btn' onClick={() => onClose()}><i className='fa-solid fa-xmark'></i></button>
                <form onSubmit={handleSubmit} className='user-edit-form'>
                    <div className='edit-title'>Edit User</div>
                    <div className='flex'>
                        <div className='image-container'><img src={user.account?.image || DefaultAvatar} alt='avatar' /></div>
                        <div className='column'>
                            <div className='input-group'>
                                <input name='account.name' placeholder=' ' value={user.account?.name} onChange={handleChange} required />
                                <label htmlFor='name'>Name</label>
                            </div>
                            <div className='input-group'>
                                <input name='account.image' placeholder=' ' value={user.account?.image} onChange={handleChange} required />
                                <label htmlFor='image'>Image URL</label>
                            </div>
                        </div>
                    </div>
                    {user.account?.id &&
                        <div className='input-group'>
                            <input name='id' placeholder=' ' value={user.account?.id} disabled />
                            <label htmlFor='id' className='disable'>ID</label>
                        </div>
                    }
                    <div className='input-group'>
                        <input name='account.email' placeholder=' ' value={user.account?.email} onChange={handleChange} disabled={action != 'create'} />
                        <label htmlFor='email' className={`${action == 'create' ? '' : 'disable'}`}>Email</label>
                    </div>
                    <div className='column'>
                        <div className='flex'>
                            <div className='input-group group-1'>
                                <select id='formType' name='type' onChange={handleChange}>
                                    <option value={user.type}>{user.type}</option>
                                    {user.type !== 'Regular' && <option value={'Regular'}>Regular</option>}
                                    {user.type !== 'Vip' && <option value={'Vip'}>Vip</option>}
                                </select>
                                <label htmlFor='type'>Type</label>
                            </div>
                            <div className='input-group'>
                                <input name='point' min={0} type='number' placeholder=' ' value={user.point} onChange={handleChange} required />
                                <label htmlFor='point'>Point</label>
                            </div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <input name='account.phone' placeholder=' ' value={user.account?.phone} onChange={handleChange} required />
                        <label htmlFor='phone'>Phone</label>
                    </div>
                    <div className='input-group group-1'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            name='account.description'
                            placeholder=' '
                            value={user.account?.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='btn-box'>
                        <button type='submit' className='btn-save' disabled={loading}>SAVE</button>
                        <button type='button' onClick={() => onClose()}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
