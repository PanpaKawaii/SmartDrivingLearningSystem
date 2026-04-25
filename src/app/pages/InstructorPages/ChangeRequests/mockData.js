// src/app/pages/InstructorPages/ChangeRequests/mockData.js

// Thêm chữ export ở đây
export const MOCK_REPORTS = [
    {
        id: '1',
        title: 'Sai chính tả câu hỏi số 5',
        content: 'Câu hỏi về biển báo cấm có từ viết sai ở đáp án B.',
        createAt: '2023-10-25T08:30:00',
        status: -1,
        user: { name: 'Nguyễn Văn A' },
        reportCategory: { name: 'Yêu cầu' },
        questionId: 'q-001',
    },
    {
        id: '2',
        title: 'Video tình huống bị giật',
        content: 'Tình huống số 12 bị đứng hình ở giây thứ 5.',
        createAt: '2023-10-26T14:15:00',
        status: 1,
        user: { name: 'Trần Thị B' },
        reportCategory: { name: 'Yêu cầu' },
        simulationId: 's-012',
        resolves: [{ title: 'Đã cập nhật', content: 'Chúng tôi đã thay video mới.' }]
    },
    {
        id: '3',
        title: 'Cập nhật luật GTDB 2024',
        content: 'Nội dung bài viết này cần cập nhật theo thông tư mới.',
        createAt: '2023-10-27T09:00:00',
        status: -1,
        user: { name: 'Lê Văn C' },
        reportCategory: { name: 'Yêu cầu' },
        forumPostId: 'p-99',
    },
];