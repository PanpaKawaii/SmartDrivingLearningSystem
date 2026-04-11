import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import FlashCard from '../../FlashCard/FlashCard';

import './TrafficSignFlashcard.css';

export default function TrafficSignFlashcard() {
    const { user, refreshNewToken } = useAuth();

    const [TRAFFICSIGNs, setTRAFFICSIGNs] = useState([]);
    const [mySAVEDTRAFFICSIGNs, setMySAVEDTRAFFICSIGNs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || 'no-user';
            try {
                const trafficSignQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                    status: 1,
                });
                const TrafficSignResponse = await fetchData(`TrafficSigns?${trafficSignQuery.toString()}`, token);
                console.log('TrafficSignResponse', TrafficSignResponse);
                const TrafficSignItems = TrafficSignResponse?.items;

                setTRAFFICSIGNs(TrafficSignItems);

                const savedTrafficSignQuery = new URLSearchParams({
                    userId: userId,
                    status: 1,
                });
                const SavedTrafficSignResponse = await fetchData(`SavedTrafficSigns/all?${savedTrafficSignQuery.toString()}`, token);
                console.log('SavedTrafficSignResponse', SavedTrafficSignResponse);
                setMySAVEDTRAFFICSIGNs(SavedTrafficSignResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    const MySavedTrafficSigns = mySAVEDTRAFFICSIGNs.map(sq => sq.trafficSignId);

    const QuestionsAnswers = TRAFFICSIGNs.map((q, i) => {
        const relatedAnswers = [{
            id: i,
            content: <>
                <h2 style={{ marginBottom: 12 }}>{q.name}</h2>
                <p>{q.description}</p>
            </>,
            isCorrect: true,
        }];
        return { ...q, answers: relatedAnswers, showAnswer: false, index: i + 1 };
    })
    console.log('QuestionsAnswers', QuestionsAnswers);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error && error.status != 401) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='traffic-sign-flashcard-container'>
            <StarsBackground />
            <FlashCard list={QuestionsAnswers} mark={MySavedTrafficSigns} />
        </div>
    )
}
