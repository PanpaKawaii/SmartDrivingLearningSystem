import { useState, useEffect } from 'react';
import MovingLabelInput from '../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../components/StyleLabelSelect/StyleLabelSelect';
import { fetchData } from '../../../mocks/CallingAPI';

export default function ProfileEdit({ formData, handleFieldChange, handleSaveProfile, setIsEditing, user, isSaving }) {
    const [licenseOptions, setLicenseOptions] = useState([]); // Danh sách toàn bộ bằng lái từ API
    const [errors, setErrors] = useState({});

    // 1. Lấy danh sách bằng lái từ API
    useEffect(() => {
        const getLicenses = async () => {
            try {
                const data = await fetchData('DrivingLicenses/all', user?.token);
                if (data && Array.isArray(data)) {
                    // Cần giữ lại ID để gửi về Backend
                    const formattedList = data.map(item => ({
                        id: item.id,   // GUID của bằng lái
                        name: item.name // Tên hiển thị (A1, B2...)
                    }));
                    setLicenseOptions(formattedList);
                }
            } catch (error) {
                console.error("Lỗi lấy danh sách bằng lái:", error);
            }
        };
        getLicenses();
    }, [user?.token]);

    const genderList = [
        { id: 'Male', name: 'Nam' },
        { id: 'Female', name: 'Nữ' }
    ];

    // Hàm xử lý khi tick/untick một bằng lái đã có
    const handleToggleOwnedLicense = (licenseId) => {
        const currentIds = formData.drivingLicenseIds || [];
        if (currentIds.includes(licenseId)) {
            handleFieldChange('drivingLicenseIds', currentIds.filter(id => id !== licenseId));
        } else {
            handleFieldChange('drivingLicenseIds', [...currentIds, licenseId]);
        }
    };

    const validate = () => {
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSaveProfile(e);
        } else {
            alert("Vui lòng kiểm tra lại thông tin nhập liệu!");
        }
    };

    return (
        <form className='profile-form' onSubmit={handleSubmit}>
            {/* Họ và tên */}
            <div className='form-group full-width-input'>
                <MovingLabelInput
                    type='text' label='Họ và tên' labelStyle='moving left'
                    value={formData.name}
                    onValueChange={(val) => handleFieldChange('name', val)}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className='form-row'>
                <div className='form-group half'>
                    <MovingLabelInput
                        type='tel' label='Số điện thoại' labelStyle='moving left'
                        value={formData.phone}
                        onValueChange={(val) => handleFieldChange('phone', val)}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className='form-group half'>
                    <MovingLabelInput
                        type='date' label='Ngày sinh' labelStyle='stay left'
                        value={formData.dateOfBirth}
                        onValueChange={(val) => handleFieldChange('dateOfBirth', val)}
                    />
                    {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>
            </div>

            <div className='form-row'>
                <div className='form-group half'>
                    <StyleLabelSelect
                        label='Giới tính' labelStyle='left' list={genderList}
                        value={formData.gender}
                        onValueChange={(val) => handleFieldChange('gender', val)}
                    />
                </div>
                <div className='form-group half'>
                    <StyleLabelSelect
                        label='Hạng bằng đang học' labelStyle='left'
                        list={licenseOptions.map(l => ({ id: l.name, name: l.name }))} // Dùng name cho licenseType
                        value={formData.licenseType}
                        onValueChange={(val) => handleFieldChange('licenseType', val)}
                    />
                </div>
            </div>

            {/* PHẦN MỚI: Chọn các bằng lái đã có (Driving Licenses) */}
            <div className='form-group full-width-input'>
                <label className='default-label'>Các bằng lái đã sở hữu</label>
                <div className='license-checkbox-grid'>
                    {licenseOptions.map((license) => (
                        <label key={license.id} className={`license-checkbox-item ${formData.drivingLicenseIds?.includes(license.id) ? 'active' : ''}`}>
                            <input
                                type="checkbox"
                                checked={formData.drivingLicenseIds?.includes(license.id) || false}
                                onChange={() => handleToggleOwnedLicense(license.id)}
                            />
                            <span>{license.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className='form-group full-width-input'>
                <label className='default-label'>Mô tả cá nhân</label>
                <textarea
                    name='description' value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    rows='3' placeholder='Vài nét về bản thân...'
                ></textarea>
            </div>

            {/* Dữ liệu hệ thống */}
            <div className='form-readonly-group'>
                <p className='readonly-note'><i className='fa-solid fa-shield-halved'></i> Dữ liệu hệ thống</p>
                <div className='readonly-grid'>
                    <div className='readonly-item'>
                        <label>Email</label>
                        <input type='text' value={user?.email || ''} disabled />
                    </div>
                    <div className='readonly-item'>
                        <label>Vai trò</label>
                        <input type='text' value={user?.roleName || 'Student'} disabled />
                    </div>
                </div>
            </div>

            <div className='form-actions'>
                <button
                    type='button'
                    className='cancel-btn outline-btn'
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving} // Khóa nút khi đang lưu
                >
                    Hủy
                </button>

                <button
                    type='submit'
                    className={`save-btn primary-btn ${isSaving ? 'loading' : ''}`}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                        </>
                    ) : (
                        'Lưu thay đổi'
                    )}
                </button>
            </div>
        </form>
    );
}