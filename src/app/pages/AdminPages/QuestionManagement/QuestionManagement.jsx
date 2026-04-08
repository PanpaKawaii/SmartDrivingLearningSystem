import { useEffect, useState } from 'react';
import { fetchData, putData } from '../../../../mocks/CallingAPI';
import { questions, roles, users, questionCategories, questionChapters } from '../../../../mocks/DataSample';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Cube from '../../../components/Cube/Cube';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';
import EditQuestionModal from './EditQuestionModal';
import TrafficLight from '../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './QuestionManagement.css';

export default function QuestionManagement() {
    const { user } = useAuth();

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [QUESTIONCHAPTERs, setQUESTIONCHAPTERs] = useState([]);
    const [QUESTIONCATEGORIes, setQUESTIONCATEGORIes] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorFunction, setErrorFunction] = useState(null);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [popupProps, setPopupProps] = useState(null);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                // const UserResponse = await fetchData('users', token);
                // console.log('UserResponse', UserResponse);
                // const RoleResponse = await fetchData('roles', token);
                // console.log('RoleResponse', RoleResponse);

                // const QuestionResponse = await fetchData('Questions', token);
                // console.log('QuestionResponse', QuestionResponse);
                // const QuestionChapterResponse = await fetchData('QuestionChapters', token);
                // console.log('QuestionChapterResponse', QuestionChapterResponse);
                // const QuestionCategoryResponse = await fetchData('QuestionCategories', token);
                // console.log('QuestionCategoryResponse', QuestionCategoryResponse);

                const UserResponse = users;
                const RoleResponse = roles;

                const QuestionResponse = questions;
                const QuestionChapterResponse = questionChapters;
                const QuestionCategoryResponse = questionCategories;

                console.log('RoleResponse', RoleResponse);
                const Users = UserResponse.map(user => ({
                    ...user,
                    role: RoleResponse.find(r => r.id === user.roleId) || null
                }));
                console.log('Users', Users);
                const Questions = QuestionResponse.map(question => ({
                    ...question,
                    user: Users.find(u => u.id === question.userId) || null,
                    chapter: QuestionChapterResponse.find(c => c.id === question.questionChapterId) || null,
                    category: QuestionCategoryResponse.find(c => c.id === question.questionCategoryId) || null,
                }));
                console.log('Questions', Questions);

                setQUESTIONs(Questions);
                setQUESTIONCHAPTERs(QuestionChapterResponse);
                setQUESTIONCATEGORIes(QuestionCategoryResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const openEditModal = (data) => { setEditing(data); };
    const closeEditModal = () => { setEditing(null); };
    const openCreateModal = () => { setCreating(true); };
    const closeCreateModal = () => { setCreating(false); };

    const inactiveQuestion = async (question) => {
        const token = user?.token || '';
        const newQuestion = { ...question, status: question.status == 1 ? 0 : 1 };
        try {
            const QuestionResult = await putData(`questions/${newQuestion.id}`, newQuestion, token);
            console.log('QuestionResult', QuestionResult);
            setRefresh(p => p + 1);
        } catch (error) {
            setErrorFunction('Error');
        }
    };

    const [searchQuestion, setSearchQuestion] = useState('');
    const [select, setSelect] = useState('');
    const questionsFilter = QUESTIONs.filter((question) => {
        const questionContent = question.content?.toLowerCase();

        const questionType = question.type?.toLowerCase();
        const questionStatus = question.status;

        const matchSearch = !searchQuestion
            || questionContent?.includes(searchQuestion.toLowerCase())
        const matchSelect = !select || questionType?.includes(select.toLowerCase()) || questionStatus == select;

        return matchSearch && matchSelect;
    });
    console.log('questionsFilter', questionsFilter);
    const handleClear = () => {
        setSearchQuestion('');
        setSelect('');
    };

    if (loading) return <div className='admin-container'><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div className='admin-container'><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='admin-container'>
            <div className='inner-container management-container question-management-container'>

                <header className='main-header'>
                    <h1>Question Management</h1>
                    <button className='btn-primary' onClick={() => openCreateModal(true)}>
                        <i className='fa-solid fa-plus' />
                        Add more question
                    </button>
                </header>

                <form className='controls'>
                    <div className='count'>{questionsFilter?.length} results</div>
                    <div className='search-bar'>
                        <MovingLabelInput
                            type={'text'}
                            value={searchQuestion || ''}
                            onValueChange={(propE) => setSearchQuestion(propE)}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Content'}
                            labelStyle={'left moving'}
                        />
                    </div>
                    <div className='field'>
                        <StyleLabelSelect
                            id={`select`}
                            list={QUESTIONCHAPTERs}
                            value={select}
                            onValueChange={(propE) => {
                                setSelect(propE);
                            }}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Chapter'}
                            labelStyle={'left'}
                        />
                        <StyleLabelSelect
                            id={`select`}
                            list={QUESTIONCATEGORIes}
                            value={select}
                            onValueChange={(propE) => {
                                setSelect(propE);
                            }}
                            extraClassName={''}
                            extraStyle={{}}
                            label={'Category'}
                            labelStyle={'left'}
                        />
                    </div>
                    <button type='button' className='btn-secondary' onClick={handleClear}>
                        CLEAR
                    </button>
                    <button type='button' className='btn-secondary' onClick={() => setRefresh(p => p + 1)}>
                        Refresh
                    </button>
                </form>

                <section className='admin-table-container'>
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>QUESTION</th>
                                <th>IMAGE</th>
                                <th>CHAPTER</th>
                                <th>CATEGORY</th>
                                <th>DIFFICULTY</th>
                                <th>TYPE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionsFilter?.map((question, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><div>{question.content}</div></td>
                                    <td>
                                        {question.image ? <img src={question.image} alt={question.content} style={{ width: 100, height: 100, objectFit: 'cover' }} /> : <div style={{ width: 100, height: 100, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>}
                                    </td>
                                    <td><span>{question.chapter?.name}</span></td>
                                    <td><span>{question.category?.name}</span></td>
                                    <td><span>{question.difficultyLevel?.name}</span></td>
                                    <td><span>{question.type}</span></td>
                                    <td>
                                        <div className='action-buttons'>
                                            <button onClick={() => openEditModal(question)}>
                                                <span>Modify</span>
                                                <i className='fa-solid fa-pencil' />
                                            </button>
                                            <button className={`btn-active ${question.status == 0 && 'abb'}`} onClick={() => setPopupProps(question)} disabled={question.status == 1}>
                                                <span>Active</span>
                                                <i className='fa-solid fa-unlock' />
                                            </button>
                                            <button className={`btn-inactive ${question.status == 1 && 'abb'}`} onClick={() => setPopupProps(question)} disabled={question.status == 0}>
                                                <span>Inactive</span>
                                                <i className='fa-solid fa-lock' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {editing && (
                    <EditQuestionModal
                        questionprop={editing}
                        onClose={closeEditModal}
                        setRefresh={setRefresh}
                        action={'edit'}
                        additionalData={{ questionChapters: QUESTIONCHAPTERs, questionCategories: QUESTIONCATEGORIes }}
                    />
                )}

                {creating && (
                    <EditQuestionModal
                        questionprop={{
                            userId: user?.id,
                            questionChapterId: '',
                            questionCategoryId: '',
                            content: '',
                            image: '',
                            explanation: '',
                            type: 'single',
                        }}
                        onClose={closeCreateModal}
                        setRefresh={setRefresh}
                        action={'create'}
                        additionalData={{ questionChapters: QUESTIONCHAPTERs, questionCategories: QUESTIONCATEGORIes }}
                    />
                )}

                {popupProps && (
                    <ConfirmDialog
                        title={'CONFIRMATION'}
                        message={`Are you sure you want to ${popupProps.status == 1 ? 'inactive' : 'active'} this question?`}
                        confirm={popupProps.status == 1 ? 'INACTIVE' : 'ACTIVE'}
                        cancel={'CANCEL'}
                        color={popupProps.status == 1 ? '#ff4d4f80' : '#52c41a80'}
                        onConfirm={() => { inactiveQuestion(popupProps), setPopupProps(null) }}
                        onCancel={() => setPopupProps(null)}
                    />
                )}

                {errorFunction && (
                    <ConfirmDialog
                        title={'ERROR'}
                        message={`An error has occurred!`}
                        confirm={'OKAY'}
                        cancel={''}
                        color={'#ff4d4f80'}
                        onConfirm={() => setErrorFunction(null)}
                        onCancel={() => setErrorFunction(null)}
                    />
                )}
            </div>
        </div>
    )
}
