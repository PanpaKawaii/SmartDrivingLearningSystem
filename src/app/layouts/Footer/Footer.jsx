import { Link } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer-container'>
            <div className='footer-wrapper'>
                <div className='footer-brand'>
                    <div className='logo'>
                        <div className='logo-icon'>
                            <i className='fa-solid fa-car' />
                        </div>
                        <span className='logo-text'>GREENLIGHT</span>
                    </div>
                    <p>
                        Hệ thống đào tạo lái xe tiên tiến được hỗ trợ bởi công nghệ trí tuệ nhân tạo.
                        Trải nghiệm tương lai của giáo dục lái xe.
                    </p>
                </div>

                <div className='footer-column'>
                    <h3>Các liên kết</h3>
                    <Link to='/driving-license'>Học lý thuyết</Link>
                    <Link to='/learning/list-exam'>Thi thực hành</Link>
                    <Link to='/simulation'>Trình mô phỏng</Link>
                    <Link to='/learning/list-traffic-sign'>Biển báo giao thông</Link>
                </div>

                <div className='footer-column'>
                    <h3>Support</h3>
                    <Link to='/' state={{ openBoxChat: 'true' }}>AI Assistant</Link>
                    <Link to='/profile'>My Progress</Link>
                    {/* <a href='#'>Help Center</a>
                    <a href='#'>Contact Us</a> */}
                </div>
            </div>
            <div className='footer-bottom'>
                © 2026 <span>Hệ thống Học Lái Xe Thông Minh</span>
                {/* . Bảo lưu mọi quyền. */}
            </div>
        </footer>
    )
}
