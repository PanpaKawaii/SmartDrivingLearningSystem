import { useEffect, useRef, useState } from 'react';

import './ControlledVideo.css';

export default function ControlledVideo({
    selectedScenario = null,
}) {
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
                } else {
                    video.play();
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedScenario]);

    const handleRestart = () => {
        const video = videoRef.current;

        video.pause();
        video.currentTime = 0;
        video.load();
        video.play();

        lastTimeRef.current = 0;
        setVideoTimeInSeconds(null);
    };

    const FirstWhite = 100 * selectedScenario?.startPoint / videoRef.current?.duration;
    console.log('FirstWhite', FirstWhite);
    const LastWhite = 100 - (100 * selectedScenario?.endPoint / videoRef.current?.duration);
    console.log('LastWhite', LastWhite);
    const MiddlePoint = (20 * (selectedScenario?.endPoint - selectedScenario?.startPoint) / videoRef.current?.duration);
    console.log('MiddlePoint', MiddlePoint);

    return (
        <div className='controlled-video-container'>
            {selectedScenario ?
                <>
                    <video
                        ref={videoRef}
                        src={selectedScenario?.video || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                        autoPlay
                        muted
                        playsInline
                        preload='auto'
                    />
                    <div className='content'>
                        <div className='bar'>
                            <div
                                className='fill'
                                style={{
                                    width: `${progressPercent}%`,
                                    backgroundColor: progressPercent > 80 ? '#ef4444' : '#3b82f6',
                                }}
                            />
                        </div>
                        {videoTimeInSeconds &&
                            <div className='bar point-bar'>
                                <div
                                    className='fill point white-point'
                                    style={{ width: `${FirstWhite}%` }}
                                />
                                {[...Array(5)].map((_, pIndex) => (
                                    <div
                                        key={pIndex}
                                        className='fill point'
                                        style={{
                                            width: `${MiddlePoint}%`,
                                            background: `linear-gradient(to right, hsl(${120 - pIndex * 30}, 60%, 60%), hsl(${120 - pIndex * 30}, 60%, 50%))`,
                                        }}
                                    />
                                ))}
                                <div
                                    className='fill point white-point'
                                    style={{ flex: 1 }}
                                />
                            </div>
                        }

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
                </>
                :
                <div
                    ref={videoRef}
                    className='no-video'
                >
                    Hãy chọn một kịch bản
                </div>
            }
        </div>
    )
}
