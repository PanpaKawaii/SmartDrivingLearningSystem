// 1
export const roles = [
    {
        "id": 1,
        "name": "Admin",
        "description": "Admin of the system",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "Instructor",
        "description": "Instructor of the system",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "name": "Student",
        "description": "Student of the system",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 4,
        "name": "Guest",
        "description": "Guest of the system",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 2
export const users = [
    {
        "id": 1,
        "roleId": 1,
        "email": "nguyenthanhduong37923@gmail.com",
        "password": "123456a",
        "name": "Nguyễn Thành Dương",
        "avatar": "avatar_1",
        "phone": "0123456789",
        "gender": "Male",
        "description": "description_1",
        "dateOfBirth": "2026-03-08",
        "licenseType": "licenseType_1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "roleId": 2,
        "email": "thanhtyns@gmail.com",
        "password": "123456a",
        "name": "Lê Hữu Thành Tín",
        "avatar": "avatar_2",
        "phone": "0123456790",
        "gender": "Male",
        "description": "description_2",
        "dateOfBirth": "2026-03-09",
        "licenseType": "licenseType_2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "roleId": 3,
        "email": "dngngchitriu2004@gmail.com",
        "password": "123456a",
        "name": "Đặng Ngọc Hải Triều",
        "avatar": "avatar_3",
        "phone": "0123456791",
        "gender": "Male",
        "description": "description_3",
        "dateOfBirth": "2026-03-10",
        "licenseType": "licenseType_3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 4,
        "roleId": 4,
        "email": "sang@gmail.com",
        "password": "123456a",
        "name": "Nguyễn Trường Sang",
        "avatar": "avatar_4",
        "phone": "0123456792",
        "gender": "Male",
        "description": "description_4",
        "dateOfBirth": "2026-03-11",
        "licenseType": "licenseType_4",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 3
export const payments = [
    {
        "id": 1,
        "userId": 3,
        "method": "method_7",
        "amount": 89,
        "note": "note_54",
        "response": "response_75",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "userId": 4,
        "method": "method_1",
        "amount": 29,
        "note": "note_48",
        "response": "response_43",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 4
export const simulationChapters = [
    {
        "id": 1,
        "name": "Giao thông trong đô thị",
        "description": "Giao thông trong đô thị",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "Giao thông ngoài đô thị",
        "description": "Giao thông ngoài đô thị",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "name": "Giao thông trên cao tốc",
        "description": "Giao thông trên cao tốc",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 4,
        "name": "Giao thông trên đường núi",
        "description": "Giao thông trên đường núi",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 5,
        "name": "Giao thông trên đường quốc lộ",
        "description": "Giao thông trên đường quốc lộ",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 6,
        "name": "Tai nạn giao thông thực tế",
        "description": "Tai nạn giao thông thực tế",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 5
export const simulationCategories = [
    {
        "id": 1,
        "name": "Phanh xe",
        "description": "Dấu hiệu: Khi các bạn thấy tình huống có xe đi cùng làn, cùng hướng và khoảng cách gần với xe mình. Gắn cờ khi thấy xe phía trước phanh (đèn phanh sáng).",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "Nơi giao nhau, đường cong",
        "description": "Nơi giao nhau (ngã ba hoặc ngã tư),đường cong vòng => Xuất hiện đầu xe. Các phương tiện tới ngã ba hoặc ngã tư có xe bất ngờ xuất hiện. Do đó, tới ngã ba hoặc tư bạn phải chú ý quan sát hai bên và ngã ba và tư bên nào thì tình huống nguy hiểm bên đó. Các phương tiện tới đường cong, vòng tầm nhìn hạn chế và bất ngờ xuất hiện xe chạy ngược chiều.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "name": "Xi nhan",
        "description": "Nhấn chọn là khi thấy xe của bạn, xe đi ngược chiều,cùng chiều có đèn xi nhan chuyển làn hoặc vượt xe. Bạn lưu ý Có những tình huống xin nhan 1 hoặc 2 hoặc 4 lần. Các tình huống lái xe trên đường cao tốc vào thời điểm ban đêm hoặc chập choạng tối, trời mưa thì đều là các tình huống xin nhan (Th: 43,48,49,50,55).",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 4,
        "name": "Chuyển làn, vượt ẩu",
        "description": "Xe cùng chiều hoặc ngược chiều chuyển làn, vượt ẩu => Nhấn chọn khi: Vừa xuất hiện hoặc bắt đầu chuyển hoặc vượt xe, đè vào vạch kẻ đường.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 5,
        "name": "Trẻ em, gia súc, người qua đường, mở cửa xe",
        "description": "Đây là những tình huống có trẻ em , người đi bộ sang đường, gia súc và mở cửa xe nguy hiểm.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 6,
        "name": "Cao tốc, sương mù, qua cầu, đá rơi",
        "description": "Đây là những tình huống trên cao tốc, sương mù, qua cầu, đá rơi.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 6
export const simulationDifficultyLevels = [
    {
        "id": 1,
        "name": "Thang điểm dài",
        "description": "Nhóm này bao gồm những câu có thang điểm dài, rất dễ để bạn lấy điểm tối đa.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "Thang điểm vừa",
        "description": "Nhóm này bao gồm những câu có thang điểm trung bình (vừa), bạn chú ý sẽ lấy được điểm tối đa.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "name": "Thang điểm khó",
        "description": "Nhóm này bao gồm những câu có thang điểm khó, bạn chú ý sẽ lấy được điểm tối đa.",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 7
export const simulationScenarios = [
    {
        "id": 1,
        "simulationChapterId": 1,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 1: Người đi bộ sang đường bị khuất sau xe tải",
        "description": "Tình huống số 1: Người đi bộ sang đường bị khuất sau xe tải",
        "video": "https://scenarios-zeta.vercel.app/1.mp4",
        "totalTime": 20.14,
        "startPoint": 10.5,
        "endPoint": 13.399999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "simulationChapterId": 1,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 2: Người đi bộ vượt đền đỏ sang đường",
        "description": "Tình huống số 2: Người đi bộ vượt đền đỏ sang đường",
        "video": "https://scenarios-zeta.vercel.app/2.mp4",
        "totalTime": 33.11,
        "startPoint": 17.7,
        "endPoint": 20,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 3,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 3: Xe phía trước phanh gấp để tránh xe buýt đang dừng tại bến xe buýt",
        "description": "Tình huống số 3: Xe phía trước phanh gấp để tránh xe buýt đang dừng tại bến xe buýt",
        "video": "https://scenarios-zeta.vercel.app/3.mp4",
        "totalTime": 27.65,
        "startPoint": 15,
        "endPoint": 17.7,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 4,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 4: Xe con từ đường nhanh đi nhanh ra tại ngã ba không có đèn tính hiệu giao thông",
        "description": "Tình huống số 4: Xe con từ đường nhanh đi nhanh ra tại ngã ba không có đèn tính hiệu giao thông",
        "video": "https://scenarios-zeta.vercel.app/4.mp4",
        "totalTime": 27.9,
        "startPoint": 10.5,
        "endPoint": 15,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 5,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 5: Xe máy đang đi thẳng, đột ngột rẻ trái sang đường trước đầu xe bạn",
        "description": "Tình huống số 5: Xe máy đang đi thẳng, đột ngột rẻ trái sang đường trước đầu xe bạn",
        "video": "https://scenarios-zeta.vercel.app/5.mp4",
        "totalTime": 26.96,
        "startPoint": 12,
        "endPoint": 16.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 6,
        "simulationChapterId": 1,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 6: Xe buýt lấn làn để vượt tại ngã ba",
        "description": "Tình huống số 6: Xe buýt lấn làn để vượt tại ngã ba",
        "video": "https://scenarios-zeta.vercel.app/6.mp4",
        "totalTime": 23.98,
        "startPoint": 12.899999999999999,
        "endPoint": 16,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 7,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 7: Xe phía trước phanh gấp tránh người đi bộ vượt đèn đỏ sang đường",
        "description": "Tình huống số 7: Xe phía trước phanh gấp tránh người đi bộ vượt đèn đỏ sang đường",
        "video": "https://scenarios-zeta.vercel.app/7.mp4",
        "totalTime": 26.54,
        "startPoint": 10.3,
        "endPoint": 14.899999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 8,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 8: Xe đạp bất ngờ đi ra từ đường nhanh tại ngã ba",
        "description": "Tình huống số 8: Xe đạp bất ngờ đi ra từ đường nhanh tại ngã ba",
        "video": "https://scenarios-zeta.vercel.app/8.mp4",
        "totalTime": 27.560000000000002,
        "startPoint": 10.3,
        "endPoint": 13.399999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 9,
        "simulationChapterId": 1,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 9: Xe ô tô làn đường đối diện lấn làn vượt xe tải đang dừng đõ tại khu vực đông đúc",
        "description": "Tình huống số 9: Xe ô tô làn đường đối diện lấn làn vượt xe tải đang dừng đõ tại khu vực đông đúc",
        "video": "https://scenarios-zeta.vercel.app/9.mp4",
        "totalTime": 16.89,
        "startPoint": 7.9,
        "endPoint": 10.899999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 10,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 10: Xe ô tô bất ngờ đi nhanh ra từ đường nhanh bên trái tại ngã ba",
        "description": "Tình huống số 10: Xe ô tô bất ngờ đi nhanh ra từ đường nhanh bên trái tại ngã ba",
        "video": "https://scenarios-zeta.vercel.app/10.mp4",
        "totalTime": 24.74,
        "startPoint": 11.8,
        "endPoint": 16,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 11,
        "simulationChapterId": 1,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 11: Xe bồn bê tông từ đường nhanh lấn làn để rẽ tại ngã ba không có đèn giao thông có nhiều xe đang dừng đỗ",
        "description": "Tình huống số 11: Xe bồn bê tông từ đường nhanh lấn làn để rẽ tại ngã ba không có đèn giao thông có nhiều xe đang dừng đỗ",
        "video": "https://scenarios-zeta.vercel.app/11.mp4",
        "totalTime": 26.11,
        "startPoint": 10,
        "endPoint": 17.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 12,
        "simulationChapterId": 1,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 12: Xe mô tô lấn làn vượt ẩu nguy hiểm tại giao lộ",
        "description": "Tình huống số 12: Xe mô tô lấn làn vượt ẩu nguy hiểm tại giao lộ",
        "video": "https://scenarios-zeta.vercel.app/12.mp4",
        "totalTime": 30.119999999999997,
        "startPoint": 13.100000000000001,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 13,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 13: Người đi xe đạp từ vỉa hè bất ngờ đi xuống đường để sang đường",
        "description": "Tình huống số 13: Người đi xe đạp từ vỉa hè bất ngờ đi xuống đường để sang đường",
        "video": "https://scenarios-zeta.vercel.app/13.mp4",
        "totalTime": 23.38,
        "startPoint": 11,
        "endPoint": 13.399999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 14,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 14: Tình huống nguy hiểm khi gặp xe t ải lớn đi qua hầm chui dân sinh",
        "description": "Tình huống số 14: Tình huống nguy hiểm khi gặp xe t ải lớn đi qua hầm chui dân sinh",
        "video": "https://scenarios-zeta.vercel.app/14.mp4",
        "totalTime": 27.560000000000002,
        "startPoint": 13.8,
        "endPoint": 17.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 15,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 15: Xe phía trước phanh gấp để tránh xe chuyển làn rẽ trái tại ngã ba",
        "description": "Tình huống số 15: Xe phía trước phanh gấp để tránh xe chuyển làn rẽ trái tại ngã ba",
        "video": "https://scenarios-zeta.vercel.app/15.mp4",
        "totalTime": 26.79,
        "startPoint": 12.899999999999999,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 16,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 16: Xe ô tô từ đường nhanh bên trái bất ngờ đi nhanh ra có nguy cơ va chạm với xe bạn",
        "description": "Tình huống số 16: Xe ô tô từ đường nhanh bên trái bất ngờ đi nhanh ra có nguy cơ va chạm với xe bạn",
        "video": "https://scenarios-zeta.vercel.app/16.mp4",
        "totalTime": 23.55,
        "startPoint": 10.600000000000001,
        "endPoint": 13.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 17,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 17: Xe buýt lấn làn đường vượt ẩu tại ngã tư có đèn giao thông",
        "description": "Tình huống số 17: Xe buýt lấn làn đường vượt ẩu tại ngã tư có đèn giao thông",
        "video": "https://scenarios-zeta.vercel.app/17.mp4",
        "totalTime": 22.53,
        "startPoint": 8.3,
        "endPoint": 10.7,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 18,
        "simulationChapterId": 1,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 18: Gặp tài xế xe đang dừng đỗ ven đường đột ngột mở cửa xe",
        "description": "Tình huống số 18: Gặp tài xế xe đang dừng đỗ ven đường đột ngột mở cửa xe",
        "video": "https://scenarios-zeta.vercel.app/18.mp4",
        "totalTime": 24.91,
        "startPoint": 10.899999999999999,
        "endPoint": 14.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 19,
        "simulationChapterId": 1,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 19: Tài xế xe dừng bên đường đang mở cửa xe",
        "description": "Tình huống số 19: Tài xế xe dừng bên đường đang mở cửa xe",
        "video": "https://scenarios-zeta.vercel.app/19.mp4",
        "totalTime": 22.1,
        "startPoint": 12.3,
        "endPoint": 15.100000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 20,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 20: Tài xế xe đang đỗ ven đường đi ra mở cửa xe tại khu vực đường hẹp",
        "description": "Tình huống số 20: Tài xế xe đang đỗ ven đường đi ra mở cửa xe tại khu vực đường hẹp",
        "video": "https://scenarios-zeta.vercel.app/20.mp4",
        "totalTime": 30.380000000000003,
        "startPoint": 18.3,
        "endPoint": 21.9,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 21,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 21: Xe ô tô phía dừng lại và lùi vào nơi đỗ tại khu vực đường hẹp",
        "description": "Tình huống số 21: Xe ô tô phía dừng lại và lùi vào nơi đỗ tại khu vực đường hẹp",
        "video": "https://scenarios-zeta.vercel.app/21.mp4",
        "totalTime": 32.94,
        "startPoint": 13,
        "endPoint": 16.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 22,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 22: Gặp xe ô tô từ đường nhánh bên phải tại ngã ba đi ra với tốc độ nhanh",
        "description": "Tình huống số 22: Gặp xe ô tô từ đường nhánh bên phải tại ngã ba đi ra với tốc độ nhanh",
        "video": "https://scenarios-zeta.vercel.app/22.mp4",
        "totalTime": 26.11,
        "startPoint": 12.899999999999999,
        "endPoint": 15.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 23,
        "simulationChapterId": 1,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 23: Xe ô tô đối diện lấn làn vượt xe đang có tín hiệu dừng khẩn cấp",
        "description": "Tình huống số 23: Xe ô tô đối diện lấn làn vượt xe đang có tín hiệu dừng khẩn cấp",
        "video": "https://scenarios-zeta.vercel.app/23.mp4",
        "totalTime": 26.79,
        "startPoint": 14.899999999999999,
        "endPoint": 17.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 24,
        "simulationChapterId": 1,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 24: Xe tải lớn ở làn đối diện lấn làn vượt xe đang thu gom rác",
        "description": "Tình huống số 24: Xe tải lớn ở làn đối diện lấn làn vượt xe đang thu gom rác",
        "video": "https://scenarios-zeta.vercel.app/24.mp4",
        "totalTime": 27.9,
        "startPoint": 13.5,
        "endPoint": 16.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 25,
        "simulationChapterId": 1,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 25: Xe ô tô khách bất ngờ đi ra từ nơi đỗ tại đường hẹp",
        "description": "Tình huống số 25: Xe ô tô khách bất ngờ đi ra từ nơi đỗ tại đường hẹp",
        "video": "https://scenarios-zeta.vercel.app/25.mp4",
        "totalTime": 38.99,
        "startPoint": 10.5,
        "endPoint": 18,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 26,
        "simulationChapterId": 1,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 26: Tránh xe tại khu vực công trình sửa đường xuất hiện sau khúc cua",
        "description": "Tình huống số 26: Tránh xe tại khu vực công trình sửa đường xuất hiện sau khúc cua",
        "video": "https://scenarios-zeta.vercel.app/26.mp4",
        "totalTime": 36.95,
        "startPoint": 12.600000000000001,
        "endPoint": 17.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 27,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 27: Xe khách bật đèn cảnh báo dường giữa ngã tư để đón khách",
        "description": "Tình huống số 27: Xe khách bật đèn cảnh báo dường giữa ngã tư để đón khách",
        "video": "https://scenarios-zeta.vercel.app/27.mp4",
        "totalTime": 29.1,
        "startPoint": 14.100000000000001,
        "endPoint": 17.1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 28,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 28: Xe ô tô phía trước đang đi, đột ngột phan gấp khi gặp vũng nước trên đường",
        "description": "Tình huống số 28: Xe ô tô phía trước đang đi, đột ngột phan gấp khi gặp vũng nước trên đường",
        "video": "https://scenarios-zeta.vercel.app/28.mp4",
        "totalTime": 29.18,
        "startPoint": 11.8,
        "endPoint": 15.100000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 29,
        "simulationChapterId": 1,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 29: Trời mưa, ô tô phía trước phanh gấp để tránh xe mô-tô tạt đầu khi gặp chướng ngại vật",
        "description": "Tình huống số 29: Trời mưa, ô tô phía trước phanh gấp để tránh xe mô-tô tạt đầu khi gặp chướng ngại vật",
        "video": "https://scenarios-zeta.vercel.app/29.mp4",
        "totalTime": 27.560000000000002,
        "startPoint": 11.8,
        "endPoint": 15.100000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 30,
        "simulationChapterId": 2,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 30: Đường nông thôn, xe đi gặp đàn bò đang đứng trên đường",
        "description": "Tình huống số 30: Đường nông thôn, xe đi gặp đàn bò đang đứng trên đường",
        "video": "https://scenarios-zeta.vercel.app/30.mp4",
        "totalTime": 30.89,
        "startPoint": 10.7,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 31,
        "simulationChapterId": 2,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 31: Đường nông thôn, gặp đàn bò đi từ dưới vệ đường bang qua đường",
        "description": "Tình huống số 31: Đường nông thôn, gặp đàn bò đi từ dưới vệ đường bang qua đường",
        "video": "https://scenarios-zeta.vercel.app/31.mp4",
        "totalTime": 31.060000000000002,
        "startPoint": 9.5,
        "endPoint": 14.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 32,
        "simulationChapterId": 2,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 32: Người đi bộ bang qua đường lúc chập tối ngay trước xe bạn",
        "description": "Tình huống số 32: Người đi bộ bang qua đường lúc chập tối ngay trước xe bạn",
        "video": "https://scenarios-zeta.vercel.app/32.mp4",
        "totalTime": 22.78,
        "startPoint": 11.399999999999999,
        "endPoint": 15.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 33,
        "simulationChapterId": 2,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 33: Học sinh đi ra đường tại khu vực gần trường học",
        "description": "Tình huống số 33: Học sinh đi ra đường tại khu vực gần trường học",
        "video": "https://scenarios-zeta.vercel.app/33.mp4",
        "totalTime": 26.880000000000003,
        "startPoint": 12.2,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 34,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 34: Gặp xe khách tại đoạn đường cong vào cua chiếm hết làn đường tại khu vực đường hẹp",
        "description": "Tình huống số 34: Gặp xe khách tại đoạn đường cong vào cua chiếm hết làn đường tại khu vực đường hẹp",
        "video": "https://scenarios-zeta.vercel.app/34.mp4",
        "totalTime": 20.56,
        "startPoint": 8.2,
        "endPoint": 12.399999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 35,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 35: Xe khách phía trước đột ngột phanh giảm tốc độ tránh xe dối diện tại đoạn đường cong",
        "description": "Tình huống số 35: Xe khách phía trước đột ngột phanh giảm tốc độ tránh xe dối diện tại đoạn đường cong",
        "video": "https://scenarios-zeta.vercel.app/35.mp4",
        "totalTime": 21.16,
        "startPoint": 6.199999999999999,
        "endPoint": 9.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 36,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 36: Đường nông thôn, xuất hiện xe máy đi ra từ ngõ bên phải",
        "description": "Tình huống số 36: Đường nông thôn, xuất hiện xe máy đi ra từ ngõ bên phải",
        "video": "https://scenarios-zeta.vercel.app/36.mp4",
        "totalTime": 27.729999999999997,
        "startPoint": 16.7,
        "endPoint": 19.1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 37,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 37: Đường nông thôn, nhóm xe đạp đi ra từ ngõ bên phải",
        "description": "Tình huống số 37: Đường nông thôn, nhóm xe đạp đi ra từ ngõ bên phải",
        "video": "https://scenarios-zeta.vercel.app/37.mp4",
        "totalTime": 29.009999999999998,
        "startPoint": 17.6,
        "endPoint": 20.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 38,
        "simulationChapterId": 2,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 38: Ban đêm xe ô tô tải ngược chiều bật đèn chiếu xa làm 2 xe máy phía trước giảm tốc độ",
        "description": "Tình huống số 38: Ban đêm xe ô tô tải ngược chiều bật đèn chiếu xa làm 2 xe máy phía trước giảm tốc độ",
        "video": "https://scenarios-zeta.vercel.app/38.mp4",
        "totalTime": 26.11,
        "startPoint": 11.2,
        "endPoint": 14.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 39,
        "simulationChapterId": 2,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 39: Xe tải từ đường nhánh nhập làn nguy hiểm",
        "description": "Tình huống số 39: Xe tải từ đường nhánh nhập làn nguy hiểm",
        "video": "https://scenarios-zeta.vercel.app/39.mp4",
        "totalTime": 25.17,
        "startPoint": 14.8,
        "endPoint": 17.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 40,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 40: Gần cổng làng, phía sau có xe mô-tô lấn làn để vượt xe ô tô đang dừng đỗ",
        "description": "Tình huống số 40: Gần cổng làng, phía sau có xe mô-tô lấn làn để vượt xe ô tô đang dừng đỗ",
        "video": "https://scenarios-zeta.vercel.app/40.mp4",
        "totalTime": 27.82,
        "startPoint": 9.600000000000001,
        "endPoint": 13.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 41,
        "simulationChapterId": 2,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 41: Xe con làn đối diện rẽ nhanh cắt qua đầu xe bạn tại ngã ba",
        "description": "Tình huống số 41: Xe con làn đối diện rẽ nhanh cắt qua đầu xe bạn tại ngã ba",
        "video": "https://scenarios-zeta.vercel.app/41.mp4",
        "totalTime": 27.130000000000003,
        "startPoint": 12.600000000000001,
        "endPoint": 14.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 42,
        "simulationChapterId": 2,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 42: Tại ngã tư, đèn xanh , xe bạn bắt đầu di chuyển có xe mô-tô rẽ cắt ngang qua đầu xe bạn",
        "description": "Tình huống số 42: Tại ngã tư, đèn xanh , xe bạn bắt đầu di chuyển có xe mô-tô rẽ cắt ngang qua đầu xe bạn",
        "video": "https://scenarios-zeta.vercel.app/42.mp4",
        "totalTime": 25.6,
        "startPoint": 10.100000000000001,
        "endPoint": 13,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 43,
        "simulationChapterId": 2,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 43: Trười mưa, xe con giảm nhanh tốc độ để tránh xe tải chuyển làn đột ngột tránh chướng ngại vật phía trước",
        "description": "Tình huống số 43: Trười mưa, xe con giảm nhanh tốc độ để tránh xe tải chuyển làn đột ngột tránh chướng ngại vật phía trước",
        "video": "https://scenarios-zeta.vercel.app/43.mp4",
        "totalTime": 29.18,
        "startPoint": 9.600000000000001,
        "endPoint": 13.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 44,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 44: Phía sau làn phải có xe con vượt lên và chuyển làn cắt ngang nguy hiểm trước mặt xe bạn",
        "description": "Tình huống số 44: Phía sau làn phải có xe con vượt lên và chuyển làn cắt ngang nguy hiểm trước mặt xe bạn",
        "video": "https://scenarios-zeta.vercel.app/44.mp4",
        "totalTime": 21.16,
        "startPoint": 8.5,
        "endPoint": 12.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 45,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 45: Xe tải ở làn phải vượt lên và đột ngột chuyển làn sang làn giữa làm xe phía trước phải phanh gấp",
        "description": "Tình huống số 45: Xe tải ở làn phải vượt lên và đột ngột chuyển làn sang làn giữa làm xe phía trước phải phanh gấp",
        "video": "https://scenarios-zeta.vercel.app/45.mp4",
        "totalTime": 23.12,
        "startPoint": 13.2,
        "endPoint": 16,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 46,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 46: Xe ô tô con ở làn bên trái vượt lên và chuyển làn phải cắt qua nguy hiểm trước đầu xe bạn để rẽ ra đường gom",
        "description": "Tình huống số 46: Xe ô tô con ở làn bên trái vượt lên và chuyển làn phải cắt qua nguy hiểm trước đầu xe bạn để rẽ ra đường gom",
        "video": "https://scenarios-zeta.vercel.app/46.mp4",
        "totalTime": 30.21,
        "startPoint": 20,
        "endPoint": 23.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 47,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 47: Xe cấp cứu xin đường, xe con bên trái tang tốc vượt lên và chuyển làn cắt qua đầu xe bạn",
        "description": "Tình huống số 47: Xe cấp cứu xin đường, xe con bên trái tang tốc vượt lên và chuyển làn cắt qua đầu xe bạn",
        "video": "https://scenarios-zeta.vercel.app/47.mp4",
        "totalTime": 29.689999999999998,
        "startPoint": 18,
        "endPoint": 21.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 48,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 48: Xe bạn có tín hiệu để chuyển làn trái thì có xe phía sau nháy pha liên tục để vượt",
        "description": "Tình huống số 48: Xe bạn có tín hiệu để chuyển làn trái thì có xe phía sau nháy pha liên tục để vượt",
        "video": "https://scenarios-zeta.vercel.app/48.mp4",
        "totalTime": 27.39,
        "startPoint": 8,
        "endPoint": 10.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 49,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 49: Ô tô phía trước phanh gấp do có xe tải tạt sang đột ngột vì gặp chướng ngại vật",
        "description": "Tình huống số 49: Ô tô phía trước phanh gấp do có xe tải tạt sang đột ngột vì gặp chướng ngại vật",
        "video": "https://scenarios-zeta.vercel.app/49.mp4",
        "totalTime": 26.96,
        "startPoint": 10.2,
        "endPoint": 15.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 50,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 50: Xe tải phía trước làn phải đột ngột tang tốc và chuyển sang làn giữa làm xe con phía trước phanh gấp",
        "description": "Tình huống số 50: Xe tải phía trước làn phải đột ngột tang tốc và chuyển sang làn giữa làm xe con phía trước phanh gấp",
        "video": "https://scenarios-zeta.vercel.app/50.mp4",
        "totalTime": 28.93,
        "startPoint": 11.899999999999999,
        "endPoint": 16.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 51,
        "simulationChapterId": 3,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 51: Xe tải bật đèn cảnh báo đi ngược đường ở làn bên phải cao tốc",
        "description": "Tình huống số 51: Xe tải bật đèn cảnh báo đi ngược đường ở làn bên phải cao tốc",
        "video": "https://scenarios-zeta.vercel.app/51.mp4",
        "totalTime": 29.520000000000003,
        "startPoint": 12.2,
        "endPoint": 17.1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 52,
        "simulationChapterId": 3,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 52: Qua đoạn đường cong đột nhiên có xe tải đi lùi trong làn khẩn cấp",
        "description": "Tình huống số 52: Qua đoạn đường cong đột nhiên có xe tải đi lùi trong làn khẩn cấp",
        "video": "https://scenarios-zeta.vercel.app/52.mp4",
        "totalTime": 28.409999999999997,
        "startPoint": 15.5,
        "endPoint": 19.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 53,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 53: Trên đường cao tốc bân đêm, đột nhiên có xe tải đi chiều ngược lại ở làn khẩn cấp",
        "description": "Tình huống số 53: Trên đường cao tốc bân đêm, đột nhiên có xe tải đi chiều ngược lại ở làn khẩn cấp",
        "video": "https://scenarios-zeta.vercel.app/53.mp4",
        "totalTime": 28.33,
        "startPoint": 16,
        "endPoint": 19.9,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 54,
        "simulationChapterId": 3,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 54: Xe tải từ đường nhanh nhập vào cao tốc với tốc độ cao",
        "description": "Tình huống số 54: Xe tải từ đường nhanh nhập vào cao tốc với tốc độ cao",
        "video": "https://scenarios-zeta.vercel.app/54.mp4",
        "totalTime": 24.83,
        "startPoint": 12,
        "endPoint": 16.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 55,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 55: Cao tốc, xe tải đột ngột giảm tốc và chuyển sang làn xe bạn do gặp xe đang gặp sự cố trên đường",
        "description": "Tình huống số 55: Cao tốc, xe tải đột ngột giảm tốc và chuyển sang làn xe bạn do gặp xe đang gặp sự cố trên đường",
        "video": "https://scenarios-zeta.vercel.app/55.mp4",
        "totalTime": 29.78,
        "startPoint": 10.600000000000001,
        "endPoint": 13.7,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 56,
        "simulationChapterId": 3,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 56: Xe con đang dừng ở làn khẩn cấp xi nhan nhập làn trước xe bạn",
        "description": "Tình huống số 56: Xe con đang dừng ở làn khẩn cấp xi nhan nhập làn trước xe bạn",
        "video": "https://scenarios-zeta.vercel.app/56.mp4",
        "totalTime": 20.82,
        "startPoint": 10.5,
        "endPoint": 13,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 57,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 57: Xe con phai trước giảm tốc độ và chuyển sang làn xe bạn do gặp đoạn đường đang sửa chữa phía trước",
        "description": "Tình huống số 57: Xe con phai trước giảm tốc độ và chuyển sang làn xe bạn do gặp đoạn đường đang sửa chữa phía trước",
        "video": "https://scenarios-zeta.vercel.app/57.mp4",
        "totalTime": 53.33,
        "startPoint": 23.8,
        "endPoint": 30.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 58,
        "simulationChapterId": 3,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 58: Xe tải phía trước giảm tốc độ, chuyển sang làn giữa do gặp đoạn đường đang sửa chữa phía trước",
        "description": "Tình huống số 58: Xe tải phía trước giảm tốc độ, chuyển sang làn giữa do gặp đoạn đường đang sửa chữa phía trước",
        "video": "https://scenarios-zeta.vercel.app/58.mp4",
        "totalTime": 40.62,
        "startPoint": 17.5,
        "endPoint": 22.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 59,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 59: Xe container đang đi từ làn trái chuyển ra đường nhanh cắt qua làn đường xe bạn",
        "description": "Tình huống số 59: Xe container đang đi từ làn trái chuyển ra đường nhanh cắt qua làn đường xe bạn",
        "video": "https://scenarios-zeta.vercel.app/59.mp4",
        "totalTime": 32.25,
        "startPoint": 20,
        "endPoint": 23,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 60,
        "simulationChapterId": 3,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 60: Xe 16 chỗ từ làn đường khẩn cấp đi ra vào làn xe bạn",
        "description": "Tình huống số 60: Xe 16 chỗ từ làn đường khẩn cấp đi ra vào làn xe bạn",
        "video": "https://scenarios-zeta.vercel.app/60.mp4",
        "totalTime": 27.299999999999997,
        "startPoint": 10.5,
        "endPoint": 14.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 61,
        "simulationChapterId": 3,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 61: Xe con từ đường nhánh nhập làn nguy hiểm cắt qua đầu xe bạn",
        "description": "Tình huống số 61: Xe con từ đường nhánh nhập làn nguy hiểm cắt qua đầu xe bạn",
        "video": "https://scenarios-zeta.vercel.app/61.mp4",
        "totalTime": 30.97,
        "startPoint": 19.9,
        "endPoint": 24.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 62,
        "simulationChapterId": 3,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 62: Xe con đi ngược chiều nguy hiểm tại làn đường tốc đọ cao nhất trên cao tốc",
        "description": "Tình huống số 62: Xe con đi ngược chiều nguy hiểm tại làn đường tốc đọ cao nhất trên cao tốc",
        "video": "https://scenarios-zeta.vercel.app/62.mp4",
        "totalTime": 30.549999999999997,
        "startPoint": 19,
        "endPoint": 23,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 63,
        "simulationChapterId": 3,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 63: Đàn gia súc từ bên đường đi ra cắt qua làn đường xe bạn tại khu vực cao tốc bị hỏng hộ lan",
        "description": "Tình huống số 63: Đàn gia súc từ bên đường đi ra cắt qua làn đường xe bạn tại khu vực cao tốc bị hỏng hộ lan",
        "video": "https://scenarios-zeta.vercel.app/63.mp4",
        "totalTime": 23.89,
        "startPoint": 7.699999999999999,
        "endPoint": 11.899999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 64,
        "simulationChapterId": 4,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 64: Phía đường cong xuất hiện xe tải đi đối diện làn xe khách phía trước giảm tốc độ đột ngột",
        "description": "Tình huống số 64: Phía đường cong xuất hiện xe tải đi đối diện làn xe khách phía trước giảm tốc độ đột ngột",
        "video": "https://scenarios-zeta.vercel.app/64.mp4",
        "totalTime": 26.71,
        "startPoint": 13.2,
        "endPoint": 17.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 65,
        "simulationChapterId": 4,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 65: Đường đèo dốc ban đêm gần đoạn đường cong, đột ngột tại khúc cua có xe khách lấn làn vượt xe tải lớn",
        "description": "Tình huống số 65: Đường đèo dốc ban đêm gần đoạn đường cong, đột ngột tại khúc cua có xe khách lấn làn vượt xe tải lớn",
        "video": "https://scenarios-zeta.vercel.app/65.mp4",
        "totalTime": 36.18,
        "startPoint": 20,
        "endPoint": 24.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 66,
        "simulationChapterId": 4,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 66: Đi phia sau xe tải chở vật liệu không được chằng buộc cẩn thận",
        "description": "Tình huống số 66: Đi phia sau xe tải chở vật liệu không được chằng buộc cẩn thận",
        "video": "https://scenarios-zeta.vercel.app/66.mp4",
        "totalTime": 22.01,
        "startPoint": 12.5,
        "endPoint": 16.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 67,
        "simulationChapterId": 4,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 67: Xe ô tô phía trước phanh gấp do có động vật hoang dã đứng ven đường",
        "description": "Tình huống số 67: Xe ô tô phía trước phanh gấp do có động vật hoang dã đứng ven đường",
        "video": "https://scenarios-zeta.vercel.app/67.mp4",
        "totalTime": 32.68,
        "startPoint": 15.899999999999999,
        "endPoint": 20,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 68,
        "simulationChapterId": 4,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 68: Đường núi, sương mù, có đàn bò đứng sát đường ngay sau đoạn đường cong",
        "description": "Tình huống số 68: Đường núi, sương mù, có đàn bò đứng sát đường ngay sau đoạn đường cong",
        "video": "https://scenarios-zeta.vercel.app/68.mp4",
        "totalTime": 26.619999999999997,
        "startPoint": 14.100000000000001,
        "endPoint": 17,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 69,
        "simulationChapterId": 4,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 69: Xe con vào cua lấn làn nguy hiểm va chạm với xe ngược chiều trên đường đồi núi",
        "description": "Tình huống số 69: Xe con vào cua lấn làn nguy hiểm va chạm với xe ngược chiều trên đường đồi núi",
        "video": "https://scenarios-zeta.vercel.app/69.mp4",
        "totalTime": 31.229999999999997,
        "startPoint": 17.9,
        "endPoint": 20,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 70,
        "simulationChapterId": 4,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 70: Xe khách lấn làn vượt xe container ngay tại khúc cua trên đường núi",
        "description": "Tình huống số 70: Xe khách lấn làn vượt xe container ngay tại khúc cua trên đường núi",
        "video": "https://scenarios-zeta.vercel.app/70.mp4",
        "totalTime": 51.62,
        "startPoint": 30.9,
        "endPoint": 35.1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 71,
        "simulationChapterId": 4,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 71: Đường núi, trời mưa, xe phía trước đột ngột dừng lại vì hỏng máy",
        "description": "Tình huống số 71: Đường núi, trời mưa, xe phía trước đột ngột dừng lại vì hỏng máy",
        "video": "https://scenarios-zeta.vercel.app/71.mp4",
        "totalTime": 29.78,
        "startPoint": 15,
        "endPoint": 19.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 72,
        "simulationChapterId": 4,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 72: Xe tải lấn làn đường xe bạn để vượt các xe khách trên đường núi thời tiết sương mù",
        "description": "Tình huống số 72: Xe tải lấn làn đường xe bạn để vượt các xe khách trên đường núi thời tiết sương mù",
        "video": "https://scenarios-zeta.vercel.app/72.mp4",
        "totalTime": 30.29,
        "startPoint": 18.1,
        "endPoint": 22.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 73,
        "simulationChapterId": 4,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 73: Xe con lấn làn xe bạn để vượt xe tải trên đường núi ngay tại đoạn đường quanh co",
        "description": "Tình huống số 73: Xe con lấn làn xe bạn để vượt xe tải trên đường núi ngay tại đoạn đường quanh co",
        "video": "https://scenarios-zeta.vercel.app/73.mp4",
        "totalTime": 30.119999999999997,
        "startPoint": 18.3,
        "endPoint": 21.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 74,
        "simulationChapterId": 5,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 74: Xe ô tô phía trước phanh gấp để tránh đoàn xe đạt từ đường nhanh đi ra",
        "description": "Tình huống số 74: Xe ô tô phía trước phanh gấp để tránh đoàn xe đạt từ đường nhanh đi ra",
        "video": "https://scenarios-zeta.vercel.app/74.mp4",
        "totalTime": 32.08,
        "startPoint": 14.399999999999999,
        "endPoint": 18.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 75,
        "simulationChapterId": 5,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 75: Trẻ em đột ngột lao ra để nhật quả bóng bị lăn ra đường",
        "description": "Tình huống số 75: Trẻ em đột ngột lao ra để nhật quả bóng bị lăn ra đường",
        "video": "https://scenarios-zeta.vercel.app/75.mp4",
        "totalTime": 23.12,
        "startPoint": 8.4,
        "endPoint": 11.399999999999999,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 76,
        "simulationChapterId": 5,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 76: Em bé đột ngột chạy ra đường",
        "description": "Tình huống số 76: Em bé đột ngột chạy ra đường",
        "video": "https://scenarios-zeta.vercel.app/76.mp4",
        "totalTime": 26.020000000000003,
        "startPoint": 9.399999999999999,
        "endPoint": 13,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 77,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 77: Xe con từ làn phải (khuất tầm nhìn) cắt ngang qua các xe đang đi thẳng để sang đường",
        "description": "Tình huống số 77: Xe con từ làn phải (khuất tầm nhìn) cắt ngang qua các xe đang đi thẳng để sang đường",
        "video": "https://scenarios-zeta.vercel.app/77.mp4",
        "totalTime": 25.6,
        "startPoint": 9.5,
        "endPoint": 13.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 78,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 78: Đèn vừa chuyển xanh, đột ngột xe mô-tô làn trái phía trước cố vượt đèn đỏ cắt qua trước đầu xe",
        "description": "Tình huống số 78: Đèn vừa chuyển xanh, đột ngột xe mô-tô làn trái phía trước cố vượt đèn đỏ cắt qua trước đầu xe",
        "video": "https://scenarios-zeta.vercel.app/78.mp4",
        "totalTime": 24.15,
        "startPoint": 14.5,
        "endPoint": 17.1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 79,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 79: Xe mô-tô đi ra từ đường nhanh nguy hiểm phía sau xe buýt vừa đi qua",
        "description": "Tình huống số 79: Xe mô-tô đi ra từ đường nhanh nguy hiểm phía sau xe buýt vừa đi qua",
        "video": "https://scenarios-zeta.vercel.app/79.mp4",
        "totalTime": 27.65,
        "startPoint": 12.5,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 80,
        "simulationChapterId": 5,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 80: Xe mô tô vượt lên đột ngột giảm tốc và chuyển sang làn xe bạn để tránh chướng ngại vật trên đường",
        "description": "Tình huống số 80: Xe mô tô vượt lên đột ngột giảm tốc và chuyển sang làn xe bạn để tránh chướng ngại vật trên đường",
        "video": "https://scenarios-zeta.vercel.app/80.mp4",
        "totalTime": 20.22,
        "startPoint": 9.7,
        "endPoint": 12.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 81,
        "simulationChapterId": 5,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 81: Xe bán tải từ đường bên kia quay đầu đột ngột lấn làn xe bạn",
        "description": "Tình huống số 81: Xe bán tải từ đường bên kia quay đầu đột ngột lấn làn xe bạn",
        "video": "https://scenarios-zeta.vercel.app/81.mp4",
        "totalTime": 26.79,
        "startPoint": 18.4,
        "endPoint": 21.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 82,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 82: Xe tải lớn ở làn đường ngược chiều lấn làn xe bạn để vượt qua xe buýet",
        "description": "Tình huống số 82: Xe tải lớn ở làn đường ngược chiều lấn làn xe bạn để vượt qua xe buýet",
        "video": "https://scenarios-zeta.vercel.app/82.mp4",
        "totalTime": 28.75,
        "startPoint": 9.5,
        "endPoint": 14.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 83,
        "simulationChapterId": 5,
        "simulationCategoryId": 5,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 83: Xuất hiện gia súc từ vệ đường đi ra đường quốc lộ ngay trước mặt xe bạn",
        "description": "Tình huống số 83: Xuất hiện gia súc từ vệ đường đi ra đường quốc lộ ngay trước mặt xe bạn",
        "video": "https://scenarios-zeta.vercel.app/83.mp4",
        "totalTime": 23.72,
        "startPoint": 10.600000000000001,
        "endPoint": 13.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 84,
        "simulationChapterId": 5,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 84: Xe con phía trước giảm tốc độ đột ngột và chuyển làn để tránh xe buýt đang dừng",
        "description": "Tình huống số 84: Xe con phía trước giảm tốc độ đột ngột và chuyển làn để tránh xe buýt đang dừng",
        "video": "https://scenarios-zeta.vercel.app/84.mp4",
        "totalTime": 24.83,
        "startPoint": 12.5,
        "endPoint": 16.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 85,
        "simulationChapterId": 5,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 85: Khúc gỗ trên xe tải phía trước bị rơi xuống do xe phanh gấp",
        "description": "Tình huống số 85: Khúc gỗ trên xe tải phía trước bị rơi xuống do xe phanh gấp",
        "video": "https://scenarios-zeta.vercel.app/85.mp4",
        "totalTime": 32.94,
        "startPoint": 19.1,
        "endPoint": 21.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 86,
        "simulationChapterId": 5,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 86: Xe con đi phía trước giảnh tốc và chuyển làn đột ngột để tránh chướng ngại vật",
        "description": "Tình huống số 86: Xe con đi phía trước giảnh tốc và chuyển làn đột ngột để tránh chướng ngại vật",
        "video": "https://scenarios-zeta.vercel.app/86.mp4",
        "totalTime": 24.23,
        "startPoint": 7.5,
        "endPoint": 11.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 87,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 87: Đi qua chỗ giao cắt với đường sắt ban đêm, không có đèn tín hiệu, phia sau xe con, đột nhiên có tàu đi tới",
        "description": "Tình huống số 87: Đi qua chỗ giao cắt với đường sắt ban đêm, không có đèn tín hiệu, phia sau xe con, đột nhiên có tàu đi tới",
        "video": "https://scenarios-zeta.vercel.app/87.mp4",
        "totalTime": 27.729999999999997,
        "startPoint": 6.800000000000001,
        "endPoint": 11.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 88,
        "simulationChapterId": 5,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 88: Xe mô-tô phánh và chuyển làn để tránh xe buýt vào trả khách",
        "description": "Tình huống số 88: Xe mô-tô phánh và chuyển làn để tránh xe buýt vào trả khách",
        "video": "https://scenarios-zeta.vercel.app/88.mp4",
        "totalTime": 24.74,
        "startPoint": 14.2,
        "endPoint": 17.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 89,
        "simulationChapterId": 5,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 89: Xe đạt từ bên kia đường đối diện bang qua đường khong quan sát trước mặt xe bạn",
        "description": "Tình huống số 89: Xe đạt từ bên kia đường đối diện bang qua đường khong quan sát trước mặt xe bạn",
        "video": "https://scenarios-zeta.vercel.app/89.mp4",
        "totalTime": 23.98,
        "startPoint": 11.8,
        "endPoint": 15.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 90,
        "simulationChapterId": 5,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 90: Xe bán tải phía trước giảm tốc độ và chuyển làn khẩn cấp để tránh xe mô-tô đi ngược chiều",
        "description": "Tình huống số 90: Xe bán tải phía trước giảm tốc độ và chuyển làn khẩn cấp để tránh xe mô-tô đi ngược chiều",
        "video": "https://scenarios-zeta.vercel.app/90.mp4",
        "totalTime": 22.53,
        "startPoint": 9.600000000000001,
        "endPoint": 13.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 91,
        "simulationChapterId": 6,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 91: [Tai nạn] xe ô tô innova lùi trên cao tốc Hà Nội – Thái Nguyên",
        "description": "Tình huống số 91: [Tai nạn] xe ô tô innova lùi trên cao tốc Hà Nội – Thái Nguyên",
        "video": "https://scenarios-zeta.vercel.app/91.mp4",
        "totalTime": 24.06,
        "startPoint": 8.7,
        "endPoint": 13.100000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 92,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 92: [Tai nạn] xe mô-tô lấn làn vượt ẩu trên đường núi, va chạm với xe khách đi ngược chiều",
        "description": "Tình huống số 92: [Tai nạn] xe mô-tô lấn làn vượt ẩu trên đường núi, va chạm với xe khách đi ngược chiều",
        "video": "https://scenarios-zeta.vercel.app/92.mp4",
        "totalTime": 18.69,
        "startPoint": 8,
        "endPoint": 11.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 93,
        "simulationChapterId": 6,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 93: [Tai nạn] xe con từ làn trong cùng bên trái lần làn vượt ẩu để đi ra đường nhánh, va chạm với xe tải",
        "description": "Tình huống số 93: [Tai nạn] xe con từ làn trong cùng bên trái lần làn vượt ẩu để đi ra đường nhánh, va chạm với xe tải",
        "video": "https://scenarios-zeta.vercel.app/93.mp4",
        "totalTime": 30.21,
        "startPoint": 15.899999999999999,
        "endPoint": 19.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 94,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 94: [Tai nạn] tai nạn liên hoàn giữa 3 xe khách do đâm vào xe đang dừng đỗ để sửa chữa",
        "description": "Tình huống số 94: [Tai nạn] tai nạn liên hoàn giữa 3 xe khách do đâm vào xe đang dừng đỗ để sửa chữa",
        "video": "https://scenarios-zeta.vercel.app/94.mp4",
        "totalTime": 34.47,
        "startPoint": 20.4,
        "endPoint": 24.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 95,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 95: [Tai nạn] tài xế giật mình đánh lái gấp đâm vào dải phân cách, xe đổ vào đám đông làm 5 người thiệt mạng",
        "description": "Tình huống số 95: [Tai nạn] tài xế giật mình đánh lái gấp đâm vào dải phân cách, xe đổ vào đám đông làm 5 người thiệt mạng",
        "video": "https://scenarios-zeta.vercel.app/95.mp4",
        "totalTime": 22.27,
        "startPoint": 8.3,
        "endPoint": 13.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 96,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 96: [Tai nạn] tai nạn xe container không làm chủ tốc độ dâm trực diện vào xe ô tô con đang dừng chờ đèn đỏ",
        "description": "Tình huống số 96: [Tai nạn] tai nạn xe container không làm chủ tốc độ dâm trực diện vào xe ô tô con đang dừng chờ đèn đỏ",
        "video": "https://scenarios-zeta.vercel.app/96.mp4",
        "totalTime": 26.96,
        "startPoint": 20.5,
        "endPoint": 23.7,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 97,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 97: [Tai nạn] xe khách vào cua với tốc độ cao, lấn sang đường ngược chiều va chạm với xe đi chiều ngược lại",
        "description": "Tình huống số 97: [Tai nạn] xe khách vào cua với tốc độ cao, lấn sang đường ngược chiều va chạm với xe đi chiều ngược lại",
        "video": "https://scenarios-zeta.vercel.app/97.mp4",
        "totalTime": 39.42,
        "startPoint": 22,
        "endPoint": 24.8,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 98,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 98: [Tai nạn] tai nạn đèn prenn xe khách mất lái đâm vào người điều tiết giao thông và xe khách đi ngược chiều",
        "description": "Tình huống số 98: [Tai nạn] tai nạn đèn prenn xe khách mất lái đâm vào người điều tiết giao thông và xe khách đi ngược chiều",
        "video": "https://scenarios-zeta.vercel.app/98.mp4",
        "totalTime": 32.68,
        "startPoint": 16.8,
        "endPoint": 20.4,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 99,
        "simulationChapterId": 6,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 99: [Tai nạn] hầm Hải Vân xe kéo rơ mooc mất lái lấn làn đâm trực diện vào xe tải đi chiều ngược lại gây tai nạn",
        "description": "Tình huống số 99: [Tai nạn] hầm Hải Vân xe kéo rơ mooc mất lái lấn làn đâm trực diện vào xe tải đi chiều ngược lại gây tai nạn",
        "video": "https://scenarios-zeta.vercel.app/99.mp4",
        "totalTime": 30.97,
        "startPoint": 19,
        "endPoint": 22,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 100,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 100: [Tai nạn] xe ô tô con chở người đi qua đường sắt tại Nam Định không chú ý va chạm với tàu hỏa",
        "description": "Tình huống số 100: [Tai nạn] xe ô tô con chở người đi qua đường sắt tại Nam Định không chú ý va chạm với tàu hỏa",
        "video": "https://scenarios-zeta.vercel.app/100.mp4",
        "totalTime": 24.74,
        "startPoint": 11.2,
        "endPoint": 14.100000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 101,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 101: [Tai nạn] xe ô tô 16 chỗ chở khách rẽ trái qua đường sắt không chú ý va chạm với tàu hỏa",
        "description": "Tình huống số 101: [Tai nạn] xe ô tô 16 chỗ chở khách rẽ trái qua đường sắt không chú ý va chạm với tàu hỏa",
        "video": "https://scenarios-zeta.vercel.app/101.mp4",
        "totalTime": 29.689999999999998,
        "startPoint": 14.8,
        "endPoint": 17,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 102,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 102: [Tai nạn] xe khác va chạm với xe cứu hỏa đi ngược chiều tại nút giao Pháp Vân",
        "description": "Tình huống số 102: [Tai nạn] xe khác va chạm với xe cứu hỏa đi ngược chiều tại nút giao Pháp Vân",
        "video": "https://scenarios-zeta.vercel.app/102.mp4",
        "totalTime": 23.55,
        "startPoint": 15,
        "endPoint": 18.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 103,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 103: [Tai nạn] Phía trước đột nhiên có xe ô tô từ làn đối diện đi ngược chiều va chạm với xe con",
        "description": "Tình huống số 103: [Tai nạn] Phía trước đột nhiên có xe ô tô từ làn đối diện đi ngược chiều va chạm với xe con",
        "video": "https://scenarios-zeta.vercel.app/103.mp4",
        "totalTime": 27.9,
        "startPoint": 19.5,
        "endPoint": 22.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 104,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 104: [Tai nạn] Tai ngã tư Hàng Xanh, lái xe ô tô con trong tình trạng có nồng độ cồn không làm chủ tốc độ đâm vào loạt xe dừng chờ đèn đỏ",
        "description": "Tình huống số 104: [Tai nạn] Tai ngã tư Hàng Xanh, lái xe ô tô con trong tình trạng có nồng độ cồn không làm chủ tốc độ đâm vào loạt xe dừng chờ đèn đỏ",
        "video": "https://scenarios-zeta.vercel.app/104.mp4",
        "totalTime": 30.630000000000003,
        "startPoint": 22,
        "endPoint": 24.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 105,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 105: [Tai nạn] xe khách 45 chỗ đâm vào xe đầu kéo rơ moóc chở máy ủi đi từ đường tránh ra gây tai nọn thảm khốc",
        "description": "Tình huống số 105: [Tai nạn] xe khách 45 chỗ đâm vào xe đầu kéo rơ moóc chở máy ủi đi từ đường tránh ra gây tai nọn thảm khốc",
        "video": "https://scenarios-zeta.vercel.app/105.mp4",
        "totalTime": 23.89,
        "startPoint": 13.5,
        "endPoint": 16,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 106,
        "simulationChapterId": 6,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 106: [Tai nạn] Xe khách 48 chỗ thiếu kỹ năng điều khiển, không thông thuốc địa hình lao xuống vực tại Kon Tum",
        "description": "Tình huống số 106: [Tai nạn] Xe khách 48 chỗ thiếu kỹ năng điều khiển, không thông thuốc địa hình lao xuống vực tại Kon Tum",
        "video": "https://scenarios-zeta.vercel.app/106.mp4",
        "totalTime": 33.79,
        "startPoint": 19,
        "endPoint": 22.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 107,
        "simulationChapterId": 6,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 107: [Tai nạn] Xe Khách chạy vượt xe tải, đâm trực diện vào xe khách đi chiều ngược lại gây tai nạn liên hoàn 3 xe",
        "description": "Tình huống số 107: [Tai nạn] Xe Khách chạy vượt xe tải, đâm trực diện vào xe khách đi chiều ngược lại gây tai nạn liên hoàn 3 xe",
        "video": "https://scenarios-zeta.vercel.app/107.mp4",
        "totalTime": 35.33,
        "startPoint": 15,
        "endPoint": 18,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 108,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 108: [Tai nạn] Trường mưa, đường trơn trược xe tải khi vào cua không làm chủ tốc độ đã đâm vào xe ben đi ngược chiều",
        "description": "Tình huống số 108: [Tai nạn] Trường mưa, đường trơn trược xe tải khi vào cua không làm chủ tốc độ đã đâm vào xe ben đi ngược chiều",
        "video": "https://scenarios-zeta.vercel.app/108.mp4",
        "totalTime": 30.29,
        "startPoint": 22.6,
        "endPoint": 25,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 109,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 109: [Tai nạn] xe 16 chỗ từ đường nhanh, khuất tầm nhìn rẽ vào đường chính không giảm tốc độ, bị xe sơ mi rơ moóc đâm vào (tại Ngã 3 Nà Phặc – Bắc Kạn)",
        "description": "Tình huống số 109: [Tai nạn] xe 16 chỗ từ đường nhanh, khuất tầm nhìn rẽ vào đường chính không giảm tốc độ, bị xe sơ mi rơ moóc đâm vào (tại Ngã 3 Nà Phặc – Bắc Kạn)",
        "video": "https://scenarios-zeta.vercel.app/109.mp4",
        "totalTime": 24.74,
        "startPoint": 12.2,
        "endPoint": 15.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 110,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 110: Tai nạn] Xe container bất ngờ tông vào hang loạt phương tiện đang dừng đèn đỏ tại quốc lộ 1, đoạn nút giao Mỹ Phước – Tân Vạn, Bình Dương",
        "description": "Tình huống số 110: Tai nạn] Xe container bất ngờ tông vào hang loạt phương tiện đang dừng đèn đỏ tại quốc lộ 1, đoạn nút giao Mỹ Phước – Tân Vạn, Bình Dương",
        "video": "https://scenarios-zeta.vercel.app/110.mp4",
        "totalTime": 23.46,
        "startPoint": 12,
        "endPoint": 15,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 111,
        "simulationChapterId": 6,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 111: [Tai nạn] Xe khách lấn làn vượt xe tải chỗ đường cong",
        "description": "Tình huống số 111: [Tai nạn] Xe khách lấn làn vượt xe tải chỗ đường cong",
        "video": "https://scenarios-zeta.vercel.app/111.mp4",
        "totalTime": 17.41,
        "startPoint": 11.399999999999999,
        "endPoint": 14.600000000000001,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 112,
        "simulationChapterId": 6,
        "simulationCategoryId": 4,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 112:  [Tai nạn] Xe khách 16 chỗ vượt ẩu qua xe đầu kéo va chạm với xe khách đang xuống dốc tốc độ cao",
        "description": "Tình huống số 112:  [Tai nạn] Xe khách 16 chỗ vượt ẩu qua xe đầu kéo va chạm với xe khách đang xuống dốc tốc độ cao",
        "video": "https://scenarios-zeta.vercel.app/112.mp4",
        "totalTime": 20.9,
        "startPoint": 7.1,
        "endPoint": 11,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 113,
        "simulationChapterId": 6,
        "simulationCategoryId": 2,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 113: [Tai nạn] Khi đen tín hiệu chuyển sang xanh, đột ngột có xe con cố vượt từ đường giao bên trái sang làm va chạm với xe con",
        "description": "Tình huống số 113: [Tai nạn] Khi đen tín hiệu chuyển sang xanh, đột ngột có xe con cố vượt từ đường giao bên trái sang làm va chạm với xe con",
        "video": "https://scenarios-zeta.vercel.app/113.mp4",
        "totalTime": 22.01,
        "startPoint": 16.7,
        "endPoint": 19.6,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 114,
        "simulationChapterId": 6,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 114: [Tai nạn] ô tô 7 chỗ đi trên cầu treo hẹp ban đêm, tài xe lái xe va chạm với xe máy, xe dâm xuống song tại cầu treo qua song Giăng, Thanh Chương, Nghệ An",
        "description": "Tình huống số 114: [Tai nạn] ô tô 7 chỗ đi trên cầu treo hẹp ban đêm, tài xe lái xe va chạm với xe máy, xe dâm xuống song tại cầu treo qua song Giăng, Thanh Chương, Nghệ An",
        "video": "https://scenarios-zeta.vercel.app/114.mp4",
        "totalTime": 31.4,
        "startPoint": 12,
        "endPoint": 16.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 115,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 115: [Tai nạn] Xe con phanh gấp tránh xe máy từ ngõ lao ra, xe khách không làm chủ tốc độ đã đâm trực diện vào xe con",
        "description": "Tình huống số 115: [Tai nạn] Xe con phanh gấp tránh xe máy từ ngõ lao ra, xe khách không làm chủ tốc độ đã đâm trực diện vào xe con",
        "video": "https://scenarios-zeta.vercel.app/115.mp4",
        "totalTime": 22.95,
        "startPoint": 12.5,
        "endPoint": 16,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 116,
        "simulationChapterId": 6,
        "simulationCategoryId": 6,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 116: [Tai nạn] Phía trước có đá lở đột ngột và rơi xuống (tai nạn tại Đồng Văn, Hà Giang)",
        "description": "Tình huống số 116: [Tai nạn] Phía trước có đá lở đột ngột và rơi xuống (tai nạn tại Đồng Văn, Hà Giang)",
        "video": "https://scenarios-zeta.vercel.app/116.mp4",
        "totalTime": 23.81,
        "startPoint": 10.600000000000001,
        "endPoint": 15.2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 117,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 2,
        "name": "Tình huống số 117: [Tai nạn] Xe con phanh gấp tránh xe máy từ ngõ lao ra, xe khách không làm chủ tốc độ đã đâm trực diện vào xe con",
        "description": "Tình huống số 117: [Tai nạn] Xe con phanh gấp tránh xe máy từ ngõ lao ra, xe khách không làm chủ tốc độ đã đâm trực diện vào xe con",
        "video": "https://scenarios-zeta.vercel.app/117.mp4",
        "totalTime": 19.28,
        "startPoint": 10.600000000000001,
        "endPoint": 13,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 118,
        "simulationChapterId": 6,
        "simulationCategoryId": 3,
        "simulationDifficultyLevelId": 1,
        "name": "Tình huống số 118: [Tai nạn] Xe 16 chỗ rẽ không quan sát, không làm chủ tốc độ đâm vào xe bán tải đang lùi",
        "description": "Tình huống số 118: [Tai nạn] Xe 16 chỗ rẽ không quan sát, không làm chủ tốc độ đâm vào xe bán tải đang lùi",
        "video": "https://scenarios-zeta.vercel.app/118.mp4",
        "totalTime": 23.12,
        "startPoint": 10.5,
        "endPoint": 15.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 119,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 119: [Tai nạn] Xe khách không tuân thủ khoảng cách an toàn xử lý tình huống không kịp dẫn tới va chạm với xe tải đang dừng đỗ",
        "description": "Tình huống số 119: [Tai nạn] Xe khách không tuân thủ khoảng cách an toàn xử lý tình huống không kịp dẫn tới va chạm với xe tải đang dừng đỗ",
        "video": "https://scenarios-zeta.vercel.app/119.mp4",
        "totalTime": 29.950000000000003,
        "startPoint": 11.7,
        "endPoint": 14.5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 120,
        "simulationChapterId": 6,
        "simulationCategoryId": 1,
        "simulationDifficultyLevelId": 3,
        "name": "Tình huống số 120: [Tai nạn] Xe tải không làm chủ đường tốc độ mất lái lao vào chợ dân sinh và va chạm với các xe đang đi phía trước",
        "description": "Tình huống số 120: [Tai nạn] Xe tải không làm chủ đường tốc độ mất lái lao vào chợ dân sinh và va chạm với các xe đang đi phía trước",
        "video": "https://scenarios-zeta.vercel.app/120.mp4",
        "totalTime": 33.36,
        "startPoint": 13.600000000000001,
        "endPoint": 16.3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 8
export const situationExams = [
    {
        "id": 1,
        "title": "title_1",
        "description": "description_1",
        "duration": 1800,
        "passScore": 100,
        "isRandom": 0,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "title": "title_2",
        "description": "description_2",
        "duration": 1800,
        "passScore": 100,
        "isRandom": 0,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 2
    }
];

// 9
export const simulationExams = [
    {
        "id": 1,
        "simulationId": 1,
        "situationExamId": 3,
        "baseScore": 5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "simulationId": 2,
        "situationExamId": 3,
        "baseScore": 10,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 10
export const simulationSessions = [
    {
        "id": 1,
        "situationExamId": 1,
        "userId": 3,
        "totalScore": 90,
        "totalDuration": 1234,
        "isPassed": 1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "situationExamId": 2,
        "userId": 3,
        "totalScore": 80,
        "totalDuration": 1357,
        "isPassed": 1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 11
export const simulationSessionDetails = [
    {
        "id": 1,
        "simulationExamId": 1,
        "simulationSessionId": 3,
        "durationSecond": 4,
        "score": 3,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "simulationExamId": 2,
        "simulationSessionId": 3,
        "durationSecond": 7,
        "score": 5,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 12
export const drivingLicenses = [
    {
        "id": 1,
        "name": "A1",
        "description": "Description of A1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "A2",
        "description": "Description of A2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 2
    },
    {
        "id": 3,
        "name": "A3",
        "description": "Description of A3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 3
    },
    {
        "id": 4,
        "name": "A4",
        "description": "Description of A4",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 4
    },
    {
        "id": 5,
        "name": "A5",
        "description": "Description of A5",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 5
    },
    {
        "id": 6,
        "name": "A6",
        "description": "Description of A6",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 6
    }
];

// 13
export const vehicles = [
    {
        "id": 1,
        "drivingLicenseId": 1,
        "name": "name_80",
        "description": "description_36",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "drivingLicenseId": 2,
        "name": "name_23",
        "description": "description_79",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 14
export const userLicenses = [
    {
        "id": 1,
        "userId": 1,
        "drivingLicenseId": 1,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "userId": 2,
        "drivingLicenseId": 2,
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    }
];

// 15
export const questionChapters = [
    {
        "id": 1,
        "drivingLicenseId": 1,
        "name": "Chapter 1",
        "description": "Description of Chapter 1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "drivingLicenseId": 1,
        "name": "Chapter 2",
        "description": "Description of Chapter 2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 2
    },
    {
        "id": 3,
        "drivingLicenseId": 1,
        "name": "Chapter 3",
        "description": "Description of Chapter 3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 3
    },
    {
        "id": 4,
        "drivingLicenseId": 1,
        "name": "Chapter 4",
        "description": "Description of Chapter 4",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 4
    },
    {
        "id": 5,
        "drivingLicenseId": 1,
        "name": "Chapter 5",
        "description": "Description of Chapter 5",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 5
    },
    {
        "id": 6,
        "drivingLicenseId": 2,
        "name": "Chapter 6",
        "description": "Description of Chapter 1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 6
    },
    {
        "id": 7,
        "drivingLicenseId": 2,
        "name": "Chapter 7",
        "description": "Description of Chapter 2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 7
    },
    {
        "id": 8,
        "drivingLicenseId": 2,
        "name": "Chapter 8",
        "description": "Description of Chapter 3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 8
    },
    {
        "id": 9,
        "drivingLicenseId": 2,
        "name": "Chapter 9",
        "description": "Description of Chapter 4",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 9
    },
    {
        "id": 10,
        "drivingLicenseId": 3,
        "name": "Chapter 10",
        "description": "Description of Chapter 1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 10
    },
    {
        "id": 11,
        "drivingLicenseId": 3,
        "name": "Chapter 11",
        "description": "Description of Chapter 2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 11
    },
    {
        "id": 12,
        "drivingLicenseId": 3,
        "name": "Chapter 12",
        "description": "Description of Chapter 3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 12
    },
    {
        "id": 13,
        "drivingLicenseId": 4,
        "name": "Chapter 13",
        "description": "Description of Chapter 1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 13
    },
    {
        "id": 14,
        "drivingLicenseId": 4,
        "name": "Chapter 14",
        "description": "Description of Chapter 2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 14
    },
    {
        "id": 15,
        "drivingLicenseId": 5,
        "name": "Chapter 15",
        "description": "Description of Chapter 1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 15
    }
];

// 16
export const questionLessons = [
    {
        "id": 1,
        "questionChapterId": 1,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "questionChapterId": 1,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 2
    },
    {
        "id": 3,
        "questionChapterId": 1,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 3
    },
    {
        "id": 4,
        "questionChapterId": 1,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 4
    },
    {
        "id": 5,
        "questionChapterId": 1,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 5
    },
    {
        "id": 6,
        "questionChapterId": 1,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 6
    },
    {
        "id": 7,
        "questionChapterId": 1,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 7
    },
    {
        "id": 8,
        "questionChapterId": 1,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 8
    },
    {
        "id": 9,
        "questionChapterId": 1,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 9
    },
    {
        "id": 10,
        "questionChapterId": 1,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 10
    },
    {
        "id": 11,
        "questionChapterId": 2,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 11
    },
    {
        "id": 12,
        "questionChapterId": 2,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 12
    },
    {
        "id": 13,
        "questionChapterId": 2,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 13
    },
    {
        "id": 14,
        "questionChapterId": 2,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 14
    },
    {
        "id": 15,
        "questionChapterId": 2,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 15
    },
    {
        "id": 16,
        "questionChapterId": 2,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 16
    },
    {
        "id": 17,
        "questionChapterId": 2,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 17
    },
    {
        "id": 18,
        "questionChapterId": 2,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 18
    },
    {
        "id": 19,
        "questionChapterId": 2,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 19
    },
    {
        "id": 20,
        "questionChapterId": 2,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 20
    },
    {
        "id": 21,
        "questionChapterId": 3,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 21
    },
    {
        "id": 22,
        "questionChapterId": 3,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 22
    },
    {
        "id": 23,
        "questionChapterId": 3,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 23
    },
    {
        "id": 24,
        "questionChapterId": 3,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 24
    },
    {
        "id": 25,
        "questionChapterId": 3,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 25
    },
    {
        "id": 26,
        "questionChapterId": 3,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 26
    },
    {
        "id": 27,
        "questionChapterId": 3,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 27
    },
    {
        "id": 28,
        "questionChapterId": 3,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 28
    },
    {
        "id": 29,
        "questionChapterId": 3,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 29
    },
    {
        "id": 30,
        "questionChapterId": 3,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 30
    },
    {
        "id": 31,
        "questionChapterId": 4,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 31
    },
    {
        "id": 32,
        "questionChapterId": 4,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 32
    },
    {
        "id": 33,
        "questionChapterId": 4,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 33
    },
    {
        "id": 34,
        "questionChapterId": 4,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 34
    },
    {
        "id": 35,
        "questionChapterId": 4,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 35
    },
    {
        "id": 36,
        "questionChapterId": 4,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 36
    },
    {
        "id": 37,
        "questionChapterId": 4,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 37
    },
    {
        "id": 38,
        "questionChapterId": 4,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 38
    },
    {
        "id": 39,
        "questionChapterId": 4,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 39
    },
    {
        "id": 40,
        "questionChapterId": 4,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 40
    },
    {
        "id": 41,
        "questionChapterId": 5,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 41
    },
    {
        "id": 42,
        "questionChapterId": 5,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 42
    },
    {
        "id": 43,
        "questionChapterId": 5,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 43
    },
    {
        "id": 44,
        "questionChapterId": 5,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 44
    },
    {
        "id": 45,
        "questionChapterId": 5,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 45
    },
    {
        "id": 46,
        "questionChapterId": 5,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 46
    },
    {
        "id": 47,
        "questionChapterId": 5,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 47
    },
    {
        "id": 48,
        "questionChapterId": 5,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 48
    },
    {
        "id": 49,
        "questionChapterId": 5,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 49
    },
    {
        "id": 50,
        "questionChapterId": 5,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 50
    },
    {
        "id": 51,
        "questionChapterId": 6,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 51
    },
    {
        "id": 52,
        "questionChapterId": 6,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 52
    },
    {
        "id": 53,
        "questionChapterId": 6,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 53
    },
    {
        "id": 54,
        "questionChapterId": 6,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 54
    },
    {
        "id": 55,
        "questionChapterId": 6,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 55
    },
    {
        "id": 56,
        "questionChapterId": 6,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 56
    },
    {
        "id": 57,
        "questionChapterId": 6,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 57
    },
    {
        "id": 58,
        "questionChapterId": 6,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 58
    },
    {
        "id": 59,
        "questionChapterId": 6,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 59
    },
    {
        "id": 60,
        "questionChapterId": 6,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 60
    },
    {
        "id": 61,
        "questionChapterId": 7,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 61
    },
    {
        "id": 62,
        "questionChapterId": 7,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 62
    },
    {
        "id": 63,
        "questionChapterId": 7,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 63
    },
    {
        "id": 64,
        "questionChapterId": 7,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 64
    },
    {
        "id": 65,
        "questionChapterId": 7,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 65
    },
    {
        "id": 66,
        "questionChapterId": 7,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 66
    },
    {
        "id": 67,
        "questionChapterId": 7,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 67
    },
    {
        "id": 68,
        "questionChapterId": 7,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 68
    },
    {
        "id": 69,
        "questionChapterId": 7,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 69
    },
    {
        "id": 70,
        "questionChapterId": 7,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 70
    },
    {
        "id": 71,
        "questionChapterId": 8,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 71
    },
    {
        "id": 72,
        "questionChapterId": 8,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 72
    },
    {
        "id": 73,
        "questionChapterId": 8,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 73
    },
    {
        "id": 74,
        "questionChapterId": 8,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 74
    },
    {
        "id": 75,
        "questionChapterId": 8,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 75
    },
    {
        "id": 76,
        "questionChapterId": 8,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 76
    },
    {
        "id": 77,
        "questionChapterId": 8,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 77
    },
    {
        "id": 78,
        "questionChapterId": 8,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 78
    },
    {
        "id": 79,
        "questionChapterId": 8,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 79
    },
    {
        "id": 80,
        "questionChapterId": 8,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 80
    },
    {
        "id": 81,
        "questionChapterId": 9,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 81
    },
    {
        "id": 82,
        "questionChapterId": 9,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 82
    },
    {
        "id": 83,
        "questionChapterId": 9,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 83
    },
    {
        "id": 84,
        "questionChapterId": 9,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 84
    },
    {
        "id": 85,
        "questionChapterId": 9,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 85
    },
    {
        "id": 86,
        "questionChapterId": 9,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 86
    },
    {
        "id": 87,
        "questionChapterId": 9,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 87
    },
    {
        "id": 88,
        "questionChapterId": 9,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 88
    },
    {
        "id": 89,
        "questionChapterId": 9,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 89
    },
    {
        "id": 90,
        "questionChapterId": 9,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 90
    },
    {
        "id": 91,
        "questionChapterId": 10,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 91
    },
    {
        "id": 92,
        "questionChapterId": 10,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 92
    },
    {
        "id": 93,
        "questionChapterId": 10,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 93
    },
    {
        "id": 94,
        "questionChapterId": 10,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 94
    },
    {
        "id": 95,
        "questionChapterId": 10,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 95
    },
    {
        "id": 96,
        "questionChapterId": 10,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 96
    },
    {
        "id": 97,
        "questionChapterId": 10,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 97
    },
    {
        "id": 98,
        "questionChapterId": 10,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 98
    },
    {
        "id": 99,
        "questionChapterId": 10,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 99
    },
    {
        "id": 100,
        "questionChapterId": 10,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 100
    },
    {
        "id": 101,
        "questionChapterId": 11,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 101
    },
    {
        "id": 102,
        "questionChapterId": 11,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 102
    },
    {
        "id": 103,
        "questionChapterId": 11,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 103
    },
    {
        "id": 104,
        "questionChapterId": 11,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 104
    },
    {
        "id": 105,
        "questionChapterId": 11,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 105
    },
    {
        "id": 106,
        "questionChapterId": 11,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 106
    },
    {
        "id": 107,
        "questionChapterId": 11,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 107
    },
    {
        "id": 108,
        "questionChapterId": 11,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 108
    },
    {
        "id": 109,
        "questionChapterId": 11,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 109
    },
    {
        "id": 110,
        "questionChapterId": 11,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 110
    },
    {
        "id": 111,
        "questionChapterId": 12,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 111
    },
    {
        "id": 112,
        "questionChapterId": 12,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 112
    },
    {
        "id": 113,
        "questionChapterId": 12,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 113
    },
    {
        "id": 114,
        "questionChapterId": 12,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 114
    },
    {
        "id": 115,
        "questionChapterId": 12,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 115
    },
    {
        "id": 116,
        "questionChapterId": 12,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 116
    },
    {
        "id": 117,
        "questionChapterId": 12,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 117
    },
    {
        "id": 118,
        "questionChapterId": 12,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 118
    },
    {
        "id": 119,
        "questionChapterId": 12,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 119
    },
    {
        "id": 120,
        "questionChapterId": 12,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 120
    },
    {
        "id": 121,
        "questionChapterId": 13,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 121
    },
    {
        "id": 122,
        "questionChapterId": 13,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 122
    },
    {
        "id": 123,
        "questionChapterId": 13,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 123
    },
    {
        "id": 124,
        "questionChapterId": 13,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 124
    },
    {
        "id": 125,
        "questionChapterId": 13,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 125
    },
    {
        "id": 126,
        "questionChapterId": 13,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 126
    },
    {
        "id": 127,
        "questionChapterId": 13,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 127
    },
    {
        "id": 128,
        "questionChapterId": 13,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 128
    },
    {
        "id": 129,
        "questionChapterId": 13,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 129
    },
    {
        "id": 130,
        "questionChapterId": 13,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 130
    },
    {
        "id": 131,
        "questionChapterId": 14,
        "name": "Lesson 1",
        "description": "Description of Lesson 1",
        "content": "<h2>Bài học 1</h2><p>Nội dung bài học 1.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 131
    },
    {
        "id": 132,
        "questionChapterId": 14,
        "name": "Lesson 2",
        "description": "Description of Lesson 2",
        "content": "<h2>Bài học 2</h2><p>Nội dung bài học 2.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 132
    },
    {
        "id": 133,
        "questionChapterId": 14,
        "name": "Lesson 3",
        "description": "Description of Lesson 3",
        "content": "<h2>Bài học 3</h2><p>Nội dung bài học 3.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 133
    },
    {
        "id": 134,
        "questionChapterId": 14,
        "name": "Lesson 4",
        "description": "Description of Lesson 4",
        "content": "<h2>Bài học 4</h2><p>Nội dung bài học 4.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 134
    },
    {
        "id": 135,
        "questionChapterId": 14,
        "name": "Lesson 5",
        "description": "Description of Lesson 5",
        "content": "<h2>Bài học 5</h2><p>Nội dung bài học 5.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 135
    },
    {
        "id": 136,
        "questionChapterId": 14,
        "name": "Lesson 6",
        "description": "Description of Lesson 6",
        "content": "<h2>Bài học 6</h2><p>Nội dung bài học 6.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 136
    },
    {
        "id": 137,
        "questionChapterId": 14,
        "name": "Lesson 7",
        "description": "Description of Lesson 7",
        "content": "<h2>Bài học 7</h2><p>Nội dung bài học 7.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 137
    },
    {
        "id": 138,
        "questionChapterId": 14,
        "name": "Lesson 8",
        "description": "Description of Lesson 8",
        "content": "<h2>Bài học 8</h2><p>Nội dung bài học 8.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 138
    },
    {
        "id": 139,
        "questionChapterId": 14,
        "name": "Lesson 9",
        "description": "Description of Lesson 9",
        "content": "<h2>Bài học 9</h2><p>Nội dung bài học 9.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 139
    },
    {
        "id": 140,
        "questionChapterId": 14,
        "name": "Lesson 10",
        "description": "Description of Lesson 10",
        "content": "<h2>Bài học 10</h2><p>Nội dung bài học 10.</p>",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 140
    }
];

// 17
// export const lessonImages = ;

// 18
// export const lessonProgresses = ;

// 19
// export const questionTopics = ;

// 20
export const questionCategories = [
    {
        "id": 1,
        "name": "category_1",
        "description": "description_category_1",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 1
    },
    {
        "id": 2,
        "name": "category_2",
        "description": "description_category_2",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 2
    },
    {
        "id": 3,
        "name": "category_3",
        "description": "description_category_3",
        "createAt": "2026-03-08 0:00:00",
        "updateAt": "2026-03-08 0:00:01",
        "status": 3
    }
];

// 22
// export const tags = ;

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

// 21
// export const questionChapters = ;
export const questions = [
    { id: 1, content: 'Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì? Biển báo tròn viền đỏ có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 2, content: 'Khi đèn giao thông màu vàng, bạn phải làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 3, content: 'Tốc độ tối đa trong khu dân cư là bao nhiêu?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 4, content: 'Người điều khiển xe phải mang theo giấy tờ gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 5, content: 'Biển báo hình tam giác có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },

    { id: 6, content: 'Khi gặp người đi bộ qua đường, bạn cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 7, content: 'Khoảng cách an toàn khi chạy xe là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 8, content: 'Đèn đỏ được phép rẽ phải khi nào?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 9, content: 'Biển báo nền xanh là loại biển gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 10, content: 'Khi trời mưa, bạn nên làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },

    { id: 11, content: 'Tác dụng của dây an toàn là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 12, content: 'Khi xe phía trước phanh gấp, bạn nên làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 13, content: 'Biển cấm vượt có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 14, content: 'Khi vào vòng xuyến, bạn phải nhường đường cho ai?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 15, content: 'Nồng độ cồn cho phép khi lái xe là bao nhiêu?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },

    { id: 16, content: 'Biển báo chữ P có nghĩa là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 17, content: 'Khi xe gặp sự cố giữa đường, cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 18, content: 'Khi đi ban đêm, cần bật đèn gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 19, content: 'Đường một chiều là gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 20, content: 'Biển báo nền vàng thường dùng trong trường hợp nào?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },

    { id: 21, content: 'Khi gặp xe ưu tiên, bạn cần làm gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 22, content: 'Vạch kẻ đường màu vàng có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 23, content: 'Khi quay đầu xe, cần chú ý điều gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 24, content: 'Biển STOP có ý nghĩa gì?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 25, content: 'Khi điều khiển xe máy, có bắt buộc đội mũ bảo hiểm không?', type: 'single', questionLessonId: 1, questionCategoryId: 1, correctAnswer: 1, status: 1 },

    { id: 26, content: 'Khi gặp tai nạn giao thông, bạn nên làm gì?', type: 'single', questionLessonId: 2, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 27, content: 'Biển báo hình chữ nhật thường dùng để làm gì?', type: 'single', questionLessonId: 2, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 28, content: 'Khi lái xe đường dài, cần chú ý điều gì?', type: 'single', questionLessonId: 2, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 29, content: 'Đèn chiếu xa dùng khi nào?', type: 'single', questionLessonId: 2, questionCategoryId: 1, correctAnswer: 1, status: 1 },
    { id: 30, content: 'Người lái xe phải tuân thủ điều gì quan trọng nhất?', type: 'single', questionLessonId: 2, questionCategoryId: 1, correctAnswer: 1, status: 1 }
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
    { id: 80, questionId: 26, content: 'Bỏ đi', isCorrect: false, status: 1 },
    { id: 81, questionId: 26, content: 'Tự ý giải quyết', isCorrect: false, status: 1 },

    // Question 27 (3 answers)
    { id: 82, questionId: 27, content: 'Chỉ dẫn thông tin', isCorrect: true, status: 1 },
    { id: 83, questionId: 27, content: 'Cấm đường', isCorrect: false, status: 1 },
    { id: 84, questionId: 27, content: 'Nguy hiểm', isCorrect: false, status: 1 },

    // Question 28 (3 answers)
    { id: 85, questionId: 28, content: 'Nghỉ ngơi hợp lý', isCorrect: true, status: 1 },
    { id: 86, questionId: 28, content: 'Lái liên tục', isCorrect: false, status: 1 },
    { id: 87, questionId: 28, content: 'Không cần nghỉ', isCorrect: false, status: 1 },

    // Question 29 (1 answers)
    { id: 88, questionId: 29, content: 'Đường vắng, không có xe đối diện', isCorrect: true, status: 1 },
    { id: 89, questionId: 29, content: 'Trong thành phố đông xe', isCorrect: false, status: 1 },
    { id: 90, questionId: 29, content: 'Khi dừng xe', isCorrect: false, status: 1 },

    // Question 30 (1 answers)
    { id: 91, questionId: 30, content: 'Luật giao thông', isCorrect: true, status: 1 },
    { id: 92, questionId: 30, content: 'Theo cảm tính', isCorrect: false, status: 1 },
    { id: 93, questionId: 30, content: 'Theo người khác', isCorrect: false, status: 1 },
    { id: 94, questionId: 30, content: 'Theo bà hàng xóm', isCorrect: false, status: 1 },
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

export const lessonProgresses = [
    { id: 1, userId: 1, questionLessonId: 1, status: 1, score: 90 },
    { id: 2, userId: 1, questionLessonId: 1, status: 1, score: 50 },
    { id: 3, userId: 1, questionLessonId: 1, status: 1, score: 70 },
    { id: 4, userId: 1, questionLessonId: 2, status: 1, score: 40 },
    { id: 5, userId: 1, questionLessonId: 4, status: 1, score: 80 },
    { id: 6, userId: 2, questionLessonId: 1, status: 1, score: 60 },
    { id: 7, userId: 2, questionLessonId: 2, status: 1, score: 10 },
    { id: 8, userId: 2, questionLessonId: 3, status: 1, score: 30 },
];



