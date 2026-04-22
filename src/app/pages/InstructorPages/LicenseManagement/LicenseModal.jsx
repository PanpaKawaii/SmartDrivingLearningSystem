import { useState, useEffect } from 'react';
import Modal from '../../../components/Shared/Modal';
import { postData, putData } from '../../../../mocks/CallingAPI';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';
import '../InstructorPages.css';

const defaultLicense = {
    name: '',
    description: '',
    vehicles: [],
};

export default function LicenseModal({ isOpen, onClose, onSave, license: licenseProp, action }) {
    const { user, refreshNewToken } = useAuth?.() || {};
    const token = user?.token || '';

    const [license, setLicense] = useState({ ...defaultLicense });
    const [vehicles, setVehicles] = useState([]);  // [{ id?, name, description, status }]
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        if (action === 'edit' && licenseProp) {
            setLicense({
                name: licenseProp.name || '',
                description: licenseProp.description || '',
            });
            setVehicles(
                (licenseProp.vehicles || []).map(v => ({
                    id: v.id || '',
                    name: v.name || '',
                    description: v.description || '',
                    status: v.status ?? 1,
                }))
            );
        } else {
            setLicense({ ...defaultLicense });
            setVehicles([]);
        }
        setError('');
    }, [isOpen, action, licenseProp]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicense(prev => ({ ...prev, [name]: value }));
    };

    // Vehicle list handlers
    const handleVehicleChange = (idx, field, value) => {
        setVehicles(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
    };

    const addVehicle = () => {
        setVehicles(prev => [...prev, { name: '', description: '', status: 1 }]);
    };

    const removeVehicle = (idx) => {
        setVehicles(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async () => {
        if (!license.name.trim()) { setError('Tên bằng lái không được để trống.'); return; }
        if (vehicles.some(v => !v.name.trim())) { setError('Tên phương tiện không được để trống.'); return; }

        setSaving(true);
        setError('');
        try {
            if (action === 'edit' && licenseProp?.id) {
                // PUT: name, description, status, vehicles[]
                const payload = {
                    name: license.name.trim(),
                    description: license.description.trim(),
                    status: licenseProp.status ?? 1,
                    vehicles: vehicles.map(v => ({
                        ...(v.id ? { id: v.id, drivingLicenseId: licenseProp.id } : {}),
                        name: v.name.trim(),
                        description: v.description.trim(),
                        status: v.status ?? 1,
                    })),
                };
                try {
                    const res = await putData(`DrivingLicenses/${licenseProp.id}`, payload, token);
                    onSave && onSave(res || { ...licenseProp, ...payload }, 'edit');
                } catch (error) {
                    setError('Lỗi cập nhật bằng lái, vui lòng thử lại.');
                    if (error.status == 401) refreshNewToken(user);
                }
            } else {
                // POST: name, description, vehicles[]
                const payload = {
                    name: license.name.trim(),
                    description: license.description.trim(),
                    vehicles: vehicles.map(v => ({
                        name: v.name.trim(),
                        description: v.description.trim(),
                    })),
                };
                try {
                    const res = await postData('DrivingLicenses', payload, token);
                    onSave && onSave(res, 'create');
                } catch (error) {
                    setError('Lỗi tạo bằng lái, vui lòng thử lại.');
                    if (error.status == 401) refreshNewToken(user);
                }
            }
            onClose();
        } catch (err) {
            setError(err?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={action === 'edit' ? 'Chỉnh sửa bằng lái' : 'Thêm bằng lái mới'}
            footer={
                <>
                    <button className='ins-btn ins-btn-secondary' onClick={onClose} disabled={saving}>Hủy</button>
                    <button className='ins-btn ins-btn-primary' onClick={handleSubmit} disabled={saving}>
                        <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {action === 'edit' ? ' Cập nhật' : ' Lưu'}
                    </button>
                </>
            }
            message={error && <div className='ins-error-banner'><i className='fa-solid fa-triangle-exclamation' /> {error}</div>}
        >

            {/* Tên bằng */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Tên bằng lái <span style={{ color: 'var(--ins-error)' }}>*</span></label>
                <input
                    className='ins-form-input'
                    type='text'
                    name='name'
                    value={license.name}
                    onChange={handleChange}
                    placeholder='Ví dụ: Bằng B1, Bằng B2...'
                    maxLength={255}
                />
            </div>

            {/* Mô tả */}
            <div className='ins-form-group'>
                <label className='ins-form-label'>Mô tả</label>
                <textarea
                    className='ins-form-textarea'
                    name='description'
                    value={license.description}
                    onChange={handleChange}
                    placeholder='Mô tả về hạng bằng lái này...'
                    maxLength={255}
                    style={{ minHeight: '72px' }}
                />
            </div>

            {/* Danh sách phương tiện */}
            <div className='ins-form-group'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label className='ins-form-label' style={{ margin: 0 }}>
                        Phương tiện áp dụng
                        <span style={{ marginLeft: 6, fontWeight: 400, color: 'var(--ins-on-surface-variant)', fontSize: '0.8rem' }}>
                            ({vehicles.length})
                        </span>
                    </label>
                    <button type='button' className='ins-btn ins-btn-secondary' style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={addVehicle}>
                        <i className='fa-solid fa-plus' /> Thêm
                    </button>
                </div>

                {vehicles.length === 0 && (
                    <div style={{ color: 'var(--ins-on-surface-variant)', fontSize: '0.85rem', padding: '12px 0', textAlign: 'center', opacity: 0.6 }}>
                        Chưa có phương tiện nào. Nhấn "Thêm" để bắt đầu.
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {vehicles.map((v, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'flex-start', background: 'var(--ins-surface-low)', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(95,117,165,0.12)' }}>
                            <div className='ins-form-group' style={{ margin: 0 }}>
                                <label className='ins-form-label'>Tên phương tiện *</label>
                                <input
                                    className='ins-form-input'
                                    value={v.name}
                                    onChange={e => handleVehicleChange(idx, 'name', e.target.value)}
                                    placeholder='Ví dụ: Xe máy 50cc...'
                                    maxLength={255}
                                />
                            </div>
                            <div className='ins-form-group' style={{ margin: 0 }}>
                                <label className='ins-form-label'>Mô tả</label>
                                <input
                                    className='ins-form-input'
                                    value={v.description}
                                    onChange={e => handleVehicleChange(idx, 'description', e.target.value)}
                                    placeholder='Mô tả...'
                                    maxLength={255}
                                />
                            </div>
                            <button
                                type='button'
                                className='ins-action-btn delete'
                                style={{ marginTop: 22 }}
                                onClick={() => removeVehicle(idx)}
                                title='Xóa phương tiện'
                            >
                                <i className='fa-solid fa-trash' />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}
