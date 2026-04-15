import './Platform.css';

export default function Platform() {
    const features = [
        {
            icon: 'book-open',
            title: 'Học lý thuyết',
            description: 'Bài học toàn diện về luật giao thông, biển báo và kỹ thuật lái xe.',
            color: '#2563eb #06b6d4'
        },
        {
            icon: 'file-lines',
            title: 'Bài kiểm tra',
            description: 'Các bài kiểm tra thử thực tế với phản hồi tức thì và phân tích chi tiết.',
            color: '#0b8a29 #6ad182'
        },
        {
            icon: 'triangle-exclamation',
            title: 'Thư viện biển báo giao thông',
            description: 'Kho dữ liệu đầy đủ về biển báo giao thông với tính năng học tập tương tác.',
            color: '#f59e0b #fada89'
        },
        {
            icon: 'play',
            title: 'Mô phỏng lái xe',
            description: 'Mô phỏng 3D sống động cho các tình huống lái xe thực tế.',
            color: '#8b5cf6 #ec4899'
        },
        {
            icon: 'comment-dots',
            title: 'Trợ lý AI',
            description: 'Nhận hỗ trợ tức thì và các đề xuất học tập cá nhân hóa.',
            color: '#06b6d4 #2563eb'
        },
        {
            icon: 'arrow-trend-up',
            title: 'Theo dõi tiến độ',
            description: 'Phân tích chi tiết và những hiểu biết sâu sắc về hành trình học tập của bạn.',
            color: '#ec4899 #f5b3d5'
        }
    ];
    return (
        <div className='platform-container'>
            <section className='container'>
                <div className='glow glow-left' />
                <div className='glow glow-right' />
                <div className='wrapper'>
                    <div className='header'>
                        <div className='badge'>
                            <span>NỀN TẢNG ĐÀO TẠO HOÀN CHỈNH</span>
                        </div>
                        <h2 className='title'>
                            <div>Tất cả những gì bạn cần</div>
                            <div className='gradient'>để trở thành một tay lái chuyên nghiệp</div>
                        </h2>
                        <p className='subtitle'>
                            Sáu mô-đun mạnh mẽ phối hợp cùng nhau, giúp bạn từ người mới bắt đầu trở thành một tay lái tự tin
                        </p>
                    </div>
                    <div className='features'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='feature'
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className='card'>
                                    <div
                                        className='icon-box'
                                        style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[0]}, ${feature.color.split(' ')[1]})` }}
                                    >
                                        <i className={`fa-solid fa-${feature.icon}`} />
                                    </div>
                                    <h3 className='feature-title'>{feature.title}</h3>
                                    <p className='feature-desc'>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
