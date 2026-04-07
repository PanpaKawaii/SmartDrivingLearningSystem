import { Link } from 'react-router-dom';

import './CTA.css';

export default function CTA() {
    return (
        <div className='cta-container'>
            <section className='container'>
                <div className='text'>
                    <h2 className='title'>
                        <div>Ready to Master</div>
                        <div>the Road?</div>
                    </h2>
                    <p className='subtitle'>
                        Join 10,000+ successful learners and start your journey today
                    </p>
                    <p className='note'>
                        Free access to all learning materials. No credit card required.
                    </p>
                </div>
                <div className='actions'>
                    <Link to='/driving-license'>
                        <button className='primary-btn'>
                            <i className='fa-solid fa-zap' />
                            <span>Start Learning Now</span>
                        </button>
                    </Link>
                    <Link to='/dashboard'>
                        <button className='secondary-btn'>
                            <i className='fa-solid fa-arrow-trend-up' />
                            <span>View Progress Demo</span>
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
