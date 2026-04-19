import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './TrafficSignDetail.css';

export default function TrafficSignDetail() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();

    const signId = Params?.signId;
    console.log('signId', signId);

    const [ThisTrafficSign, setThisTrafficSign] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const ThisTrafficSignResponse = await fetchData(`TrafficSigns/${signId}`, token);
                console.log('ThisTrafficSignResponse', ThisTrafficSignResponse);

                setThisTrafficSign(ThisTrafficSignResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='traffic-sign-detail-container'>
            <StarsBackground />
            <HeadingComponent
                title='CHI TIẾT BIỂN BÁO'
                subtitle=''
                titlePosition='center'
                back={'Quay lại'}
            />
            <div className='container'>
                <div className='image'>
                    <img src={ThisTrafficSign.image || DefaultAvatar} alt={ThisTrafficSign.name} />
                </div>
                <h2>{ThisTrafficSign?.name}</h2>
                <p>{ThisTrafficSign?.description}</p>
                <div>- Mã biển báo: {ThisTrafficSign?.code}</div>
                <div>- Phân loại: {ThisTrafficSign?.signCategory?.name}</div>
                <div>- Chi tiết phân loại: {ThisTrafficSign?.signCategory?.description}</div>
            </div>
        </div>
    )
}
