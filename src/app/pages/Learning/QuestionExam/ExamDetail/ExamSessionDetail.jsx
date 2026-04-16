import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

import './ExamSessionDetail.css';

export default function ExamSessionDetail() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const location = useLocation();

    const examId = Params?.examId;
    console.log('examId', examId);
    const sessionId = Params?.sessionId;
    console.log('sessionId', sessionId);
    const ExamOrSituation = location.state;
    console.log('ExamOrSituation', ExamOrSituation);

    const [ThisSession, setThisSession] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('useEffect');
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                if (user) {
                    if (ExamOrSituation == 'exam') {
                        const ThisExamSessionResponse = await fetchData(`ExamSessions/${sessionId}`, token);
                        console.log('ThisExamSessionResponse', ThisExamSessionResponse);
                        setThisSession(ThisExamSessionResponse);
                    } else if (ExamOrSituation == 'situation') {
                        const ThisSimulationSessionResponse = await fetchData(`SimulationSessions/${sessionId}`, token);
                        console.log('ThisSimulationSessionResponse', ThisSimulationSessionResponse);
                        setThisSession(ThisSimulationSessionResponse);
                    }
                }
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    console.log('ThisSession', ThisSession);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='exam-session-detail-container'>
            <StarsBackground />
            <HeadingComponent
                title={'CHI TIẾT BÀI THI'}
                titlePosition={'center'}
                back={'Quay lại'}
            />
            <div className='container'>
                ExamSessionDetail Question/Simulation
                <div>{sessionId}</div>
                <div>{ExamOrSituation}</div>
            </div>
        </div>
    )
}
