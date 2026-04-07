import StarsBackground from '../../components/StarsBackground/StarsBackground';
import Hero from './Hero';
import Journey from './Journey';
import Platform from './Platform';
import Testimonials from './Testimonials';
import CTA from './CTA';

export default function Home() {
    return (
        <div className='home-container'>
            <StarsBackground />
            <Hero />
            <Platform />
            <Journey />
            <Testimonials />
            <CTA />
        </div>
    )
}
