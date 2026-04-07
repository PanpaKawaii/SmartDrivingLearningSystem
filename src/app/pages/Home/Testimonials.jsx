import './Testimonials.css';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'New Driver',
            content: 'The simulator helped me build confidence before my actual driving test. Passed on the first try!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Student',
            content: 'Best driving learning platform ever! The AI assistant answered all my questions instantly.',
            rating: 5
        },
        {
            name: 'Emily Rodriguez',
            role: 'Instructor',
            content: 'I recommend this to all my students. The practice exams are incredibly realistic.',
            rating: 5
        }
    ];
    return (
        <div className='testimonials-container'>
            <section className='container'>
                <div className='background'>
                    <div className='glow glow-left' />
                    <div className='glow glow-right' />
                </div>
                <div className='wrapper'>
                    <div className='header'>
                        <div className='badge'>
                            <span>Success Stories</span>
                        </div>
                        <h2 className='title'>Loved by 10,000+ Learners</h2>
                        <p className='subtitle'>
                            See what our students say about their experience
                        </p>
                    </div>
                    <div className='testimonials'>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className='testimonial'
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className='card'>
                                    <div className='stars'>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} viewBox='0 0 20 20'>
                                                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className='content'>
                                        '{testimonial.content}'
                                    </p>
                                    <div className='author'>
                                        <div className='avatar'>
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div className='info'>
                                            <div className='name'>{testimonial.name}</div>
                                            <div className='role'>{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
