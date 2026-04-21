import { useState } from 'react';
import { postData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import './LessonContent.css';

export default function LessonContent({
  lesson = {},
  progress = null,
  questionLessonId = '',
  setRefreshParent = () => { },
}) {
  const { user, refreshNewToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const maxScore = progress?.[0]?.score;
  const isLocked = progress?.length == 0;
  const isPassed = maxScore >= 50;

  const markLessonContentComplete = async () => {
    const LessonProgressData = {
      questionLessonId: questionLessonId,
      score: 0,
    };
    console.log('LessonProgressData:', LessonProgressData);

    setLoading(true);
    const token = user?.token || '';
    try {
      const result = await postData('LessonProgresses', LessonProgressData, token);
      console.log('result', result);

      setRefreshParent(p => p + 1);
    } catch (error) {
      console.error('Error', error);
      setError(error);
      if (error.status == 401) refreshNewToken(user);
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className='lesson-content-viewer'>
      <div className='header'>
        <div className='title'>
          <div className='icon-box'>
            <i className='fa-solid fa-book-open' />
          </div>
          <div>
            <h2>Nội dung bài học</h2>
            <p>Nội dung lý thuyết</p>
          </div>
        </div>
        {!isLocked && (
          <div className='completed'>
            <span>Đã hoàn thành</span>
          </div>
        )}
      </div>

      {lesson?.content ? (
        <>
          <div className='lesson-content-detail'>
            <h3>{lesson?.name || 'Lesson'}</h3>
            <div className='lesson-content-body'>
              {parse(DOMPurify.sanitize(lesson?.content || ''))}
            </div>
          </div>

          {isLocked && (
            <div className='footer'>
              <button
                onClick={markLessonContentComplete}
                className='complete-button compact'
                disabled={ !user || loading}
              >
                <i className='fa-regular fa-check-circle' />
                <span>Đánh dấu đã học</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='empty'>
          <div className='empty-icon' />
          <p>Không có nội dung bài học nào.</p>
        </div>
      )}
    </div>
  );
}