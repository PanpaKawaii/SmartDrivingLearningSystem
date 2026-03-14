export const exams = [
    { id: 1, userId: null, title: 'Bộ đề chương I', description: 'Bộ đề tổng hợp các câu hỏi của chương I', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 2, userId: null, title: 'Bộ đề chương II', description: 'Bộ đề tổng hợp các câu hỏi của chương II', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 3, userId: null, title: 'Bộ đề chương III', description: 'Bộ đề tổng hợp các câu hỏi của chương III', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 4, userId: null, title: 'Bộ đề chương IV', description: 'Bộ đề tổng hợp các câu hỏi của chương IV', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 5, userId: null, title: 'Bộ đề chương V', description: 'Bộ đề tổng hợp các câu hỏi của chương V', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 6, userId: null, title: 'Bộ đề chương VI', description: 'Bộ đề tổng hợp các câu hỏi của chương VI', duration: 1800, passScore: 27, isRandom: 0, status: 1 },
    { id: 7, userId: 1, title: 'Bộ đề của Triều', description: 'Bộ đề tổng hợp random', duration: 1800, passScore: 27, isRandom: 1, status: 1 },
    { id: 8, userId: 1, title: 'Bộ đề thứ 2 của Triều', description: 'Bộ đề tổng hợp random', duration: 1800, passScore: 27, isRandom: 1, status: 1 },
];

export const chapters = [
    { id: 'c1', name: 'Chapter 1' },
    { id: 'c2', name: 'Chapter 2' },
    { id: 'c3', name: 'Chapter 3' },
    { id: 'c4', name: 'Chapter 4' },
];

export const questions = [
    { id: 1, content: 'Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 2, content: 'Khi đèn giao thông màu vàng, bạn phải làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 3, content: 'Tốc độ tối đa trong khu dân cư là bao nhiêu?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 4, content: 'Người điều khiển xe phải mang theo giấy tờ gì?', type: 'single', questionLessonId: 2, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 5, content: 'Biển báo hình tam giác có ý nghĩa gì?', type: 'single', questionLessonId: 2, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },

    { id: 6, content: 'Khi gặp người đi bộ qua đường, bạn cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 7, content: 'Khoảng cách an toàn khi chạy xe là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 8, content: 'Đèn đỏ được phép rẽ phải khi nào?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 9, content: 'Biển báo nền xanh là loại biển gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 10, content: 'Khi trời mưa, bạn nên làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },

    { id: 11, content: 'Tác dụng của dây an toàn là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 12, content: 'Khi xe phía trước phanh gấp, bạn nên làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 13, content: 'Biển cấm vượt có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 14, content: 'Khi vào vòng xuyến, bạn phải nhường đường cho ai?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 15, content: 'Nồng độ cồn cho phép khi lái xe là bao nhiêu?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },

    { id: 16, content: 'Biển báo chữ P có nghĩa là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 17, content: 'Khi xe gặp sự cố giữa đường, cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 18, content: 'Khi đi ban đêm, cần bật đèn gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 19, content: 'Đường một chiều là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 20, content: 'Biển báo nền vàng thường dùng trong trường hợp nào?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },

    { id: 21, content: 'Khi gặp xe ưu tiên, bạn cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 22, content: 'Vạch kẻ đường màu vàng có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 23, content: 'Khi quay đầu xe, cần chú ý điều gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 24, content: 'Biển STOP có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },
    { id: 25, content: 'Khi điều khiển xe máy, có bắt buộc đội mũ bảo hiểm không?', type: 'single', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 1, status: 1 },

    { id: 26, content: 'Khi gặp tai nạn giao thông, bạn nên làm gì?', type: 'multiple', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 2, status: 1 },
    { id: 27, content: 'Biển báo hình chữ nhật thường dùng để làm gì?', type: 'multiple', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 2, status: 1 },
    { id: 28, content: 'Khi lái xe đường dài, cần chú ý điều gì?', type: 'multiple', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 2, status: 1 },
    { id: 29, content: 'Đèn chiếu xa dùng khi nào?', type: 'multiple', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 2, status: 1 },
    { id: 30, content: 'Người lái xe phải tuân thủ điều gì quan trọng nhất?', type: 'multiple', questionLessonId: 1, questionCategoryId: 1, questionDifficultyLevelId: 1, correctAnswer: 3, status: 1 }
];

export const answers = [
    // Question 1 (4 answers)
    { id: 1, questionId: 1, content: 'Biển cấm! Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì?', isCorrect: true, status: 1 },
    { id: 2, questionId: 1, content: 'Biển chỉ dẫn', isCorrect: false, status: 1 },
    { id: 3, questionId: 1, content: 'Biển nguy hiểm', isCorrect: false, status: 1 },
    { id: 4, questionId: 1, content: 'Biển hiệu lệnh', isCorrect: false, status: 1 },

    // Question 2 (3 answers)
    { id: 5, questionId: 2, content: 'Chuẩn bị dừng lại', isCorrect: true, status: 1 },
    { id: 6, questionId: 2, content: 'Tăng tốc đi nhanh', isCorrect: false, status: 1 },
    { id: 7, questionId: 2, content: 'Bỏ qua đèn', isCorrect: false, status: 1 },

    // Question 3 (4 answers)
    { id: 8, questionId: 3, content: '50 km/h', isCorrect: true, status: 1 },
    { id: 9, questionId: 3, content: '80 km/h', isCorrect: false, status: 1 },
    { id: 10, questionId: 3, content: '100 km/h', isCorrect: false, status: 1 },
    { id: 11, questionId: 3, content: 'Không giới hạn', isCorrect: false, status: 1 },

    // Question 4 (3 answers)
    { id: 12, questionId: 4, content: 'Giấy phép lái xe', isCorrect: true, status: 1 },
    { id: 13, questionId: 4, content: 'CMND/CCCD', isCorrect: false, status: 1 },
    { id: 14, questionId: 4, content: 'Hộ chiếu', isCorrect: false, status: 1 },

    // Question 5 (3 answers)
    { id: 15, questionId: 5, content: 'Biển cảnh báo nguy hiểm', isCorrect: true, status: 1 },
    { id: 16, questionId: 5, content: 'Biển cấm', isCorrect: false, status: 1 },
    { id: 17, questionId: 5, content: 'Biển chỉ dẫn', isCorrect: false, status: 1 },

    // Question 6 (3 answers)
    { id: 18, questionId: 6, content: 'Nhường đường', isCorrect: true, status: 1 },
    { id: 19, questionId: 6, content: 'Bấm còi liên tục', isCorrect: false, status: 1 },
    { id: 20, questionId: 6, content: 'Tăng tốc vượt qua', isCorrect: false, status: 1 },

    // Question 7 (4 answers)
    { id: 21, questionId: 7, content: 'Giữ khoảng cách đủ để phanh kịp', isCorrect: true, status: 1 },
    { id: 22, questionId: 7, content: 'Chạy sát xe trước', isCorrect: false, status: 1 },
    { id: 23, questionId: 7, content: 'Không cần quan tâm', isCorrect: false, status: 1 },
    { id: 24, questionId: 7, content: 'Chỉ áp dụng ban đêm', isCorrect: false, status: 1 },

    // Question 8 (3 answers)
    { id: 25, questionId: 8, content: 'Có biển cho phép rẽ phải', isCorrect: true, status: 1 },
    { id: 26, questionId: 8, content: 'Luôn luôn được rẽ', isCorrect: false, status: 1 },
    { id: 27, questionId: 8, content: 'Không bao giờ được rẽ', isCorrect: false, status: 1 },

    // Question 9 (3 answers)
    { id: 28, questionId: 9, content: 'Biển chỉ dẫn', isCorrect: true, status: 1 },
    { id: 29, questionId: 9, content: 'Biển cấm', isCorrect: false, status: 1 },
    { id: 30, questionId: 9, content: 'Biển nguy hiểm', isCorrect: false, status: 1 },

    // Question 10 (3 answers)
    { id: 31, questionId: 10, content: 'Giảm tốc độ', isCorrect: true, status: 1 },
    { id: 32, questionId: 10, content: 'Chạy nhanh hơn', isCorrect: false, status: 1 },
    { id: 33, questionId: 10, content: 'Tắt đèn xe', isCorrect: false, status: 1 },

    // Question 11 (3 answers)
    { id: 34, questionId: 11, content: 'Giảm chấn thương khi tai nạn', isCorrect: true, status: 1 },
    { id: 35, questionId: 11, content: 'Trang trí xe', isCorrect: false, status: 1 },
    { id: 36, questionId: 11, content: 'Không có tác dụng', isCorrect: false, status: 1 },

    // Question 12 (3 answers)
    { id: 37, questionId: 12, content: 'Phanh từ từ và giữ khoảng cách', isCorrect: true, status: 1 },
    { id: 38, questionId: 12, content: 'Bấm còi', isCorrect: false, status: 1 },
    { id: 39, questionId: 12, content: 'Vượt lên', isCorrect: false, status: 1 },

    // Question 13 (3 answers)
    { id: 40, questionId: 13, content: 'Không được vượt xe khác', isCorrect: true, status: 1 },
    { id: 41, questionId: 13, content: 'Được vượt tự do', isCorrect: false, status: 1 },
    { id: 42, questionId: 13, content: 'Chỉ vượt ban đêm', isCorrect: false, status: 1 },

    // Question 14 (3 answers)
    { id: 43, questionId: 14, content: 'Xe bên trong vòng xuyến', isCorrect: true, status: 1 },
    { id: 44, questionId: 14, content: 'Xe bên phải', isCorrect: false, status: 1 },
    { id: 45, questionId: 14, content: 'Xe lớn hơn', isCorrect: false, status: 1 },

    // Question 15 (3 answers)
    { id: 46, questionId: 15, content: '0%', isCorrect: true, status: 1 },
    { id: 47, questionId: 15, content: '0.5%', isCorrect: false, status: 1 },
    { id: 48, questionId: 15, content: '1%', isCorrect: false, status: 1 },

    // Question 16 (3 answers)
    { id: 49, questionId: 16, content: 'Nơi đỗ xe', isCorrect: true, status: 1 },
    { id: 50, questionId: 16, content: 'Cấm đỗ xe', isCorrect: false, status: 1 },
    { id: 51, questionId: 16, content: 'Trạm xăng', isCorrect: false, status: 1 },

    // Question 17 (3 answers)
    { id: 52, questionId: 17, content: 'Bật đèn cảnh báo và đặt biển báo', isCorrect: true, status: 1 },
    { id: 53, questionId: 17, content: 'Bỏ xe đi', isCorrect: false, status: 1 },
    { id: 54, questionId: 17, content: 'Đứng giữa đường', isCorrect: false, status: 1 },

    // Question 18 (3 answers)
    { id: 55, questionId: 18, content: 'Đèn chiếu gần', isCorrect: true, status: 1 },
    { id: 56, questionId: 18, content: 'Không cần đèn', isCorrect: false, status: 1 },
    { id: 57, questionId: 18, content: 'Đèn xi nhan', isCorrect: false, status: 1 },

    // Question 19 (3 answers)
    { id: 58, questionId: 19, content: 'Chỉ được đi theo một hướng', isCorrect: true, status: 1 },
    { id: 59, questionId: 19, content: 'Đi hai chiều', isCorrect: false, status: 1 },
    { id: 60, questionId: 19, content: 'Chỉ dành cho người đi bộ', isCorrect: false, status: 1 },

    // Question 20 (3 answers)
    { id: 61, questionId: 20, content: 'Biển tạm thời / công trình', isCorrect: true, status: 1 },
    { id: 62, questionId: 20, content: 'Biển cấm', isCorrect: false, status: 1 },
    { id: 63, questionId: 20, content: 'Biển hiệu lệnh', isCorrect: false, status: 1 },

    // Question 21 (3 answers)
    { id: 64, questionId: 21, content: 'Nhường đường và giảm tốc', isCorrect: true, status: 1 },
    { id: 65, questionId: 21, content: 'Đi nhanh hơn', isCorrect: false, status: 1 },
    { id: 66, questionId: 21, content: 'Bấm còi liên tục', isCorrect: false, status: 1 },

    // Question 22 (3 answers)
    { id: 67, questionId: 22, content: 'Phân chia làn đường', isCorrect: true, status: 1 },
    { id: 68, questionId: 22, content: 'Trang trí đường', isCorrect: false, status: 1 },
    { id: 69, questionId: 22, content: 'Không có ý nghĩa', isCorrect: false, status: 1 },

    // Question 23 (3 answers)
    { id: 70, questionId: 23, content: 'Quan sát và bật xi nhan', isCorrect: true, status: 1 },
    { id: 71, questionId: 23, content: 'Quay đầu đột ngột', isCorrect: false, status: 1 },
    { id: 72, questionId: 23, content: 'Không cần quan sát', isCorrect: false, status: 1 },

    // Question 24 (3 answers)
    { id: 73, questionId: 24, content: 'Dừng hẳn xe', isCorrect: true, status: 1 },
    { id: 74, questionId: 24, content: 'Chạy chậm lại', isCorrect: false, status: 1 },
    { id: 75, questionId: 24, content: 'Bấm còi', isCorrect: false, status: 1 },

    // Question 25 (3 answers)
    { id: 76, questionId: 25, content: 'Bắt buộc', isCorrect: true, status: 1 },
    { id: 77, questionId: 25, content: 'Không cần', isCorrect: false, status: 1 },
    { id: 78, questionId: 25, content: 'Chỉ đi xa mới cần', isCorrect: false, status: 1 },

    // Question 26 (3 answers)
    { id: 79, questionId: 26, content: 'Gọi cấp cứu và báo công an', isCorrect: true, status: 1 },
    { id: 80, questionId: 26, content: 'Gọi cấp cứu và báo công an', isCorrect: true, status: 1 },
    { id: 81, questionId: 26, content: 'Bỏ đi', isCorrect: false, status: 1 },
    // { id: 81, questionId: 26, content: 'Tự ý giải quyết', isCorrect: false, status: 1 },

    // Question 27 (3 answers)
    { id: 82, questionId: 27, content: 'Chỉ dẫn thông tin', isCorrect: true, status: 1 },
    { id: 83, questionId: 27, content: 'Chỉ dẫn thông tin', isCorrect: true, status: 1 },
    { id: 84, questionId: 27, content: 'Cấm đường', isCorrect: false, status: 1 },
    // { id: 84, questionId: 27, content: 'Nguy hiểm', isCorrect: false, status: 1 },

    // Question 28 (3 answers)
    { id: 85, questionId: 28, content: 'Nghỉ ngơi hợp lý', isCorrect: true, status: 1 },
    { id: 86, questionId: 28, content: 'Nghỉ ngơi hợp lý', isCorrect: true, status: 1 },
    { id: 87, questionId: 28, content: 'Lái liên tục', isCorrect: false, status: 1 },
    // { id: 87, questionId: 28, content: 'Không cần nghỉ', isCorrect: false, status: 1 },

    // Question 29 (3 answers)
    { id: 88, questionId: 29, content: 'Đường vắng, không có xe đối diện', isCorrect: true, status: 1 },
    { id: 89, questionId: 29, content: 'Đường vắng, không có xe đối diện', isCorrect: true, status: 1 },
    { id: 90, questionId: 29, content: 'Trong thành phố đông xe', isCorrect: false, status: 1 },
    // { id: 90, questionId: 29, content: 'Khi dừng xe', isCorrect: false, status: 1 },

    // Question 30 (3 answers)
    { id: 91, questionId: 30, content: 'Luật giao thông', isCorrect: true, status: 1 },
    { id: 92, questionId: 30, content: 'Luật giao thông', isCorrect: true, status: 1 },
    { id: 93, questionId: 30, content: 'Luật giao thông', isCorrect: true, status: 1 },
    { id: 94, questionId: 30, content: 'Theo cảm tính', isCorrect: false, status: 1 },
    // { id: 95, questionId: 30, content: 'Theo người khác', isCorrect: false, status: 1 },
    // { id: 96, questionId: 30, content: 'Theo bà hàng xóm', isCorrect: false, status: 1 },
];

export const comments = [
    { id: 1, userId: 1, questionId: 1, content: 'I talk about the question', answer: null, commentDate: '11-06-2025', status: 1 },
    { id: 2, userId: 1, questionId: 1, content: 'I answer 1', answer: 1, commentDate: '11-06-2025', status: 1 },
    { id: 3, userId: 1, questionId: 1, content: 'I answer 1', answer: 1, commentDate: '11-06-2025', status: 1 },
    { id: 4, userId: 1, questionId: 1, content: 'I answer 2', answer: 2, commentDate: '11-06-2025', status: 1 },
    { id: 5, userId: 1, questionId: 1, content: 'I answer 2', answer: 2, commentDate: '11-06-2025', status: 1 },
    { id: 6, userId: 1, questionId: 1, content: 'I answer 5', answer: 5, commentDate: '11-06-2025', status: 1 },
    { id: 7, userId: 1, questionId: 1, content: 'I answer 2', answer: 2, commentDate: '11-06-2025', status: 1 },
    { id: 8, userId: 1, questionId: 1, content: 'I answer 3', answer: 3, commentDate: '11-06-2025', status: 1 },
    { id: 9, userId: 1, questionId: 1, content: 'I answer 3', answer: 3, commentDate: '11-06-2025', status: 1 },
    { id: 10, userId: 1, questionId: 1, content: 'I answer 9', answer: 9, commentDate: '11-06-2025', status: 1 },
    { id: 11, userId: 1, questionId: 1, content: 'I talk about the question too', answer: null, commentDate: '11-06-2025', status: 1 },
    { id: 12, userId: 1, questionId: 1, content: 'I answer 11', answer: 11, commentDate: '11-06-2025', status: 1 },
    { id: 13, userId: 1, questionId: 1, content: 'I answer 9', answer: 9, commentDate: '11-06-2025', status: 1 },
    { id: 14, userId: 1, questionId: 1, content: 'I answer 13', answer: 13, commentDate: '11-06-2025', status: 1 },
    { id: 15, userId: 1, questionId: 1, content: 'I answer 9', answer: 9, commentDate: '11-06-2025', status: 1 },
    { id: 16, userId: 1, questionId: 1, content: 'I answer 10', answer: 10, commentDate: '11-06-2025', status: 1 },
    { id: 17, userId: 1, questionId: 1, content: 'I answer 13', answer: 13, commentDate: '11-06-2025', status: 1 },
    { id: 18, userId: 1, questionId: 1, content: 'I answer 14', answer: 14, commentDate: '11-06-2025', status: 1 },
    { id: 19, userId: 1, questionId: 1, content: 'I answer 18', answer: 18, commentDate: '11-06-2025', status: 1 },
    { id: 20, userId: 1, questionId: 1, content: 'I answer 18 too', answer: 18, commentDate: '11-06-2025', status: 1 },
];

export const roles = [
    { id: 1, name: 'Admin', description: 'Manage system and users', status: 1 },
    { id: 2, name: 'Instructor', description: 'Manage questions bank, simulations, exams, forum, ...', status: 1 },
    { id: 3, name: 'Student', description: 'Student of the system', status: 1 },
];

export const permissions = [
    { id: 1, name: 'CREATE QUESTION', description: 'Create questions', status: 1 },
    { id: 2, name: 'REVIEW QUESTION', description: 'Review questions', status: 1 },
    { id: 3, name: 'UPDATE QUESTION', description: 'Update questions', status: 1 },
    { id: 4, name: 'DELETE QUESTION', description: 'Delete questions', status: 1 },
    { id: 5, name: 'CREATE SIMULATION', description: 'Create simulations', status: 1 },
    { id: 6, name: 'REVIEW SIMULATION', description: 'Review simulations', status: 1 },
    { id: 7, name: 'UPDATE SIMULATION', description: 'Update simulations', status: 1 },
    { id: 8, name: 'DELETE SIMULATION', description: 'Delete simulations', status: 1 },
    { id: 9, name: 'MANAGE USER', description: 'Manage users', status: 1 },
];

export const rolePermissions = [
    { id: 1, roleId: 1, permissionId: 2, status: 1 },
    { id: 2, roleId: 1, permissionId: 6, status: 1 },
    { id: 3, roleId: 1, permissionId: 7, status: 1 },
    { id: 4, roleId: 1, permissionId: 9, status: 1 },

    { id: 5, roleId: 2, permissionId: 1, status: 1 },
    { id: 6, roleId: 2, permissionId: 2, status: 1 },
    { id: 7, roleId: 2, permissionId: 3, status: 1 },
    { id: 8, roleId: 2, permissionId: 4, status: 1 },
    { id: 9, roleId: 2, permissionId: 5, status: 1 },
    { id: 10, roleId: 2, permissionId: 6, status: 1 },
    { id: 11, roleId: 2, permissionId: 7, status: 1 },
    { id: 12, roleId: 2, permissionId: 8, status: 1 },

    { id: 13, roleId: 3, permissionId: 2, status: 1 },
    { id: 14, roleId: 3, permissionId: 6, status: 1 },
];

export const users = [
    { id: 1, roleId: 1, name: 'Duong', email: 'duong@example.com', type: 'Vip', status: 1 },
    { id: 2, roleId: 2, name: 'Trieu', email: 'trieu@example.com', type: 'Regular', status: 1 },
    { id: 3, roleId: 3, name: 'Sang', email: 'sang@example.com', type: 'Regular', status: 0 },
    { id: 4, roleId: 3, name: 'Tin', email: 'tin@example.com', type: 'Vip', status: 1 },
];

export const questionCategories = [
    { id: 1, name: 'Category 1', description: 'This is Category 1', status: 1 },
    { id: 2, name: 'Category 2', description: 'This is Category 2', status: 1 },
    { id: 3, name: 'Category 3', description: 'This is Category 3', status: 1 },
];

export const questionDifficultyLevels = [
    { id: 1, name: 'Hard', description: 'Hard difficulty level', status: 1 },
    { id: 2, name: 'Average', description: 'Average difficulty level', status: 1 },
    { id: 3, name: 'Low', description: 'Low difficulty level', status: 1 },
];

export const drivingLicenses = [
    { id: 1, name: 'A1', description: 'Description of A1', },
    { id: 2, name: 'A2', description: 'Description of A1', },
    { id: 3, name: 'A3', description: 'Description of A1', },
    { id: 4, name: 'A4', description: 'Description of A1', },
    { id: 5, name: 'A5', description: 'Description of A1', },
    { id: 6, name: 'A6', description: 'Description of A1', },
];

export const questionChapters = [
    { id: 1, name: 'Chapter 1', description: 'Description of Chapter 1', drivingLicenseId: 1 },
    { id: 2, name: 'Chapter 2', description: 'Description of Chapter 2', drivingLicenseId: 1 },
    { id: 3, name: 'Chapter 3', description: 'Description of Chapter 3', drivingLicenseId: 1 },
    { id: 4, name: 'Chapter 4', description: 'Description of Chapter 4', drivingLicenseId: 1 },
    { id: 5, name: 'Chapter 5', description: 'Description of Chapter 5', drivingLicenseId: 1 },
    { id: 6, name: 'Chapter 1', description: 'Description of Chapter 1', drivingLicenseId: 2 },
    { id: 7, name: 'Chapter 2', description: 'Description of Chapter 2', drivingLicenseId: 2 },
    { id: 8, name: 'Chapter 3', description: 'Description of Chapter 3', drivingLicenseId: 2 },
    { id: 9, name: 'Chapter 4', description: 'Description of Chapter 4', drivingLicenseId: 2 },
    { id: 10, name: 'Chapter 1', description: 'Description of Chapter 1', drivingLicenseId: 3 },
    { id: 11, name: 'Chapter 2', description: 'Description of Chapter 2', drivingLicenseId: 3 },
    { id: 12, name: 'Chapter 3', description: 'Description of Chapter 3', drivingLicenseId: 3 },
    { id: 13, name: 'Chapter 1', description: 'Description of Chapter 1', drivingLicenseId: 4 },
    { id: 14, name: 'Chapter 2', description: 'Description of Chapter 2', drivingLicenseId: 4 },
    { id: 15, name: 'Chapter 1', description: 'Description of Chapter 1', drivingLicenseId: 5 },
];

export const questionLessons = [
    { id: 1, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 1 },
    { id: 2, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 1 },
    { id: 3, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 1 },
    { id: 4, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 1 },
    { id: 5, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 1 },
    { id: 6, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 1 },
    { id: 7, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 1 },
    { id: 8, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 1 },
    { id: 9, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 1 },
    { id: 10, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 1 },
    { id: 11, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 2 },
    { id: 12, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 2 },
    { id: 13, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 2 },
    { id: 14, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 2 },
    { id: 15, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 2 },
    { id: 16, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 2 },
    { id: 17, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 2 },
    { id: 18, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 2 },
    { id: 19, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 2 },
    { id: 20, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 2 },
    { id: 21, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 3 },
    { id: 22, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 3 },
    { id: 23, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 3 },
    { id: 24, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 3 },
    { id: 25, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 3 },
    { id: 26, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 3 },
    { id: 27, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 3 },
    { id: 28, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 3 },
    { id: 29, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 3 },
    { id: 30, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 3 },
    { id: 31, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 4 },
    { id: 32, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 4 },
    { id: 33, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 4 },
    { id: 34, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 4 },
    { id: 35, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 4 },
    { id: 36, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 4 },
    { id: 37, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 4 },
    { id: 38, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 4 },
    { id: 39, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 4 },
    { id: 40, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 4 },
    { id: 41, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 5 },
    { id: 42, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 5 },
    { id: 43, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 5 },
    { id: 44, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 5 },
    { id: 45, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 5 },
    { id: 46, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 5 },
    { id: 47, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 5 },
    { id: 48, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 5 },
    { id: 49, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 5 },
    { id: 50, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 5 },
    { id: 51, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 6 },
    { id: 52, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 6 },
    { id: 53, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 6 },
    { id: 54, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 6 },
    { id: 55, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 6 },
    { id: 56, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 6 },
    { id: 57, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 6 },
    { id: 58, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 6 },
    { id: 59, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 6 },
    { id: 60, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 6 },
    { id: 61, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 7 },
    { id: 62, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 7 },
    { id: 63, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 7 },
    { id: 64, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 7 },
    { id: 65, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 7 },
    { id: 66, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 7 },
    { id: 67, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 7 },
    { id: 68, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 7 },
    { id: 69, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 7 },
    { id: 70, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 7 },
    { id: 71, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 8 },
    { id: 72, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 8 },
    { id: 73, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 8 },
    { id: 74, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 8 },
    { id: 75, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 8 },
    { id: 76, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 8 },
    { id: 77, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 8 },
    { id: 78, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 8 },
    { id: 79, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 8 },
    { id: 80, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 8 },
    { id: 81, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 9 },
    { id: 82, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 9 },
    { id: 83, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 9 },
    { id: 84, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 9 },
    { id: 85, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 9 },
    { id: 86, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 9 },
    { id: 87, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 9 },
    { id: 88, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 9 },
    { id: 89, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 9 },
    { id: 90, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 9 },
    { id: 91, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 10 },
    { id: 92, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 10 },
    { id: 93, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 10 },
    { id: 94, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 10 },
    { id: 95, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 10 },
    { id: 96, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 10 },
    { id: 97, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 10 },
    { id: 98, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 10 },
    { id: 99, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 10 },
    { id: 100, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 11 },
    { id: 101, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 11 },
    { id: 102, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 11 },
    { id: 103, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 11 },
    { id: 104, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 11 },
    { id: 105, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 11 },
    { id: 106, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 11 },
    { id: 107, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 11 },
    { id: 108, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 11 },
    { id: 109, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 11 },
    { id: 110, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 11 },
    { id: 111, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 12 },
    { id: 112, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 12 },
    { id: 113, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 12 },
    { id: 114, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 12 },
    { id: 115, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 12 },
    { id: 116, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 12 },
    { id: 117, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 12 },
    { id: 118, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 12 },
    { id: 119, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 12 },
    { id: 120, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 12 },
    { id: 121, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 13 },
    { id: 122, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 13 },
    { id: 123, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 13 },
    { id: 124, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 13 },
    { id: 125, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 13 },
    { id: 126, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 13 },
    { id: 127, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 13 },
    { id: 128, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 13 },
    { id: 129, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 13 },
    { id: 130, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 13 },
    { id: 131, name: 'Lesson 1', description: 'Description of Lesson 1', questionChapterId: 14 },
    { id: 132, name: 'Lesson 2', description: 'Description of Lesson 2', questionChapterId: 14 },
    { id: 133, name: 'Lesson 3', description: 'Description of Lesson 3', questionChapterId: 14 },
    { id: 134, name: 'Lesson 4', description: 'Description of Lesson 4', questionChapterId: 14 },
    { id: 135, name: 'Lesson 5', description: 'Description of Lesson 5', questionChapterId: 14 },
    { id: 136, name: 'Lesson 6', description: 'Description of Lesson 6', questionChapterId: 14 },
    { id: 137, name: 'Lesson 7', description: 'Description of Lesson 7', questionChapterId: 14 },
    { id: 138, name: 'Lesson 8', description: 'Description of Lesson 8', questionChapterId: 14 },
    { id: 139, name: 'Lesson 9', description: 'Description of Lesson 9', questionChapterId: 14 },
    { id: 140, name: 'Lesson 10', description: 'Description of Lesson 10', questionChapterId: 14 },
];
