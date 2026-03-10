import { Link } from 'react-router-dom';
import { generateUUID } from 'three/src/math/MathUtils.js';
import StarsBackground from '../../components/StarsBackground/StarsBackground';

import './DrivingLicense.css';

export default function DrivingLicense() {

    const listDrivingLicense = [
        { id: generateUUID(), name: 'A1', description: 'Description of A1', },
        { id: generateUUID(), name: 'A2', description: 'Description of A1', },
        { id: generateUUID(), name: 'A3', description: 'Description of A1', },
        { id: generateUUID(), name: 'A4', description: 'Description of A1', },
        { id: generateUUID(), name: 'A5', description: 'Description of A1', },
        { id: generateUUID(), name: 'A6', description: 'Description of A1', },
    ];

    return (
        <div className='driving-license-container container'>
            <StarsBackground />
            <div className='list-driving-license'>
                {listDrivingLicense.map((dl, index) => (
                    <Link to={`${dl.id}/chapter`} key={index} className='item'>
                        <div>{dl.name}</div>
                        <div>{dl.description}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
