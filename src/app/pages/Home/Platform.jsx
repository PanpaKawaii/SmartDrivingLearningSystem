
import './Platform.css';

export default function Platform({
    features = [],
    testimonials = [],
}) {
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
                            Everything You Need<br />
                            <span className='gradient'>To Become a Pro Driver</span>
                        </h2>

                        <p className='subtitle'>
                            Six powerful modules working together to transform you from beginner to confident driver
                        </p>
                    </div>

                    <div className='features'>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={index}
                                    className='feature'
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className='card'>
                                        <div
                                            className='icon-box'
                                            style={{ background: feature.color }}
                                        >
                                            <Icon className='icon' />
                                        </div>

                                        <h3 className='feature-title'>
                                            {feature.title}
                                        </h3>

                                        <p className='feature-desc'>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
