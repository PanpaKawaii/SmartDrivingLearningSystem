import { useEffect, useRef, useState } from 'react';
import ButtonList from '../../../components/ButtonList/ButtonList';
import PopupContainer from '../../../components/PopupContainer/PopupContainer';
import ReportModal from '../../../components/ReportModal/ReportModal';
import { useAuth } from '../../../hooks/AuthContext/AuthContext';

import './ControlledVideo.css';

export default function ControlledVideo({
    myResults = [],
    selectedScenario = null,
    allowRestart = false,
    allowContinue = false,
    baseScore = 5,
    additionalFunction = () => { },
}) {
    const { user } = useAuth();

    const videoRef = useRef(null);
    const lastTimeRef = useRef(0);

    const [openReport, setOpenReport] = useState(null);

    const [stopMoment, setStopMoment] = useState(null);
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

                    const range = selectedScenario?.endPoint - selectedScenario?.startPoint;
                    const smallRange = Number(exactSeconds) - selectedScenario?.startPoint;
                    const percent = smallRange / range;
                    const maxScore = baseScore;
                    const minScore = 1;
                    const point = (smallRange >= 0 && percent >= 0 && percent <= 1) ?
                        maxScore - Math.floor((maxScore - minScore + 1) * percent)
                        : 0;

                    additionalFunction({
                        simulationExamId: selectedScenario?.simulationExamId,
                        durationSecond: exactSeconds,
                        score: point,
                    });
                    setStopMoment(p => p ? p : exactSeconds);
                    // setStopMoment(exactSeconds);
                    console.log('⏸ Video dừng tại:', exactSeconds, 'giây');
                } else {
                    if (video.ended) {
                        if (allowRestart) {
                            video.currentTime = 0;
                            video.play();
                            lastTimeRef.current = 0;
                            setStopMoment(null);
                        }
                    } else if (allowContinue) {
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
            setStopMoment(null);
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
        setStopMoment(null);
    };

    const FirstWhite = 100 * selectedScenario?.startPoint / videoRef.current?.duration;
    // const LastWhite = 100 - (100 * selectedScenario?.endPoint / videoRef.current?.duration);
    const MiddlePoint = (20 * (selectedScenario?.endPoint - selectedScenario?.startPoint) / videoRef.current?.duration);
    // console.log('FirstWhite', FirstWhite);
    // console.log('LastWhite', LastWhite);
    // console.log('MiddlePoint', MiddlePoint);

    const range = selectedScenario?.endPoint - selectedScenario?.startPoint;
    const smallRange = Number(stopMoment) - selectedScenario?.startPoint;
    const percent = smallRange / range;
    // console.log('range', range);
    // console.log('smallRange', smallRange);
    // console.log('percent', percent);
    const maxScore = baseScore;
    const minScore = 1;
    const point = (smallRange >= 0 && percent >= 0 && percent <= 1) ?
        maxScore - Math.floor((maxScore - minScore + 1) * percent)
        : 0;

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
                            {(stopMoment || stopMoment == 0) &&
                                <div className='bar second-bar'>
                                    {/* Video duration - red - blue */}
                                    <div
                                        className='fill'
                                        style={{
                                            width: `${progressPercent}%`,
                                            backgroundColor: progressPercent > 80 ? '#ff7070' : '#70a7ff',
                                        }}
                                    />
                                </div>
                            }
                            <div className='bar'>
                                {/* Video duration - red - blue */}
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
                                        width: `${100 * stopMoment / selectedScenario?.totalTime || 0}%`,
                                        height: 8,
                                        backgroundColor: '#7aef44',
                                    }}
                                />
                                {/* Triangle mark enter event - green */}
                                {(stopMoment || stopMoment == 0) &&
                                    <div className='mark'
                                        style={{
                                            left: `${100 * stopMoment / selectedScenario?.totalTime || 0}%`,
                                        }}
                                    ></div>
                                }
                            </div>
                            {stopMoment !== null && allowRestart &&
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
                        <div className='actions'>
                            <div className='actions-left'>
                                {allowRestart &&
                                    <button className='btn' onClick={handleRestart} disabled={!allowRestart}>Bắt đầu lại</button>
                                }
                                {stopMoment !== null && (
                                    <>
                                        <p>Thời gian: {stopMoment?.toFixed(3) || 0} giây</p>
                                        {allowRestart && <p>Điểm: {point?.toFixed(0) || 0}</p>}
                                    </>
                                )}
                            </div>
                            {user &&
                                <ButtonList
                                    list={[
                                        {
                                            name: 'report',
                                            onToggle: () => setOpenReport({
                                                simulationId: selectedScenario?.id,
                                                forumPostId: null,
                                                forumCommentId: null,
                                                questionId: null,
                                            }),
                                            disabled: false,
                                        }
                                    ]}
                                />
                            }
                        </div>
                        <div className='detail'>
                            <h2>{selectedScenario.name}</h2>
                            <p>{selectedScenario.description}</p>
                            <div className='category'>Phân loại: {selectedScenario.simulationCategory?.name}</div>
                            <div className={`difficulty ${selectedScenario.simulationDifficultyLevel?.name.includes('dài') ?
                                'easy'
                                : selectedScenario.simulationDifficultyLevel?.name.includes('vừa') ?
                                    'medium'
                                    : 'hard'}`}
                            >
                                Độ khó: {selectedScenario.simulationDifficultyLevel?.name}
                            </div>
                        </div>
                    </div>
                    {myResults?.length > 0 &&
                        <div className='my-results'>
                            <h3>CHI TIẾT BÀI LÀM</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kịch bản</th>
                                        <th>Thời gian</th>
                                        <th>Điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myResults.sort((a, b) => a.index - b.index)?.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.index}</td>
                                            {/* <div>{result.simulationExamId}</div> */}
                                            <td>{result.durationSecond}</td>
                                            <td>{'?' || result.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </>
                :
                <div
                    ref={videoRef}
                    className='no-video'
                >
                    Hãy chọn một kịch bản
                </div>
            }

            {openReport &&
                <PopupContainer onClose={() => setOpenReport(null)} titleName={`Báo cáo mô phỏng`} modalStyle={{}} innerStyle={{ width: 700, scrollbarWidth: 'none' }}>
                    <ReportModal data={openReport} onClose={() => setOpenReport(null)} />
                </PopupContainer>
            }
        </div>
    )
}
