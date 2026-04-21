import { Link } from 'react-router-dom';

import './ExamDetail.css';

export default function ExamDetail({
    roleName = '',
    exam = {},
    type = '',
    today = [],
    limit = 0,
}) {
    return (
        <div className={`exam-detail-container ${type}`}>
            <div className='name'>
                <h2>{exam.title}</h2>
                <p>{exam.description}</p>
            </div>
            <div className='detail'>
                <div className='information'>
                    {type == 'exam' ?
                        <div className='item'>
                            <i className='fa-regular fa-question-circle' />
                            <div className='value'>{exam.examQuestions?.length} câu hỏi</div>
                        </div>
                        :
                        <div className='item'>
                            <i className='fa-solid fa-play' />
                            <div className='value'>{exam.simulationExams?.length} kịch bản</div>
                        </div>
                    }
                    <div className='item'>
                        <i className='fa-regular fa-clock' />
                        <div className='value'>{((exam.duration / 60) || 0).toFixed(0)} phút</div>
                    </div>
                </div>
                {type == 'exam' &&
                    <div className='note'>
                        <h3>Lưu ý</h3>
                        <p>Bài thi sẽ tự động nộp khi hết thời gian. Hãy quản lý thời gian hợp lý!</p>
                    </div>
                }
                {roleName != 'Student' &&
                    <div className={`limit ${today?.length >= limit ? 'limited' : ''}`}>
                        Giới hạn dùng thử trong ngày: {limit - (today?.length || 0)}/{limit}
                    </div>
                }
                <Link
                    key={exam.id}
                    to={today?.length >= limit ? '' : (type == 'exam' ? `./${exam.id}/taking-exam` : (type == 'situation' ? `./${exam.id}/taking-situation-exam` : './'))}
                    className='link question-exam-link'
                    state='exam'
                >
                    <button
                        className='btn'
                        disabled={today?.length >= limit}
                        onClick={() => {
                            const Today = new Date().toLocaleDateString();
                            localStorage.setItem(type == 'exam' ? 'ExamSessionStorage' : 'SimulationSessionStorage', JSON.stringify(
                                [...(
                                    ((JSON.parse(
                                        localStorage.getItem(type == 'exam' ? 'ExamSessionStorage' : 'SimulationSessionStorage') || '[]'
                                    )))?.filter(ps => ps == Today)),
                                    Today,
                                ]
                            ));
                        }}
                    >
                        {today?.length >= limit ? 'Vui lòng đăng ký thành viên' : 'Bắt đầu làm bài'}
                    </button>
                </Link>
            </div>
        </div>
    )
}
