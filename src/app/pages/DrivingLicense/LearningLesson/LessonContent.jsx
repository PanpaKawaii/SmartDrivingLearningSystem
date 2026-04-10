import { useState } from 'react';
import { postData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

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
            <h2>Lesson Content</h2>
            <p>HTML lesson content</p>
          </div>
        </div>
        {!isLocked && (
          <div className='completed'>
            <span>Completed</span>
          </div>
        )}
      </div>

      {lesson?.content ? (
        <>
          <div className='lesson-content-detail'>
            <h3>{lesson?.name || 'Lesson'}</h3>
            <div
              className='lesson-content-body'
              dangerouslySetInnerHTML={{ __html: lesson?.content }}
            />
          </div>

          {isLocked && (
            <div className='footer'>
              <button
                onClick={markLessonContentComplete}
                className='complete-button compact'
                disabled={loading}
              >
                <i className='fa-regular fa-check-circle' />
                <span>Mark Complete</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='empty'>
          <div className='empty-icon' />
          <p>No lesson content available</p>
        </div>
      )}
    </div>
  );
}