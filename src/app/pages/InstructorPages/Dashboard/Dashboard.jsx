import { Link } from 'react-router-dom';
import InstructorStatsCard from '../../../components/InstructorComponent/InstructorStatsCard';
import './Dashboard.css';

const pendingPosts = [
    { id: 1, title: 'Hướng dẫn lái xe số tự động cho người mới', author: 'Nguyễn Văn A', date: '27/03/2026', status: 'pending' },
    { id: 2, title: 'Kinh nghiệm thi sát hạch lái xe hạng B2', author: 'Trần Thị B', date: '26/03/2026', status: 'pending' },
    { id: 3, title: 'Các lỗi thường gặp khi thi sa hình', author: 'Lê Văn C', date: '25/03/2026', status: 'pending' },
    { id: 4, title: 'Cách xử lý tình huống khẩn cấp trên đường', author: 'Phạm D', date: '25/03/2026', status: 'pending' },
];

const changeRequests = [
    { id: 1, title: 'Cập nhật nội dung bài học Luật giao thông', requester: 'Nguyễn V', type: 'Bài học', date: '27/03/2026', priority: 'high' },
    { id: 2, title: 'Sửa đáp án câu hỏi #245', requester: 'Trần T', type: 'Câu hỏi', date: '26/03/2026', priority: 'medium' },
    { id: 3, title: 'Thêm biển báo mới theo nghị định 100', requester: 'Lê M', type: 'Biển báo', date: '24/03/2026', priority: 'low' },
];

export default function Dashboard() {
    return (
        <div className='instructor-dashboard'>
            <div className='dashboard-greeting'>
                <h1>Chào buổi sáng, Minh Anh.</h1>
                <p>Đây là cập nhật mới nhất về hệ thống đào tạo của bạn hôm nay.</p>
            </div>

            <div className='dashboard-stats'>
                <InstructorStatsCard
                    icon='fa-solid fa-clock'
                    iconColor='yellow'
                    value='24'
                    label='Bài viết chờ duyệt'
                    trend='+3 hôm nay'
                    trendDir='up'
                />
                <InstructorStatsCard
                    icon='fa-solid fa-code-pull-request'
                    iconColor='blue'
                    value='12'
                    label='Yêu cầu thay đổi'
                    trend='+2 hôm nay'
                    trendDir='up'
                />
                <InstructorStatsCard
                    icon='fa-solid fa-bug'
                    iconColor='red'
                    value='08'
                    label='Báo cáo lỗi nội dung'
                    trend='-1 hôm nay'
                    trendDir='down'
                />
                <InstructorStatsCard
                    icon='fa-solid fa-users'
                    iconColor='purple'
                    value='15'
                    label='Báo cáo cộng đồng'
                    trend='+5 hôm nay'
                    trendDir='up'
                />
            </div>

            <div className='dashboard-columns'>
                <div className='dashboard-section'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Bài viết chờ duyệt gần đây</h3>
                        <Link to='/instructor/pending-posts' className='dashboard-section-link'>Xem tất cả →</Link>
                    </div>
                    <div className='dashboard-table-card'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Ngày gửi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>{post.author}</td>
                                        <td>{post.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='dashboard-section'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Yêu cầu thay đổi chờ duyệt</h3>
                        <Link to='/instructor/change-requests' className='dashboard-section-link'>Xem tất cả →</Link>
                    </div>
                    <div className='dashboard-table-card'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nội dung</th>
                                    <th>Loại</th>
                                    <th>Ngày gửi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {changeRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td>{req.title}</td>
                                        <td>
                                            <span className='ins-status-chip active'>
                                                <span className='chip-dot'></span>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td>{req.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
