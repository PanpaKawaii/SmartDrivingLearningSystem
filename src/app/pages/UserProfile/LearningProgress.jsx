import ProgressBar from '../../components/ProgressBar/ProgressBar';

export default function LearningProgress({ stats }) {
    // Tính toán phần trăm lý thuyết
    const theoryPercent = stats.totalQuestionCount > 0
        ? Math.round((stats.learningProgressQuestionCount / stats.totalQuestionCount) * 100)
        : 0;

    // Giả định tiến độ bài học (ví dụ: có 50 bài học tổng cộng)
    const lessonTotal = 50;
    const lessonPercent = Math.round((stats.lessonProgressCount / lessonTotal) * 100);

    return (
        <div className='progress-dashboard'>
            <div className='profile-header'>
                <div className='header-title'>
                    <i className='fa-solid fa-chart-line'></i>
                    <h2>Tiến độ học tập</h2>
                </div>
            </div>

            <div className='stats-grid'>
                {/* Thi thử lý thuyết */}
                <div className='stat-card'>
                    <div className='icon-box blue-glow'>
                        <i className='fa-solid fa-file-signature'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Thi thử đã làm</span>
                        <span className='stat-value'>{stats.examSessionCount} <small>Đề</small></span>
                    </div>
                </div>

                {/* Tỉ lệ đỗ lý thuyết */}
                <div className='stat-card'>
                    <div className='icon-box green-glow'>
                        <i className='fa-solid fa-award'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Tỉ lệ đỗ lý thuyết</span>
                        <span className='stat-value'>{stats.examPassRate.toFixed(2)}<small>%</small></span>
                    </div>
                </div>

                {/* THÊM MỚI: Thi mô phỏng */}
                <div className='stat-card'>
                    <div className='icon-box blue-glow'>
                        <i className='fa-solid fa-film'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Thi mô phỏng</span>
                        <span className='stat-value'>{stats.simulationSessionCount} <small>Đề</small></span>
                    </div>
                </div>

                {/* THÊM MỚI: Tỉ lệ đỗ mô phỏng */}
                <div className='stat-card'>
                    <div className='icon-box green-glow'>
                        <i className='fa-solid fa-check-double'></i>
                    </div>
                    <div className='stat-info'>
                        <span className='stat-label'>Tỉ lệ đỗ mô phỏng</span>
                        <span className='stat-value'>{stats.simulationPassRate.toFixed(2)}<small>%</small></span>
                    </div>
                </div>
            </div>

            <div className='progress-section'>
                <h3 className='section-title'>Chương trình huấn luyện</h3>
                <div className='progress-cards'>
                    {/* Tiến độ lý thuyết */}
                    <div className='progress-card'>
                        <div className='card-top'>
                            <div className='title-area'>
                                <i className='fa-solid fa-book-open theory-icon'></i>
                                <h4>Ôn tập lý thuyết</h4>
                            </div>
                            <span className='percent'>{theoryPercent}%</span>
                        </div>
                        <ProgressBar current={stats.learningProgressQuestionCount} total={stats.totalQuestionCount} showValue={false} height="8px" />
                        <p className='progress-note'>Hoàn thành {stats.learningProgressQuestionCount}/{stats.totalQuestionCount} câu hỏi</p>
                    </div>

                    {/* THÊM MỚI: Tiến độ bài học (lessonProgress) */}
                    <div className='progress-card'>
                        <div className='card-top'>
                            <div className='title-area'>
                                <i className='fa-solid fa-graduation-cap lesson-icon'></i>
                                <h4>Bài học đã xem</h4>
                            </div>
                            <span className='percent'>{lessonPercent}%</span>
                        </div>
                        <ProgressBar current={stats.lessonProgressCount} total={lessonTotal} showValue={false} height="8px" />
                        <p className='progress-note'>Đã học {stats.lessonProgressCount}/{lessonTotal} bài giảng</p>
                    </div>
                </div>
            </div>

            <div className='ai-analysis-card'>
                <div className='ai-header'>
                    <i className='fa-solid fa-robot ai-icon'></i>
                    <div>
                        <h3>Lộ trình học cá nhân hoá</h3>
                        <p>Dựa trên {stats.examSessionCount} đề thi, hệ thống khuyên bạn nên tập trung vào phần "Biển báo cấm".</p>
                    </div>
                </div>
                <div className='ai-action'>
                    <button className='primary-btn ai-btn'>
                        <i className='fa-solid fa-bolt'></i> Ôn tập câu hỏi yếu
                    </button>
                </div>
            </div>
        </div>
    );
}