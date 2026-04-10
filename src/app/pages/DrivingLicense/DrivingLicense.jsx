import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import EmptyNotification from '../../components/EmptyNotification/EmptyNotification';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './DrivingLicense.css';

export default function DrivingLicense() {
    const { user, refreshNewToken } = useAuth();

    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const drivingLicenseQuery = new URLSearchParams({
                    status: 1,
                });
                const questionChapterQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const DrivingLicenseResponse = await fetchData(`DrivingLicenses/all?${drivingLicenseQuery.toString()}`, token);
                const QuestionChapterResponse = await fetchData(`QuestionChapters?${questionChapterQuery.toString()}`, token);
                console.log('DrivingLicenseResponse', DrivingLicenseResponse);
                console.log('QuestionChapterResponse', QuestionChapterResponse);
                const QuestionChapterItems = QuestionChapterResponse?.items;

                const DrivingLicenses = DrivingLicenseResponse.map(dl => ({
                    ...dl,
                    chapters: QuestionChapterItems.filter(qc => qc.drivingLicenseId == dl.id),
                }));

                setDRIVINGLICENSEs(DrivingLicenses);
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