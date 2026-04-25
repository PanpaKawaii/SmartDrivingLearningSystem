import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground.jsx';
import HeadingComponent from '../../../components/HeadingComponent/HeadingComponent.jsx';
import PopupContainer from '../../../components/PopupContainer/PopupContainer.jsx';
import StarsBackground from '../../../components/StarsBackground/StarsBackground.jsx';
import TrafficLight from '../../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import ExamDetail from './ExamDetail/ExamDetail.jsx';
import ExamSession from './ExamDetail/ExamSession.jsx';
import UserCreateExam from './UserCreateExam/UserCreateExam.jsx';

import './ListExam.css';

export default function ListExam() {
    const { user, refreshNewToken } = useAuth();

    const location = useLocation();

    const selectedIdState = location.state?.selectedId;
    // console.log('selectedIdState', selectedIdState);
    const ExamOrSituationState = location.state?.ExamOrSituation;
    // console.log('ExamOrSituationState', ExamOrSituationState);

    const [EXAMs, setEXAMs] = useState([]);
    const [SITUATIONEXAMs, setSITUATIONEXAMs] = useState([]);
    const [EXAMSESSIONs, setEXAMSESSIONs] = useState([]);
    const [SIMULATIONSESSIONs, setSIMULATIONSESSIONs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [textInput, setTextInput] = useState('');
    const [selectedId, setSelectedId] = useState(selectedIdState || '');
    const [ExamOrSituation, setExamOrSituation] = useState(ExamOrSituationState || 'exam');
    const [isMine, setIsMine] = useState(false);

    const [todayExam, setTodayExam] = useState([]);
    const [todaySimulation, setTodaySimulation] = useState([]);
    const [limitExam, setLimitExam] = useState(0);
    const [limitSimulation, setLimitSimulation] = useState(0);

    const [openCreate, setOpenCreate] = useState('');

    const selectedExam = ExamOrSituation == 'exam' ?
        EXAMs.find(e => e.id == selectedId)
        : SITUATIONEXAMs.find(e => e.id == selectedId);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                if (user?.roleName != 'Student') {
                    const Today = new Date().toLocaleDateString();

                    const SystemConfigResponse = await fetchData(`SystemConfigs/all`, token);
                    console.log('SystemConfigResponse', SystemConfigResponse);
                    const LimitExam = SystemConfigResponse?.find(sc => sc.name == 'Exam limit')?.value || 0;
                    console.log('LimitExam', LimitExam);
                    setLimitExam(LimitExam);
                    const LimitSimulation = SystemConfigResponse?.find(sc => sc.name == 'Simulation limit')?.value || 0;
                    console.log('LimitSimulation', LimitSimulation);
                    setLimitSimulation(LimitSimulation);

                    const ExamSessionStorage = JSON.parse(localStorage.getItem('ExamSessionStorage') || '[]');
                    console.log('ExamSessionStorage', ExamSessionStorage);
                    const TodayExamSession = [...ExamSessionStorage?.filter(ps => ps == Today)];
                    console.log('TodayExamSession', TodayExamSession);
                    setTodayExam(TodayExamSession);

                    const SimulationSessionStorage = JSON.parse(localStorage.getItem('SimulationSessionStorage') || '[]');
                    console.log('SimulationSessionStorage', SimulationSessionStorage);
                    const TodaySimulationSession = [...SimulationSessionStorage?.filter(ps => ps == Today)];
                    console.log('TodaySimulationSession', TodaySimulationSession);
                    setTodaySimulation(TodaySimulationSession);
                }

                const examQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '500',
                    status: 1,
                });
                const ExamResponse = await fetchData(`Exams?${examQuery.toString()}`, token);
                const SituationExamResponse = await fetchData(`SituationExams?${examQuery.toString()}`, token);
                console.log('ExamResponse', ExamResponse);
                console.log('SituationExamResponse', SituationExamResponse);
                const ExamItems = ExamResponse?.items;
                const SituationExamItems = SituationExamResponse?.items;

                if (user) {
                    const examSessionQuery = new URLSearchParams({
                        page: '1',
                        pageSize: '500',
                        userId: user?.id,
                        status: 1,
                    });
                    const simulationSessionQuery = new URLSearchParams({
                        page: '1',
                        pageSize: '500',
                        userId: user?.id,
                        status: 1,
                    });
                    const ExamSessionResponse = await fetchData(`ExamSessions?${examSessionQuery.toString()}`, token);
                    const SimulationSessionResponse = await fetchData(`SimulationSessions?${simulationSessionQuery.toString()}`, token);
                    console.log('ExamSessionResponse', ExamSessionResponse);
                    console.log('SimulationSessionResponse', SimulationSessionResponse);
                    const ExamSessionItems = ExamSessionResponse?.items;
                    const SimulationSessionItems = SimulationSessionResponse?.items;
                    setEXAMSESSIONs(ExamSessionItems);
                    setSIMULATIONSESSIONs(SimulationSessionItems);
                }

                setEXAMs(ExamItems);
                setSITUATIONEXAMs(SituationExamItems);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    // console.log('EXAMs', EXAMs);
    // console.log('SITUATIONEXAMs', SITUATIONEXAMs);

    const filteredExams = (ExamOrSituation == 'exam' ? EXAMs : SITUATIONEXAMs)?.filter(exam => {
        const matchTitleDescription = !textInput || exam.title?.toLowerCase().includes(textInput.toLowerCase()) || exam.description?.toLowerCase().includes(textInput.toLowerCase());
        return matchTitleDescription;
    });
    // console.log('filteredExams', filteredExams);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='list-exam-container'>
            <StarsBackground />
            <HeadingComponent
                title={'Danh sách bài thi'}
                subtitle='Luyện tập với các dạng bài thi khác nhau, nhận kết quả ngay lập tức.'
                titlePosition={'left'}
                back={'Quay lại'}
            />
            <div className='container'>
                <div className='exam-heading'>
                    <div className='filters'>
                        <button className={`btn exam-btn ${ExamOrSituation == 'exam' ? '' : 'off'}`} onClick={() => setExamOrSituation('exam')}>
                            ĐỀ LÝ THUYẾT
                        </button>
                        <button className={`btn situation-btn ${ExamOrSituation == 'situation' ? '' : 'off'}`} onClick={() => setExamOrSituation('situation')}>
                            ĐỀ MÔ PHỎNG
                        </button>
                        <input type='text' className={`input-${ExamOrSituation}`} placeholder='Tìm kiếm đề thi...' value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                        <button className={`btn ${ExamOrSituation == 'exam' ? 'exam-btn' : 'situation-btn'}`} onClick={() => setRefresh(p => p + 1)}>
                            <i className='fa-solid fa-arrow-rotate-left' />
                        </button>
                    </div>
                    <div className='mine'>
                        {/* ==FIX== */}
                        <button className={`btn ${isMine ? (ExamOrSituation == 'exam' ? 'exam exam-btn' : 'situation situation-btn') : 'off'}`} onClick={() => setIsMine(p => !p)}>
                            ĐỀ CỦA TÔI
                        </button>
                        <button className={`btn ${ExamOrSituation == 'exam' ? 'exam exam-btn' : 'situation situation-btn'}`} onClick={() => setOpenCreate(ExamOrSituation)}>
                            TẠO BỘ ĐỀ
                        </button>
                    </div>
                </div>
                <div className='content'>
                    <div className='left'>
                        <div className={`table-wrapper ${ExamOrSituation}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Bài Thi</th>
                                        <th>{(ExamOrSituation == 'exam' ? 'Câu hỏi' : 'Kịch bản')}</th>
                                        <th>Thời gian</th>
                                        <th>Điều kiện đậu</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExams?.map((exam, index) => {
                                        const isSelected = selectedId == exam.id;
                                        const numberLength = (ExamOrSituation == 'exam' ? exam.examQuestions?.length : exam.simulationExams?.length) || 0;

                                        return !exam.isRandom && (
                                            <tr
                                                key={exam.id}
                                                onClick={() => setSelectedId(isSelected ? null : exam.id)}
                                                className={`${isSelected ? 'active' : ''}`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <td>{index + 1}</td>
                                                <td className='td-row'>
                                                    <div className='row'>
                                                        <div className='icon-box'>
                                                            <i className='fa-solid fa-file-lines' />
                                                        </div>
                                                        <div>
                                                            <div className='title'>{exam.title}</div>
                                                            <div className='desc'>{exam.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{numberLength}</td>
                                                <td>{((exam.duration / 60) || 0).toFixed(0)} phút</td>
                                                <td>{exam.passScore}%</td>
                                                <td><i className='fa-solid fa-chevron-right' /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='right' key={selectedId}>
                        {selectedExam ? (
                            <>
                                <ExamDetail
                                    roleName={user?.roleName}
                                    exam={selectedExam}
                                    type={ExamOrSituation}
                                    today={ExamOrSituation == 'exam' ? todayExam : todaySimulation}
                                    limit={ExamOrSituation == 'exam' ? limitExam : limitSimulation}
                                />
                                {ExamOrSituation == 'exam' ?
                                    <ExamSession
                                        examSessions={EXAMSESSIONs.filter((session) => session.examId == selectedId)?.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))}
                                        examId={selectedId}
                                        type={ExamOrSituation}
                                    />
                                    :
                                    <ExamSession
                                        examSessions={SIMULATIONSESSIONs.filter((session) => session.situationExamId == selectedId)?.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))}
                                        examId={selectedId}
                                        type={ExamOrSituation}
                                    />
                                }
                            </>
                        ) : (
                            <div className='empty'>
                                <h2>Chọn bài thi</h2>
                                <p>Nhấn vào một bài thi để xem chi tiết</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* <div className='list'>
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
            </div> */}

            {openCreate &&
                <PopupContainer
                    onClose={() => setOpenCreate('')}
                    titleName={`Tạo đề thi ${openCreate == 'exam' ? 'lý thuyết' : 'mô phỏng'}`}
                    modalStyle={{}}
                    innerStyle={{ width: 'fit-content', minWidth: 640, scrollbarWidth: 'none' }}
                >
                    <UserCreateExam />
                </PopupContainer>
            }
        </div >
    )
}
