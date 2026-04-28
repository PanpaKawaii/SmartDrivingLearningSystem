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

    const [paymentOrderId, setPaymentOrderId] = useState(0);
    const [Amount, setAmount] = useState(99000);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingFunction, setLoadingFunction] = useState(false);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                if (userId) {
                    const SystemConfigResponse = await fetchData(`SystemConfigs/all`, token);
                    console.log('SystemConfigResponse', SystemConfigResponse);
                    const PaymentResponse = await fetchData(`payos/GetAll`, token);
                    console.log('PaymentResponse', PaymentResponse);

                    const newOrderId = (PaymentResponse?.length + 1) || 0;
                    console.log('newOrderId', newOrderId);

                    const MembershipAmount = SystemConfigResponse?.find(sc => sc.name == 'Student Fee')?.value || 0;

                    setAmount(MembershipAmount);
                    setPaymentOrderId(newOrderId);
                }
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.id]);

    const Purchase = async () => {
        const PaymentData = {
            orderId: paymentOrderId,
            amount: Amount,
        };
        console.log('PaymentData:', PaymentData);

        setError(null);
        setLoadingFunction(true);
        const token = user?.token || '';
        const userId = user?.id || 'no-user';
        try {
            const paymentQuery = new URLSearchParams({
                userId: userId,
            });
            console.log('userId:', userId);
            console.log('`payos/create?${paymentQuery.toString()}`:', `payos/create?${paymentQuery.toString()}`);
            const resultPaymentData = await postData(`payos/create?${paymentQuery.toString()}`, PaymentData, token);
            console.log('resultPaymentData', resultPaymentData);

            window.location.href = resultPaymentData.paymentUrl;
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoadingFunction(false);
        };
    };

    const features = [
        { name: 'Học các bài học theo bằng lái', role: 'Guest' },
        { name: 'Học câu hỏi lý thuyết', role: 'Guest' },
        { name: 'Xem các bài đăng trên diễn đàn', role: 'Guest' },
        { name: 'AI Chatbot', role: 'Guest' },
        { name: 'Tập luyện theo tình huống mô phỏng', role: 'Student' },
        { name: 'Luyện tập thi thử', role: 'Student' },
        { name: 'Trao đổi trên diễn đàn', role: 'Student' },
        { name: 'AI giải thích biển báo thông qua hình ảnh', role: 'Student' },
        { name: 'Lộ trình học cá nhân hóa', role: 'Student' },
        { name: 'Tạo đề thi lý thuyết random cho bản thân', role: 'Student' },
        { name: 'Tạo đề thi mô phỏng random cho bản thân', role: 'Student' },
    ];

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
                            disabled={loading || loadingFunction || user?.roleName == 'Student' || !user}
                        >
                            {(loading || loadingFunction) ?
                                'ĐANG XỬ LÝ...'
                                : (user?.roleName == 'Student' ?
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
