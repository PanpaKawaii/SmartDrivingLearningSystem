import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../../../components/Shared/StatsCard';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import { fetchData } from '../../../../mocks/CallingAPI';
import './Dashboard.css';

export default function Dashboard() {
    const { user, logout, refreshNewToken } = useAuth();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboardData = useCallback(async () => {
        if (!user?.token) return;

        try {
            setLoading(true);
            const data = await fetchData('SystemConfigs/dashboard-summary/instructor', user.token);
            setSummary(data);
        } catch (error) {
            // XỬ LÝ TOKEN HẾT HẠN (401)
            if (error.status === 401) {
                console.warn("Token hết hạn, đang thử làm mới...");
                const refresh = await refreshNewToken(user);

                if (refresh?.message === 'Refreshed') {
                    // Nếu refresh thành công, gọi lại chính hàm này để lấy dữ liệu
                    // Lưu ý: useEffect sẽ tự kích hoạt lại do user.token thay đổi trong AuthContext
                    console.log("Token đã được làm mới thành công.");
                } else {
                    // Nếu refresh thất bại (hết hạn cả Refresh Token), đăng xuất người dùng
                    logout();
                }
            } else {
                console.error('Lỗi khi lấy dữ liệu Dashboard:', error);
            }
        } finally {
            setLoading(false);
        }
    }, [user, refreshNewToken, logout]);

    // Chạy lần đầu khi mount hoặc khi token thay đổi
    useEffect(() => {
        getDashboardData();
    }, [getDashboardData]);

    // if (loading) {
    //     return <div className="loading-container">Đang tải dữ liệu...</div>;
    // }

    return (
        <div className='instructor-dashboard'>
            <div className='dashboard-greeting'>
                <h1>Chào buổi sáng, {user?.name || 'Giảng viên'}.</h1>
                <p>Đây là cập nhật mới nhất về hệ thống đào tạo của bạn hôm nay.</p>
            </div>

            {loading ? (
                <div className="dashboard-inner-loading">
                    <div className="spinner"></div>
                    <p>Đang tải dữ liệu hệ thống...</p>
                </div>
            ) : (
                <>

                    <div className='dashboard-stats'>
                        <StatsCard
                            icon='fa-solid fa-clock'
                            iconColor='yellow'
                            value={summary?.forumPostCount || 0}
                            label='Quản lý bài viết'
                            trend='Tổng cộng'
                            trendDir='none'
                        />
                        {/* <StatsCard
                            icon='fa-solid fa-code-pull-request'
                            iconColor='blue'
                            value={summary?.contentChangeRequestCount || 0}
                            label='Yêu cầu thay đổi'
                            trend='Cần xử lý'
                            trendDir='none'
                        /> */}
                        <StatsCard
                            icon='fa-solid fa-bug'
                            iconColor='red'
                            value={summary?.contentIssueReportCount || 0}
                            label='Báo cáo lỗi nội dung'
                            trend='Gần đây'
                            trendDir='none'
                        />
                        <StatsCard
                            icon='fa-solid fa-users'
                            iconColor='purple'
                            value={summary?.communityReportCount || 0}
                            label='Báo cáo cộng đồng'
                            trend='Vi phạm'
                            trendDir='none'
                        />
                    </div>

                    <div className='dashboard-columns'>
                        {/* CỘT 1: DANH SÁCH BÀI VIẾT TỪ API */}
                        <div className='dashboard-section'>
                            <div className='dashboard-section-header'>
                                <h3 className='dashboard-section-title'>Quản lý bài viết gần đây</h3>
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
                                        {summary?.forumPosts?.length > 0 ? (
                                            summary.forumPosts.map((post) => (
                                                <tr key={post.id}>
                                                    <td title={post.title}>{post.title}</td>
                                                    <td>{post.user?.name || 'Ẩn danh'}</td>
                                                    <td>{new Date(post.createAt).toLocaleDateString('vi-VN')}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="3">Không có bài viết nào.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* CỘT 2: YÊU CẦU THAY ĐỔI TỪ API */}
                        <div className='dashboard-section'>
                            <div className='dashboard-section-header'>
                                <h3 className='dashboard-section-title'>Báo cáo đang chờ duyệt</h3>
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
                                        {summary?.contentChangeRequests?.length > 0 ? (
                                            summary.contentChangeRequests.map((req) => (
                                                <tr key={req.id}>
                                                    <td title={req.title}>{req.title}</td>
                                                    <td>
                                                        <span className='ins-status-chip active'>
                                                            <span className='chip-dot'></span>
                                                            {req.reportCategory?.name || 'Báo cáo'}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(req.createAt).toLocaleDateString('vi-VN')}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="3">Không có yêu cầu nào.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}