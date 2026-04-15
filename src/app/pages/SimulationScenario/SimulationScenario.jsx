import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ControlledVideo from './ControlledVideo/ControlledVideo';
import ListScenario from './ListScenario';

import './SimulationScenario.css';

export default function SimulationScenario() {
    const { user, refreshNewToken } = useAuth();

    const [SIMULATIONSCENARIOs, setSIMULATIONSCENARIOs] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const simulationScenarioQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const SimulationScenarioResponse = await fetchData(`SimulationScenarios?${simulationScenarioQuery.toString()}`, token);
                console.log('SimulationScenarioResponse', SimulationScenarioResponse);
                const SimulationScenarioItems = SimulationScenarioResponse?.items;
                setSIMULATIONSCENARIOs(SimulationScenarioItems);

                setSelectedScenarioId(SimulationScenario?.[0]?.id);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    const selectedScenario = SIMULATIONSCENARIOs.find(ss => ss.id == selectedScenarioId);
    console.log('selectedScenario', selectedScenario);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='simulation-scenario-container'>
            <CloudsBackground />
            <h1>THỰC HÀNH MÔ PHỎNG</h1>
            <div className='container'>
                <ControlledVideo
                    myResults={[]}
                    selectedScenario={selectedScenario}
                    allowRestart={true}
                    allowContinue={true}
                    baseScore={5}
                    additionalFunction={() => { console.log(selectedScenario?.name); }}
                />
                <ListScenario
                    list={SIMULATIONSCENARIOs}
                    done={[]}
                    groupBy={'simulationChapterId'}
                    label={'Chương'}
                    onClickButton={setSelectedScenarioId}
                    selected={selectedScenarioId}
                    finishButton={<></>}
                />
            </div>
        </div>
    )
}
