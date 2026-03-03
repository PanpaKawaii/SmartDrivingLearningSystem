import { Link } from 'react-router-dom';
import RunningCar from '../../components/RunningCar/RunningCar';

import './Hero.css';

export default function Hero({
    stats = [],
}) {
    return (
        <div className='hero-container'>
            <RunningCar />
            <section className='container'>
                <div className='car-wrapper'>
                    <div className='car-3d'>
                        <div className='car-body'>
                            <div className='car-roof'></div>
                            <div className='car-windshield'></div>
                            <div className='car-wheel car-wheel-left'></div>
                            <div className='car-wheel car-wheel-right'></div>
                            <div className='car-headlight car-headlight-left'></div>
                            <div className='car-headlight car-headlight-right'></div>
                        </div>
                    </div>
                </div>

                <div className='traffic-wrapper'>
                    <div className='traffic-light-3d'>
                        <div className='traffic-light-pole'></div>
                        <div className='traffic-light-box'>
                            <div className='traffic-light-red'></div>
                            <div className='traffic-light-yellow'></div>
                            <div className='traffic-light-green'></div>
                        </div>
                    </div>
                </div>

                <div className='sign-wrapper'>
                    <div className='road-sign-3d'>
                        <div className='road-sign-pole'></div>
                        <div className='road-sign-board'>
                            {/* <Triangle className='icon' /> */}
                        </div>
                    </div>
                </div>

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
                                <span>Start Learning Free</span>
                            </button>
                        </Link>

                        <Link to='/simulator'>
                            <button className='secondary-btn'>
                                <i className='fa-solid fa-gamepad' />
                                <span>Try 3D Simulator</span>
                            </button>
                        </Link>
                    </div>

                    <div className='stats'>
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className='stat-card'>
                                    {/* <Icon className='icon' /> */}
                                    <div className='value'>{stat.value}</div>
                                    <div className='label'>{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
