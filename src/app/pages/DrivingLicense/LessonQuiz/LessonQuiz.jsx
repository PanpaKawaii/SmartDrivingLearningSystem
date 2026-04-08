import { useParams } from 'react-router-dom';
import StarsBackground from '../../../components/StarsBackground/StarsBackground';
import CoreLearning from '../../TheoryLearning/CoreLearning';

import './LessonQuiz.css';

export default function LessonQuiz() {
    const Params = useParams();
    const questionLessonId = Params?.lessonId;

    const questionQuery = new URLSearchParams({
        page: '1',
        pageSize: '1000',
        lessonId: questionLessonId,
        status: 1,
    });

    return (
        <div className='lesson-quiz-container'>
            <StarsBackground />
            <CoreLearning
                grid={2}
                questionQuery={questionQuery}
                disableAfterAnswer={true}
                endQuizButton={true}
            />
        </div>
    )
}