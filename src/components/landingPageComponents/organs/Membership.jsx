import { default as React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import List from "../atoms/List";
import Text from "../atoms/Text";
import Card from "../molecules/Card";
import MembershipPlans from "../particles/Data";

const Membership = () => {

    const { token } = useSelector((state) => state.Admin);
    const [plan, setPlans] = useState([]);
    const [showLoader, setShowLoader] = useState(false);



    useEffect(() => {
        setShowLoader(true)
        axiosInstance
            .get('/admin/plans', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setPlans(res?.data?.plans);
                setShowLoader(false)
            })
            .catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err?.response?.data?.errMsg);
                }
            });
    }, [token])

    return (
        <section className="w-full  h-auto py-20 md:py-28 lg:py-40 bg-zinc-950 flex flex-col md:gap-28 gap-20 justify-center items-center">
            <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-30 before:w-36 before:h-1 before:rounded-lg z-10">
                <Text as="h1" className="text-zinc-100 font-light  lg:text-5xl md:text-4xl text-3xl">Membership Plans</Text>
                <Text as="h1" className="absolute text-zinc-500/10 md:left-24 lg:left-28 left-20 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10">Membership Plans</Text>
            </div>
            <main className="grid lg:w-[90%] md:w-[96%] w-[90%] md:grid-cols-2 4 items-center gap-8 md:gap-4 lg:gap-8">
                {
                    plan.slice().sort((a, b) => a.price - b.price)
                        .map((plan, index) => (
                            <Card className="w-full flex flex-col items-center gap-4 border border-zinc-500  transition-all duration-200 cursor-pointer hover:border-red-500/50 py-10" key={index}>
                                <Text as="h2" className="text-zinc-100 flex items-end gap-0.5">
                                    <span className="font-extrabold text-2xl">₹</span>
                                    <span className={`font-extrabold text-5xl`}>{plan?.price}</span>
                                    <span className="font-medium text-lg">/Month</span>
                                </Text>
                                <Text as="h3" className="capitalize text-base font-semibold w-full py-2 text-center  text-zinc-100 my-3 bg-zinc-800">{plan?.name}</Text>

                                <ul className="flex flex-col items-center">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            className="text-zinc-300 py-3 text-base capitalize relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-zinc-700 last:before:w-0"
                                            key={index}
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                            </Card>
                        ))
                }

            </main>
        </section>
    );
};

export default Membership;
