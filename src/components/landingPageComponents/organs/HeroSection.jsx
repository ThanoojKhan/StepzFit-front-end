import React from "react"
import { useCallback, useRef } from "react";
import Image from "../atoms/Image"
import HeroImg2 from "../../../assets/hero/2.jpeg"
import HeroImg1 from "../../../assets/hero/1.jpeg"
import HeroImg3 from "../../../assets/hero/3.jpeg"
import HeroTexts from "../particles/Data";
import Slider from "react-slick";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { ArrowCircleLeft, ArrowCircleRight, WhatsappLogo, YoutubeLogo } from "@phosphor-icons/react";
import StickyIcons from "../molecules/StickyIcons";
import { Slide, Zoom } from "react-awesome-reveal";


const HeroSection = () => {

  const sliderRef = useRef(null);

  // Function for next button
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();

    }
  };
  // function for previous button
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }

  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
  };

  const scrollToNextWindow = () => {
    // Calculate the height of the viewport (window)
    const viewportHeight = window.innerHeight;
  
    // Scroll down by the height of one window
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  const renderProfileImg = useCallback((element) => {
    switch (element) {
      case 0:
        return HeroImg1;
      case 1:
        return HeroImg2;
      case 2:
        return HeroImg3;
      default:
        return "";
    }
  }, [])
  return (
    <>
      <section className="w-full h-auto bg-gradient-to-r from-black to-yellow-900 relative overflow-x-hidden">
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings} className="h-full">
          <main className="w-full lg:h-screen md:h-[50vh] h-screen relative bg-zinc-900 overflow-x-hidden" >
            <Zoom className="h-full">
              <Image className="md:w-[60%] w-full md:h-full h-1/2" alt="HeroImg1" objectCover="object-cover" image={renderProfileImg(2)} />
            </Zoom>

            <div className="md:w-[50%] w-full md:h-full h-1/2 absolute md:top-0 top-1/2 right-0 bg-zinc-900 flex flex-col items-center justify-center px-4 overflow-x-hidden">
              <p className="lg:text-lg text-base text-zinc-400 mr-44">
                <Slide direction="left" >
                  Meet
                </Slide>
              </p>
              <h1 className="lg:text-6xl md:text-4xl mb-10 text-4xl text-zinc-100 font-extralight">
                <Slide direction="right">
                  StepFitz
                </Slide>
              </h1>
              <p className="lg:text-lg text-base text-center text-zinc-400 font-extralight px-20 w-auto">
                <Slide direction="left">
                  The SMART Fitness and Weight Loss Plan designed to create lasting behavior change incorporating fitness routines, yoga sessions, and a well-balanced diet plan.
                </Slide>
              </p>
              <div className="flex items-center gap-8 mt-10">
                <Slide direction="up">
                  <Button
                    type="button"
                    className="px-10 flex font-medium border text-white py-2.5 rounded-md border-white hover:bg-white hover:text-black"
                  >
                    <WhatsappLogo size={20} color="currentColor" weight="light" />
                    <small className="ms-2" >Chat With Us</small>
                  </Button>
                </Slide>
                <Slide direction="up">
                  <small href="" onClick={scrollToNextWindow} className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                    <h1 as="span" className="text-zinc-100 group-hover:text-amber-500 uppercase text-xs">Learn More</h1>
                  </small>
                </Slide>
              </div>
            </div>

          </main>

        </Slider>
        <div className="flex justify-end lg:justify-start items-center gap-4 absolute lg:bottom-10 md:bottom-5 md:right-10 right-4 bottom-4">
          <Button onClick={previous} type="button" className="w-8 h-8 border rounded-full border-amber-500 flex items-center justify-center text-amber-500 hover:text-red-500 hover:border-red-500">
            <ArrowCircleLeft size={20} color="currentColor" weight="light" />
          </Button>
          <Button onClick={next} type="button" className="w-8 h-8 border rounded-full border-amber-500 flex items-center justify-center text-amber-500 hover:text-red-500 hover:border-red-500">
            <ArrowCircleRight size={20} color="currentColor" weight="light" />
          </Button>
        </div>

        <StickyIcons />

      </section>
    </>
  )
}

export default HeroSection