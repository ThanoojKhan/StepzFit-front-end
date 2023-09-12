import { WhatsappLogo } from "@phosphor-icons/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HeroImg1 from "../../../assets/hero/bg.jpg";
import HeroImg2 from "../../../assets/images/images/foods.jpg";
import HeroImg3 from "../../../assets/images/images/plan-3.webp";
import StickyIcons from "../molecules/StickyIcons";


const HeroSection = () => {

  const images = [HeroImg1, HeroImg2, HeroImg3]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollTargetRef = useRef(null);


  useEffect(() => {
    const imageRotationInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(imageRotationInterval);
    };
  }, []);

  const scrollToNextWindow = () => {

    if (scrollTargetRef.current) {
      const targetElement = scrollTargetRef.current;
      const targetOffset = targetElement.offsetTop;

      const duration = 100;
      const steps = 200;
      const stepDuration = duration / steps;
      const stepAmount = targetOffset / steps;

      let currentPosition = window.pageYOffset;
      let step = 0;

      const scrollInterval = setInterval(() => {
        step++;
        currentPosition += stepAmount;

        if (step >= steps) {
          clearInterval(scrollInterval);
          currentPosition = targetOffset;
        }

        window.scrollTo(0, currentPosition);

        if (currentPosition === targetOffset) {
          clearInterval(scrollInterval);
        }
      }, stepDuration);
    }
  };

  const renderProfileImg = useCallback(() => {
    return images[currentImageIndex] || "";
  }, [currentImageIndex]);

  return (
    <>
      <section className="w-full h-screen bg-gradient-to-r from-black to-yellow-900 relative overflow-x-hidden">
        <main className="w-full h-screen relative bg-zinc-900 overflow-x-hidden">
          <div className="h-screen relative">
            <div className="w-full">
              <img src={renderProfileImg()} className="w-full h-screen object-cover w3-animate-top" alt="Profile" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-75"></div>
          </div>
          <div className="w-screen md:h-screen absolute md:top-0 bottom-0 mb-10 right-0 flex flex-col items-center justify-end px-4 overflow-x-hidden">
            <div className="items-start justify-center">
              <h1 className="lg:text-4xl md:text-2xl text-2xl font-extralight w3-animate-left text-zinc-100 ">Meet</h1>
              <h1 className="lg:text-8xl md:text-6xl mb-10 pl-4 text-6xl w3-animate-right ease-in text-zinc-100 font-extralight ">StepzFitz</h1>
            </div>

            <p className="lg:text-lg text-base text-center text-zinc-400 font-extralight px-20 w-auto w3-animate-bottom">
              The SMART Fitness and Weight Loss Plan designed to create lasting behavior change incorporating fitness routines, yoga sessions, and a well-balanced diet plan.
            </p>
            <div className="flex items-center gap-8 mt-10 mb-28 w3-animate-bottom">
              <div className="px-1 flex font-extralight text-lg text-zinc-100 border-white rounded-full">
                <button type="button" class="text-white bg-zinc-800 hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                <WhatsappLogo size={20} className=" bg-green-600 rounded-md" color="currentColor" weight="regular" />
                <a href={import.meta.env.VITE_WHATSAPP} className="ms-3" target="_blank">Chat With Us</a>
                </button>
              </div>

              <a href="#scrollTarget" onClick={scrollToNextWindow} className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                <h1 className="text-zinc-100 group-hover:text-amber-500 font-extralight text-lg animate-bounce">Learn More</h1>
              </a>

            </div>
          </div>
        </main>
        <StickyIcons />
        <div id="scrollTarget" ref={scrollTargetRef}>
          {/* Content to scroll to */}
        </div>
      </section>
    </>
  )
}

export default HeroSection