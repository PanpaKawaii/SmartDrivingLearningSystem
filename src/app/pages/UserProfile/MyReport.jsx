import { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';
import Pagination from '../../components/Pagination/Pagination';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './MyReport.css';

export default function MyReport() {
    const { user, refreshNewToken } = useAuth();

    const [REPORTs, setREPORTs] = useState([]);
    const [REPORTCATEGORIes, setREPORTCATEGORIes] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputContent, setInputContent] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchDataReport(inputContent);
    }, [refresh, user?.token, page, selectedCategoryId]);

    const fetchDataReport = async (content) => {
        setError(null);
        setLoading(true);
        const token = user?.token || '';
        const userId = user?.id || 'no-user';
        try {
            const reportQuery = new URLSearchParams({
                content: content,
                page: page,
                pageSize: pageSize,
                reportCategoryId: selectedCategoryId,
                userId: userId,
            });
            const reportCategoryQuery = new URLSearchParams({
                status: 1,
            });
            const ReportResponse = await fetchData(`Reports?${reportQuery.toString()}`, token);
            const ReportCategoryResponse = await fetchData(`ReportCategories/all?${reportCategoryQuery.toString()}`, token);
            console.log('ReportResponse', ReportResponse);
            console.log('ReportCategoryResponse', ReportCategoryResponse);
            const ReportItems = ReportResponse?.items;

            setTotalCount(ReportResponse.totalCount);
            setTotalPages(ReportResponse.totalPages);
            setREPORTs(ReportItems);
            setREPORTCATEGORIes(ReportCategoryResponse);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        }
    };

    const debounceRef = useRef(null);
    const handleChange = (e) => {
        const value = e.target.value;
        setInputContent(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchDataReport(value);
        }, 500);
    };

    const filteredREPORTs = REPORTs.filter(rp => {
        const matchStatus = !selectedStatus || (selectedStatus == rp.status);
        return matchStatus;
    });
    console.log('filteredREPORTs', filteredREPORTs);

    return (
        <div className='my-report-container'>
            <div className='control-heading'>
                <div className='result'>{selectedStatus ? filteredREPORTs?.length : totalCount}</div>
                <input type='text' value={inputContent} onChange={handleChange} placeholder='Tìm theo nội dung...' />
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value=''>Tất cả</option>
                    <option value='3'>Đã giải quyết</option>
                </select>
                <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                    <option value=''>Tất cả</option>
                    {REPORTCATEGORIes?.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button className='btn' onClick={() => setRefresh(p => p + 1)} disabled={loading}>
                    Refresh
                </button>
            </div>
            {loading ?
                <TrafficLight text={'loading'} setRefresh={() => { }} />
                :
                ((error && error.status != 401) ?
                    <TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} />
                    :
                    (filteredREPORTs?.length > 0 ?
                        <div className='list-report'>
                            {filteredREPORTs.map((report, index) => (
                                <div
                                    key={report.id}
                                    className='report-card'
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className='report-information'>
                                        <div className='report-heading'>
                                            <h3>{pageSize * (page - 1) + index + 1}. {report.title}</h3>
                                            <div className='category'>{report.reportCategory?.name}</div>
                                        </div>
                                        <p>{report.content}</p>
                                        {/* <div>{report.status}</div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <EmptyNotification
                            icon={'flag'}
                            name={'Không tìm thấy báo cáo'}
                            description={''}
                        />
                    )
                )
            }
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    )
}
