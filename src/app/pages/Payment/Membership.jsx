import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../../mocks/CallingAPI';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './Membership.css';

export default function Membership() {
    const { user, refreshNewToken } = useAuth();

    const [thisUser, setThisUser] = useState(null);
    const [paymentOrderId, setPaymentOrderId] = useState(0);
    const [Amount, setAmount] = useState(99000);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                if (userId) {
                    // ==FIX==
                    const ThisUserResponse = await fetchData(`User/${userId}`, token);
                    console.log('ThisUserResponse', ThisUserResponse);
                    const SystemConfigResponse = await fetchData(`SystemConfigs/all`, token);
                    console.log('SystemConfigResponse', SystemConfigResponse);
                    // const PaymentResponse = await fetchData(`Payment`, token);
                    // console.log('PaymentResponse', PaymentResponse);

                    // const newOrderId = PaymentResponse?.length > 0 ? Math.max(...PaymentResponse.map(p => Number(p.orderId) || 0)) : 0;

                    const MembershipAmount = SystemConfigResponse?.find(sc => sc.name == 'Student Fee')?.value || 0;

                    setThisUser(ThisUserResponse);
                    setAmount(MembershipAmount);
                    // setPaymentOrderId(newOrderId);
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
                orderId: paymentOrderId,
                amount: Amount,
            };
            console.log('PaymentData:', PaymentData);

            const resultPaymentData = await postData('payos/create', PaymentData, token);
            console.log('resultPaymentData', resultPaymentData);
            window.location.href = resultPaymentData.paymentUrl;
        } catch (error) {
            console.error('Error', error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const features = [
        { name: 'Học các bài học theo bằng lái', role: 'Guest' },
        { name: 'Học câu hỏi lý thuyết', role: 'Guest' },
        { name: 'Xem các bài đăng trên diễn đàn', role: 'Guest' },
        { name: 'AI Chatbot', role: 'Guest' },
        { name: 'Tập luyện theo tình huống mô phỏng', role: 'Student' },
        { name: 'Luyện tập thi thử', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        { name: 'Trao đổi trên diễn đàn', role: 'Student' },
        { name: 'AI giải thích biển báo thông qua hình ảnh', role: 'Student' },
        { name: 'Lộ trình học cá nhân hóa', role: 'Student' },
    ];

    const featuresStudent = [
        { name: 'Học các bài học theo bằng lái', role: 'Guest' },
        { name: 'Học câu hỏi lý thuyết', role: 'Guest' },
        { name: 'Xem các bài đăng trên diễn đàn', role: 'Guest' },
        { name: 'Tập luyện theo tình huống mô phỏng', role: 'Guest' },
        { name: 'Luyện tập thi thử', role: 'Guest' },
        { name: 'AI Chatbot', role: 'Guest' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        // { name: 'Student', role: 'Student' },
        { name: 'Tham gia trao đổi trên diễn đàn', role: 'Student' },
        { name: 'AI giải thích biển báo thông qua hình ảnh', role: 'Student' },
        { name: 'Lộ trình học cá nhân hóa', role: 'Student' },
    ];
    console.log('aaaaaaaaaaaaaaa', Amount);
    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
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
                                        <i className={`fa-solid fa-${feature.role == 'Guest' ? 'check' : 'xmark'}`}></i>
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
                            disabled={loading || thisUser?.roleName == 'Student' || !user}
                        >
                            {loading ?
                                'ĐANG XỬ LÝ...'
                                : (thisUser?.roleName == 'Student' ?
                                    'ĐÃ ĐĂNG KÝ'
                                    : (!user ?
                                        'VUI LÒNG ĐĂNG NHẬP'
                                        : `ĐĂNG KÝ NGAY ${Amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
                                    )
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
