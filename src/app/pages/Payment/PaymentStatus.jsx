import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarsBackground from '../../components/StarsBackground/StarsBackground';

import './PaymentStatus.css';

export default function PaymentStatus() {
    const [message, setMessage] = useState('');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const messageParam = urlParams.get('message');
        setMessage(decodeURIComponent(messageParam) || '');
    }, [refresh]);

    return (
        <div className='payment-status-container container'>
            <StarsBackground />
            <div className='status-card'>
                {message ?
                    (message == 'Thanh toán thành công' ?
                        <>
                            <div className='icon icon-success'>✓</div>
                            <div className='title title-success'>{message}</div>
                            {/* <div className='title success'>Thanh toán thành công</div> */}
                            {/* <div className='title success'>Thanh toán Membership thành công</div> */}
                            {/* <div className='title fail'>Thanh toán không thành công</div> */}
                            {/* <div className='title fail'>Thanh toán thất bại</div> */}
                        </>
                        :
                        <>
                            <div className='icon icon-fail'>
                                <span>×</span>
                            </div>
                            <div className='title title-fail'>{message}</div>
                        </>
                    )
                    :
                    <div className='icon icon-loading'><i className='fa-solid fa-spinner' /></div>
                }
                <div className='buttons'>
                    {message == 'Thanh toán thành công' ?
                        <Link to='/' state={{ openLogin: 'true' }}><button className='btn-in-payment-status'>ĐĂNG NHẬP LẠI</button></Link>
                        :
                        <Link to='/'><button className='btn-in-payment-status'>VỀ TRANG CHỦ</button></Link>
                    }
                    {/* <div>Navigate</div>
                    <button className='btn-in-payment-status' onClick={() => setRefresh(p => p + 1)}>Refresh</button>
                    <Link to='/payment-status/?message=Thanh%20toán%20thành%20công'><button className='btn-in-payment-status'>Thanh toán thành công</button></Link>
                    <Link to='/payment-status/?message=Thanh%20toán%20thất%20bại'><button className='btn-in-payment-status'>Thanh toán thất bại</button></Link> */}
                    {/* <div>{thisUser?.name} - {thisUser?.type}</div> */}
                    {/* <button className='btn-in-payment-status' onClick={() => localStorage.setItem('ActivateMembership', 'ReadyToActivate')}>SET ReadyToActivate</button> */}
                    {/* <button className='btn-in-payment-status' onClick={() => localStorage.removeItem('ActivateMembership')}>REMOVE</button> */}
                    {/* <button className='btn-in-payment-status' onClick={() => changeUserType('Regular')}>BỎ KÍCH HOẠT</button> */}
                </div>
            </div>
        </div>
    )
}
