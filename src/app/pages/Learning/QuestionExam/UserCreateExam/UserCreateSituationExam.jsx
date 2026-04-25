import { useEffect, useMemo, useState } from 'react';
import { fetchData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import MovingLabelInput from '../../../../components/MovingLabelInput/MovingLabelInput';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

import './UserCreateExam.css';
import './UserCreateSituationExam.css';

export default function UserCreateSituationExam() {
    const { user, refreshNewToken } = useAuth();

    const [SIMULATIONCHAPTERs, setSIMULATIONCHAPTERs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalScenarios, setTotalScenarios] = useState(0);
    const [selectedChapters, setSelectedChapters] = useState([
        { chapterId: '', percent: 0 },
    ]);
    const [randomExam, setRandomExam] = useState(null);
    const [showResult, setShowResult] = useState(false);

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

                const groupedChapters = Object.values(
                    SimulationScenarioItems.reduce((acc, item) => {
                        const id = item?.simulationChapterId;
                        const name = item?.simulationChapter?.name;

                        if (!id) return acc;

                        (acc[id] ||= {
                            id: id,
                            name: name,
                            items: []
                        }).items.push(item);

                        return acc;
                    }, {})
                );
                console.log('groupedChapters', groupedChapters);

                setSIMULATIONCHAPTERs(groupedChapters);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    // Các chapter đã được chọn (để disable trùng)
    const selectedChapterIds = useMemo(
        () => selectedChapters.map(c => c.chapterId).filter(Boolean),
        [selectedChapters]
    );
    // console.log('selectedChapters', selectedChapters);

    const handleChapterChange = (index, chapterId) => {
        const next = [...selectedChapters];
        next[index].chapterId = chapterId;
        setSelectedChapters(next);
    };

    const handlePercentChange = (index, percent) => {
        const next = [...selectedChapters];
        next[index].percent = Number(percent);
        setSelectedChapters(next);
    };

    const getQuestionCount = (percent) => {
        if (!totalScenarios || !percent) return 0;
        return Math.round((totalScenarios * percent) / 100);
    };

    const totalPercent = selectedChapters.reduce((sum, c) => sum + (c.percent || 0), 0);

    const handleSaveCustomizedExam = async () => {
        console.log('handleSaveCustomizedExam');
    };

    const createRandomQuestionExam = () => {
        const counts = selectedChapters?.map(c => ({
            ...c,
            raw: (totalScenarios * c.percent) / 100,
            count: Math.floor((totalScenarios * c.percent) / 100)
        }));
        // console.log('counts.count', counts[0].count);

        let remaining = totalScenarios - counts.reduce((sum, c) => sum + c.count, 0);
        // console.log('remaining', remaining);

        counts.filter(f => f.count != f.raw)?.forEach(c => {
            if (remaining > 0) {
                c.count += 1;
                remaining--;
            }
        });
        // console.log('counts.forEach', counts);

        const output = counts.flatMap(c => {
            const chapter = SIMULATIONCHAPTERs?.find(r => r.id === c.chapterId);
            console.log('chapter', chapter);
            if (!chapter) return [];

            const shuffled = [...chapter.items].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, c.count);
        });
        console.log('output', output);

        setRandomExam(output);
    };

    console.log('randomExam', randomExam);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='user-create-situation-exam-container'>
            <div className='create-content'>
                <div className='totalquestions-selectlicense'>
                    <div className='form-group'>
                        <MovingLabelInput
                            type={'text'}
                            value={totalScenarios ?? ''}
                            onValueChange={(propE) => setTotalScenarios(Number(propE) || 0)}
                            label={'Tổng số kịch bản'}
                            labelStyle={'left moving'}
                        />
                    </div>
                </div>

                <div className='list-chapter'>
                    <h2>Chọn danh sách chương</h2>
                    {selectedChapters.map((item, index) => (
                        <div key={index} className='chapter-item'>
                            <div className='form-group'>
                                <select
                                    value={item.chapterId}
                                    onChange={(e) => handleChapterChange(index, e.target.value)}
                                >
                                    <option value=''>-- Chọn chương --</option>
                                    {SIMULATIONCHAPTERs?.map(ch => (
                                        <option
                                            key={ch.id}
                                            value={ch.id}
                                            disabled={
                                                selectedChapterIds.includes(ch.id) &&
                                                ch.id !== item.chapterId
                                            }
                                        >
                                            {ch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group form-group-input'>
                                <input
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={item.percent}
                                    onChange={(e) => handlePercentChange(index, e.target.value)}
                                />
                                <label>%</label>
                            </div>

                            {/* <span>
                                    {getQuestionCount(item.percent)} câu
                                </span> */}

                            {selectedChapters.length > 1 && (
                                <button className='btn' onClick={() => setSelectedChapters(p => p.filter((_, i) => i !== index))}>
                                    <i className='fa-solid fa-xmark' />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button className='btn' onClick={() => setSelectedChapters(p => [...p, { chapterId: '', percent: 0 }])}>
                    Thêm chương
                </button>

                <div className={`total-percent ${totalPercent === 100 ? 'valid' : 'invalid'}`}>
                    Tổng: <span>{totalPercent}%</span>
                </div>

                <div className='btns'>
                    <button className='btn create-btn' onClick={createRandomQuestionExam} disabled={totalPercent !== 100}>
                        <span>
                            {randomExam ?
                                'TẠO LẠI ĐỀ'
                                : 'BẮT ĐẦU TẠO ĐỀ'
                            }
                        </span>
                        <i className={`fa-solid fa-${randomExam ? 'arrow-rotate-left' : 'arrow-right'}`} />
                    </button>
                    {randomExam &&
                        <button className='btn submit-btn' onClick={handleSaveCustomizedExam}>
                            XÁC NHẬN LƯU ĐỀ THI
                        </button>
                    }
                </div>
            </div>

            {randomExam &&
                <>
                    <div className='line'></div>
                    <div className='result-content'>
                        <div className='result-heading'>
                            <button className='btn' onClick={() => setShowResult(p => !p)}>
                                {showResult ? 'Ẩn' : 'Xem'} kết quả ({randomExam.length} kịch bản)
                            </button>
                            <button className='btn delete-btn'
                                onClick={() => {
                                    setShowResult(false);
                                    setRandomExam(null);
                                }}
                            >
                                Xóa kết quả
                            </button>
                        </div>
                        <div className={`list-scenario ${showResult ? '' : 'not-show'}`}>
                            {randomExam?.map((scenario, qIndex) => (
                                <div
                                    key={qIndex}
                                    className='scenario-item'
                                >
                                    <div className='title-heading'>
                                        <h3>Kịch bản {qIndex + 1}</h3>
                                        <div className='chapter'>{scenario.simulationChapter?.name}</div>
                                    </div>
                                    <p>{scenario.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
