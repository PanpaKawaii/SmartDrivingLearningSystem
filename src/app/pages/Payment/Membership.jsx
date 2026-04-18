import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../../mocks/CallingAPI';
import HeadingComponent from '../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './Membership.css';

export default function Membership() {
    const { user, refreshNewToken } = useAuth();

    const [thisUser, setThisUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const amount = 89000;

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                if (userId) {
                    const result = await fetchData(`User/${userId}`, token);
                    console.log('result', result);

                    setThisUser(result);
                }
            } catch (error) {
                console.error('Error', error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [user?.id]);

    const Purchase = async () => {
        setError(null);
        setLoading(true);
        const token = user?.token || null;
        try {
            const PaymentData = {
                orderId: crypto.randomUUID(),
                amount: amount,
            };
            console.log('PaymentData:', PaymentData);

            // const resultPaymentData = await postData('Payment/create-payos-voucher', PaymentData, token);
            // console.log('resultPaymentData', resultPaymentData);
            // window.location.href = resultPaymentData.paymentUrl;
        } catch (error) {
            console.error('Error', error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    // const features = [
    //     { name: 'Đặt sân theo thời gian thực', role: 'Guest' },
    //     { name: 'Xem giờ trống, giá sân, địa điểm', role: 'Guest' },
    //     { name: 'Đánh giá và xem đánh giá sân', role: 'Guest' },
    //     { name: 'Tích điểm đổi quà', role: 'Guest' },
    //     { name: 'Gợi ý sân gần nhất', role: 'Guest' },
    //     { name: 'Gợi ý sân theo thói quen', role: 'Guest' },
    //     { name: 'Ưu đãi (Dùng điểm đổi)', role: 'Guest' },
    //     { name: 'Nhắc lịch tự động (Khi đã đặt)', role: 'Guest' },
    //     { name: 'Tạo nhóm chơi', role: 'Guest' },
    //     { name: 'Tạo giải đấu', role: 'Student' },
    //     { name: 'Gợi ý khung giờ trống phù hợp nhóm bạn', role: 'Student' },
    //     { name: 'Nhắc lịch đặt sân (Khi chưa đặt)', role: 'Student' },
    //     { name: 'Nhận voucher siêu hot', role: 'Student' },
    //     { name: 'Tặng điểm mỗi tháng', role: 'Student' },
    //     { name: 'Hủy đặt sân hoàn tiền', role: 'Student' },
    // ];

    const features = [
        { name: 'Student', role: 'Student' },
        { name: 'Guest', role: 'Guest' },
    ];

    return (
        <div className='membership-container container'>
            <StarsBackground />
            <HeadingComponent
                title={'CHỌN GÓI THÀNH VIÊN'}
                subtitle=''
                titlePosition={'center'}
                back={'Quay lại'}
            />
            <div className='plans'>
                <div className='card-normal'>
                    <div className='content'>
                        <div className='plan-title'>GUEST</div>
                        <ul>
                            {features?.map((feature, idx) => (
                                <li key={idx}>
                                    <div className='feature'>
                                        <div>{feature.name}</div>
                                        <i className={`fa-solid fa-${feature.role == 'Student' ? 'check' : 'xmark'}`}></i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className='btn' disabled>
                            MẶC ĐỊNH
                        </button>
                    </div>
                </div>

                <div className='card-border'>
                    <div className='content'>
                        <div className='plan-title'>STUDENT</div>
                        <ul>
                            {features?.map((feature, idx) => (
                                <li key={idx}>
                                    <div className='feature'>
                                        <div>{feature.name}</div>
                                        <i className={`fa-solid fa-${feature.role !== '' ? 'check' : 'xmark'}`} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            className='btn'
                            onClick={() => Purchase()}
                            disabled={loading || thisUser?.roleName == 'Student'}
                        >
                            {loading ?
                                'ĐANG XỬ LÝ...'
                                : (thisUser?.roleName == 'Student' ?
                                    'ĐÃ ĐĂNG KÝ'
                                    : `ĐĂNG KÝ NGAY ${amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
