import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm để điều hướng nếu logout
import { patchData } from '../../../mocks/CallingAPI.js';
import '../LoginRegister/LoginFace.css';

export default function ChangePasswordModal({ user, onClose, showFeedback, refreshNewToken, logout }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ value: '', name: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        // --- Validate (giữ nguyên logic cũ của bạn) ---
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!currentPassword) {
            setError({ value: 'Vui lòng nhập mật khẩu hiện tại', name: 'currentPassword' });
            return;
        }
        if (!passwordRegex.test(newPassword)) {
            setError({
                value: 'Mật khẩu cần: ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
                name: 'newPassword'
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            setError({ value: 'Mật khẩu xác nhận không trùng khớp', name: 'confirmPassword' });
            return;
        }

        const executeRequest = async (token) => {
            const payload = { currentPassword, newPassword };
            return await patchData('User/change-password', payload, token);
        };

        try {
            setLoading(true);
            setError({ value: '', name: '' });

            try {
                // Lần thử 1 với token hiện tại
                await executeRequest(user.token);
            } catch (err) {
                // Nếu lỗi 401 (Unauthorized), thử refresh token
                if (err.status === 401) {
                    const refreshResult = await refreshNewToken(user);

                    // Nếu refresh thành công và trả về token mới
                    if (refreshResult && refreshResult.token) {
                        // Lần thử 2 với token mới
                        await executeRequest(refreshResult.token);
                    } else {
                        // Nếu refresh thất bại (hết hạn hoàn toàn)
                        logout();
                        navigate('/', { state: { openLogin: 'true' } });
                        throw new Error('Session expired');
                    }
                } else {
                    // Nếu là lỗi khác (400, 500...), ném lỗi ra ngoài để xử lý ở khối catch tổng
                    throw err;
                }
            }

            showFeedback('success', 'Đổi mật khẩu thành công!');
            onClose();

        } catch (err) {
            console.error("Lỗi đổi mật khẩu:", err);
            if (err.message === 'Session expired') return;

            setError({
                value: err.status === 400 ? 'Mật khẩu hiện tại không chính xác' : 'Đã có lỗi xảy ra, vui lòng thử lại',
                name: 'api'
            });
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