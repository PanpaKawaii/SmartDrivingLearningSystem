import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../mocks/CallingAPI';
import DefaultAvatar from '../../../assets/DefaultAvatar.png';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './ListTrafficSign.css';
import Pagination from '../../../components/Pagination/Pagination';

export default function ListTrafficSign() {
    const { user, refreshNewToken } = useAuth();

    const [TRAFFICSIGNs, setTRAFFICSIGNs] = useState([]);
    const [SIGNCATEGORIes, setSIGNCATEGORIes] = useState([]);
    const [mySAVEDTRAFFICSIGNs, setMySAVEDTRAFFICSIGNs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputName, setInputName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchDataTrafficSign(inputName);
    }, [refresh, user?.token, page, selectedCategoryId]);

    const fetchDataTrafficSign = async (name) => {
        setError(null);
        setLoading(true);
        const token = user?.token || '';
        const userId = user?.id || 'no-user';
        try {
            const trafficSignQuery = new URLSearchParams({
                name: name,
                page: page,
                pageSize: pageSize,
                signCategoryId: selectedCategoryId,
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

            const savedTrafficSignQuery = new URLSearchParams({
                userId: userId,
                status: 1,
            });
            const SavedTrafficSignResponse = await fetchData(`SavedTrafficSigns/all?${savedTrafficSignQuery.toString()}`, token);
            console.log('SavedTrafficSignResponse', SavedTrafficSignResponse);
            setMySAVEDTRAFFICSIGNs(SavedTrafficSignResponse);
            setTotalCount(TrafficSignResponse.totalCount);
            setTotalPages(TrafficSignResponse.totalPages);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        }
    };

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
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const debounceRef = useRef(null);
    const handleChange = (e) => {
        const value = e.target.value;
        setInputName(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchDataTrafficSign(value);
        }, 500);
    };

    const MySavedTrafficSigns = mySAVEDTRAFFICSIGNs.map(sq => sq.trafficSignId);

    const filteredTRAFFICSIGNs = TRAFFICSIGNs.filter(ts => {
        const matchStatus = !selectedStatus || (selectedStatus == '1' && MySavedTrafficSigns?.includes(ts.id));
        return matchStatus;
    });
    // console.log('filteredTRAFFICSIGNs', filteredTRAFFICSIGNs);

    // if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    // if (error && error.status != 401) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='list-traffic-sign-container container'>
            <StarsBackground />
            <div className='control-heading'>
                <div className='result'>{totalCount}</div>
                <input type='text' value={inputName} onChange={handleChange} placeholder='Tìm theo tên...' />
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
                <button className='btn' onClick={() => setRefresh(p => p + 1)} disabled={loading}>
                    Refresh
                </button>
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
            {loading ?
                <TrafficLight text={'loading'} setRefresh={() => { }} />
                :
                ((error && error.status != 401) ?
                    <TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} />
                    :
                    <div className='sign-grid'>
                        {filteredTRAFFICSIGNs.map((sign, index) => (
                            <div
                                key={sign.id}
                                className='sign-card'
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Link to={`./${sign.id}`} className='image-link'>
                                    <img src={sign.image || DefaultAvatar} alt={sign.name} />
                                </Link>
                                <div className='sign-information'>
                                    <div className='sign-heading'>
                                        <h2>{pageSize * (page - 1) + index + 1}. {sign.name}</h2>
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
                )
            }
            {/* <div className='flex'>
                <button className='btn' onClick={() => setPage(p => Math.min(Math.max(p - 1, 1)), totalPages)}>-</button>
                <div>{page}</div>/<div>{totalPages}</div>
                <button className='btn' onClick={() => setPage(p => Math.max(1, Math.min(p + 1, totalPages)))}>+</button>
            </div> */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    )
}
