import { Link } from 'react-router-dom';

import './ExamDetail.css';

export default function ExamDetail({
    exam = {},
    type = '',
}) {
    return (
        <div className='exam-detail-container'>
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
                <Link
                    key={exam.id}
                    to={type == 'exam' ? `./${exam.id}/taking-exam` : (type == 'situation' ? `./${exam.id}/taking-situation-exam` : './')}
                    className='link question-exam-link'
                    state='exam'
                >
                    <button className='btn'>
                        Bắt đầu
                    </button>
                </Link>
            </div>
        </div>
    )
}
