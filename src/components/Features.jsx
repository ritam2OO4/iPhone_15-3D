import { useGSAP } from "@gsap/react"
// import { animateWithGsap } from "../utils/animation"
import gsap from 'gsap'

import { ScrollTrigger } from "gsap/all"
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);



export default function Feature() {
  const videoRef = useRef();
  useGSAP(() => {
    // animateWithGsap("#features_title", { y: 0, opacity: 1 })  // not working passing hte props from here but stays undefined in utilitis same with iPhone model size  
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: '-10% bottom',
        // ...scrollProps,
      },
      onComplete:()=>{
        videoRef.current.play();
      }
    })
    gsap.to("#features_title", {
      y: 0, opacity: 1,
      scrollTrigger: {
        trigger: "#features_title",
        toggleActions: "restart reverse restart reverse",
        start: 'top 85%',
        // ...scrollProps,
      }
    })
    gsap.to(".g_grow", {
      scale: 1, opacity: 1, ease: "power1",
      scrollTrigger: {
        trigger: ".g_grow",
        toggleActions: "restart reverse restart reverse",
        start: 'top 85%',
        scrub: 5.5,  // ...scrollProps,
      }
    })
    gsap.to(".g_text", {
      y: 0, opacity: 1, ease: 'power2.inOut', duration: 1,
      scrollTrigger: {
        trigger: ".g_text",
        toggleActions: "restart reverse restart reverse",
        // start: 'top 85%',
        // ...scrollProps,
      }
    })
  }, [])
  return (
    <section className=" h-full bg-zinc overflow-hidden relative common-padding" >
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] items-center w-full">
              <video
                playsInline id="exploreVideo" preload='none' className="object-cover object-center w-full h-full" muted autoPlay
                ref={videoRef}  >
                <source src={exploreVideo}
                  type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="titanium" className="feature-video g_grow" />
                </div>
              </div>
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 16 pro is{' '}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium design
                    </span>, using the same alloy that spacecraft use for missionsto mars.
                  </p>
                </div>
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                   Titanium has one of the most best strength-to-weight ratios of any metal, making these our {' '}
                    <span className="text-white">
                     lightest Pro models ever.
                    </span> You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

