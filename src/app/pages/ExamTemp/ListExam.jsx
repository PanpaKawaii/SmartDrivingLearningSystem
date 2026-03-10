import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { exams, chapters } from '../../../mocks/DataSample.js';

import './ListExam.css';

export default function ListExam() {
    const [EXAMs, setEXAMs] = useState(exams || []);
    const [CHAPTERs, setCHAPTERs] = useState(chapters || []);


    const [totalQuestions, setTotalQuestions] = useState(0);

    const [selectedChapters, setSelectedChapters] = useState([
        { chapterId: '', percent: 0 },
    ]);

    // Các chapter đã được chọn (để disable trùng)
    const selectedChapterIds = useMemo(
        () => selectedChapters.map(c => c.chapterId).filter(Boolean),
        [selectedChapters]
    );

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

    const addChapterSelect = () => {
        setSelectedChapters([...selectedChapters, { chapterId: '', percent: 0 }]);
    };

    const removeChapterSelect = (index) => {
        setSelectedChapters(selectedChapters.filter((_, i) => i !== index));
    };

    const getQuestionCount = (percent) => {
        if (!totalQuestions || !percent) return 0;
        return Math.round((totalQuestions * percent) / 100);
    };

    const totalPercent = selectedChapters.reduce((sum, c) => sum + (c.percent || 0), 0);

    return (
        <div className='list-exam-container container'>
            {EXAMs.map((exam, index) => (
                <Link key={exam.id} to={`exam/${exam.id}`}>
                    <div className='exam'>
                        <div>{exam.title}</div>
                        <div>{exam.description}</div>
                        <div>{exam.duration}s</div>
                        <div>{exam.passScore}</div>
                        <div>{exam.isRandom ? 'Random' : ''}</div>
                    </div>
                </Link>
            ))}

            <div>
                <h2>Tạo bộ đề</h2>

                {/* Tổng số câu */}
                <div>
                    <label>Tổng số câu hỏi</label>
                    <input
                        type='number'
                        min={0}
                        value={totalQuestions}
                        onChange={(e) => setTotalQuestions(Number(e.target.value))}
                    />
                </div>

                <hr />

                {/* Chapter selects */}
                {selectedChapters.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <select
                            value={item.chapterId}
                            onChange={(e) => handleChapterChange(index, e.target.value)}
                        >
                            <option value=''>-- Chọn chapter --</option>
                            {CHAPTERs.map(ch => (
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

                        <input
                            type='number'
                            min={0}
                            max={100}
                            placeholder='%'
                            value={item.percent}
                            onChange={(e) => handlePercentChange(index, e.target.value)}
                        />

                        <span>
                            {getQuestionCount(item.percent)} câu
                        </span>

                        {selectedChapters.length > 1 && (
                            <button onClick={() => removeChapterSelect(index)}>✕</button>
                        )}
                    </div>
                ))}

                <button onClick={addChapterSelect}>+ Thêm chapter</button>

                <hr />

                {/* Tổng % */}
                <div>
                    <strong>Tổng %:</strong> {totalPercent}%
                    {totalPercent !== 100 && (
                        <span style={{ color: 'red', marginLeft: 8 }}>
                            (Nên = 100%)
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
