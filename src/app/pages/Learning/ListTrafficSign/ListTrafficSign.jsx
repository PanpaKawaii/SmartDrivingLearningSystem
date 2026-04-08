import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../mocks/CallingAPI';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './ListTrafficSign.css';

export default function ListTrafficSign() {
    const { user } = useAuth();

    const [TRAFFICSIGNs, setTRAFFICSIGNs] = useState([]);
    const [SIGNCATEGORIes, setSIGNCATEGORIes] = useState([]);
    const [mySAVEDTRAFFICSIGNs, setMySAVEDTRAFFICSIGNs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputName, setInputName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                const trafficSignQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
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

                if (user?.token) {
                    const savedTrafficSignQuery = new URLSearchParams({
                        userId: userId,
                        status: 1,
                    });
                    const SavedTrafficSignResponse = await fetchData(`SavedTrafficSigns/all?${savedTrafficSignQuery.toString()}`, token);
                    console.log('SavedTrafficSignResponse', SavedTrafficSignResponse);
                    setMySAVEDTRAFFICSIGNs(SavedTrafficSignResponse);
                }
            } catch (error) {
                console.error('Error', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    const ToggleMarkTrafficSign = async (trafficSignId, mark) => {
        const MarkTrafficSignData = {
            trafficSignId: trafficSignId,
        };
        console.log('MarkTrafficSignData:', MarkTrafficSignData);
        console.log('mark:', mark);

        setLoading(true);
        const token = user?.token || '';
        try {
            if (mark != null) await deleteData(`SavedTrafficSigns/${mark?.id}`, token);
            else if (mark == null) await postData('SavedTrafficSigns', MarkTrafficSignData, token);

            setRefresh(p => p + 1);
        } catch (error) {
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const MySavedTrafficSigns = mySAVEDTRAFFICSIGNs.map(sq => sq.trafficSignId);

    const filteredTRAFFICSIGNs = TRAFFICSIGNs.filter(ts => {
        const matchName = ts.name?.toLowerCase()?.includes(inputName?.toLowerCase());
        const matchStatus = !selectedStatus || (selectedStatus == '1' && MySavedTrafficSigns?.includes(ts.id))
        const matchCategory = !selectedCategoryId || ts.signCategoryId == selectedCategoryId;

        console.log('matchName', matchName);


        return matchName && matchStatus && matchCategory;
    });
    console.log('filteredTRAFFICSIGNs', filteredTRAFFICSIGNs);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    // if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='list-traffic-sign-container container'>
            <StarsBackground />
            <div className='list-sign-heading'>
                <div className='badge'>
                    <span>aaaaaaaaaaaaaaaa</span>
                </div>
                <h1>aaaaaaa <span className='gradient'>aaaaaaaaaaaaa</span></h1>
                <p>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
            </div>

            <div className='control-heading'>
                <input type='text' value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder='Tìm theo tên...' />
                <div className='result'>
                    {filteredTRAFFICSIGNs?.length}
                </div>
                <div className='filters'>
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value=''>Tất cả</option>
                        <option value='1'>Đã lưu</option>
                    </select>
                    <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                        <option value=''>Tất cả</option>
                        {SIGNCATEGORIes?.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='sign-grid'>
                {filteredTRAFFICSIGNs.map((sign, index) => (
                    <div
                        key={sign.id}
                        className='sign-card'
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <Link to={`./${sign.id}`} className='image-link'>
                            {/* <img src={sign.image || DefaultAvatar} alt={sign.name} /> */}
                            <img src={DefaultAvatar} alt={sign.name} />
                        </Link>
                        <div className='sign-information'>
                            <div className='sign-heading'>
                                <h2>{sign.name}</h2>
                                <button className='btn' onClick={() => ToggleMarkTrafficSign(sign.id, mySAVEDTRAFFICSIGNs.find(sq => sq.trafficSignId == sign.id) || null)} disabled={!user || loading}>
                                    <i className={`fa-${MySavedTrafficSigns.includes(sign.id) ? 'solid' : 'regular'} fa-bookmark`} />
                                </button>
                            </div>
                            <p>{sign.description}</p>
                            <div className='category'>{sign.signCategory?.name}</div>
                            <div className='code'>Code: {sign.code}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
