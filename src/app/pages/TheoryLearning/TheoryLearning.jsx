import StarsBackground from '../../components/StarsBackground/StarsBackground';
import CoreLearning from './CoreLearning';

import './TheoryLearning.css';

export default function TheoryLearning() {

    const questionQuery = new URLSearchParams({
        page: '1',
        pageSize: '1000',
        status: 1,
    });

    return (
        <div className='theory-learning-container'>
            <StarsBackground />
            <CoreLearning
                grid={6}
                questionQuery={questionQuery}
                disableAfterAnswer={false}
                endQuizButton={false}
            />
        </div>
    )
}
