import { useState } from 'react';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import '../EditModal.css';

export default function EditQuestionModal({ questionprop, onClose, setRefresh, action, additionalData }) {
    const { user } = useAuth();

    const [question, setQuestion] = useState(questionprop);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);

    const Update = async (question) => {
        const token = user?.token || '';
        const newQuestion = { id: question.id, point: Number(question.point) || 0, type: question.type };
        try {
            const QuestionResult = await putData(`questions/${newQuestion.id}`, newQuestion, token);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            setError('Error');
        } finally {
            setLoading(false);
        }
    };

    const Upload = async (question) => {
        const token = user?.token || '';
        const newQuestion = { point: Number(question.point) || 0, type: question.type };
        try {
            const QuestionResult = await postData('questions', newQuestion, token);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            setError('Error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (action == 'edit') Update(question);
        else if (action == 'create') Upload(question);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <button className='btn close-btn' onClick={() => onClose()}><i className='fa-solid fa-xmark'></i></button>
                <form onSubmit={handleSubmit}>
                    <div className='edit-title'>Edit Question</div>
                    <div className='image-container'>
                        {question.image ? <img src={question.image} alt={question.content} style={{ width: 100, height: 100, objectFit: 'cover' }} /> : <div style={{ width: 100, height: 100, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>}
                    </div>
                    <div className='input-group'>
                        <input name='image' placeholder=' ' value={question.image} onChange={handleChange} required />
                        <label htmlFor='image'>Image URL</label>
                    </div>
                    {question.id &&
                        <div className='input-group'>
                            <input name='id' placeholder=' ' value={question.id} disabled />
                            <label htmlFor='id' className='disable'>ID</label>
                        </div>
                    }
                    <div className='flex'>
                        <div className='input-group flex-1'>
                            <select id='formChapter' name='questionChapterId' value={question.questionChapterId || 'Low'} onChange={handleChange}>
                                {additionalData?.questionChapters?.map((chapter, index) => (
                                    <option key={index} value={chapter.id}>{chapter.name}</option>
                                ))}
                            </select>
                            <label htmlFor='questionChapterId'>Chapter</label>
                        </div>
                        <div className='input-group flex-1'>
                            <select id='formCategory' name='questionCategoryId' value={question.questionCategoryId || ''} onChange={handleChange}>
                                {additionalData?.questionCategories?.map((chapter, index) => (
                                    <option key={index} value={chapter.id}>{chapter.name}</option>
                                ))}
                            </select>
                            <label htmlFor='questionCategoryId'>Category</label>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='input-group flex-1'>
                            <select id='formType' name='type' value={question.type || 'single'} onChange={handleChange}>
                                <option value={'single'}>Single</option>
                                <option value={'multiple'}>Multiple</option>
                            </select>
                            <label htmlFor='type'>Type</label>
                        </div>
                    </div>
                    <div className='input-group flex-1'>
                        <textarea
                            name='content'
                            placeholder=' '
                            value={question.content || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor='content'>Content</label>
                    </div>
                    <div className='input-group flex-1'>
                        <textarea
                            name='explanation'
                            placeholder=' '
                            value={question.explanation || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor='explanation'>Explanation</label>
                    </div>
                    <div className='btn-box'>
                        <button type='submit' className='btn btn-save' disabled={loading}>SAVE</button>
                        <button type='button' className='btn' onClick={() => onClose()}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
