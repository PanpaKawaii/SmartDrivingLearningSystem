import { Link } from 'react-router-dom';

import './CTA.css';

export default function CTA() {
    return (
        <div className='cta-container'>
            <section className='container'>
                <div className='text'>
                    <h2 className='title'>
                        <div>Sẵn sàng chinh phục</div>
                        <div>con đường?</div>
                    </h2>
                    <p className='subtitle'>
                        Tham gia cùng hơn 10.000 học viên thành công và bắt đầu hành trình của bạn ngay hôm nay!
                    </p>
                    <p className='note'>
                        Truy cập miễn phí vào tất cả tài liệu học tập. Không cần thẻ tín dụng.
                    </p>
                </div>
                <div className='actions'>
                    <Link to='/driving-license'>
                        <button className='primary-btn'>
                            <i className='fa-solid fa-zap' />
                            <span>Bắt đầu ngay</span>
                        </button>
                    </Link>
                    {/* <Link to='/profile'>
                        <button className='secondary-btn'>
                            <i className='fa-solid fa-arrow-trend-up' />
                            <span>Xem bản demo tiến độ</span>
                        </button>
                    </Link> */}
                </div>
            </section>
        </div>
    )
}
