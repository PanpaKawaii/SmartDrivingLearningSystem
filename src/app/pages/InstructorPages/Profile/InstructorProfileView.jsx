import React from 'react';

export default function InstructorProfileView({ formData, user }) {
    return (
        <div className='profile-view-details'>
            <div className='ins-detail-grid'>
                <div className='ins-detail-field'>
                    <span className='ins-detail-label'>Họ và tên</span>
                    <span className='ins-detail-value'>{formData.name || '-'}</span>
                </div>
                <div className='ins-detail-field'>
                    <span className='ins-detail-label'>Số điện thoại</span>
                    <span className='ins-detail-value'>{formData.phone || '-'}</span>
                </div>
                <div className='ins-detail-field'>
                    <span className='ins-detail-label'>Ngày sinh</span>
                    <span className='ins-detail-value'>
                        {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString('vi-VN') : '-'}
                    </span>
                </div>
                <div className='ins-detail-field'>
                    <span className='ins-detail-label'>Giới tính</span>
                    <span className='ins-detail-value'>
                        {formData.gender === 'Male' ? 'Nam' : formData.gender === 'Female' ? 'Nữ' : 'Khác'}
                    </span>
                </div>
                <div className='ins-detail-field full-width'>
                    <span className='ins-detail-label'>Mô tả cá nhân</span>
                    <span className='ins-detail-value'>{formData.description || 'Chưa cung cấp thông tin.'}</span>
                </div>
            </div>

            <div className='system-meta-info'>
                <div className='meta-item'>
                    <i className='fa-regular fa-clock'></i>
                    <span>Tham gia: {formData.createAt ? new Date(formData.createAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                </div>
                <div className='meta-item'>
                    <i className='fa-solid fa-clock-rotate-left'></i>
                    <span>Cập nhật: {formData.updateAt ? new Date(formData.updateAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
}