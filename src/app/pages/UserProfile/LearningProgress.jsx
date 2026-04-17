import ProgressBar from '../../components/ProgressBar/ProgressBar';

export default function LearningProgress() {
    return (
        <div className='progress-dashboard'>
            <div className='profile-header'>
                <div className='header-title'>
                    <i className='fa-solid fa-chart-line'></i>
                    <h2>Tiến độ học tập</h2>
                </div>
            </div>
            <div className='stats-grid'>
                <div className='stat-card'>
                    <div className='icon-box blue-glow'>
                        <i className='fa-solid fa-file-signature'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Thi thử đã làm</span>
                        <span className='stat-value'>12 <small>Đề</small></span>
                    </div>
                </div>
                <div className='stat-card'>
                    <div className='icon-box green-glow'>
                        <i className='fa-solid fa-award'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Tỉ lệ đỗ</span>
                        <span className='stat-value'>85<small>%</small></span>
                    </div>
                </div>
            </div>

            <div className='progress-section'>
                <h3 className='section-title'>Chương trình huấn luyện</h3>
                <div className='progress-cards'>
                    <div className='progress-card'>
                        <div className='card-top'>
                            <div className='title-area'>
                                <i className='fa-solid fa-book-open theory-icon'></i>
                                <h4>Lý thuyết</h4>
                            </div>
                            <span className='percent'>75%</span>
                        </div>
                        <ProgressBar current={450} total={600} showValue={false} height="8px" />
                        <p className='progress-note'>Hoàn thành 450/600 câu hỏi</p>
                    </div>

                    <div className='progress-card'>
                        <div className='card-top'>
                            <div className='title-area'>
                                <i className='fa-solid fa-car simulation-icon'></i>
                                <h4>Mô phỏng 3D</h4>
                            </div>
                            <span className='percent'>40%</span>
                        </div>
                        <ProgressBar current={48} total={120} showValue={false} height="8px" />
                        <p className='progress-note'>Vượt qua 48/120 tình huống</p>
                    </div>
                </div>
            </div>

            <div className='ai-analysis-card'>
                <div className='ai-header'>
                    <i className='fa-solid fa-robot ai-icon'></i>
                    <div>
                        <h3>Lộ trình học cá nhân hoá</h3>
                        <p>AI phát hiện bạn thường xuyên làm sai câu hỏi phần "Biển báo cấm".</p>
                    </div>
                </div>
                <div className='ai-action'>
                    <button className='primary-btn ai-btn'>
                        <i className='fa-solid fa-bolt'></i> Ôn tập câu hỏi yếu (Weak-area Quiz)
                    </button>
                </div>
            </div>
        </div>
    );
}