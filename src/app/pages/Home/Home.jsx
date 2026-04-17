import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import CTA from './CTA';
import Hero from './Hero';
import Journey from './Journey';
import Platform from './Platform';
import Testimonials from './Testimonials';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);

            const urlParams = new URLSearchParams(window.location.search);
            const messageParam = urlParams.get('message');
            if (messageParam) navigate(`/payment-status/?${(window.location.search)?.split('?')?.[1]}`);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return isLoading ?
        <div>
            <CloudsBackground />
            <TrafficLight text={'success'} faceText={''} setRefresh={() => { }} />
        </div> : (
            <div className='home-container'>
                <StarsBackground />
                <Hero />
                <Platform />
                <Journey />
                <CTA />
            </div>
        )
}
