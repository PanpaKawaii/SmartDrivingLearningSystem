import { useEffect, useRef, useState } from 'react';
import './Timer.css';

export default function Timer({
    initialTime,
    direction = 'down', // 'up' | 'down'
    autoStart = true,

    showStartButton = false,
    showPauseButton = false,
    showRestartButton = false,

    onFinish,
    timelines = [],
    color = '#000'
}) {
    const [time, setTime] = useState(
        direction === 'down' ? initialTime : 0
    );
    const [isRunning, setIsRunning] = useState(autoStart);

    const intervalRef = useRef(null);
    const triggeredTimelines = useRef(new Set());

    // Start timer
    const start = () => {
        if (isRunning) return;
        setIsRunning(true);
    };

    // Pause timer
    const pause = () => {
        setIsRunning(false);
    };

    // Restart timer (reset & pause)
    const restart = () => {
        setIsRunning(false);
        triggeredTimelines.current.clear();
        setTime(direction === 'down' ? initialTime : 0);
    };

    // Handle ticking
    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            setTime(prev => {
                const next =
                    direction === 'down' ? Math.max(0, prev - 1) : prev + 1;

                return next;
            });
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, [isRunning, direction]);

    // Handle finish
    useEffect(() => {
        if (direction === 'down' && time === 0) {
            setIsRunning(false);
            onFinish && onFinish();
        }
    }, [time, direction, onFinish]);

    // Handle timeline actions
    useEffect(() => {
        timelines.forEach(({ time: timelineTime, action }) => {
            if (
                time === timelineTime &&
                !triggeredTimelines.current.has(timelineTime)
            ) {
                triggeredTimelines.current.add(timelineTime);
                action();
            }
        });
    }, [time, timelines]);

    return (
        <div className='timer-container'>
            <div className='display' style={{ color: color }}>
                {(() => {
                    const hour = Math.floor(time / 3600);
                    const minute = Math.floor((time % 3600) / 60);
                    const second = Math.floor(time % 60);

                    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute
                        }:${second < 10 ? `0${second}` : second}`;
                })()}
            </div>
            <div className='controls'>
                {showStartButton && !isRunning && (
                    <button onClick={start}>Start</button>
                )}

                {showPauseButton && isRunning && (
                    <button onClick={pause}>Pause</button>
                )}

                {showRestartButton && (
                    <button onClick={restart}>Restart</button>
                )}
            </div>
        </div>
    )
}
