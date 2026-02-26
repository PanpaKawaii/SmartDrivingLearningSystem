import { useEffect, useState } from 'react';
import TrafficLight from '../../components/TrafficLight/TrafficLight';

export default function Home() {
    const [state, setState] = useState('Error');

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                if (prev === 'Error') return 'Loading';
                if (prev === 'Loading') return 'Success';
                return 'Error';
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <TrafficLight text={state} />
        </div>
    )
}
