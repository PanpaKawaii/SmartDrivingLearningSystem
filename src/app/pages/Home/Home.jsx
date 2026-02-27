import { useEffect, useState } from 'react';
import TrafficLight from '../../components/TrafficLight/TrafficLight';

export default function Home() {
    const [state, setState] = useState('error');

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                if (prev === 'error') return 'loading';
                if (prev === 'loading') return 'success';
                return 'error';
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <TrafficLight text={state} />
        </div>
    )
}
