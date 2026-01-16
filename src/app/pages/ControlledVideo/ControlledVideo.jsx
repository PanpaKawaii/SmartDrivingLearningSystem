import { useEffect, useRef, useState } from 'react';

import './ControlledVideo.css';

export default function ControlledVideo() {
    const videoRef = useRef(null);
    const lastTimeRef = useRef(0);

    const [videoTimeInSeconds, setVideoTimeInSeconds] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    console.log('Rerender');

    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            const current = video.currentTime;
            const duration = video.duration || 1;

            lastTimeRef.current = current;

            const percent = (current / duration) * 100;
            setProgressPercent(percent);
        };

        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                e.stopPropagation();

                if (!video.paused) {
                    // const exactSeconds = Math.floor(lastTimeRef.current); // ✅ FIX
                    const exactSeconds = lastTimeRef.current; // ✅ FIX

                    video.pause();
                    setVideoTimeInSeconds(exactSeconds);

                    console.log('⏸ Video dừng tại:', exactSeconds, 'giây');
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleRestart = () => {
        const video = videoRef.current;

        video.pause();
        video.currentTime = 0;
        video.load();
        video.play();

        lastTimeRef.current = 0;
        setVideoTimeInSeconds(null);
    };

    return (
        <div className='controlled-video-container'>
            <video
                ref={videoRef}
                src='https://www.w3schools.com/html/mov_bbb.mp4'
                autoPlay
                muted
                playsInline
                preload='auto'
                style={{
                    width: 640,
                    pointerEvents: 'none',
                }}
            />

            <div style={{ width: 640, marginTop: 8 }}>
                <div
                    style={{
                        height: 6,
                        width: '100%',
                        backgroundColor: '#e5e7eb',
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${progressPercent}%`,
                            backgroundColor:
                                progressPercent > 90 ? '#ef4444' : '#3b82f6',
                            transition: 'width 0.15s linear',
                        }}
                    />
                </div>

                <small>
                    {progressPercent > 95
                        ? 'Video sắp kết thúc'
                        : 'Đang phát'}
                </small>
            </div>

            <div style={{ marginTop: 12 }}>
                <button onClick={handleRestart}>Bắt đầu lại</button>
            </div>

            {videoTimeInSeconds !== null && (
                <p>⏱ Thời gian đã chạy: {videoTimeInSeconds} giây</p>
            )}
        </div>
    )
}
