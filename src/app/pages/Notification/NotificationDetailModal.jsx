import React from 'react';
import { createPortal } from 'react-dom';
import './NotificationDetailModal.css';

export default function NotificationDetailModal({ data, onClose }) {
    if (!data) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Chi tiết thông báo</h2>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <h1 className="detail-title">{data.title}</h1>
                    <div className="detail-meta">
                        <span>
                            <i className="fa-regular fa-clock"></i> {new Date(data.createAt).toLocaleString('vi-VN')}
                        </span>
                    </div>
                    <div className="detail-divider"></div>
                    <div className="detail-content">
                        {data.content}
                    </div>
                    {data.image && (
                        <div className="detail-image">
                            <img src={data.image} alt="notification" />
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="footer-close-btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>,
        document.body
    );
}