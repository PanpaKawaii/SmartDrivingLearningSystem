import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { block1, block2, block3, block4, block5, block6 } from '../../../mocks/blocks.js';
import { postData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Cube from '../Cube/Cube.jsx';
import MessagePreview from './MessagePreview.jsx';

import './BoxChat.css';

export default function BoxChat() {
    const { user } = useAuth();

    const location = useLocation();

    const [Messages, setMessages] = useState([]);
    const [WidthFull, setWidthFull] = useState(false);
    const [HeightFull, setHeightFull] = useState(false);
    const [DisplayChat, setDisplayChat] = useState(false);
    const [blockIndex, setBlockIndex] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 5000); // 5s
            return () => clearTimeout(timer);
        }
    }, [visible]);

    useEffect(() => {
        if (location.state?.openBoxChat == 'true') setDisplayChat(true);
        else if (location.state?.openBoxChat == 'false') setDisplayChat(false);
    }, [location.state]);

    useEffect(() => {
        setMessages(['Xin chào! Tôi là trợ lý AI của bạn. Hãy đặt câu hỏi để tôi hỗ trợ nhé!']);
        setVisible(true);
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
            if (result.reply?.includes('The model is overloaded. Please try again later.')) {
                setMessages((prev) => [...prev, 'Kết nối không ổn định, bạn hãy thử lại sau nhé!']);
                setVisible(true);
            } else {
                setMessages((prev) => [...prev, result.reply]);
                setVisible(true);
            }
        } catch (error) {
            setMessages((prev) => [...prev, 'Kết nối không ổn định, bạn hãy thử lại sau nhé!']);
            setVisible(true);
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
    }, [Messages, DisplayChat]);

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

    const StyleNormal = {
        width: '320px',
        height: '420px',
    };
    const StyleHeight = {
        width: '320px',
        height: '80vh',
    };
    const StyleFull = {
        width: 'calc(100vw - 40px)',
        height: '80vh',
        maxWidth: '1000px',
    };

    let chatStyle = StyleNormal;
    if (WidthFull) {
        chatStyle = StyleFull;
    } else if (HeightFull) {
        chatStyle = StyleHeight;
    };

    const blocks = [block1, block2, block3, block4, block5, block6];
    const changeBlock = () => {
        setBlockIndex((prev) => (prev + 1) % blocks.length);
    };

    const renderFormattedText = (text) => {
        // Bước 1: Tách từng dòng theo dấu `*`
        const lines = text.split(/(?<=\s)\*(?=\s)/);

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



    // Drag and Drop Logic
    const iconRef = useRef(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        dragging.current = true;

        const rect = iconRef.current.getBoundingClientRect();

        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging.current) return;

        const x = e.clientX - offset.current.x;
        const y = e.clientY - offset.current.y;

        iconRef.current.style.left = `${Math.max(0, Math.min(window.innerWidth - iconRef.current.offsetWidth, x))}px`;
        iconRef.current.style.top = `${Math.max(0, Math.min(window.innerHeight - iconRef.current.offsetHeight, y))}px`;
    };

    const handleMouseUp = () => {
        dragging.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        // vị trí mặc định góc phải dưới
        const x = window.innerWidth - 100;
        const y = window.innerHeight - 100;

        iconRef.current.style.left = `${x}px`;
        iconRef.current.style.top = `${y}px`;
    }, []);

    return (
        <div className='box-chat-container'>
            <div
                ref={iconRef}
                className='icon-box'
                onMouseDown={handleMouseDown}
            >
                <MessagePreview visible={visible} message={Messages?.[Messages.length - 1]} />
                <Cube
                    color={'#68FCFF'}
                    onClickCube={() => setDisplayChat(p => !p)}
                    faces={blocks?.[blockIndex ?? 1] || []}
                />
            </div>
            {DisplayChat &&
                <div className='chat-box' style={chatStyle}>
                    <div className='heading'>
                        <div className='name'>
                            GREENLIGHT
                        </div>
                        <div className='controls'>
                            <i className='fa-solid fa-arrow-right-arrow-left' onClick={changeBlock} title='Đổi hình khối' />
                            {WidthFull ?
                                <i className='fa-solid fa-compress-arrows-alt' onClick={() => setWidthFull(false)} title='Thu nhỏ' />
                                :
                                <i className='fa-solid fa-arrows-alt' onClick={() => setWidthFull(true)} title='Mở rộng' />
                            }
                            {HeightFull ?
                                <i className='fa-solid fa-arrows-alt-v' onClick={() => setHeightFull(false)} title='Thu nhỏ chiều cao' />
                                :
                                <i className='fa-solid fa-arrows-alt-v' onClick={() => setHeightFull(true)} title='Mở rộng chiều cao' />
                            }
                            <i className='fa-solid fa-times' onClick={() => { setDisplayChat(false), setVisible(false) }} title='Đóng' />
                        </div>
                    </div>
                    <div ref={chatContainerRef} className='chat-content'>
                        <div className='welcome-message'>
                            <i className='fa-solid fa-comments welcome-icon' />
                            <div className='welcome-text'>
                                <h3>Chào mừng bạn đến với GREENLIGHT AI!</h3>
                                <p>Hãy bắt đầu cuộc trò chuyện bằng cách nhập tin nhắn bên dưới.</p>
                            </div>
                        </div>
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
            }
        </div>
    )
}