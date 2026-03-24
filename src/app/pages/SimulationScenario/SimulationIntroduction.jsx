import { Link } from 'react-router-dom';
import StarsBackground from '../../components/StarsBackground/StarsBackground';

import './SimulationIntroduction.css';

export default function SimulationIntroduction() {
    return (
        <div className='simulation-introduction-container'>
            <StarsBackground />
            <div className='container'>
                <div className='content'>
                    <h2>Ôn tập 120 tình huống mô phỏng giao thông thi giấy phép lái xe ô tô</h2>
                    <p>
                        Ôn tập 120 tình huống mô phỏng giao thông thi giấy phép lái xe ô tô
                        120 tình huống mô phỏng giao thông trong học lái xe B, C1, C, D1,
                        do <span className='bold'>SDLS</span> biên soạn và phát triển dựa vào các tình huống thực tế giao thông của Việt Nam.
                        Dựa trên thực tế, cấu trúc nội dung của <span className='bold'>phần mềm thi thử mô phỏng 120 tình huống giao thông</span> này bao gồm:
                    </p>
                    <ul>
                        <li><b>Chương I:</b> 29 tình huống xoay quanh các tình huống thực tế khi tham gia giao thông trong khu đô thị, khu dân cư đông đúc.</li>
                        <li><b>Chương II:</b> 13 tình huống từ 30 - 43 xoay quanh các tình huống thực tế thường xuyên gặp phải khi tham gia giao thông trên đường ở nông thôn, ở các đoạn đường gấp khúc, vào buổi tối, có gia súc, sử dụng đèn chiếu xa, ...</li>
                        <li><b>Chương III:</b> 19 tình huống từ 44 - 63 xoay quanh các tình huống thực tế thường xuyên gặp phải khi tham gia giao thông trên đường cao tốc.</li>
                        <li><b>Chương IV:</b> 9 tình huống từ 64 - 73 xoay quanh các tình huống thực tế khi điều khiển tham gia giao thông trên đường núi như vượt xe, lên dốc xuống dốc, khúc cua gấp, ...</li>
                        <li><b>Chương V:</b> 16 tình huống từ 64 - 90 xoay quanh các tình huống thực tế khi tham gia giao thông ở khu vực ngoại thành.</li>
                        <li><b>Chương VI:</b> 29 tình huống từ 91 - 120 xoay quanh các tình huống va chạm thực tế khi tham gia giao thông hỗn hợp.</li>
                        <li><span><b>Lưu ý:</b> Bộ 120 câu hỏi mô phỏng tình huống giao thông được phát triển dựa trên tình hình giao thông thực tế do Tổng Cục Đường Bộ Việt Nam ban hành. Các tình huống đều rất sát sao và đặc biệt nghiêm trọng khi tham gia giao thông rất dễ xảy ra. Nếu học thuộc hết 120 tình huống này đồng nghĩa bạn đã nắm chắc việc thi đậu mô phỏng 100% không cần lo lắng ngoài ra còn có thêm kỹ năng thực tế khi tham gia giao thông.</span></li>
                    </ul>
                    <p><b>Phương pháp chấm điểm:</b></p>
                    <ul>
                        <li>Trong mỗi tình huống có 02 mốc thời điểm là <span className='bold'>5đ</span> và <span className='bold'>0đ</span>.</li>
                        <li><span className='bold'>5 điểm:</span> Thời điểm bắt đầu có dấu hiệu phát hiện ra tình huống nguy hiểm, lái xe cần phải xử lý.</li>
                        <li><span className='bold'>0 điểm:</span> Mốc thời điểm mà xử lý từ thời điểm này vẫn xảy ra tai nạn.</li>
                        <li>Học viên lựa chọn được giữa hai mốc này sẽ đạt mức điểm tương ứng từ 5-4-3-2-1 điểm (tối đa điểm cho mỗi tình huống là 5đ).</li>
                    </ul>
                    <p><b>Hướng dẫn ôn tập:</b></p>
                    <ul>
                        <li>Bấm nút trong danh sách các nút bên phải màn hình để chọn tình huống.</li>
                        <li><span className='bold'>Bấm phím SPACE (phím cách) trong khi làm mô phỏng khi phát hiện tình huống nguy hiểm.</span></li>
                        <li>Bấm nút "Bắt đầu lại" bên dưới video để bắt đầu lại.</li>
                    </ul>
                </div>
                <Link to={`./scenarios`} className='link'>
                    <i className='fa-regular fa-play-circle' />
                    <h2>BẮT ĐẦU <span>ÔN TẬP</span></h2>
                    <p>120 tình huống mô phỏng giao thông online</p>
                </Link>
            </div>
        </div>
    )
}
