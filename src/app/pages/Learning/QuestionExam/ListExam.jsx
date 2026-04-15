import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import StarsBackground from '../../../components/StarsBackground/StarsBackground.jsx';
import CloudsBackground from '../../../components/CloudsBackground/CloudsBackground.jsx';
import TrafficLight from '../../../components/TrafficLight/TrafficLight.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import UserCreateExam from './UserCreateExam.jsx';

import './ListExam.css';
import ExamDetail from './ExamDetail/ExamDetail.jsx';
import ExamSession from './ExamDetail/ExamSession.jsx';

export default function ListExam() {
    const { user, refreshNewToken } = useAuth();

    const navigate = useNavigate();

    const [EXAMs, setEXAMs] = useState([]);
    const [SITUATIONEXAMs, setSITUATIONEXAMs] = useState([]);
    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedExamId, setSelectedExamId] = useState(null);

    const selectedExam = EXAMs.find(e => e.id == selectedExamId);

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

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='list-exam-container'>
            <StarsBackground />
            <div className='container'>
                <div className='header'>
                    <div className='badge'>
                        <i className='fa-solid fa-file-lines' />
                        <div>Bài Thi Trắc Nghiệm</div>
                    </div>
                    <h1>Chọn Bài Thi</h1>
                    <p>
                        Luyện tập với các dạng bài thi khác nhau, nhận kết quả ngay lập tức.
                    </p>
                </div>

                <div className='content'>
                    <div className='left'>
                        <div className='table-wrapper'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Bài Thi</th>
                                        <th>Câu hỏi</th>
                                        <th>Thời gian</th>
                                        <th>Điểm đậu</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EXAMs.map((exam, index) => {
                                        const isSelected = selectedExamId == exam.id;
                                        return (
                                            <tr
                                                key={exam.id}
                                                onClick={() => setSelectedExamId(isSelected ? null : exam.id)}
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
                                                <td>{exam.examQuestions?.length}</td>
                                                <td>{((exam.duration / 60) || 0).toFixed(0)} phút</td>
                                                <td>{exam.passScore}</td>
                                                <td><i className='fa-solid fa-chevron-right' /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='right' key={selectedExamId}>
                        {selectedExam ? (
                            <>
                                <ExamDetail exam={selectedExam} type={'exam'} />
                                <ExamSession />
                            </>
                        ) : (
                            <div className='empty'>
                                <h2>Chọn Bài Thi</h2>
                                <p>Nhấn vào một bài thi để xem chi tiết</p>
                            </div>
                        )}
                    </div>
                </div>
            </div >



            <div className='container list'>
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
            </div>

            {/* <UserCreateExam DRIVINGLICENSEs={DRIVINGLICENSEs} /> */}
        </div >
    )
}
