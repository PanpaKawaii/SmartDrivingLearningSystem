import CarWrapper from './CarWrapper';
import RoadSignWrapper from './RoadSignWrapper';
import TrafficWrapper from './TrafficWrapper';

import './DecorationWrapper.css';

export default function DecorationWrapper() {
    return (
        <div className='decoration-wrapper-container'>
            <CarWrapper />
            <TrafficWrapper />
            <RoadSignWrapper />
        </div>
    )
}
