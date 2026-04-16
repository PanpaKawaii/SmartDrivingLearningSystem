import { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground.jsx';
import HeadingComponent from '../../../components/HeadingComponent/HeadingComponent.jsx';
import StarsBackground from '../../../components/StarsBackground/StarsBackground.jsx';
import TrafficLight from '../../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import ExamDetail from './ExamDetail/ExamDetail.jsx';
import ExamSession from './ExamDetail/ExamSession.jsx';
// import UserCreateExam from './UserCreateExam.jsx';

import './ListExam.css';

export default function ListExam() {
    const { user, refreshNewToken } = useAuth();

    const [EXAMs, setEXAMs] = useState([]);
    const [SITUATIONEXAMs, setSITUATIONEXAMs] = useState([]);
    const [EXAMSESSIONs, setEXAMSESSIONs] = useState([]);
    const [SIMULATIONSESSIONs, setSIMULATIONSESSIONs] = useState([]);
    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedId, setSelectedId] = useState(null);
    const [ExamOrSituation, setExamOrSituation] = useState('exam');

    const selectedExam = ExamOrSituation == 'exam' ?
        EXAMs.find(e => e.id == selectedId)
        : SITUATIONEXAMs.find(e => e.id == selectedId);

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

    console.log('EXAMs', EXAMs);
    console.log('SITUATIONEXAMs', SITUATIONEXAMs);

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
                <div className='btns'>
                    <button className={`btn exam-btn ${ExamOrSituation == 'exam' ? '' : 'off'}`} onClick={() => setExamOrSituation('exam')}>
                        ĐỀ THI LÝ THUYẾT
                    </button>
                    <button className={`btn situation-btn ${ExamOrSituation == 'situation' ? '' : 'off'}`} onClick={() => setExamOrSituation('situation')}>
                        ĐỀ THI MÔ PHỎNG
                    </button>
                </div>
                <div className='content'>
                    <div className='left'>
                        <div className={`table-wrapper ${ExamOrSituation}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Bài Thi</th>
                                        <th>{(ExamOrSituation == 'exam' ? 'Câu hỏi' : 'Kịch bản')}</th>
                                        <th>Thời gian</th>
                                        <th>Điều kiện đậu</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(ExamOrSituation == 'exam' ? EXAMs : SITUATIONEXAMs).map((exam, index) => {
                                        const isSelected = selectedId == exam.id;
                                        const numberLength = (ExamOrSituation == 'exam' ? exam.examQuestions?.length : exam.simulationExams?.length) || 0;

                                        return (
                                            <tr
                                                key={exam.id}
                                                onClick={() => setSelectedId(isSelected ? null : exam.id)}
                                                className={`${isSelected ? 'active' : ''}`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <td>
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
                                <ExamDetail exam={selectedExam} type={ExamOrSituation} />
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

            {/* <UserCreateExam DRIVINGLICENSEs={DRIVINGLICENSEs} /> */}
        </div >
    )
}
