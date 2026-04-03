import '../InstructorPages.css';

export default function ReportProcessing() {
    return (
        <div className='ins-page'>
            <div className='ins-page-header'>
                <div><h1>Xử lý báo cáo</h1><p>Xem chi tiết và xử lý các báo cáo về câu hỏi lý thuyết.</p></div>
            </div>
            <div className='ins-empty-state'>
                <i className='fa-solid fa-clipboard-check'></i>
                <p>Tất cả báo cáo đã được xử lý. Không có báo cáo mới.</p>
            </div>
        </div>
    );
}
