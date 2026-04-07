import './Platform.css';

export default function Platform() {
    const features = [
        {
            icon: 'book-open',
            title: 'Theory Learning',
            description: 'Comprehensive lessons on traffic laws, signs, and driving techniques',
            color: '#2563eb #06b6d4'
        },
        {
            icon: 'file-lines',
            title: 'Practice Exams',
            description: 'Realistic mock tests with instant feedback and detailed analytics',
            color: '#0b8a29 #6ad182'
        },
        {
            icon: 'triangle-exclamation',
            title: 'Traffic Signs Library',
            description: 'Complete database of traffic signs with interactive learning',
            color: '#f59e0b #fada89'
        },
        {
            icon: 'gamepad',
            title: 'Driving Simulator',
            description: 'Immersive 3D simulation for practical driving scenarios',
            color: '#8b5cf6 #ec4899'
        },
        {
            icon: 'comment-dots',
            title: 'AI Assistant',
            description: 'Get instant help and personalized learning recommendations',
            color: '#06b6d4 #2563eb'
        },
        {
            icon: 'arrow-trend-up',
            title: 'Progress Tracking',
            description: 'Detailed analytics and insights into your learning journey',
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
                            <span>Complete Training Platform</span>
                        </div>
                        <h2 className='title'>
                            <div>Everything You Need</div>
                            <div className='gradient'>To Become a Pro Driver</div>
                        </h2>
                        <p className='subtitle'>
                            Six powerful modules working together to transform you from beginner to confident driver
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
