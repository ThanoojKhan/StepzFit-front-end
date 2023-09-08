import React from "react";
import { Fade } from "react-awesome-reveal";
import Image1 from "../../../assets/gym/2.jpeg";
import Image2 from "../../../assets/gym/3.jpeg";
import Image3 from "../../../assets/gym/4.jpeg";
import Image4 from "../../../assets/gym/5.jpeg";
import Image from "../atoms/Image";
import Text from "../atoms/Text";

const About = () => {
  return (
    <section className="w-full h-auto flex items-center bg-zinc-950">
      <main className="w-full md:h-[700px] grid md:grid-cols-2 items-center lg:mx-20 md:mx-10 mx-6 gap-10 md:gap-10 py-12 md:py-0">
        <div className="h-full w-full md:order-1 order-2 flex flex-col justify-center items-start gap-4 pb-8 md:pb-12">
          <Fade>
            <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg z-10">
              <Text as="h1" className="absolute text-zinc-500/40 md:-left-3 left-0 lg:text-8xl md:text-7xl text-6xl font-light lg:-top-36 md:-top-20 -top-16 -z-10">About StepzFit</Text>
            </div>
            <Text as="h2" className="text-zinc-200 mt-16 mb-4 font-light text-lg">Meet StepzFit, where fitness meets community and transformation happens!</Text>
            <Text as="p" className="text-zinc-400 text-justify text-base font-light">At StepzFit, we are more than just a gym; we are a passionate and supportive fitness family dedicated to helping you achieve your health and wellness goals. Our mission is to create a positive and empowering environment that inspires you to challenge yourself, embrace a healthy lifestyle, and discover the best version of yourself.</Text>
          </Fade>
        </div>
        <div className="w-full md:h-[400px] h-[300px] md:order-2 order-1 grid grid-cols-3 grid-rows-3">
          <Image alt="Welcome Image" objectCover="object-cover" className="col-span-3 row-span-2 w-full h-full" image={Image1} />
          <Image alt="Welcome Image" objectCover="object-cover" className="w-full h-full" image={Image2} />
          <Image alt="Welcome Image" objectCover="object-cover" className="w-full h-full border border-amber-500" image={Image3} />
          <Image alt="Welcome Image" objectCover="object-cover" className="w-full h-full" image={Image4} />
        </div>
      </main>

    </section>
  );
};

export default About;
