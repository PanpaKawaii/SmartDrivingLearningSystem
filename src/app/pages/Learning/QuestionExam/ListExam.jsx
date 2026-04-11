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
    const [SITUATIONEXAMs, setSITUATIONEXAMs] = useState([]);
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
                    status: 1,
                });
                const questionChapterQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ExamResponse = await fetchData(`Exams?${examQuery.toString()}`, token);
                const SituationExamResponse = await fetchData(`SituationExams?${examQuery.toString()}`, token);
                const DrivingLicenseResponse = await fetchData(`DrivingLicenses/all?${drivingLicenseQuery.toString()}`, token);
                const QuestionChapterResponse = await fetchData(`QuestionChapters?${questionChapterQuery.toString()}`, token);
                console.log('ExamResponse', ExamResponse);
                console.log('SituationExamResponse', SituationExamResponse);
                console.log('DrivingLicenseResponse', DrivingLicenseResponse);
                console.log('QuestionChapterResponse', QuestionChapterResponse);
                const ExamItems = ExamResponse?.items;
                const SituationExamItems = SituationExamResponse?.items;
                const QuestionChapterItems = QuestionChapterResponse?.items;

                const DrivingLicenses = DrivingLicenseResponse.map(dl => ({
                    ...dl,
                    chapters: QuestionChapterItems.filter(qc => qc.drivingLicenseId == dl.id),
                }));

                setEXAMs(ExamItems);
                setSITUATIONEXAMs(SituationExamItems);
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
                <Link
                    key={exam.id}
                    to={`${exam.id}`}
                    className='link question-exam-link'
                    style={{ animationDelay: `${index * 0.1}s` }}
                    state='exam'
                >
                    <div className='exam'>
                        <div>{exam.title}</div>
                        <div>{exam.description}</div>
                        <div>{exam.duration}s</div>
                        <div>{exam.passScore}</div>
                        <div>{exam.isRandom ? 'Random' : ''}</div>
                    </div>
                </Link>
            ))}
            {SITUATIONEXAMs.map((exam, index) => (
                <Link
                    key={exam.id}
                    to={`${exam.id}`}
                    className='link situation-exam-link'
                    style={{ animationDelay: `${index * 0.1}s` }}
                    state='situation'
                >
                    <div className='exam'>
                        <div>{exam.title}</div>
                        <div>{exam.description}</div>
                        <div>{exam.duration}s</div>
                        <div>{exam.passScore}</div>
                        <div>{exam.isRandom ? 'Random' : ''}</div>
                    </div>
                </Link>
            ))}

            <UserCreateExam DRIVINGLICENSEs={DRIVINGLICENSEs} />
        </div>
    )
}
