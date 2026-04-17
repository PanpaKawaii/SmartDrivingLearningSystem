import MovingLabelInput from '../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../components/StyleLabelSelect/StyleLabelSelect';

export default function ProfileEdit({ formData, handleFieldChange, handleSaveProfile, setIsEditing, user }) {
    const genderList = [
        { id: 'Male', name: 'Nam' },
        { id: 'Female', name: 'Nữ' },
        { id: 'Other', name: 'Khác' }
    ];

    const licenseList = [
        { id: 'B1', name: 'Hạng B1' },
        { id: 'B2', name: 'Hạng B2' },
        { id: 'C', name: 'Hạng C' }
    ];

    return (
        <form className='profile-form' onSubmit={handleSaveProfile}>
            <div className='form-group full-width-input'>
                <MovingLabelInput
                    type='text' label='Họ và tên' labelStyle='moving left'
                    value={formData.name}
                    onValueChange={(val) => handleFieldChange('name', val)}
                />
            </div>

            <div className='form-row'>
                <div className='form-group half'>
                    <MovingLabelInput
                        type='tel' label='Số điện thoại' labelStyle='moving left'
                        value={formData.phone}
                        onValueChange={(val) => handleFieldChange('phone', val)}
                    />
                </div>
                <div className='form-group half'>
                    <MovingLabelInput
                        type='date' label='Ngày sinh' labelStyle='stay left'
                        value={formData.dateOfBirth}
                        onValueChange={(val) => handleFieldChange('dateOfBirth', val)}
                    />
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
                        label='Hạng bằng lái' labelStyle='left' list={licenseList}
                        value={formData.licenseType}
                        onValueChange={(val) => handleFieldChange('licenseType', val)}
                    />
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
                <button type='button' className='cancel-btn outline-btn' onClick={() => setIsEditing(false)}>Hủy</button>
                <button type='submit' className='save-btn primary-btn'>Lưu thay đổi</button>
            </div>
        </form>
    );
}