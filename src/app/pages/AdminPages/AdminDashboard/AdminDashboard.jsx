import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, StatsCard } from '../../../components/Shared';
import './AdminDashboard.css';

const activityTrend = [
    { day: 'T2', value: 1420 },
    { day: 'T3', value: 1360 },
    { day: 'T4', value: 1595 },
    { day: 'T5', value: 1710 },
    { day: 'T6', value: 1670 },
    { day: 'T7', value: 1215 },
    { day: 'CN', value: 980 },
];

const roleSummaryRows = [
    { role: 'Student', totalUsers: 12480, activeUsers: 11932, ratio: '95.6%' },
    { role: 'Instructor', totalUsers: 164, activeUsers: 158, ratio: '96.3%' },
];

const examPerformanceRows = [
    { period: '7 ngày gần nhất', attempts: 840, passRate: '73.1%', failRate: '26.9%' },
    { period: '30 ngày gần nhất', attempts: 4120, passRate: '71.8%', failRate: '28.2%' },
    { period: 'Quý hiện tại', attempts: 13240, passRate: '72.4%', failRate: '27.6%' },
];

const pendingSignals = [
    {
        title: 'Báo cáo cộng đồng đang mở',
        value: 18,
        route: '/admin/community-reports',
        priority: 'high',
        note: 'Tăng 4 báo cáo so với hôm qua',
    },
    {
        title: 'Bài viết chờ duyệt',
        value: 11,
        route: '/admin/pending-posts',
        priority: 'medium',
        note: 'Tập trung ở Forum Topic Kinh nghiệm thi',
    },
    {
        title: 'Yêu cầu thay đổi nội dung',
        value: 7,
        route: '/admin/change-requests',
        priority: 'medium',
        note: '3 yêu cầu tạo mới trong 24h qua',
    },
];

const serverLogs = [
    {
        id: 'log-001',
        timestamp: '2026-04-09T09:01:23Z',
        level: 'INFO',
        source: 'auth-service',
        message: 'User session validated successfully.',
    },
    {
        id: 'log-002',
        timestamp: '2026-04-09T09:03:11Z',
        level: 'WARN',
        source: 'content-api',
        message: 'High response time detected for /v1/simulation-bank.',
    },
    {
        id: 'log-003',
        timestamp: '2026-04-09T09:05:02Z',
        level: 'ERROR',
        source: 'report-worker',
        message: 'Failed to process report queue item #RP-9821.',
    },
    {
        id: 'log-004',
        timestamp: '2026-04-09T09:07:49Z',
        level: 'INFO',
        source: 'forum-service',
        message: 'Pending post moderation cache refreshed.',
    },
    {
        id: 'log-005',
        timestamp: '2026-04-09T09:10:18Z',
        level: 'DEBUG',
        source: 'gateway',
        message: 'Tracing enabled for request group: admin-dashboard.',
    },
    {
        id: 'log-006',
        timestamp: '2026-04-09T09:12:54Z',
        level: 'ERROR',
        source: 'db-connector',
        message: 'Transient connection timeout to analytics replica.',
    },
];

const LOG_LEVEL_OPTIONS = ['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'];

function formatLogTime(timestamp) {
    return new Date(timestamp).toLocaleString('vi-VN', {
        hour12: false,
    });
}

function getLogLevelClass(level) {
    return `log-level ${String(level || '').toLowerCase()}`;
}

const maxTrend = Math.max(...activityTrend.map((item) => item.value));

export default function AdminDashboard() {
    const [logLevelFilter, setLogLevelFilter] = useState('ALL');

    const visibleLogs = useMemo(() => {
        if (logLevelFilter === 'ALL') {
            return serverLogs;
        }

        return serverLogs.filter((item) => item.level === logLevelFilter);
    }, [logLevelFilter]);

    return (
        <div className='admin-dashboard'>
            <div className='dashboard-greeting'>
                <h1>Bảng điều khiển hệ thống</h1>
                <p>Tổng quan dữ liệu vận hành SDLS theo thời gian thực (read-only).</p>
            </div>

            <div className='dashboard-stats'>
                <StatsCard
                    icon='fa-solid fa-user-graduate'
                    iconColor='blue'
                    value='12,480'
                    label='Tổng học viên (Student)'
                    trend='+2.1% / 30 ngày'
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-chalkboard-user'
                    iconColor='purple'
                    value='164'
                    label='Tổng giảng viên (Instructor)'
                    trend='+0.9% / 30 ngày'
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-car-on'
                    iconColor='yellow'
                    value='4,120'
                    label='Lượt thi thử và mô phỏng (30 ngày)'
                    trend='+5.4% / 30 ngày'
                    trendDir='up'
                />
                <StatsCard
                    icon='fa-solid fa-circle-check'
                    iconColor='green'
                    value='71.8%'
                    label='Tỷ lệ pass trung bình'
                    trend='-0.6% / 30 ngày'
                    trendDir='down'
                />
            </div>

            <div className='dashboard-columns'>
                <section className='dashboard-section dashboard-chart-card'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Xu hướng hoạt động 7 ngày</h3>
                        <span className='dashboard-section-meta'>Theo lượt tương tác hệ thống</span>
                    </div>
                    <div className='trend-bars'>
                        {activityTrend.map((item) => (
                            <div key={item.day} className='trend-item'>
                                <div className='trend-value'>{item.value.toLocaleString('vi-VN')}</div>
                                <div className='trend-bar-wrap'>
                                    <div
                                        className='trend-bar'
                                        style={{ height: `${Math.max(20, Math.round((item.value / maxTrend) * 100))}%` }}
                                    ></div>
                                </div>
                                <div className='trend-label'>{item.day}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className='dashboard-section dashboard-signals-card'>
                    <div className='dashboard-section-header'>
                        <h3 className='dashboard-section-title'>Pending signals</h3>
                        <span className='dashboard-section-meta'>Ưu tiên xử lý trong ngày</span>
                    </div>
                    <div className='signal-list'>
                        {pendingSignals.map((signal) => (
                            <Link key={signal.title} to={signal.route} className='signal-item'>
                                <div className='signal-main'>
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
            </div>

            <div className='dashboard-table-grid'>
                <DataTable
                    title='Người dùng theo vai trò'
                    subtitle='Theo nhóm role trọng yếu trong hệ thống'
                    columns={[
                        { key: 'role', label: 'Role' },
                        {
                            key: 'totalUsers',
                            label: 'Tổng người dùng',
                            render: (value) => value.toLocaleString('vi-VN'),
                        },
                        {
                            key: 'activeUsers',
                            label: 'Đang hoạt động',
                            render: (value) => value.toLocaleString('vi-VN'),
                        },
                        { key: 'ratio', label: 'Tỷ lệ active' },
                    ]}
                    data={roleSummaryRows}
                    pageSize={5}
                />

                <DataTable
                    title='Pass/Fail theo kỳ'
                    subtitle='Chỉ số thi thử và mô phỏng'
                    columns={[
                        { key: 'period', label: 'Chu kỳ' },
                        {
                            key: 'attempts',
                            label: 'Lượt thi',
                            render: (value) => value.toLocaleString('vi-VN'),
                        },
                        { key: 'passRate', label: 'Pass rate' },
                        { key: 'failRate', label: 'Fail rate' },
                    ]}
                    data={examPerformanceRows}
                    pageSize={5}
                />

                <section className='dashboard-section dashboard-logs-card'>
                    <div className='dashboard-section-header'>
                        <div>
                            <h3 className='dashboard-section-title'>System / Server Logs</h3>
                            <span className='dashboard-section-meta'>Theo dõi log vận hành hệ thống theo thời gian gần nhất</span>
                        </div>
                        <div className='logs-filter-group'>
                            <label htmlFor='log-level-filter'>Level</label>
                            <select
                                id='log-level-filter'
                                value={logLevelFilter}
                                onChange={(event) => setLogLevelFilter(event.target.value)}
                            >
                                {LOG_LEVEL_OPTIONS.map((level) => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <DataTable
                        title='Nhật ký hệ thống'
                        subtitle='Nguồn log từ backend services'
                        columns={[
                            {
                                key: 'timestamp',
                                label: 'Thời gian',
                                width: '200px',
                                render: (value) => formatLogTime(value),
                            },
                            {
                                key: 'level',
                                label: 'Mức log',
                                width: '120px',
                                render: (value) => <span className={getLogLevelClass(value)}>{value}</span>,
                            },
                            {
                                key: 'source',
                                label: 'Nguồn',
                                width: '180px',
                                render: (value) => <span className='log-source'>{value}</span>,
                            },
                            {
                                key: 'message',
                                label: 'Nội dung',
                                render: (value) => <span className='log-message'>{value}</span>,
                            },
                        ]}
                        data={visibleLogs}
                        pageSize={5}
                    />
                </section>
            </div>
        </div>
    );
}
