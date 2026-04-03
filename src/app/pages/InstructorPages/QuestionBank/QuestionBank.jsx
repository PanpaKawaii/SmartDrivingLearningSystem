import { useState } from 'react';
import InstructorDataTable from '../../../components/InstructorComponent/InstructorDataTable';
import InstructorModal from '../../../components/InstructorComponent/InstructorModal';
import '../InstructorPages.css';

const mockQuestions = [
    { id: 1, content: 'Khi gặp biển báo cấm, người lái xe phải?', chapter: 'Luật giao thông', license: 'B2', difficulty: 'Dễ', status: 'active' },
    { id: 2, content: 'Xe ô tô được phép quay đầu ở đâu?', chapter: 'Luật giao thông', license: 'B2', difficulty: 'Trung bình', status: 'active' },
    { id: 3, content: 'Khoảng cách an toàn khi chạy 60km/h là?', chapter: 'Kỹ thuật lái xe', license: 'B1', difficulty: 'Khó', status: 'active' },
    { id: 4, content: 'Biển báo hình tròn viền đỏ có ý nghĩa gì?', chapter: 'Biển báo', license: 'A1', difficulty: 'Dễ', status: 'active' },
    { id: 5, content: 'Khi lái xe trong mưa, cần chú ý điều gì?', chapter: 'Kỹ thuật lái xe', license: 'B2', difficulty: 'Trung bình', status: 'active' },
    { id: 6, content: 'Tốc độ tối đa trong khu dân cư?', chapter: 'Luật giao thông', license: 'B2', difficulty: 'Dễ', status: 'active' },
    { id: 7, content: 'Đèn vàng nhấp nháy có ý nghĩa gì?', chapter: 'Biển báo', license: 'A2', difficulty: 'Trung bình', status: 'active' },
    { id: 8, content: 'Cách xử lý khi xe bị nổ lốp?', chapter: 'Kỹ thuật lái xe', license: 'B2', difficulty: 'Khó', status: 'active' },
];

const columns = [
    { key: 'id', label: 'STT', width: '60px' },
    { key: 'content', label: 'Nội dung câu hỏi' },
    { key: 'chapter', label: 'Chương' },
    { key: 'license', label: 'Hạng', width: '80px' },
    { key: 'difficulty', label: 'Độ khó', width: '100px', render: (val) => (
        <span className={`ins-status-chip ${val === 'Dễ' ? 'approved' : val === 'Trung bình' ? 'pending' : 'rejected'}`}>
            <span className='chip-dot'></span>{val}
        </span>
    )},
    { key: 'actions', label: 'Thao tác', width: '100px', render: (_, row) => (
        <div className='ins-action-cell'>
            <button className='ins-action-btn edit' title='Sửa'><i className='fa-solid fa-pen'></i></button>
            <button className='ins-action-btn delete' title='Xóa'><i className='fa-solid fa-trash'></i></button>
        </div>
    )},
];

export default function QuestionBank() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div>
                    <h1>Ngân hàng Câu hỏi</h1>
                    <p>Quản lý danh sách câu hỏi sát hạch lái xe các hạng.</p>
                </div>
            </div>

            <InstructorDataTable
                title={`Hiển thị ${mockQuestions.length} câu hỏi`}
                columns={columns}
                data={mockQuestions}
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
