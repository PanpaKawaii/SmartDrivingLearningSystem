import { Link } from 'react-router-dom';
import HeadingComponent from '../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../components/StarsBackground/StarsBackground';

import './Learning.css';

export default function Learning() {
    const categories = [
        {
            name: '600+ Câu hỏi lý thuyết',
            link: 'learning/theory-question',
            icon: 'question-circle',
            description: 'Bao gồm hơn 600 câu hỏi trắc nghiệm có hiển thị đáp án và giải thích sau khi chọn',
            type: 'Đa dạng câu hỏi',
            time: 'Tự học',
        },
        {
            name: 'Học câu hỏi theo dạng Flashcard',
            link: 'learning/question-flashcard',
            icon: 'rectangle-list',
            description: 'Học 600+ câu hỏi dưới dạng Flashcard gồm câu hỏi và đáp án',
            type: 'Đa dạng câu hỏi',
            time: 'Tự học',
        },
        {
            name: '300+ Biển báo giao thông',
            link: 'learning/list-traffic-sign',
            icon: 'triangle-exclamation',
            description: 'Bao gồm hơn 300 biển báo có hình ảnh và nội dung chi tiết',
            type: 'Đa dạng nội dung',
            time: 'Tự học',
        },
        {
            name: 'Học biển báo theo dạng Flashcard',
            link: 'learning/traffic-sign-flashcard',
            icon: 'rectangle-list',
            description: 'Học 300+ biển báo dưới dạng Flashcard gồm hình ảnh và nội dung chi tiết',
            type: 'Đa dạng câu hỏi',
            time: 'Tự học',
        },
        // {
        //     name: 'Học biển báo theo dạng Flipbook',
        //     link: 'learning/traffic-sign-flip-book',
        //     icon: 'book',
        //     description: 'Học 300+ biển báo dưới dạng sách lật sách',
        //     type: 'Đa dạng nội dung',
        //     time: 'Tự học',
        // },
        {
            name: 'Làm đề thi thử',
            link: 'learning/list-exam',
            icon: 'file-lines',
            description: 'Làm đề thi thử theo bộ đề có sẵn của hệ thống hoặc tự tạo bộ đề theo nhu cầu cá nhân',
            type: 'Bài kiểm tra',
            time: 'Tính thời gian',
        },
        {
            name: 'Trải nghiệm mô phỏng',
            link: 'simulation',
            icon: 'play',
            description: 'Trải nghiệm mô phỏng với hơn 120 tình huống khác nhau',
            type: 'Đa dạng câu hỏi',
            time: 'Tự học',
        },
        {
            name: 'Học theo loại bằng lái',
            link: 'driving-license',
            icon: 'car',
            description: 'Học nhiều loại bằng lái khác nhau theo hệ thống cây',
            type: 'Đa dạng câu hỏi',
            time: 'Tự học',
        },
    ];
    return (
        <div className='learning-container'>
            <StarsBackground />
            <div className='content'>
                <HeadingComponent
                    badge='Tài liệu đào tạo'
                    title='Làm chủ kiến thức lái xe'
                    subtitle='Các mô-đun đào tạo toàn diện về luật giao thông, biển báo, kỹ thuật và an toàn giao thông'
                    back={false}
                />

                <div className='category-grid'>
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/${category.link}`}
                            className='category-link'
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className='category-card'>
                                <div className='card-top'>
                                    <div className='card-left'>
                                        <div className='icon-box'>
                                            <i className={`fa-solid fa-${category.icon}`} />
                                        </div>
                                        <div>
                                            <h2>{category.name}</h2>
                                            <p>{category.description}</p>
                                        </div>
                                    </div>
                                    <i className='fa-solid fa-cheavron-right' />
                                </div>

                                <div className='card-meta'>
                                    <div>
                                        <i className='fa-solid fa-book-open' />
                                        <span>{category.type}</span>
                                    </div>
                                    <div>
                                        <i className='fa-solid fa-clock' />
                                        <span>{category.time}</span>
                                    </div>
                                </div>

                                <div className='card-footer'>
                                    <span>Xem chi tiết →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
