import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';
import ExamSession from './ExamSession';

import './ExamDetail.css';

export default function ExamDetail() {
    const { user, refreshNewToken } = useAuth();

    const Params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const examId = Params?.examId;
    console.log('examId', examId);
    const locationStateType = location.state;
    console.log('locationStateType', locationStateType);

    const [examType, setExamType] = useState(locationStateType || '');

    return (
        <div className='exam-detail-container'>
            ExamDetail

            <Link to={examType == 'exam' ? `./taking-exam` : (examType == 'situation' ? `./taking-situation-exam` : './')}>
                <button className='btn'>GOOOOOOOO</button>
            </Link>

            <ExamSession />
        </div>
    )
}
