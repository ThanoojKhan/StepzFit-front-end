import React, { useCallback } from "react";
import Image from "../atoms/Image";
import Offer from "../../../assets/hero/3.jpeg";
import Text from "../atoms/Text";
import OfferTexts from "../particles/Data";
import List from "../atoms/List";
import { Barbell, Hoodie, PersonSimpleRun } from "@phosphor-icons/react";
import { Fade } from "react-awesome-reveal";

const Offers = () => {
    const renderIcon = useCallback((element) => {
        switch (element) {
            case 0:
                return <PersonSimpleRun size={50} color="currentColor" weight="light" />;
            case 1:
                return <Barbell size={50} color="currentColor" weight="light" />;
            case 2:
                return <Hoodie size={50} color="currentColor" weight="light" />;
            default:
                return "";
        }
    }, []);

    return (
        <section className="w-full h-auto flex items-center bg-zinc-900">
            <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-0 ">
                <div className="w-full md:h-[800px] h-[300px] grid">
                    <Image alt="Offer Image" objectCover="object-cover" className="w-full h-full" image={Offer} />
                </div>
                <div className="h-full w-full lg:px-10 px-4 flex flex-col lg:justify-center md:justify-end justify-center items-start md:gap-20 lg:gap-24 gap-16">
                    <Fade className="w-full">
                        <div className="w-full flex flex-col mt-10 lg:mt-24 items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 z-10">
                            <Text as="h1" className="text-zinc-200 lg:text-5xl md:text-4xl font-light text-3xl">What we Offer</Text>
                            <Text as="h1" className="absolute text-zinc-500/40 lg:left-48 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-light lg:-top-32 md:-top-20 -top-16 -z-10">What we do</Text>
                        </div>
                        <ul className="flex flex-col lg:gap-8 gap-6 pb-16">
                                    <List className="flex lg:gap-6 gap-4 items-start justify-start" >
                                        <Text as="span" className="text-amber-600 ">{renderIcon(0)}</Text>
                                        <div className="flex flex-col gap-1">
                                            <Text as="h3" className="text-base text-zinc-200 font-semibold">Weight Loose Programs</Text>
                                            <Text as="p" className="text-zinc-400 text-justify">Our personalized approach, expert guidance, and proven results will help you achieve your fitness goals. Take the first step towards a transformed body and lifestyle today.</Text>
                                        </div>
                                    </List>
                                    <List className="flex lg:gap-6 gap-4 items-start justify-start" >
                                        <Text as="span" className="text-amber-600 ">{renderIcon(1)}</Text>
                                        <div className="flex flex-col gap-1">
                                            <Text as="h3" className="text-base text-zinc-200 font-semibold">Body Building Programs</Text>
                                            <Text as="p" className="text-zinc-400 text-justify">Our expert trainers will guide you through tailored workouts, helping you achieve your bodybuilding goals efficiently and safely.</Text>
                                        </div>
                                    </List>
                                    <List className="flex lg:gap-6 gap-4 items-start justify-start" >
                                        <Text as="span" className="text-amber-600 ">{renderIcon(2)}</Text>
                                        <div className="flex flex-col gap-1">
                                            <Text as="h3" className="text-base text-zinc-200 font-semibold">Virtual Training Programs</Text>
                                            <Text as="p" className="text-zinc-400 text-justify">Take your workout to new heights with our high and intense Virtual Class, where you'll push your limits and achieve remarkable fitness results.</Text>
                                        </div>
                                    </List>
                        </ul>
                    </Fade>
                </div>
            </main>

        </section>
    );
};

export default Offers;
