import StarsBackground from '../../components/StarsBackground/StarsBackground';
import CoreLearning from './CoreLearning';

import './TheoryQuestion.css';

export default function TheoryQuestion() {

    const questionQuery = new URLSearchParams({
        page: '1',
        pageSize: '1000',
        status: 1,
    });

    return (
        <div className='theory-question-container'>
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
