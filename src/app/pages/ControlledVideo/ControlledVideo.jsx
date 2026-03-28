import { useEffect, useRef, useState } from 'react';

import './ControlledVideo.css';

export default function ControlledVideo({
    selectedScenario = null,
    allowRestart = false,
    allowContinue = false,
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
                    // const exactSeconds = Math.floor(lastTimeRef.current);
                    const exactSeconds = lastTimeRef.current;
                    video.pause();
                    setVideoTimeInSeconds(p => !p ? exactSeconds : p);
                    // setVideoTimeInSeconds(exactSeconds);
                    console.log('⏸ Video dừng tại:', exactSeconds, 'giây');
                } else {
                    if (allowContinue) {
                        video.play();
                    }
                }
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            document.removeEventListener('keydown', handleKeyDown);
            setVideoTimeInSeconds(null);
            setProgressPercent(0);
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
    // const LastWhite = 100 - (100 * selectedScenario?.endPoint / videoRef.current?.duration);
    const MiddlePoint = (20 * (selectedScenario?.endPoint - selectedScenario?.startPoint) / videoRef.current?.duration);
    // console.log('FirstWhite', FirstWhite);
    // console.log('LastWhite', LastWhite);
    // console.log('MiddlePoint', MiddlePoint);

    const range = selectedScenario?.endPoint - selectedScenario?.startPoint;
    const smallRange = Number(videoTimeInSeconds) - selectedScenario?.startPoint;
    const percent = smallRange / range;
    console.log('range', range);
    console.log('smallRange', smallRange);
    console.log('percent', percent);
    const maxScore = 10;
    const minScore = 2;
    const point = (smallRange >= 0 && percent >= 0 && percent <= 1) ? maxScore - (maxScore - minScore) * percent : 0;
    console.log('point', point);

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
                        <div className='bars'>
                            <div className='bar'>
                                {/* Video duration - blue */}
                                <div
                                    className='fill'
                                    style={{
                                        width: `${progressPercent}%`,
                                        backgroundColor: progressPercent > 80 ? '#ef4444' : '#3b82f6',
                                    }}
                                />
                                {/* Mark enter event - green */}
                                <div
                                    className='fill'
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: `${100 * videoTimeInSeconds / selectedScenario?.totalTime || 0}%`,
                                        height: 8,
                                        backgroundColor: '#7aef44',
                                    }}
                                />
                                {/* Triangle mark enter event - green */}
                                {videoTimeInSeconds &&
                                    <div className='mark'
                                        style={{
                                            left: `${100 * videoTimeInSeconds / selectedScenario?.totalTime || 0}%`,
                                        }}
                                    ></div>
                                }
                            </div>
                            {videoTimeInSeconds !== null &&
                                <div className='bar point-bar'>
                                    <div
                                        className='fill white-point'
                                        style={{ width: `${FirstWhite}%` }}
                                    />
                                    {[...Array(5)].map((_, pIndex) => (
                                        <div
                                            key={pIndex}
                                            className='fill'
                                            style={{
                                                width: `${MiddlePoint}%`,
                                                background: `linear-gradient(to right, hsl(${120 - pIndex * 30}, 60%, 60%), hsl(${120 - pIndex * 30}, 60%, 50%))`,
                                            }}
                                        />
                                    ))}
                                    <div className='fill white-point last' />
                                </div>
                            }
                        </div>
                        <div className='flex'>
                            {allowRestart &&
                                <button onClick={handleRestart} disabled={!allowRestart}>Bắt đầu lại</button>
                            }
                            {videoTimeInSeconds !== null && (
                                <>
                                    <p>Thời gian: {videoTimeInSeconds?.toFixed(3)} giây</p>
                                    <p>Điểm: {point ? point?.toFixed(3) : 0}</p>
                                </>
                            )}
                        </div>
                        <div className='detail'>
                            <h2>{selectedScenario.name}</h2>
                            <p>{selectedScenario.description}</p>
                        </div>
                    </div>
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
