import './Journey.css';

export default function Journey() {
    const steps = [
        {
            step: '01',
            title: 'Learn the Theory',
            description: 'Master traffic laws, road signs, and driving principles through interactive lessons designed by experts.',
            icon: 'book-open',
        },
        {
            step: '02',
            title: 'Practice & Test',
            description: 'Sharpen your knowledge with realistic exams and receive AI-powered feedback on weak areas.',
            icon: 'file-lines',
        },
        {
            step: '03',
            title: 'Simulate & Master',
            description: 'Experience real-world driving scenarios in our advanced 3D simulator before hitting the road.',
            icon: 'gamepad',
        }
    ];
    return (
        <div className='journey-container'>
            <section className='container'>
                <div className='background'>
                    <div className='glow glow-top' />
                    <div className='glow glow-bottom' />
                </div>
                <div className='wrapper'>
                    <div className='header'>
                        <div className='badge'>
                            <span>Simple 3-Step Process</span>
                        </div>
                        <h2 className='title'>
                            Your Journey to<br />
                            <span className='gradient'>Driving Excellence</span>
                        </h2>
                        <p className='subtitle'>
                            Master driving faster with our proven learning methodology
                        </p>
                    </div>
                    <div className='steps'>
                        <div className='line' />
                        {steps.map((item, index) => (
                            <div key={index} className='step'>
                                <div className='card'>
                                    <div className='icon-box'>
                                        <i className={`fa-solid fa-${item.icon}`} />
                                    </div>
                                    <div className='step-number'>
                                        {item.step}
                                    </div>
                                    <h3 className='step-title'>{item.title}</h3>
                                    <p className='step-desc'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
