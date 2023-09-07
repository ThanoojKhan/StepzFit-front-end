import React, { useRef } from "react"
import axiosInstance from '../../../api/axios';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeroImg2 from "../../../assets/hero/2.jpeg"
import HeroImg1 from "../../../assets/hero/1.jpeg"
import HeroImg3 from "../../../assets/hero/3.jpeg"
import { WhatsappLogo } from "@phosphor-icons/react";
import StickyIcons from "../molecules/StickyIcons";


const HeroSection = () => {

  const { token } = useSelector((state) => state.Admin);
  const [plans, setPlans] = useState([]);
  const images = [HeroImg1, HeroImg2, HeroImg3]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollTargetRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/admin/plans', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPlans(res?.data?.plans);
      })
      .catch((err) => {
        if (err?.response?.data?.errMsg) {
          toast.error(err?.response?.data?.errMsg);
        }
      });
  }, [token]);

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
      <section className="w-full h-auto bg-gradient-to-r from-black to-yellow-900 relative overflow-x-hidden">
        <main className="w-full lg:h-screen md:h-[50vh] h-screen relative bg-zinc-900 overflow-x-hidden" >
          <div className="h-full">
            <div className="md:w-[60%] w-full md:h-full h-1/2" >
              <img src={renderProfileImg()} className='w-full h-full object-cover' />
            </div>
          </div>
          <div className="md:w-[50%] w-full md:h-full h-1/2 absolute md:top-0 top-1/2 right-0 bg-zinc-900 flex flex-col items-center justify-center px-4 overflow-x-hidden">

            <div className="items-start justify-center">
              <p className="lg:text-lg text-base font-extralight text-zinc-400">Meet</p>
              <h1 className="lg:text-6xl md:text-4xl mb-10 pl-4 text-4xl text-zinc-100 font-extralight">StepzFitz</h1>
            </div>

            <p className="lg:text-lg text-base text-center text-zinc-400 font-extralight px-20 w-auto">
              The SMART Fitness and Weight Loss Plan designed to create lasting behavior change incorporating fitness routines, yoga sessions, and a well-balanced diet plan.
            </p>
            <div className="flex items-center gap-8 mt-10">
              <button
                type="button"
                className="px-10 flex font-extralight border text-white py-2.5 rounded-md border-white hover:bg-gray-200 hover:font-medium hover:text-green-600"
              >
                <WhatsappLogo size={20} color="currentColor" weight="light" />
                <a href="https://wa.me/9846238136" className="ms-2 text-sm" target="_blank">Chat With Us</a>
              </button>
              <a href="#scrollTarget" onClick={scrollToNextWindow} className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                <h1 as="span" className="text-zinc-100 group-hover:text-amber-500 font-extralight text-lg">Learn More</h1>
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