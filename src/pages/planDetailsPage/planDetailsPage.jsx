import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import { WhatsappLogo } from "@phosphor-icons/react";
import NavBar from '../../components/landingPageComponents/organs/NavBar';
import FooterLogo from '../../components/landingPageComponents/organs/FooterLogo';
import StickyIcons from '../../components/landingPageComponents/molecules/StickyIcons';

function planDetailsPage() {
    const { planId } = useParams()
    const [plan, setPlan] = useState({
        _id: '',
        name: '',
        description: [],
        price: '',
        imageSrc: '',
        features: [],
    })
    const [showLoader, setShowLoader] = useState()

    const backgroundStyle = {
        backgroundImage: `url(${plan.imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    useEffect(() => {
        setShowLoader(true)
        axiosInstance
            .get(`/user/planDetails/${planId}`)
            .then((res) => {
                setPlan(res?.data?.plan);
                setShowLoader(false)
            })
            .catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err?.response?.data?.errMsg);
                }
            });
    }, [])

    return (
        <>
            <section className="w-full h-auto relative overflow-x-hidden">
                <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle} >
                    <NavBar></NavBar>
                    <div className="w-full h-full absolute bg-black bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
                        <div className="items-start justify-center">
                            <h1 className="lg:text-6xl md:text-4xl mb-10 pl-4 text-4xl text-center text-white font-extralight ">{plan.name}</h1>
                        </div>
                        {plan.description.map((description, index) => (
                            <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto">{description}</p>
                        ))}
                        <div className="items-start justify-center">
                            <h1 className="lg:text-2xl md:text-xl mb-2 mt-10 pl-4 text-md text-center text-white font-normal">Plan Features</h1>
                        </div>
                        {plan.features.map((description, index) => (
                            <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto">{description}</p>
                        ))}
                        <button type="button" className=" mt-10 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            Buy This Plan
                        </button>
                        <div className="flex items-center hover:scale-100 transition ease-in-out delay-75 gap-8 mt-10">
                            <div className="px-1 flex font-extralight text-lg text-white">
                                <WhatsappLogo size={20} className="mt-1 bg-green-600 rounded-md" color="currentColor" weight="regular" />
                                <a href={import.meta.env.VITE_WHATSAPP} className="ms-2 hover:font-normal" target="_blank">Chat With Us</a>
                            </div>
                        </div>
                        <div className='bottom-0 fixed'>
                        <FooterLogo ></FooterLogo></div>
                    </div>
                </main>
        <StickyIcons/>
            </section>
        </>
    )
}

export default planDetailsPage
