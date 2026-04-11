import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import FlashCard from '../../FlashCard/FlashCard';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';

import './QuestionFlashcard.css';

export default function QuestionFlashcard() {
    const { user, refreshNewToken } = useAuth();

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [mySAVEDQUESTIONs, setMySAVEDQUESTIONs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openReport, setOpenReport] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            const userId = user?.id || '';
            try {
                const questionQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                    status: 1,
                });
                const tagQuery = new URLSearchParams({
                    status: 1,
                });
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                const TagResponse = await fetchData(`Tags/all?${tagQuery.toString()}`, token);
                console.log('QuestionResponse', QuestionResponse);
                console.log('TagResponse', TagResponse);
                const QuestionItems = QuestionResponse?.items;

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                        showAnswer: true,
                        tags: TagResponse.filter(t => q.questionTags?.some(qt => qt.tagId == t.id)),
                    };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                setQUESTIONs(QuestionsAnswers);

                const savedQuestionQuery = new URLSearchParams({
                    userId: userId,
                    status: 1,
                });
                const SavedQuestionResponse = await fetchData(`SavedQuestions/all?${savedQuestionQuery.toString()}`, token);
                console.log('SavedQuestionResponse', SavedQuestionResponse);
                setMySAVEDQUESTIONs(SavedQuestionResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            };
        })();
    }, [refresh, user?.token]);

    const MySavedQuestions = mySAVEDQUESTIONs.map(sq => sq.questionId);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error && error.status != 401) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='question-flashcard-container'>
            <StarsBackground />
            <FlashCard list={QUESTIONs} mark={MySavedQuestions} />
        </div>
    )
}
