import React from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger);


function HowItWorks() {
    useGSAP(() => {
        gsap.from("#chip", {
            scrollTrigger: {
                trigger: "#chip",
                start: "20% bottom",
                toggleActions: "restart none none restart"
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: "power2.inOut",

        })
        gsap.to(".g_fadeIn", {
            y: 0, opacity: 1, ease: "power2.inOut", duration: 1,
            scrollTrigger: {
                trigger: ".g_fadeIn",
                toggleActions: "restart none none reverse",
                start: 'top 85%',
                // scrub: 5.5,  // ...scrollProps,
            }
        })
    }, [])
    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <div id='chip' className='w-full my-20 flex-center'>
                    <img src={chipImg} alt="chip" width={180} height={180} />
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='hiw-title'>
                        A18 pro chip.
                        <br />  A monster win for a gaming.
                    </h2>
                    <p className='hiw-subtitle'>
                        It's here, the biggest redesignin the the history of Apple GPUs.
                    </p>
                </div>
                <div className='mt-10 md:mt-20 mb-14'>
                    <div className='relative h-full flex-center'>
                        <div className='overflow-hidden'>
                            <img src={frameImg} alt="frame" className='bg-transparent z-10 relative ' />
                        </div>
                        <div className='hiw-video'>
                            <video className='pointer-events-none' playsInline autoPlay muted preload='none'>
                                <source src={frameVideo} type='video/mp4'
                                />
                            </video>
                        </div>
                    </div>
                    <p className='font-semibold text-gray text-center mt-3'>Honkai: Star Rail</p>
                </div>
                <div className="hiw-text-container">
                    <div className="flex flex-1 justify-center flex-col">
                        <p className="hiw-text g_fadeIn">
                            A18 Pro is an entirelynew class of iPhone chip that dilivers our {' '}
                            <span className="text-white">
                                best graphic performance by far
                            </span>
                        </p>
                    <p className="hiw-text g_fadeIn">
                        Mobile {' '}
                        <span className="text-white">
                            gameswill look and feel so imersive
                        </span>with incredibly detailed environments and characters .
                    </p>
                    </div>
                    <div className='flex felx-1 flex-col g_fadeIn'>
                        <p className='hiw-text'>New</p>
                        <p className='hiw-bigtext'>Pro-class GPU</p>
                        <p className='hiw-text'>with 6 cores</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
