import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI';
import { drivingLicenses as sampleDrivingLicenses, questionChapters as sampleQuestionChapters } from '../../../mocks/DataSample';
import { normalizeListResponse } from '../../../lib/apiResponseHelpers';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import { drivingLicenses, questionChapters } from '../../../mocks/DataSample';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';

import './DrivingLicense.css';

export default function DrivingLicense() {
    const { user } = useAuth();

    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [dataSourceInfo, setDataSourceInfo] = useState({
        apiLicenses: 0,
        sampleLicenses: 0,
    });
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mergeWithSource = (apiList, sampleList, idKey = 'id') => {
        const apiWithSource = apiList.map((item) => ({ ...item, dataSource: 'api' }));
        const apiIdSet = new Set(apiWithSource.map((item) => String(item?.[idKey])));
        const sampleWithSource = sampleList
            .filter((item) => !apiIdSet.has(String(item?.[idKey])))
            .map((item) => ({ ...item, dataSource: 'sample' }));
        return [...apiWithSource, ...sampleWithSource];
    };

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const drivingLicenseQuery = new URLSearchParams({
                //     page: '1',
                //     pageSize: '200',
                // });
                // const chapterQuery = new URLSearchParams({
                //     page: '1',
                //     pageSize: '500',
                // });

                // const DrivingLicenseResponse = await fetchData(`api/drivinglicenses?${drivingLicenseQuery.toString()}`, token);
                // console.log('DrivingLicenseResponse', DrivingLicenseResponse);
                // const QuestionChapterResponse = await fetchData(`api/questionchapters?${chapterQuery.toString()}`, token);

                // const drivingLicenses = getListFromResponse(DrivingLicenseResponse);
                // const questionChapters = getListFromResponse(QuestionChapterResponse);

                // const DrivingLicense = drivingLicenses.map(dl => ({
                //     ...dl,
                //     chapters: questionChapters.filter(qc => qc.drivingLicenseId == dl.id),
                // }));

                // setDRIVINGLICENSEs(DrivingLicense);





                // const LicenseResponse = await fetchData('licenses', token);
                // console.log('LicenseResponse', LicenseResponse);

                // const QuestionChapterResponse = await data here; // ==FIX==
                // const DrivingLicenseResponse = await data here; // ==FIX==
                const QuestionChapterResponse = [...questionChapters];
                const DrivingLicenseResponse = [...drivingLicenses];
                const DrivingLicense = DrivingLicenseResponse.map(dl => ({
                    ...dl,
                    chapters: QuestionChapterResponse.filter(qc => qc.drivingLicenseId == dl.id),
                }));

                setDRIVINGLICENSEs(DrivingLicense);
                setDataSourceInfo({
                    apiLicenses: apiDrivingLicenses.length,
                    sampleLicenses: mergedDrivingLicenses.filter((item) => item.dataSource === 'sample').length,
                });
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='driving-license-container container'>
            <StarsBackground />
            <div className='licenses-header'>
                <div className='badge'>
                    <span>Driver License Programs</span>
                </div>
                <h1>Choose Your <span className='gradient'>License Path</span></h1>
                <p>
                    Select a license program to start your journey. Each program includes
                    comprehensive theory lessons and practice exams.
                </p>
                <p className='data-source-note'>
                    Demo data sources - API: {dataSourceInfo.apiLicenses}, DataSample: {dataSourceInfo.sampleLicenses}
                </p>
            </div>

            <div className='license-grid'>
                {DRIVINGLICENSEs.map((license, index) => (
                    <Link
                        key={license.id}
                        to={`./${license.id}`}
                        className='license-link'
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className='license-card'>
                            <div className='image'>
                                {/* <img src={license.image_url || 'https://media.wired.com/photos/592675f6cefba457b079a0cd/3:2/w_2560%2Cc_limit/SCG003S-FRONTTA.jpg'} alt={license.name} /> */}
                                <div className='overlay'></div>
                                <div className={`data-source-badge ${license.dataSource || 'api'}`}>
                                    {license.dataSource === 'sample' ? 'DataSample' : 'API'}
                                </div>
                                <h3>{license.name}</h3>
                            </div>

                            <div className='content'>
                                <p>{license.description}</p>

                                <div className='meta'>
                                    <div className='detail'>
                                        <div className='item'>
                                            <i className='fa-solid fa-book-open' />
                                            <span>{license.chapters?.length} Chapters</span>
                                        </div>
                                        <div className='item'>
                                            <i className='fa-regular fa-check-circle' />
                                            <span>Theory + Exam</span>
                                        </div>
                                    </div>
                                    <div className='cta'>
                                        <span>Start Learning</span>
                                        <i className='fa-solid fa-arrow-right' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {DRIVINGLICENSEs?.length === 0 && !loading && (
                <EmptyNotification
                    name={'No Licenses Available'}
                    description={'Check back soon for available license programs.'}
                />
            )}
        </div>
    )
}