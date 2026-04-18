import React from 'react';
import './NotificationDropdown.css';

// Đảm bảo có nhận onSelectNoti ở đây
const NotificationDropdown = ({ notifications, onClose, onSelectNoti }) => {
    return (
        <div className="notification-dropdown shadow-lg animate-fade-in">
            <div className="dropdown-header">
                <h3>Thông báo</h3>
            </div>

            <div className="notification-list">
                {notifications && notifications.length > 0 ? (
                    notifications.map((noti) => (
                        <div
                            key={noti.id}
                            // Thêm class 'is-unread' chỉ khi status = 2
                            className={`notification-item ${noti.status === 2 ? 'is-unread' : 'is-read'}`}
                            onClick={() => onSelectNoti(noti.id)}
                        >
                            <div className="noti-icon">
                                {/* Có thể đổi màu icon dựa trên status */}
                                <i className={`fa-solid fa-circle-info ${noti.status === 2 ? 'text-blue' : 'text-gray'}`}></i>
                            </div>
                            <div className="noti-content">
                                <p className="noti-title">{noti.title}</p>
                                <p className="noti-text">{noti.content}</p>
                                <span className="noti-time">
                                    {new Date(noti.createAt).toLocaleString('vi-VN')}
                                </span>
                            </div>

                            {/* QUAN TRỌNG: Chỉ hiện dấu chấm khi status đúng bằng 2 */}
                            {noti.status === 2 && <span className="unread-dot"></span>}
                        </div>
                    ))
                ) : (
                    <div className="empty-noti">Không có thông báo mới</div>
                )}
            </div>

            <div className="dropdown-footer">
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default NotificationDropdown;