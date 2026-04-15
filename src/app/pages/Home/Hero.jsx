import { Link } from 'react-router-dom';
import RunningCar from '../../components/RunningCar/RunningCar';
import DecorationWrapper from './DecorationWrapper/DecorationWrapper';

import './Hero.css';

export default function Hero() {
    const stats = [
        { icon: 'question-circle', type: 'solid', value: '600+', label: 'Câu hỏi lý thuyết' },
        { icon: 'play', type: 'solid', value: '120+', label: 'Kịch bản mô phỏng' },
        { icon: 'triangle-exclamation', type: 'solid', value: '300+', label: 'Biển báo giao thông' },
        { icon: 'comment-dots', type: 'solid', value: '24/7', label: 'AI Support' }
    ];
    return (
        <div className='hero-container'>
            <RunningCar />
            <section className='container'>
                <DecorationWrapper />
                <div className='content'>
                    <div className='badge'>
                        <i className='fa-solid fa-zap' />
                        <span>Hệ thống đào tạo lái xe hỗ trợ AI</span>
                    </div>
                    <div className='title'>
                        <h1>
                            <span>Làm chủ con đường</span>
                            <span className='gradient'>Lái xe tự tin</span>
                        </h1>
                    </div>
                    <p className='description'>
                        Trải nghiệm tương lai của việc học lái xe với các mô phỏng ứng dụng AI và lộ trình học tập được cá nhân hóa
                    </p>
                    <div className='actions'>
                        <Link to='/driving-license'>
                            <button className='primary-btn'>
                                <i className='fa-solid fa-book-open' />
                                <span>Bắt đầu ngay</span>
                            </button>
                        </Link>
                        <Link to='/simulation'>
                            <button className='secondary-btn'>
                                <i className='fa-solid fa-play' />
                                <span>Trải nghiệm mô phỏng</span>
                            </button>
                        </Link>
                    </div>
                    <div className='stats'>
                        {stats.map((stat, index) => (
                            <div key={index} className='stat-card'>
                                <i className={`fa-${stat.type} fa-${stat.icon}`} />
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
