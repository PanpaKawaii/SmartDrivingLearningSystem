import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable, StatsCard } from '../../../components/Shared';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import { fetchData } from '../../../../mocks/CallingAPI';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { user: authUser, refreshNewToken, logout } = useAuth();
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboardData = useCallback(async () => {
        if (!authUser?.token) return;

        try {
            setLoading(true);
            const result = await fetchData('SystemConfigs/dashboard-summary', authUser.token);
            setSummary(result);
        } catch (err) {
            if (err.status === 401) {
                const refreshResult = await refreshNewToken(authUser);
                if (refreshResult?.message === 'Logout') {
                    logout();
                    navigate('/', { state: { openLogin: 'true' } });
                }
            }
        } finally {
            setLoading(false);
        }
    }, [authUser, refreshNewToken, logout, navigate]);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    if (loading) return <div className='admin-dashboard'><h3>Đang tải dữ liệu...</h3></div>;
    if (!summary) return <div className='admin-dashboard'><h3>Không thể tải dữ liệu.</h3></div>;

    const pendingSignals = [
        {
            title: 'Báo cáo cộng đồng',
            value: summary.pendingReviewReportsCount,
            route: '/admin/community-reports',
            priority: 'high',
            note: `Tăng ${summary.pendingReviewReportsIncreaseFromYesterday} so với hôm qua`,
        },
        {
            title: 'Bài viết chờ duyệt',
            value: summary.pendingForumPostsCount,
            route: '/admin/pending-posts',
            priority: 'medium',
            note: 'Cần kiểm duyệt Forum',
        },
        {
            title: 'Thay đổi nội dung',
            value: summary.pendingContentChangeReportsCount,
            route: '/admin/change-requests',
            priority: 'medium',
            note: `${summary.pendingContentChangeReportsIncreaseFromYesterday} yêu cầu mới`,
        },
    ];

    const roleSummaryRows = summary.userRoleStats.map(role => ({
        role: role.roleName,
        totalUsers: role.totalUsers,
        activeUsers: role.activeUsers,
        ratio: `${role.activeRate}%`
    }));

    const examPerformanceRows = [
        {
            period: 'Tuần này',
            attempts: summary.weeklyExamStats.totalCount,
            passRate: `${summary.weeklyExamStats.passRate}%`,
            failRate: `${summary.weeklyExamStats.failRate}%`
        },
        {
            period: 'Tháng này',
            attempts: summary.monthlyExamStats.totalCount,
            passRate: `${summary.monthlyExamStats.passRate}%`,
            failRate: `${summary.monthlyExamStats.failRate}%`
        },
    ];

    return (
        <div className='admin-dashboard'>
            <div className='dashboard-greeting'>
                <h1>Bảng điều khiển hệ thống</h1>
                <p>Tổng quan vận hành tháng {summary.month}/{summary.year}</p>
            </div>

            <div className='dashboard-stats'>
                <StatsCard
                    icon='fa-solid fa-dollar-sign' // Icon này cực kỳ phổ biến
                    iconColor='green'
                    value={summary.totalPaymentAmount.toLocaleString('vi-VN') + ' đ'}
                    label='Doanh thu tháng này'
                    trend='Tổng thanh toán'
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-user-graduate'
                    iconColor='blue'
                    value={roleSummaryRows.find(r => r.role === 'Student')?.totalUsers || 0}
                    label='Học viên (Student)'
                    trend='Hệ thống'
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-square-poll-vertical' // Đã sửa icon
                    iconColor='yellow'
                    value={(summary.monthlyExamSessionCount + summary.monthlySimulationSessionCount).toLocaleString('vi-VN')}
                    label='Lượt thi & Mô phỏng'
                    trend={`Thi: ${summary.monthlyExamSessionCount} | MP: ${summary.monthlySimulationSessionCount}`}
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-circle-check'
                    iconColor='green'
                    value={`${summary.monthlyExamStats.passRate}%`}
                    label='Tỷ lệ Pass trung bình'
                    trend='Kỳ thi thử'
                    trendDir='up'
                />
            </div>

            <div className='dashboard-columns'>
                <section className='dashboard-section'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Pending Signals</h3>
                    </div>
                    <div className='signal-list'>
                        {pendingSignals.map((signal) => (
                            <Link key={signal.title} to={signal.route} className="signal-item">
                                <div className='signal-main'>
                                    {/* Class priority ở đây (high/medium) sẽ quyết định màu của signal-value qua CSS trên */}
                                    <span className={`signal-priority ${signal.priority}`}></span>
                                    <div className='signal-text'>
                                        <div className='signal-title'>{signal.title}</div>
                                        <div className='signal-note'>{signal.note}</div>
                                    </div>
                                </div>
                                <div className='signal-value'>{signal.value}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className='dashboard-section'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Phân bổ vai trò</h3>
                    </div>
                    <DataTable
                        hideTitle
                        columns={[
                            { key: 'role', label: 'Vai trò' },
                            { key: 'totalUsers', label: 'Tổng số' },
                            { key: 'ratio', label: 'Active' },
                        ]}
                        data={roleSummaryRows}
                        pageSize={4}
                    />
                </section>
            </div>

            <div className='dashboard-table-grid'>
                <DataTable
                    title='Hiệu suất thi cử'
                    subtitle='Chỉ số vượt qua (Pass Rate) tháng hiện tại'
                    columns={[
                        { key: 'period', label: 'Chu kỳ' },
                        { key: 'attempts', label: 'Lượt thi', render: (v) => v.toLocaleString() },
                        { key: 'passRate', label: 'Pass', render: (v) => <b style={{ color: '#10b981' }}>{v}</b> },
                        { key: 'failRate', label: 'Fail', render: (v) => <span style={{ color: '#ef4444' }}>{v}</span> },
                    ]}
                    data={examPerformanceRows}
                />
            </div>
        </div>
    );
}