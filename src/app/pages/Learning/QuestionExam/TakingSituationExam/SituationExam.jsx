import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';
import ControlledVideo from '../../../SimulationScenario/ControlledVideo/ControlledVideo';
import ListScenario from '../../../SimulationScenario/ListScenario';

import './SituationExam.css';

export default function SituationExam() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const navigate = useNavigate();

    const examId = Params?.examId;
    console.log('examId', examId);

    const [ThisSituationExam, setThisSituationExam] = useState(null);
    const [SIMULATIONSCENARIOs, setSIMULATIONSCENARIOs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [myResults, setMyResults] = useState([]);

    useEffect(() => {
        if (user?.roleName != 'Student' && localStorage.getItem('SituationExam') == new Date().toLocaleDateString()) {
            navigate('./..');
            return;
        }
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const ThisSituationExamResponse = await fetchData(`SituationExams/${examId}`, token);
                console.log('ThisSituationExamResponse', ThisSituationExamResponse);

                const SimulationItems = ThisSituationExamResponse.simulationExams?.map(se => {
                    return {
                        ...se.simulation,
                        simulationExamId: se.id,
                    }
                });
                console.log('SimulationItems', SimulationItems);

                setThisSituationExam(ThisSituationExamResponse);
                setSIMULATIONSCENARIOs(SimulationItems);
                setSelectedScenarioId(p => p ? p : SimulationItems?.[0]?.id);
                localStorage.setItem('Exam', new Date().toLocaleDateString());
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    console.log('myResults', myResults);

    const handleUpdateDurationScore = (simulationExamId, durationSecond, score) => {
        console.log(simulationExamId, durationSecond, score);
        // ==FIX==
        setMyResults(p => p.find(r => r.simulationExamId == simulationExamId) ?
            p :
            [...p, {
                simulationExamId: simulationExamId,
                durationSecond: durationSecond,
                score: score,
            }]
        );
        // setMyResults(p => [...p.filter(r => r.simulationExamId !== simulationExamId), {
        //     simulationExamId: simulationExamId,
        //     durationSecond: durationSecond,
        //     score: score,
        // }]);
    };

    const handleSubmitExam = () => {
        console.log('Submit!');
        console.log('==================================================');
    };

    const selectedScenario = SIMULATIONSCENARIOs.find(ss => ss.id == selectedScenarioId);
    console.log('selectedScenario', selectedScenario);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='situation-exam-container'>
            <CloudsBackground />
            <h1>BÀI THI MÔ PHỎNG</h1>
            <div className='container'>
                <ControlledVideo
                    myResults={myResults}
                    selectedScenario={selectedScenario}
                    allowRestart={true}
                    allowContinue={true}
                    baseScore={ThisSituationExam?.simulationExams?.find(se => se.simulation?.id == selectedScenario?.id)?.baseScore}
                    additionalFunction={(propE) => { handleUpdateDurationScore(propE?.simulationExamId, propE?.durationSecond, propE?.score); }}
                />
                <ListScenario
                    list={SIMULATIONSCENARIOs}
                    done={myResults.map(r => r.simulationExamId)}
                    groupBy={'simulationChapterId'}
                    label={'Danh sách kịch bản mô phỏng'}
                    onClickButton={setSelectedScenarioId}
                    selected={selectedScenarioId}
                    finishButton={
                        <button
                            className='btn btn-end'
                            onClick={() => handleSubmitExam()}
                            disabled={loading}
                        >
                            KẾT THÚC
                        </button>
                    }
                />
            </div>
        </div>
    )
}
