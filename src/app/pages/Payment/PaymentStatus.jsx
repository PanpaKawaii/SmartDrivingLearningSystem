import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { fetchData, patchData } from '../../../mocks/CallingAPI';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import StarsBackground from '../../components/StarsBackground/StarsBackground';

import './PaymentStatus.css';

export default function PaymentStatus() {
    const { user } = useAuth();

    const [message, setMessage] = useState('');
    const [ThisUser, setThisUser] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const messageParam = urlParams.get('message');
        setMessage(decodeURIComponent(messageParam) || '');
    }, [refresh]);

    // useEffect(() => {
    //     (async () => {
    //         setLoading(true);
    //         setError(null);
    //         const token = user?.token || '';
    //         try {
    //             const ThisUserResponse = await fetchData(`User/${user?.id}`, token);
    //             console.log('ThisUserResponse', ThisUserResponse);

    //             setThisUser(ThisUserResponse);
    //         } catch (error) {
    //             console.error('Error', error);
    //             setError(error);
    //             if (error.status == 401) refreshNewToken(user);
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, [refresh, user?.token]);

    // const changeUserType = async (type) => {
    //     setLoading(true);
    //     const token = user?.token || null;
    //     try {
    //         const UserData = {
    //             name: ThisUser?.name,
    //             type: type,
    //         };
    //         console.log('UserData:', UserData);

    //         const result = await patchData(`User/${user?.id}`, UserData, token);
    //         console.log('result', result);

    //         if (result?.message == 'Cập nhật người dùng thành công.' && type == 'VIP') {
    //             localStorage.removeItem('ActivateMembership');
    //         }
    //         if (result?.message == 'Cập nhật người dùng thành công.' && type == 'Regular') {
    //             localStorage.setItem('ActivateMembership', 'ReadyToActivate');
    //         }
    //     } catch (err) {
    //         console.error('Error', err);
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //         setRefresh(p => p + 1);
    //     }
    // }

    // const ActivateMembership = localStorage.getItem('ActivateMembership');

    return (
        <div className='payment-status-container container'>
            <StarsBackground />
            <div className='status-card'>
                {message ?
                    (message == 'Thanh toán thành công' ?
                        <>
                            <div className='icon'>✓</div>
                            <div className='title success'>{message}</div>
                            {/* <div className='title success'>Thanh toán thành công</div> */}
                            {/* <div className='title success'>Thanh toán Membership thành công</div> */}
                            {/* <div className='title fail'>Thanh toán không thành công</div> */}
                            {/* <div className='title fail'>Thanh toán thất bại</div> */}
                        </>
                        :
                        <>
                            <div className='icon'>
                                <span>×</span>
                                <div className='div-1'></div>
                                <div className='div-2'></div>
                            </div>
                            <div className='title fail'>{message}</div>
                        </>
                    )
                    :
                    <div className='icon'><i className='fa-solid fa-spinner' /></div>
                }
                <div className='buttons'>
                    <Link to='/'><button className='btn-in-payment-status'>VỀ TRANG CHỦ</button></Link>
                    <div>Navigate</div>
                    <button className='btn-in-payment-status' onClick={() => setRefresh(p => p + 1)}>Refresh</button>
                    <Link to='/payment-status/?message=Thanh%20toán%20thành%20công'><button className='btn-in-payment-status'>Thanh toán thành công</button></Link>
                    <Link to='/payment-status/?message=Thanh%20toán%20thất%20bại'><button className='btn-in-payment-status'>Thanh toán thất bại</button></Link>
                    {/* <div>{ThisUser?.name} - {ThisUser?.type}</div> */}
                    {/* <button className='btn-in-payment-status' onClick={() => localStorage.setItem('ActivateMembership', 'ReadyToActivate')}>SET ReadyToActivate</button> */}
                    {/* <button className='btn-in-payment-status' onClick={() => localStorage.removeItem('ActivateMembership')}>REMOVE</button> */}
                    {/* <button className='btn-in-payment-status' onClick={() => changeUserType('Regular')}>BỎ KÍCH HOẠT</button> */}
                </div>
            </div>
        </div>
    )
}
