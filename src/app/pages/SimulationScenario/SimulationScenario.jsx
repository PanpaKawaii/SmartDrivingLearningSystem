import { useEffect, useState } from 'react';
import { simulationCategories, simulationChapters, simulationDifficultyLevels, simulationScenarios } from '../../../mocks/DataSample';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import ControlledVideo from '../ControlledVideo/ControlledVideo';
import ListScenario from './ListScenario';

import './SimulationScenario.css';

export default function SimulationScenario() {
    const { user } = useAuth();

    const [SIMULATIONSCENARIOs, setSIMULATIONSCENARIOs] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const LicenseResponse = await getSheetData('./greenlight_data.xlsx', 'License');
                // console.log('LicenseResponse', LicenseResponse);
                // setDRIVINGLICENSEs(LicenseResponse);
                // const LicenseResponse = await fetchData('licenses', token);
                // console.log('LicenseResponse', LicenseResponse);

                const SimulationScenarioResponse = [...simulationScenarios];
                const SimulationChapterResponse = [...simulationChapters];
                const SimulationCategoryResponse = [...simulationCategories];
                const SimulationDifficultyLevelResponse = [...simulationDifficultyLevels];
                const SimulationScenario = SimulationScenarioResponse.map(ss => ({
                    ...ss,
                    chapter: SimulationChapterResponse.find(chapter => ss.simulationChapterId == chapter.id),
                    category: SimulationCategoryResponse.find(category => ss.simulationCategoryId == category.id),
                    difficultyLevel: SimulationDifficultyLevelResponse.find(difficultyLevel => ss.simulationDifficultyLevelId == difficultyLevel.id),
                }));
                console.log('SimulationScenario', SimulationScenario);

                setSIMULATIONSCENARIOs(SimulationScenario);
                // setSelectedScenarioId(SimulationScenario?.[0]?.id);
            } catch (error) {
                setError('Error');
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const selectedScenario = SIMULATIONSCENARIOs.find(ss => ss.id == selectedScenarioId);
    console.log('selectedScenario', selectedScenario);

    if (loading) return <div><StarsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><StarsBackground /><TrafficLight text={'error'} setRefresh={setRefresh} /></div>
    return (
        <div className='simulation-scenario-container'>
            <CloudsBackground />
            <div className='container'>
                <ControlledVideo selectedScenario={selectedScenario} />
                <ListScenario
                    list={SIMULATIONSCENARIOs}
                    groupBy={'simulationChapterId'}
                    onClickButton={setSelectedScenarioId}
                />
            </div>
        </div>
    )
}
