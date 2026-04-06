import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import InstructorModal from '../../../components/InstructorComponent/InstructorModal';
import { QUIZ_DATA } from '../../../../mocks/QUIZ_DATA.js';
import '../InstructorPages.css';

const questions = Object.values(QUIZ_DATA).map((q) => ({
    id: q.number,
    content: q.question,
    category: q.category,
    isDiemLiet: q.isDiemLiet,
    type: q.answers.length > 3 ? 'MULTI' : 'SINGLE',
    difficulty: q.number <= 200 ? 'Dễ' : q.number <= 400 ? 'Trung bình' : 'Khó',
}));


export default function QuestionBank() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const questions = Object.values(QUIZ_DATA).map((q) => ({
        id: q.number,
        content: q.question,
        category: q.category,
        isDiemLiet: q.isDiemLiet,
        type: q.answers.length > 3 ? 'MULTI' : 'SINGLE',
        difficulty: q.number <= 200 ? 'Dễ' : q.number <= 400 ? 'Trung bình' : 'Khó',
    }));

    const columns = [
        { key: 'id', label: 'STT', width: '60px' },
        { key: 'content', label: 'Nội dung câu hỏi' },
        { key: 'category', label: 'Chương', width: '140px' },
        { key: 'isDiemLiet', label: 'Điểm liệt', width: '90px', render: (val) => (
            <span className={`ins-status-chip ${val ? 'rejected' : 'approved'}`}>
                <span className='chip-dot'></span>{val ? 'Có' : 'Không'}
            </span>
        )},
        { key: 'type', label: 'Loại', width: '80px' },
        { key: 'difficulty', label: 'Độ khó', width: '100px', render: (val) => (
            <span className={`ins-status-chip ${val === 'Dễ' ? 'approved' : val === 'Trung bình' ? 'pending' : 'rejected'}`}>
                <span className='chip-dot'></span>{val}
            </span>
        )},
        { key: 'actions', label: 'Thao tác', width: '100px', render: (_, row) => (
            <div className='ins-action-cell'>
                <button
                    className='ins-action-btn view'
                    title='Xem chi tiết'
                    onClick={() => navigate(`/instructor/question-bank/${row.id}`)}
                >
                    <i className='fa-solid fa-eye'></i>
                </button>
                <button className='ins-action-btn edit' title='Sửa'>
                    <i className='fa-solid fa-pen'></i>
                </button>
                <button className='ins-action-btn delete' title='Xóa'>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </div>
        )},
    ];

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Ngân hàng Câu hỏi</h1>
                    <p>Quản lý danh sách câu hỏi sát hạch lái xe các hạng.</p>
                </div>
            </div>

            <InstructorDataTable
                title={`Hiển thị ${questions.length} câu hỏi (600 câu)`}
                columns={columns}
                data={questions}
                actions={
                    <>
                        <button className='ins-btn ins-btn-secondary' onClick={() => {}}>
                            <i className='fa-solid fa-file-import'></i> Nhập Excel
                        </button>
                        <button className='ins-btn ins-btn-primary' onClick={() => setShowModal(true)}>
                            <i className='fa-solid fa-plus'></i> Thêm câu hỏi
                        </button>
                    </>
                }
            />

            <InstructorModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title='Thêm câu hỏi mới'
                footer={
                    <>
                        <button className='ins-btn ins-btn-secondary' onClick={() => setShowModal(false)}>Hủy</button>
                        <button className='ins-btn ins-btn-primary'>Lưu câu hỏi</button>
                    </>
                }
            >
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Nội dung câu hỏi</label>
                    <textarea className='ins-form-textarea' placeholder='Nhập nội dung câu hỏi...'></textarea>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Chương</label>
                    <select className='ins-form-select'>
                        <option>Luật giao thông</option>
                        <option>Kỹ thuật lái xe</option>
                        <option>Biển báo</option>
                    </select>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Hạng bằng lái</label>
                    <select className='ins-form-select'>
                        <option>A1</option><option>A2</option><option>B1</option><option>B2</option>
                    </select>
                </div>
                <div className='ins-form-group'>
                    <label className='ins-form-label'>Độ khó</label>
                    <select className='ins-form-select'>
                        <option>Dễ</option><option>Trung bình</option><option>Khó</option>
                    </select>
                </div>
            </InstructorModal>
        </div>
    );
}
