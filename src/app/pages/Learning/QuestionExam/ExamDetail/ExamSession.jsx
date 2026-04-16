
import './ExamSession.css';

export default function ExamSession({
    examSessions = [],
}) {
    console.log('Sessions', examSessions);

    return (
        <div className='exam-session-container'>
            <h3>Lịch sử làm bài</h3>
            <div className='list-session'>
                {examSessions.map((session) => (
                    <div key={session.id} className='session-item'>
                        <div>{new Date(session.createAt)?.toLocaleDateString()}</div>
                        <div>{session.score || session.totalScore || 0}%</div>
                        <div className='time'>
                            <i className='fa-regular fa-clock' />
                            <div>{(session.totalDuration || 0)?.toFixed(0)}s</div>
                        </div>
                        <i className={`fa-regular ${session.isPassed ? 'fa-check-circle' : 'fa-xmark-circle'}`} title={session.isPassed ? 'Đã vượt qua' : 'Chưa vượt qua'} />
                    </div>
                ))}
            </div>
        </div>
    )
}
