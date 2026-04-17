import { useState } from 'react';
import { patchData } from '../../../mocks/CallingAPI.js'; // Đảm bảo bạn có patchData hoặc dùng axios.patch
import '../LoginRegister/LoginFace.css'; // Dùng chung CSS với Login/Register nếu phù hợp

export default function ChangePasswordModal({ user, onClose, showFeedback }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ value: '', name: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        // 1. Validation tại chỗ
        if (!currentPassword) {
            setError({ value: 'Vui lòng nhập mật khẩu hiện tại', name: 'currentPassword' });
            return;
        }
        if (newPassword.length < 6) {
            setError({ value: 'Mật khẩu mới phải từ 6 ký tự trở lên', name: 'newPassword' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setError({ value: 'Mật khẩu xác nhận không khớp', name: 'confirmPassword' });
            return;
        }

        try {
            setLoading(true);
            setError({ value: '', name: '' });

            const payload = {
                currentPassword: currentPassword,
                newPassword: newPassword
            };

            // 2. Gọi API 
            // Vì CallingAPI.js viết 'return;', result sẽ là undefined kể cả khi thành công.
            await patchData('User/change-password', payload, user.token);

            // 3. Nếu code chạy được đến đây mà không nhảy vào catch, nghĩa là thành công!
            showFeedback('success', 'Đổi mật khẩu thành công!');
            onClose(); // Đóng popup ngay lập tức

        } catch (err) {
            console.error("Lỗi đổi mật khẩu:", err);

            // 4. Xử lý lỗi dựa trên status trả về từ CallingAPI
            if (err.status === 400) {
                setError({ value: 'Mật khẩu hiện tại không đúng hoặc dữ liệu không hợp lệ', name: 'api' });
            } else if (err.status === 401) {
                setError({ value: 'Phiên làm việc hết hạn, vui lòng đăng nhập lại', name: 'api' });
            } else {
                setError({ value: 'Đã có lỗi xảy ra, vui lòng thử lại', name: 'api' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-face-container reset-password-popup">
            <div className="close-btn-pos" onClick={onClose} style={{ cursor: 'pointer', textAlign: 'right' }}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <h1>ĐỔI MẬT KHẨU</h1>

            <form onSubmit={handleChangePassword}>
                {/* Mật khẩu hiện tại */}
                <div className='form-group'>
                    <input type={passwordVisible ? 'text' : 'password'} name='currentPassword' placeholder='' />
                    <label style={{ color: error.name === 'currentPassword' && '#ff4d4f' }}>Mật khẩu hiện tại</label>
                </div>

                {/* Mật khẩu mới */}
                <div className='form-group'>
                    <input type={passwordVisible ? 'text' : 'password'} name='newPassword' placeholder='' />
                    <label style={{ color: error.name === 'newPassword' && '#ff4d4f' }}>Mật khẩu mới</label>
                    <i className={`fa-solid fa-${passwordVisible ? 'eye-slash' : 'eye'} eye-btn`}
                        onClick={() => setPasswordVisible(p => !p)} />
                </div>

                {/* Xác nhận mật khẩu mới */}
                <div className='form-group'>
                    <input type={passwordVisible ? 'text' : 'password'} name='confirmPassword' placeholder='' />
                    <label style={{ color: error.name === 'confirmPassword' && '#ff4d4f' }}>Xác nhận mật khẩu mới</label>
                </div>

                {error.value && <div className='message error-message'>{error.value}</div>}

                <div className='btn-box'>
                    <button type='submit' className='btn-submit' disabled={loading}>
                        {loading ? 'ĐANG XỬ LÝ...' : 'CẬP NHẬT'}
                    </button>
                    <button type='button' className='btn-reset' onClick={onClose}>HỦY</button>
                </div>
            </form>
        </div>
    );
}