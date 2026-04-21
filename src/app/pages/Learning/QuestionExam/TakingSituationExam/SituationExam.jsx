import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, postData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../../../components/HeadingComponent/HeadingComponent';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';
import ControlledVideo from '../../../SimulationScenario/ControlledVideo/ControlledVideo';
import ListScenario from '../../../SimulationScenario/ListScenario';

import './SituationExam.css';

export default function SituationExam() {
    const { user, refreshNewToken } = useAuth();

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
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
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [done, setDone] = useState([]);

    const [viewResult, setViewResult] = useState(false);

    useEffect(() => {
        const selectedScenario = SIMULATIONSCENARIOs.find(ss => ss.id == selectedScenarioId);
        setDone(p => selectedScenario ? [...p, selectedScenario?.simulationExamId] : p);
    }, [selectedScenarioId])

    useEffect(() => {
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
        const index = SIMULATIONSCENARIOs?.findIndex(ss => ss.simulationExamId == simulationExamId);
        setMyResults(p => p.find(r => r.simulationExamId == simulationExamId) ?
            p :
            [...p, {
                index: index ? index + 1 : (index == 0 ? 1 : '#'),
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

    const handleSubmitExam = async () => {
        const fillUpMyResults = ThisSituationExam?.simulationExams?.map(se => {
            const result = myResults.find(mr => mr.simulationExamId == se.id);
            return {
                simulationExamId: result ? result.simulationExamId : se.id,
                durationSecond: result ? result.durationSecond : 0,
                score: result ? result.score : 0,
            }
        });
        console.log('fillUpMyResults', fillUpMyResults);

        const SimulationSessionsData = {
            situationExamId: examId,
            simulationSessionDetails: fillUpMyResults,
        };
        console.log('SimulationSessionsData:', SimulationSessionsData);

        setLoadingSubmit(true);
        const token = user?.token || '';
        try {
            const result = await postData('SimulationSessions', SimulationSessionsData, token);
            console.log('result', result);
            navigate(`./../situation-exam-result/${result?.id}`, { state: 'situation' });

            await sleep(1000);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoadingSubmit(false);
        };
    };

    const selectedScenario = SIMULATIONSCENARIOs.find(ss => ss.id == selectedScenarioId);
    console.log('selectedScenario', selectedScenario);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='situation-exam-container'>
            <CloudsBackground />
            <HeadingComponent
                title={'BÀI THI MÔ PHỎNG'}
                subtitle=''
                titlePosition={'center'}
                back={''}
            />
            <div className='container'>
                <div className='column-video'>
                    <ControlledVideo
                        selectedScenario={selectedScenario}
                        allowRestart={false}
                        allowContinue={true}
                        baseScore={ThisSituationExam?.simulationExams?.find(se => se.simulation?.id == selectedScenario?.id)?.baseScore}
                        additionalFunction={(propE) => { handleUpdateDurationScore(propE?.simulationExamId, propE?.durationSecond, propE?.score); }}
                    />
                    {myResults?.length > 0 &&
                        <div className='my-results'>
                            <div className='heading-result'>
                                <h3>CHI TIẾT BÀI LÀM</h3>
                                {!user &&
                                    <button className='btn' disabled={false} onClick={() => setViewResult(p => !p)}>
                                        {viewResult ? 'Ẩn kết quả' : 'Xem kết quả'}
                                    </button>
                                }
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kịch bản</th>
                                        <th>Thời gian</th>
                                        <th>Điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myResults.sort((a, b) => a.index - b.index)?.map((result, index) => (
                                        <tr key={index}>
                                            {/* <div>{result.simulationExamId}</div> */}
                                            <td>{result.index}</td>
                                            <td>{result.durationSecond}</td>
                                            <td>{viewResult ? result.score : '?'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <ListScenario
                    list={SIMULATIONSCENARIOs}
                    done={done}
                    groupBy={''}
                    label={'Danh sách kịch bản mô phỏng'}
                    onClickButton={setSelectedScenarioId}
                    selected={selectedScenarioId}
                    finishButton={
                        <button
                            className='btn btn-end'
                            onClick={() => handleSubmitExam()}
                            disabled={loadingSubmit || !user}
                        >
                            {user ? 'KẾT THÚC' : 'VUI LÒNG ĐĂNG NHẬP'}
                        </button>
                    }
                />
            </div>
        </div>
    )
}
