import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';

import '../EditModal.css';

export default function EditUserModal({ userprop, onClose, setRefresh, action }) {
    const [user, setUser] = useState(userprop);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const DefaultAvatar = 'https://static.vecteezy.com/system/resources/previews/048/044/477/non_2x/pixel-art-traffic-light-game-asset-design-vector.jpg';

    const Update = async (user) => {
        const token = '';
        const newUser = { id: user.id, point: Number(user.point) || 0, type: user.type };
        try {
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
        const newUser = { point: Number(user.point) || 0, type: user.type };
        try {
            const UserResult = await postData('users', newUser, token);
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
        setUser((prev) => ({ ...prev, [name]: value }));
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
                <form onSubmit={handleSubmit}>
                    <div className='edit-title'>Edit User</div>
                    <div className='flex'>
                        <div className='image-container'>
                            <img src={user.image || DefaultAvatar} alt='avatar' />
                        </div>
                        <div className='column'>
                            <div className='input-group'>
                                <input name='name' placeholder=' ' value={user.name} onChange={handleChange} required />
                                <label htmlFor='name'>Name</label>
                            </div>
                            <div className='input-group'>
                                <input name='image' placeholder=' ' value={user.image} onChange={handleChange} required />
                                <label htmlFor='image'>Image URL</label>
                            </div>
                        </div>
                    </div>
                    {user.id &&
                        <div className='input-group'>
                            <input name='id' placeholder=' ' value={user.id} disabled />
                            <label htmlFor='id' className='disable'>ID</label>
                        </div>
                    }
                    <div className='input-group'>
                        <input name='email' placeholder=' ' value={user.email} onChange={handleChange} disabled={action != 'create'} />
                        <label htmlFor='email' className={`${action == 'create' ? '' : 'disable'}`}>Email</label>
                    </div>
                    <div className='column'>
                        <div className='flex'>
                            <div className='input-group flex-1'>
                                <select id='formType' name='type' onChange={handleChange}>
                                    <option value={user.type}>{user.type}</option>
                                    {user.type !== 'Regular' && <option value={'Regular'}>Regular</option>}
                                    {user.type !== 'Vip' && <option value={'Vip'}>Vip</option>}
                                </select>
                                <label htmlFor='type'>Type</label>
                            </div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <input name='phone' placeholder=' ' value={user.phone} onChange={handleChange} required />
                        <label htmlFor='phone'>Phone</label>
                    </div>
                    <div className='input-group flex-1'>
                        <textarea
                            name='description'
                            placeholder=' '
                            value={user.description || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor='description'>Description</label>
                    </div>
                    <div className='btn-box'>
                        <button type='submit' className='btn btn-save' disabled={loading}>SAVE</button>
                        <button type='button' className='btn' onClick={() => onClose()}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
