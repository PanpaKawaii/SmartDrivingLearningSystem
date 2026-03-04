import { Link } from 'react-router-dom';
import RunningCar from '../../components/RunningCar/RunningCar';
import DecorationWrapper from './DecorationWrapper/DecorationWrapper';

import './Hero.css';

export default function Hero() {
    const stats = [
        { icon: 'users', value: '10K+', label: 'Active Learners' },
        { icon: 'award', value: '95%', label: 'Pass Rate' },
        { icon: 'question-circle', value: '600+', label: 'Questions' },
        { icon: 'shield', value: '100%', label: 'Safe Learning' }
    ];
    return (
        <div className='hero-container'>
            <RunningCar />
            <section className='container'>
                <DecorationWrapper />
                <div className='content'>
                    <div className='badge'>
                        <i className='fa-solid fa-zap' />
                        <span>AI-Powered Training System</span>
                    </div>

                    <div className='title'>
                        <h1>
                            <span>Master The Road</span>
                            <span className='gradient'>Drive With Confidence</span>
                        </h1>
                    </div>

                    <p className='description'>
                        Experience the future of driver education with AI-powered simulations and personalized learning paths
                    </p>

                    <div className='actions'>
                        <Link to='/learn'>
                            <button className='primary-btn'>
                                <i className='fa-solid fa-book-open' />
                                <span>Start Learning</span>
                            </button>
                        </Link>

                        <Link to='/simulator'>
                            <button className='secondary-btn'>
                                <i className='fa-solid fa-gamepad' />
                                <span>Try Simulator</span>
                            </button>
                        </Link>
                    </div>

                    <div className='stats'>
                        {stats.map((stat, index) => (
                            <div key={index} className='stat-card'>
                                <i className={`fa-solid fa-${stat.icon}`} />
                                <div className='value'>{stat.value}</div>
                                <div className='label'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
