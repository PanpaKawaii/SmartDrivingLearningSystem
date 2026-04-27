import { useEffect, useMemo, useState } from 'react';
import { fetchData, postData } from '../../../../../mocks/CallingAPI';
import CloudsBackground from '../../../../components/CloudsBackground/CloudsBackground';
import MovingLabelInput from '../../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../../components/StyleLabelSelect/StyleLabelSelect';
import TrafficLight from '../../../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext';

import './UserCreateExam.css';

export default function UserCreateExam() {
    const { user, refreshNewToken } = useAuth();

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalParalysis, setTotalParalysis] = useState(0);
    const [selectedLicenseId, setSelectedLicenseId] = useState('');
    const [selectedChapters, setSelectedChapters] = useState([
        { chapterId: '', percent: 0 },
    ]);
    const [randomExam, setRandomExam] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isExamSaved, setIsExamSaved] = useState(false);
    const [generateSuccess, setGenerateSuccess] = useState('');
    const [generateError, setGenerateError] = useState({ value: '', name: '' });

    const [title, setTitle] = useState('Đề thi lý thuyết');
    const [description, setDescription] = useState('Đề thi lý thuyết');
    const [duration, setDuration] = useState(1800);
    const [passScore, setPassScore] = useState(70);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const drivingLicenseQuery = new URLSearchParams({
                    status: 1,
                });
                const questionQuery = new URLSearchParams({
                    page: '1',
                    pageSize: '1000',
                    status: 1,
                });
                const tagQuery = new URLSearchParams({
                    status: 1,
                });
                const DrivingLicenseResponse = await fetchData(`DrivingLicenses/all?${drivingLicenseQuery.toString()}`, token);
                const QuestionResponse = await fetchData(`Questions?${questionQuery.toString()}`, token);
                const TagResponse = await fetchData(`Tags/all?${tagQuery.toString()}`, token);
                console.log('DrivingLicenseResponse', DrivingLicenseResponse);
                console.log('QuestionResponse', QuestionResponse);
                console.log('TagResponse', TagResponse);
                const QuestionItems = QuestionResponse?.items;

                const QuestionsAnswers = QuestionItems.map((q, i) => {
                    return {
                        ...q,
                        index: i + 1,
                        correctAnswer: q.answers?.filter(a => a.isCorrect)?.length,
                        tags: TagResponse.filter(t => q.questionTags?.some(qt => qt.tagId == t.id)),
                    };
                });
                console.log('QuestionsAnswers', QuestionsAnswers);

                const groupedChapters = Object.values(
                    QuestionsAnswers.reduce((acc, item) => {
                        const id = item?.questionLesson?.questionChapterId;
                        const dlId = item?.questionLesson?.questionChapter?.drivingLicenseId;
                        const name = item?.questionLesson?.questionChapter?.name;

                        if (!id) return acc;

                        (acc[id] ||= {
                            id: id,
                            drivingLicenseId: dlId,
                            name: name,
                            items: []
                        }).items.push(item);

                        return acc;
                    }, {})
                );
                console.log('groupedChapters', groupedChapters);

                const DrivingLicenses = DrivingLicenseResponse.map(dl => ({
                    ...dl,
                    chapters: groupedChapters.filter(gc => gc.drivingLicenseId == dl.id),
                }));
                console.log('DrivingLicenses', DrivingLicenses);

                setDRIVINGLICENSEs(DrivingLicenses);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    // Các chapter đã được chọn (để disable trùng)
    const selectedChapterIds = useMemo(
        () => selectedChapters.map(c => c.chapterId).filter(Boolean),
        [selectedChapters]
    );
    // console.log('selectedChapters', selectedChapters);
    const selectedLicense = DRIVINGLICENSEs.find(dl => dl.id == selectedLicenseId);
    // console.log('selectedLicense', selectedLicense);

    const handleChapterChange = (index, chapterId) => {
        const next = [...selectedChapters];
        next[index].chapterId = chapterId;
        setSelectedChapters(next);
    };

    const handlePercentChange = (index, percent) => {
        const next = [...selectedChapters];
        next[index].percent = Number(percent);
        setSelectedChapters(next);
    };

    const getQuestionCount = (percent) => {
        if (!totalQuestions || !percent) return 0;
        return Math.round((totalQuestions * percent) / 100);
    };

    const totalPercent = selectedChapters.reduce((sum, c) => sum + (c.percent || 0), 0);

    const handleSaveCustomizedExam = async () => {
        console.log('randomExam', randomExam);

        // const Validate = CheckValidation(Email, Name, Phone, Gender, Password, Confirm, Accept);
        // console.log('Validate: ', Validate);
        // if (Validate.value != 'OK') {
        //     console.log('Validation is false');
        //     setRegisterError(Validate);
        //     setRegisterSuccess('');
        //     return;
        // }

        const examQuestions = randomExam.map(re => {
            return {
                questionId: re.id,
            }
        });
        console.log('examQuestions:', examQuestions);

        const ExamData = {
            title: title,
            description: description,
            duration: duration,
            passScore: passScore,
            isRandom: true,
            examQuestions: examQuestions,
        };
        console.log('ExamData:', ExamData);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await postData('Exams', ExamData, token);
            console.log('result', result);
            // await sleep(2000);
            setIsExamSaved(true);
            setGenerateSuccess('success');
        } catch (error) {
            setGenerateSuccess('fail');
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const shuffleArray = (arr) => {
        const newArr = [...arr];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr || [];
    };

    const createRandomQuestionExam = () => {
        setIsExamSaved(false);
        setGenerateSuccess('');

        const counts = selectedChapters?.map(c => ({
            ...c,
            raw: (totalQuestions * c.percent) / 100,
            count: Math.floor((totalQuestions * c.percent) / 100)
        }));
        // console.log('counts.count', counts);

        let remaining = totalQuestions - counts.reduce((sum, c) => sum + c.count, 0);
        // console.log('remaining', remaining);

        counts.sort((a, b) => (a.count - a.raw) - (b.count - b.raw))?.filter(f => f.count != f.raw)?.forEach(c => {
            if (remaining > 0) {
                c.count += 1;
                remaining--;
            }
        });
        // console.log('counts.forEach', counts);

        const output = counts.flatMap(c => {
            const chapter = selectedLicense?.chapters?.find(r => r.id === c.chapterId);
            console.log('chapter', chapter);
            if (!chapter) return [];

            const shuffled = [...chapter.items].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, c.count);
        });
        // console.log('output', output);

        setRandomExam(shuffleArray(output));
    };

    console.log('randomExam', randomExam);

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='user-create-exam-container'>
            <div className='create-content'>
                <div className='input-select-wrapper'>
                    <div className='row-input-select'>
                        <div className='form-group'>
                            <MovingLabelInput
                                type={'text'}
                                value={title}
                                onValueChange={(propE) => setTitle(propE)}
                                label={'Tiêu đề'}
                                labelStyle={'left moving'}
                            />
                        </div>
                        <div className='form-group form-flex-2'>
                            <MovingLabelInput
                                type={'text'}
                                value={description}
                                onValueChange={(propE) => setDescription(propE)}
                                label={'Mô tả'}
                                labelStyle={'left moving'}
                            />
                        </div>
                    </div>
                    <div className='row-input-select'>
                        <div className='form-group'>
                            <MovingLabelInput
                                type={'text'}
                                value={totalQuestions ?? ''}
                                onValueChange={(propE) => setTotalQuestions(Number(propE) || 0)}
                                label={'Tổng số câu hỏi'}
                                labelStyle={'left moving'}
                            />
                        </div>
                        <div className='form-group'>
                            <MovingLabelInput
                                type={'text'}
                                value={passScore ?? ''}
                                onValueChange={(propE) => setPassScore(Number(propE) || 0)}
                                label={'Điều kiện đậu (%)'}
                                labelStyle={'left moving'}
                            />
                        </div>
                    </div>
                    <div className='row-input-select'>
                        <div className='form-group form-flex-2'>
                            <StyleLabelSelect
                                id={`select-license`}
                                list={DRIVINGLICENSEs}
                                value={selectedLicenseId}
                                onValueChange={(propE) => {
                                    setSelectedChapters([{ chapterId: '', percent: 0 }]);
                                    setSelectedLicenseId(propE);
                                }}
                                label={'Loại bằng'}
                                labelStyle={'left'}
                            />
                        </div>
                        <div className='form-group form-flex-2'>
                            <MovingLabelInput
                                type={'text'}
                                value={totalParalysis ?? ''}
                                onValueChange={(propE) => setTotalParalysis(Number(propE) || 0)}
                                label={'Tổng số câu liệt'}
                                labelStyle={'left moving'}
                            />
                        </div>
                        <div className='form-group form-flex-3'>
                            <MovingLabelInput
                                type={'text'}
                                value={duration ?? ''}
                                onValueChange={(propE) => setDuration(Number(propE) || 0)}
                                label={'Thời gian giới hạn (Giây)'}
                                labelStyle={'left moving'}
                            />
                        </div>
                    </div>
                </div>

                <div className='list-chapter'>
                    <h2>Chọn danh sách chương</h2>
                    {selectedChapters.map((item, index) => (
                        <div key={index} className='chapter-item'>
                            <div className='form-group'>
                                <select
                                    value={item.chapterId}
                                    onChange={(e) => handleChapterChange(index, e.target.value)}
                                >
                                    <option value=''>-- Chọn chương --</option>
                                    {DRIVINGLICENSEs.find(dl => dl.id == selectedLicenseId)?.chapters?.map(ch => (
                                        <option
                                            key={ch.id}
                                            value={ch.id}
                                            disabled={
                                                selectedChapterIds.includes(ch.id) &&
                                                ch.id !== item.chapterId
                                            }
                                        >
                                            {ch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group form-group-input'>
                                <input
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={item.percent}
                                    onChange={(e) => handlePercentChange(index, Math.max(0, Math.min(100, e.target.value)))}
                                />
                                <label>%</label>
                            </div>

                            {/* <span>
                                {getQuestionCount(item.percent)} câu
                            </span> */}

                            {selectedChapters.length > 1 && (
                                <button className='btn' onClick={() => setSelectedChapters(p => p.filter((_, i) => i !== index))}>
                                    <i className='fa-solid fa-xmark' />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button className='btn' onClick={() => setSelectedChapters(p => [...p, { chapterId: '', percent: 0 }])}>
                    Thêm chương
                </button>

                <div className={`total-percent ${totalPercent === 100 ? 'valid' : 'invalid'}`}>
                    Tổng: <span>{totalPercent}%</span>
                </div>

                {generateSuccess &&
                    <div className={`message ${generateSuccess == 'success' ? 'success-message' : 'fail-message'}`}>
                        {generateSuccess == 'success' ?
                            'Lưu đề thành công!'
                            :
                            'Lưu đề thất bại!'
                        }
                    </div>
                }

                <div className='btns'>
                    <button className='btn create-btn' onClick={createRandomQuestionExam} disabled={totalPercent !== 100 || selectedChapters?.some(sc => sc.chapterId == '')}>
                        <span>
                            {randomExam ?
                                'TẠO LẠI ĐỀ'
                                :
                                'BẮT ĐẦU TẠO ĐỀ'
                            }
                        </span>
                        <i className={`fa-solid fa-${randomExam ? 'arrow-rotate-left' : 'arrow-right'}`} />
                    </button>
                    {randomExam &&
                        <button className='btn submit-btn' onClick={handleSaveCustomizedExam} disabled={loading || isExamSaved}>
                            XÁC NHẬN LƯU ĐỀ THI
                        </button>
                    }
                </div>
            </div>

            {randomExam &&
                <>
                    <div className='line'></div>
                    <div className='result-content'>
                        <div className='result-heading'>
                            <button className='btn' onClick={() => setShowResult(p => !p)}>
                                {showResult ? 'Ẩn' : 'Xem'} kết quả ({randomExam.length} câu hỏi)
                            </button>
                            <button className='btn delete-btn'
                                onClick={() => {
                                    setShowResult(false);
                                    setRandomExam(null);
                                }}
                            >
                                Xóa kết quả
                            </button>
                        </div>
                        <div className={`list-question ${showResult ? '' : 'not-show'}`}>
                            {randomExam?.map((question, qIndex) => (
                                <div
                                    key={qIndex}
                                    className='question-item'
                                >
                                    <div className='title-heading'>
                                        <h3>Câu hỏi {qIndex + 1}</h3>
                                        <div className='chapter'>{question.questionLesson?.questionChapter?.name}</div>
                                        {/* ==FIX== */}
                                        {question?.tags?.length > 0 &&
                                            <div className='tags'>
                                                {question?.tags?.map((tag, index) => (
                                                    <div key={index} className='tag' style={{ backgroundColor: tag.colorCode || '#ccc' }}>{tag.name}</div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <p>{question.content}</p>
                                    <div className='list-answer'>
                                        {question.answers?.map((answer) => (
                                            <div
                                                key={answer.id}
                                                className={`answer-item ${answer.isCorrect ? 'correct-answer' : ''}`}
                                            >
                                                {answer.content}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
