import './Journey.css';

export default function Journey() {
    const steps = [
        {
            step: '01',
            title: 'Tìm hiểu lý thuyết',
            description: 'Nắm vững luật giao thông, biển báo đường bộ và nguyên tắc lái xe thông qua các bài học tương tác được thiết kế bởi các chuyên gia.',
            icon: 'book-open',
        },
        {
            step: '02',
            title: 'Luyện tập & Kiểm tra',
            description: 'Nâng cao kiến thức của bạn với các bài kiểm tra thực tế và nhận phản hồi từ AI về những lĩnh vực còn yếu.',
            icon: 'file-lines',
        },
        {
            step: '03',
            title: 'Mô phỏng & Làm chủ kỹ năng',
            description: 'Trải nghiệm các tình huống lái xe thực tế trong trình mô phỏng 3D tiên tiến của chúng tôi trước khi ra đường.',
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
                            <span>QUY TRÌNH 3 BƯỚC ĐƠN GIẢN</span>
                        </div>
                        <h2 className='title'>
                            Hành trình của bạn đến<br />
                            <span className='gradient'>sự xuất sắc trong lái xe</span>
                        </h2>
                        <p className='subtitle'>
                            Nâng cao kỹ năng lái xe nhanh hơn với phương pháp học tập đã được chứng minh của chúng tôi
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
