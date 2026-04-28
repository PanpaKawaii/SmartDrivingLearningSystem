import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import SimpleBackground from '../../../components/SimpleBackground/SimpleBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import FlipBookWrapper from './FlipBookWrapper';

import './TrafficSignFlipBook.css';

export default function TrafficSignFlipBook() {
    const { user, refreshNewToken } = useAuth();

    const [TRAFFICSIGNs, setTRAFFICSIGNs] = useState([]);
    const [SIGNCATEGORIes, setSIGNCATEGORIes] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataTrafficSign();
    }, [refresh, user?.token]);

    const fetchDataTrafficSign = async () => {
        setError(null);
        setLoading(true);
        const token = user?.token || '';
        try {
            const trafficSignQuery = new URLSearchParams({
                page: 1,
                pageSize: 1000,
                status: 1,
            });
            const signCategoryQuery = new URLSearchParams({
                status: 1,
            });
            const TrafficSignResponse = await fetchData(`TrafficSigns?${trafficSignQuery.toString()}`, token);
            const SignCategoryResponse = await fetchData(`SignCategories/all?${signCategoryQuery.toString()}`, token);
            console.log('TrafficSignResponse', TrafficSignResponse);
            console.log('SignCategoryResponse', SignCategoryResponse);
            const TrafficSignItems = TrafficSignResponse?.items;

            setTRAFFICSIGNs(TrafficSignItems);
            setSIGNCATEGORIes(SignCategoryResponse);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        }
    };

    const list = [...Array(Math.ceil(TRAFFICSIGNs.length / 4))].map((_, i) => {
        return {
            contentHTML: <>
                <div
                    key={i}
                    className='page-item'
                >
                    <div className='list-signs'>
                        {[...Array(4)].map((_, j) => {
                            const sign = TRAFFICSIGNs?.[i * 4 + j] || null;
                            return sign && (
                                <div
                                    key={j}
                                    className='sign-card'
                                >
                                    <div className='sign-image'>
                                        <img src={sign.image || DefaultAvatar} alt={sign.name} />
                                    </div>
                                    <div className='sign-information'>
                                        <h2>{i * 4 + j + 1}. {sign.name}</h2>
                                        <p><span>- Mô tả: </span>{sign.description}</p>
                                        <p><span>- Phân loại: </span>{sign.signCategory?.name}</p>
                                        <p><span>- Mã: </span>{sign.code}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`page-number ${i % 2 == 0 ? 'page-odd' : 'page-even'}`}>{i + 2}</div>
                </div>
            </>,
        }
    });

    const firstPages = [
        {
            contentHTML: <>
                <div className='page-item first-page'>
                    <div className='first-page-content'>
                        <h1>
                            TỪ ĐIỂN
                        </h1>
                        <p>
                            Các loại biển báo
                        </p>
                    </div>
                </div>
            </>
        },
        {
            contentHTML: <>
                <div className='page-item near-first-page'>
                </div>
            </>
        }
    ];

    const lastPages = [
        {
            contentHTML: <>
                <div className='page-item near-last-page'>
                </div>
            </>
        },
        {
            contentHTML: <>
                <div className='page-item last-page'>
                </div>
            </>
        }
    ];

    const pages = [...firstPages, ...list, ...lastPages];

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='traffic-sign-flip-book-container container'>
            <SimpleBackground />
            <FlipBookWrapper pages={pages} />
        </div>
    )
}
