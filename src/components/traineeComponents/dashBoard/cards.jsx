import React from 'react'
import { Fade } from 'react-awesome-reveal'
import { useNavigate } from 'react-router-dom'
function cards({ weight, trainer }) {
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex gap-6">
                <div className="flex w-1/2 w3-animate-zoom  hover:scale-105 transition-transform">
                    <div onClick={() => navigate('/bodyMetrics')} className=" cursor-pointer  flex flex-col justify-center items-center my-auto m-4 w-full p-4">
                        <h5 className="self-start text-5xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-extralight text-neutral-800 xl:ms-8 dark:text-neutral-50">
                            Weight
                        </h5>
                        <div className='flex-col'>
                            <div className="text-5xl text-center md:me-6 sm:text-5xl md:text-4xl lg:text-4xl xl:text-6xl 2xl:text-6xl font-extralight my-4"><h5 className='md:me-6'> {weight}</h5>
                                <h5 className="text-4xl sm:text-4xl text-right md:me-6 md:text-3xl lg:text-3xl xl:text-5xl 2xl:text-5xl font-extralight self-end">Kilogram</h5></div>
                            <Fade>

                                <h1 className="text-zinc-200 mt-5 mb-4 font-light text-lg">Keep Up with the Pace. Track Body Metrics weekly </h1>
                            </Fade>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 hover:scale-105 transition-transform cursor-pointer w3-animate-zoom">
                    <div className="flex flex-col  items-center w-full p-4">
                        <div className="text-center">
                            <h5 className="mb-2 text-xl font-light text-neutral-800 dark:text-neutral-50">
                                My Trainer
                            </h5>
                            <img
                                src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
                                className="mx-auto mb-4 w-32 rounded-lg"
                                alt="Avatar" />
                            <h5 className="mb-2 text-xl font-medium leading-tight">{trainer?.firstName} {trainer?.secondName}</h5>
                            <p className="text-neutral-500 dark:text-neutral-400">{trainer?.department}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cards
