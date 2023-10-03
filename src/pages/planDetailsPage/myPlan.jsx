import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import StickyIcons from '../../components/landingPageComponents/molecules/StickyIcons';
import FooterLogo from '../../components/landingPageComponents/organs/FooterLogo';
import NavBar from '../../components/landingPageComponents/organs/NavBar';

function PlanDetailsPage() {
    const { token } = useSelector((state) => state.User)
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState();
    const [subscription, setSubscription] = useState({
        startDate: '',
        endDate: '',
        expired: '',
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
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
        setShowLoader(true);
        axiosInstance
            .get(`/user/myPlan`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setPlan(res?.data?.plan?.plan);
                setSubscription(res?.data?.plan);
                setShowLoader(false);
            })
            .catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err?.response?.data?.errMsg);
                }
            });
    }, []);

    return (
        <>
            <section className="w-full h-screen relative overflow-x-hidden">
                <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle} >
                    <NavBar></NavBar>
                    <div className="w-full h-full absolute bg-black bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
                        <div className="items-start justify-center">
                            <h1 className="lg:text-6xl md:text-4xl  pl-4 text-4xl text-center text-white font-extralight w3-animate-opacity">{plan?.name}</h1>
                        </div>
                        <div className="items-start justify-center">
                            <h1 className="font-extralight mb-10  pl-4 text-md text-center text-white w3-animate-zoom">
                                <p> {subscription.expired ? `Subscribed Till : ${formatDate(subscription?.endDate)}` : `Plan Expired on : ${formatDate(subscription?.endDate)}`}</p></h1>
                        </div>
                        {plan?.description?.map((description, index) => (
                            <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto w3-animate-zoom">{description}</p>
                        ))}
                        <div className="items-start justify-center">
                            <h1 className="lg:text-2xl md:text-xl mb-2 mt-10 pl-4 text-md text-center text-white font-normal">Plan Features</h1>
                        </div>
                        {plan?.features?.map((description, index) => (
                            <p key={index} className="lg:text-lg text-base text-center text-white font-extralight px-20 w-auto w3-animate-zoom">{description}</p>
                        ))}
                        <button onClick={() => navigate('/dashboard')} type="button" className="w3-animate-bottom mt-10 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            Go to App
                        </button>

                        <div className='bottom-0 fixed'>
                            <FooterLogo ></FooterLogo></div>
                    </div>
                </main>
                <StickyIcons />
            </section>
        </>
    )
}

export default PlanDetailsPage
