import React, { useState } from 'react';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';

export default function InstructorProfileEdit({ formData, handleFieldChange, handleSaveProfile, setIsEditing, user, isSaving }) {
    const [errors, setErrors] = useState({}); // Quản lý lỗi nhập liệu

    const genderList = [
        { id: 'Male', name: 'Nam' },
        { id: 'Female', name: 'Nữ' }
    ];

    // Hàm kiểm tra dữ liệu trước khi submit
    const validateAndSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        const today = new Date().toISOString().split('T')[0];

        if (!formData.name?.trim()) {
            newErrors.name = 'Họ và tên là bắt buộc';
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải đúng 10 chữ số';
        }

        if (formData.dateOfBirth && formData.dateOfBirth > today) {
            newErrors.dateOfBirth = 'Ngày sinh không được ở tương lai';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Dừng lại nếu có lỗi
        }

        setErrors({});
        handleSaveProfile(e); // Gọi hàm lưu từ component cha
    };

    return (
        <form className='profile-form' onSubmit={validateAndSubmit}>
            {/* Họ và tên */}
            <div className='ins-form-group'>
                <MovingLabelInput
                    type='text'
                    label='Họ và tên'
                    labelStyle='moving left'
                    value={formData.name}
                    onValueChange={(val) => handleFieldChange('name', val)}
                />
                {errors.name && <span className="error-text" style={{ color: '#ff4d4d', fontSize: '12px' }}>{errors.name}</span>}
            </div>

            <div className='form-row'>
                <div className='ins-form-group'>
                    <MovingLabelInput
                        type='tel'
                        label='Số điện thoại'
                        labelStyle='moving left'
                        value={formData.phone}
                        onValueChange={(val) => handleFieldChange('phone', val)}
                    />
                    {errors.phone && <span className="error-text" style={{ color: '#ff4d4d', fontSize: '12px' }}>{errors.phone}</span>}
                </div>
                <div className='ins-form-group'>
                    <MovingLabelInput
                        type='date'
                        label='Ngày sinh'
                        labelStyle='stay left'
                        value={formData.dateOfBirth}
                        onValueChange={(val) => handleFieldChange('dateOfBirth', val)}
                    />
                    {errors.dateOfBirth && <span className="error-text" style={{ color: '#ff4d4d', fontSize: '12px' }}>{errors.dateOfBirth}</span>}
                </div>
            </div>

            <div className='form-row'>
                <div className='ins-form-group'>
                    <StyleLabelSelect
                        label='Giới tính'
                        labelStyle='left'
                        list={genderList}
                        value={formData.gender}
                        onValueChange={(val) => handleFieldChange('gender', val)}
                    />
                </div>
            </div>

            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả cá nhân</label>
                <textarea
                    name='description'
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    rows='3'
                    placeholder='Vài nét về bản thân...'
                    className='ins-form-textarea'
                ></textarea>
            </div>

            <div className='form-readonly-group'>
                <p className='readonly-note'><i className='fa-solid fa-shield-halved'></i> Dữ liệu hệ thống</p>
                <div className='readonly-grid'>
                    <div className='readonly-item'>
                        <label>Email</label>
                        <input type='text' value={user?.email || ''} disabled />
                    </div>
                    <div className='readonly-item'>
                        <label>Vai trò</label>
                        <input type='text' value={user?.roleName || 'Instructor'} disabled />
                    </div>
                </div>
            </div>

            <div className='form-actions'>
                <button
                    type='button'
                    className='profile-action-btn cancel'
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                >
                    Hủy
                </button>
                <button
                    type='submit'
                    className={`profile-action-btn save ${isSaving ? 'loading' : ''}`}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                            Đang lưu...
                        </>
                    ) : (
                        'Lưu thay đổi'
                    )}
                </button>
            </div>
        </form>
    );
}