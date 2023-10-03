import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

const Membership = () => {
    const { token } = useSelector((state) => state.Admin);
    const [plans, setPlans] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setShowLoader(true);
        axiosInstance
            .get('/user/plans')
            .then((res) => {
                setPlans(res?.data?.plans);
                setLoading(false);
            })
            .catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err?.response?.data?.errMsg);
                    setLoading(false);
                }
            });
    }, [token]);
    const sortedAndMappedPlans = useMemo(() => {
        return plans
            .slice()
            .sort((a, b) => a.price - b.price)
            .map((plan, index) => (
                <div className="relative min-h-full w-full flex flex-col items-center gap-4 border border-zinc-500 py-10 hover:shadow-lg"
                    key={index}>

                    <div className="w-full flex flex-col items-center gap-4">
                        <h1 as="h2" className="text-zinc-100 flex items-end gap-0.5">
                            <span className="font-normal text-2xl">₹</span>
                            <span className="font-light text-5xl">{plan?.price}</span>
                            <span className="font-light text-lg">/Month</span>
                        </h1>
                        <h1 as="h3" className="capitalize text-base font-normal w-full py-2 text-center text-zinc-100 my-3 bg-zinc-800">
                            {plan?.name}
                        </h1>

                        <ul className="flex flex-col items-center text-center">
                            {plan.features.map((feature, index) => (
                                <li
                                    className="text-zinc-300 py-3 font-light text-base capitalize"
                                    key={index}
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-75">
                        <Link to={`/membershipPlans/${plan._id}`}>
                            <button className="text-white bg-[#050708]/90 border hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                Explore More
                            </button>
                        </Link>
                    </div>
                </div>
            ));
    }, [plans]);

    return (
        <>
            <section className="w-full h-auto py-20 md:py-28 lg:py-40 bg-zinc-950 flex flex-col md:gap-28 gap-20 justify-center items-center w3-animate-bottom delay-75">
                <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-30 before:w-36 before:h-1 before:rounded-lg z-10">
                    <h1 as="h1" className="text-zinc-100 font-light  lg:text-5xl md:text-4xl text-3xl">Membership Plans</h1>
                    <h1 as="h1" className="absolute text-zinc-500/10 md:left-24 lg:left-28 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10">Membership Plans</h1>
                </div>
                <main className="grid lg:w-[90%] md:w-[96%] w-[90%] md:grid-cols-2 gap-8 md:gap-4 lg:gap-8 items-center">
                    {loading ? (
                        <>
                            {[0, 1, 2, 3].map((index) => (
                                <div className="relative min-h-full w-full flex flex-col items-center gap-4 border border-zinc-500 py-10 hover:shadow-lg"
                                    key={index}>

                                    <div className="w-full flex flex-col items-center gap-4">
                                        <h1 as="h2" className="text-zinc-100 flex items-end gap-0.5">
                                            <span className="font-normal text-2xl">₹ </span>
                                            <span className="font-light text-5xl  rounded animate-pulse">_____</span>
                                            <span className="font-light text-lg">/Month</span>
                                        </h1>
                                        <h1 as="h3" className="capitalize text-base font-normal w-full h-8 py-2 text-center text-zinc-100 my-3 bg-zinc-800">

                                        </h1>

                                        <ul className="flex flex-col items-center text-center">
                                            {[0, 1, 2, 3].map((index) => (
                                                <li
                                                    className="mt-2 py-3"
                                                    key={index}
                                                >
                                                    <div className="mt-2 w-48 h-5 bg-gray-500 rounded animate-pulse"></div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-75">
                                        <Link>
                                            <button className="text-white bg-[#050708]/90 border hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                                Explore More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        sortedAndMappedPlans
                    )}
                </main>
            </section>
        </>
    );
};

export default Membership;
