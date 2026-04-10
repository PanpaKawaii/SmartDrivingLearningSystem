import ExamSession from './ExamSession';

import './ExamDetail.css';
import { Link } from 'react-router-dom';

export default function ExamDetail() {
    return (
        <div className='exam-detail-container'>
            ExamDetail

            <Link to={`./taking-exam`}>
                <button className='btn'>GOOOOOOOO</button>
            </Link>

            <ExamSession />
        </div>
    )
}
