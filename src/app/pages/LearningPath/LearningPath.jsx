import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, postData } from '../../../mocks/CallingAPI';
import HeadingComponent from '../../components/HeadingComponent/HeadingComponent';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import { useAuth } from '../../hooks/AuthContext/AuthContext';

import './LearningPath.css';

export default function LearningPath() {
    const { user, refreshNewToken } = useAuth();

    const [Messages, setMessages] = useState([]);
    const [DRIVINGLICENSEs, setDRIVINGLICENSEs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingLicense, setLoadingLicense] = useState(true);
    const [error, setError] = useState(null);

    const [selectedDrivingLicenseId, setSelectedDrivingLicenseId] = useState('');

    useEffect(() => {
        (async () => {
            setError(null);
            setLoadingLicense(true);
            const token = user?.token || '';
            try {
                const drivingLicenseQuery = new URLSearchParams({
                    status: 1,
                });
                const DrivingLicenseResponse = await fetchData(`DrivingLicenses/all?${drivingLicenseQuery.toString()}`, token);
                console.log('DrivingLicenseResponse', DrivingLicenseResponse);

                setDRIVINGLICENSEs(DrivingLicenseResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoadingLicense(false);
            }
        })();
    }, [refresh, user?.token]);

    useEffect(() => {
        setMessages(['Chào bạn! 👋 Tôi là trợ lý AI đào tạo lái xe thông minh của SDLS.']);
    }, [user]);

    const addMessage = async (newMessage) => {
        console.log('newMessage: ', newMessage);
        const SendMessage = {
            prompt: newMessage,
            userIdentifier: user?.id,
        };
        setLoading(true);
        const token = user?.token;
        try {
            const result = await postData('Chat/ask', SendMessage, token);
            console.log('result', result);
            if (result?.reply?.includes('The model is overloaded. Please try again later.')) {
                setMessages((prev) => [...prev, 'Kết nối không ổn định, bạn hãy thử lại sau nhé!']);
            } else {
                setMessages((prev) => [...prev, result.reply]);
            }
        } catch (error) {
            setMessages((prev) => [...prev, 'Kết nối không ổn định, bạn hãy thử lại sau nhé!']);
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [Messages]);

    const addMyMessage = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (e.target.chat.value && loading === false) {
            addMyMessage(e.target.chat.value);
            addMessage(e.target.chat.value);
            e.target.chat.value = '';
        }
    };

    const renderFormattedText = (text) => {
        // Bước 1: Tách từng dòng theo dấu `*`
        const lines = text.replace(/###/g, '').replace(/##/g, '').split(/(?<=\s)\*(?=\s)/);

        return lines.map((line, idx) => {
            // Bước 2: Tách và xử lý in đậm từng phần trong dòng
            const parts = line.split(/(\*\*.*?\*\*)/g); // Giữ lại các đoạn có **...**
            return (
                <div key={idx}>
                    {parts.map((part, i) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={i}>{part.slice(2, -2)}</strong>
                        ) : (
                            <span key={i}>{part}</span>
                        )
                    )}
                </div>
            );
        });
    };

    const listMaterials = [
        { icon: 'fa-solid fa-book', name: 'Bài học lý thuyết', color: '#60a5fa', link: '/driving-license', },
        { icon: 'fa-solid fa-question-circle', name: 'Bài học trắc nghiệm', color: '#34d399', link: '/learning/theory-question', },
        { icon: 'fa-solid fa-triangle-exclamation', name: 'Biển báo giao thông', color: '#fb923c', link: '/learning/list-traffic-sign', },
        { icon: 'fa-regular fa-play-circle', name: 'Trình mô phỏng lái', color: '#fb6f84', link: '/simulation', },
    ];

    return (
        <div className='learning-path-container'>
            <StarsBackground />
            <HeadingComponent
                badge='AI Learning Path'
                title='Lộ trình học thông minh'
                subtitle='GREENLIGHT AI sẽ tạo kế hoạch ôn thi cá nhân hóa phù hợp với mục tiêu của bạn.'
                back={false}
            />
            <div className='container'>
                <div className='left'>
                    {/* <div className='select-license card'>
                        <div className='header'>
                            <div className='title'>
                                <div className='icon-box'>
                                    <i className='fa-solid fa-graduation-cap' />
                                </div>
                                <div>
                                    <h2>Chọn bằng lái</h2>
                                    <p>Xác định mục tiêu</p>
                                </div>
                            </div>
                            <button className='btn' onClick={() => setRefresh(p => p + 1)} disabled={loadingLicense}>Tải lại danh sách</button>
                        </div>
                        <div className='list-license'>
                            {DRIVINGLICENSEs.map((license, index) => (
                                <button
                                    key={license.id}
                                    className={`btn ${selectedDrivingLicenseId == license.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedDrivingLicenseId(p => p == license.id ? '' : license.id)}
                                >
                                    <div>{license.name} - {license.description}</div>
                                </button>
                            ))}
                        </div>
                    </div> */}

                    <div className='chat-box'>
                        <div className='heading'>
                            <div className='name'>
                                GREENLIGHT
                            </div>
                        </div>
                        <div ref={chatContainerRef} className='chat-content'>
                            {Messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`message ${idx % 2 === 0 ? 'bot-message' : 'user-message'}`}
                                >
                                    <div>{renderFormattedText(msg)}</div>
                                    <div className='logo-bot'><i className='fa-solid fa-cube' /></div>
                                </div>
                            ))}
                            {loading && (
                                <div className='typing-indicator'>
                                    <div className='dot'></div>
                                    <div className='dot'></div>
                                    <div className='dot'></div>
                                    <div className='logo-bot'><i className='fa-solid fa-cube' /></div>
                                </div>
                            )}
                        </div>
                        <div className='quick-question'>

                        </div>
                        <form onSubmit={handleSend}>
                            <div className='form-group'>
                                <i className='fa-solid fa-comment-dots input-icon' />
                                <input
                                    type='text'
                                    id='chat'
                                    name='chat'
                                    placeholder='Nhập tin nhắn của bạn...'
                                    disabled={loading}
                                />
                            </div>
                            <button className='btn' type='submit' disabled={loading} title='Gửi tin nhắn'>
                                {loading ? (
                                    <i className='fa-solid fa-spinner fa-spin' />
                                ) : (
                                    <i className='fa-solid fa-paper-plane' />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className='right'>
                    <div className='learning-material card'>
                        <div className='header'>
                            <i className='fa-solid fa-chart-column' />
                            <h2>Tài nguyên học tập</h2>
                        </div>
                        <div className='list-link'>
                            {listMaterials.map((material, index) => (
                                <Link to={material.link} key={index} className='material-item'>
                                    <div className='icon-box' style={{ borderColor: material.color }}>
                                        <i className={material.icon} style={{ color: material.color }} />
                                    </div>
                                    <div className='name'>{material.name}</div>
                                    <i className='fa-solid fa-arrow-right' />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='tips'>
                        <div className='header'>
                            <i className='fa-solid fa-trophy' />
                            <h2>Mẹo thành công</h2>
                        </div>
                        <p>
                            Học viên ôn thi với lộ trình có cấu trúc rõ ràng
                            có tỉ lệ đậu cao hơn <span>2.5 lần</span> so với học tự do. Hãy cam kết theo kế hoạch!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
