import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../Constants';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

function VideoCarousel() {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });
    const { startPlay, videoId, isPlaying, isLastVideo, isEnd } = video;

    useGSAP(() => {
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((preVideo) => ({ ...preVideo, isPlaying: true, startPlay: true }))
            }
        })
    }, [isEnd, videoId])
    const [loadedData, setLoadedData] = useState([]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetadata = (index, e) => setLoadedData((prevData) => ([...prevData, e]))

    useEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if (span[videoId]) {
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // Animation progress logic here
                    let progress = Math.ceil(anim.progress() * 100)
                    progress != currentProgress && (currentProgress = progress)
                    console.log(currentProgress)
                    gsap.to(videoDivRef.current[videoId], {
                        width: window.innerWidth < 760
                            ? '10vw'
                            : window.innerWidth < 1200
                                ? '10vw'
                                : '4vw'
                    })

                    gsap.to(span[videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: 'white',
                    })

                },
                onComplete: () => {
                    // Completion logic here
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                },
            });

            if (videoId === 0) {
                anim.restart();
            }
            const animUpdate = ()=>{
                anim.progress(videoRef.current[videoId]/hightlightsSlides[videoId].videoDuration)
            }
            if(isPlaying){
                gsap.ticker.add(animUpdate)
            }
            else{
                gsap.ticker.remove(animUpdate)
            }
                            // Clean up GSAP animation when component unmounts
            return () => {
                anim.kill();
            };
        }
    }, [videoId, startPlay]);


    const handlePocess = (type, index) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: index + 1 }))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
                setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }))
                break;

            default: return video;
        }
    }

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, index) => (
                    <div
                        className='sm:pr-20 pr-10'
                        key={list.id}
                        id='slider'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full overflow-hidden rounded-3xl bg-black flex flex-center'>
                                <video
                                    id='video'
                                    playsInline={true}
                                    preload='auto'
                                    muted
                                    ref={(el) => {
                                        videoRef.current[index] = el;
                                    }}
                                    onPlay={() => setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))}
                                    onPause={() => setVideo((prevVideo) => ({ ...prevVideo, isPlaying: false }))} // Pause logic to maintain control
                                    onLoadedMetadata={(e) => {
                                        handleLoadedMetadata(index, e)
                                    }
                                    }
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text) => (
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {hightlightsSlides.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => {
                                videoDivRef.current[index] = el;
                            }}
                            className='relative mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer'
                        >
                            <span
                                className='absolute h-full w-full rounded-full'
                                ref={(el) => { videoSpanRef.current[index] = el }}
                            />
                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'repeat' : !isPlaying ? 'play' : 'pause'}
                        onClick={
                            isLastVideo ? () => { handlePocess('video-reset') }
                                : !isPlaying ? () => { handlePocess('play') }
                                    : () => { handlePocess('pause') }
                        } />
                </button>
            </div>
        </>
    );
}

export default VideoCarousel;
