import { WhatsappLogo } from "@phosphor-icons/react";
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import StickyIcons from '../../components/landingPageComponents/molecules/StickyIcons';
import FooterLogo from '../../components/landingPageComponents/organs/FooterLogo';
import NavBar from '../../components/landingPageComponents/organs/NavBar';

function PlanDetailsPage() {
    const { planId } = useParams();
    const { token } = useSelector((state) => state.User)
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(true);
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState({
        _id: '',
        name: '',
        description: [],
        price: '',
        imageSrc: '',
        features: [],
    });

    const backgroundStyle = {
        backgroundImage: `url(${plan.imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '900px',
    };

    useEffect(() => {
        axiosInstance
            .get(`/user/planDetails/${planId}`)
            .then((res) => {
                setPlan(res?.data?.plan);
                setLoading(false);
                setShowLoader(false);
            })
            .catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err?.response?.data?.errMsg);
                    setLoading(false);
                    setShowLoader(false);
                }
            });
    }, [planId]);

    const handleBooking = async () => {
        axiosInstance.post('/payment/subscribePlan', { planId }, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => {
            if (err.response.data.errMsg) {
                toast.error(err.response.data.errMsg);
            }
        });
    };

    return (
        <>
            <Toaster toastOptions={{ duration: 1000 }} />
            <section className="w-full h-auto relative overflow-x-hidden">
                <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle} >
                    <NavBar></NavBar>
                    <div className="w-full h-full absolute bg-black bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
                        {showLoader ? (
                            <>
                               <div className="items-start justify-center animate-pulse w-1/4">
                                    <h1 className="mb-10 pl-4  cell-content h-12 bg-gray-300 rounded text-center w3-animate-opacity"></h1>
                                </div>
                                {[0,1].map(( index) => (
                                    <p key={index} className=" text-center cell-content h-8 mt-2 bg-gray-300 animate-pulse rounded text-white font-extralight px-20 w-auto w3-animate-zoom"></p>
                                ))}
                                <div className="items-start justify-center">
                                    <h1 className="lg:text-2xl md:text-xl mb-2 mt-10 pl-4 text-md text-center text-white font-normal">Plan Features</h1>
                                </div>
                                {[0,1,2,3].map(( index) => (
                                    <p key={index} className="lg:text-lg text-base text-center text-white font-extralight animate-pulse px-20 mt-2 w-16 h-4 bg-gray-300 rounded w3-animate-zoom"></p>
                                ))}
                                {token ? (
                                    <button  type="button" className="hover:scale-[1.05] mt-10 text-white bg-[#050708] w3-animate-zoom hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                        Buy This Plan
                                    </button>
                                ) : (
                                    <button  type="button" className="hover:scale-[1.05] mt-10 text-white w3-animate-zoom bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                        Join StepzFit
                                    </button>
                                )}
                            </>

                        ) : (
                            <>
                                <div className="items-start justify-center">
                                    <h1 className="lg:text-6xl md:text-4xl mb-10 pl-4 text-4xl text-center text-white font-extralight w3-animate-opacity">{plan.name}</h1>
                                </div>
                                {plan.description.map((description, index) => (
                                    <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto w3-animate-zoom">{description}</p>
                                ))}
                                <div className="items-start justify-center">
                                    <h1 className="lg:text-2xl md:text-xl mb-2 mt-10 pl-4 text-md text-center text-white font-normal">Plan Features</h1>
                                </div>
                                {plan.features.map((description, index) => (
                                    <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto w3-animate-zoom">{description}</p>
                                ))}
                                {token ? (
                                    <button onClick={() => handleBooking()} type="button" className="hover:scale-[1.05] mt-10 text-white bg-[#050708] w3-animate-zoom hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                        Buy This Plan
                                    </button>
                                ) : (
                                    <button onClick={() => navigate('/register')} type="button" className="hover:scale-[1.05] mt-10 text-white w3-animate-zoom bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                        Join StepzFit
                                    </button>
                                )}
                            </>
                        )}
                        <div className="flex items-center gap-8 mt-10 w3-animate-bottom hover:scale-[1.05]">
                            <div className="px-1 flex font-extralight text-lg text-white">
                                <WhatsappLogo size={20} className="mt-1 bg-green-600 rounded-md" color="currentColor" weight="regular" />
                                <a href={import.meta.env.VITE_WHATSAPP} className="ms-2 hover:font-normal" target="_blank">Chat With Us</a>
                            </div>
                        </div>
                        <div className='bottom-0 fixed'>
                            <FooterLogo ></FooterLogo>
                        </div>
                    </div>
                </main>
                <StickyIcons />
            </section>
        </>
    )
}

export default PlanDetailsPage;
