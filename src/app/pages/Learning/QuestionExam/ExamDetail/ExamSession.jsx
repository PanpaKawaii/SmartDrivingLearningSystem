
import { Link } from 'react-router-dom';
import './ExamSession.css';

export default function ExamSession({
    examSessions = [],
    examId = '',
    type = 'exam',
}) {
    console.log('Sessions', examSessions);

    return examSessions && examSessions.length > 0 && (
        <div className='exam-session-container'>
            <h3>Lịch sử làm bài</h3>
            <div className='list-session'>
                {examSessions.map((session, index) => (
                    <div
                        key={session.id}
                        className='session-item'
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* <div className='date'>{new Date(session.createAt)?.toLocaleDateString()}</div> */}
                        <div className='date'>{session.createAt?.replace('T', ' ')?.slice(0, 19)}</div>
                        <div className='score'>{session.score || session.totalScore || 0}%</div>
                        <div className='time'>
                            <i className='fa-regular fa-clock' />
                            <div>{(session.totalDuration || 0)?.toFixed(0)}s</div>
                        </div>
                        <i className={`fa-regular ${session.isPassed ? 'fa-check-circle' : 'fa-xmark-circle'}`} title={session.isPassed ? 'Đã vượt qua' : 'Chưa vượt qua'} />
                        <Link
                            to={`./${examId}/${type == 'exam' ? 'exam-result' : 'situation-exam-result'}/${session.id}`}
                            state={type}
                            className='view-detail'
                        >
                            <span>View</span>
                            <i className='fa-solid fa-play' />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
