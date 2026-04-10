import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground.jsx';
import TrafficLight from '../../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import UserCreateExam from './UserCreateExam.jsx';

import './ListExam.css';

export default function ListExam() {
    const { user, refreshNewToken } = useAuth();

    const [EXAMs, setEXAMs] = useState([]);
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
                const examQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const drivingLicenseQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const questionChapterQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ExamResponse = await fetchData(`Exams?${examQuery.toString()}`, token);
                const DrivingLicenseResponse = await fetchData(`DrivingLicenses?${drivingLicenseQuery.toString()}`, token);
                const QuestionChapterResponse = await fetchData(`QuestionChapters?${questionChapterQuery.toString()}`, token);
                console.log('ExamResponse', ExamResponse);
                console.log('DrivingLicenseResponse', DrivingLicenseResponse);
                console.log('QuestionChapterResponse', QuestionChapterResponse);
                const ExamItems = ExamResponse?.items;
                const DrivingLicenseItems = DrivingLicenseResponse?.items;
                const QuestionChapterItems = QuestionChapterResponse?.items;

                const DrivingLicenses = DrivingLicenseItems.map(dl => ({
                    ...dl,
                    chapters: QuestionChapterItems.filter(qc => qc.drivingLicenseId == dl.id),
                }));

                setEXAMs(ExamItems);
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
        <div className='list-exam-container container'>
            {EXAMs.map((exam, index) => (
                <Link key={exam.id} to={`${exam.id}`}>
                    <div className='exam'>
                        <div>{exam.title}</div>
                        <div>{exam.description}</div>
                        <div>{exam.duration}s</div>
                        <div>{exam.passScore}</div>
                        <div>{exam.isRandom ? 'Random' : ''}</div>
                    </div>
                </Link>
            ))}

            <UserCreateExam DRIVINGLICENSEs={DRIVINGLICENSEs}/>
        </div>
    )
}
