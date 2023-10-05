import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/slice/user';
import List from "../landingPageComponents/atoms/List";
import navbarIcon from  "../../assets/images/logo/StepzFit-Logowhite-nobg.png"

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [navBarColor, setNavBarColor] = useState(false);
    const location = useLocation()
    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/');
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const pathname = location.pathname;
    const parts = pathname.split('/');
    const partBetweenFirstAndSecondSlash = parts[1].replace(/([A-Z])/g, ' $1');


        return (
            <>
                <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0  delay-75">
                    <nav className={`w-full lg:h-20 md:h-20 h-20 ${navBarColor ? "bg-gradient-to-b from-black to-transparent w3-animate-top" : "bg-zinc-900 md:bg-transparent"} lg:px-16 md:px-9 px-8 flex justify-between items-center`}>
                        <Link >
                            <div>
                            </div>
                        </Link>
                        <Link  className={`font-extralight cursor-default flex items-center relative md:text-2xl text-lg ${navBarColor ? '' : "w3-animate-top"} delay-100`}>
                            <h5 className="lg:hidden self-center w3-animate-top capitalize">
                                {partBetweenFirstAndSecondSlash}
                            </h5>
                        </Link>

                        <div className={`lg:flex hidden items-center delay-100 h-full gap-5 `}>
                            <ul className="flex items-center justify-center h-full relative ">
                                <List className="w-full text-base">
                                    <small className="flex items-center gap-2 hover:text-amber-500 group cursor-pointer">
                                        <NavLink to='/plans' as="span" className="text-white group-hover:text-amber-500 text-sm hover:scale-110 transition ease-in-out delay-150">Explore Plans</NavLink>
                                    </small>
                                </List>
                            </ul>
                            <ul className="flex items-center justify-center h-full relative ">
                                <List className="w-full text-base">
                                    <small className="flex items-center gap-2 hover:text-amber-500 group cursor-pointer">
                                        <NavLink to='/home' as="span" className="text-white group-hover:text-amber-500 text-sm hover:scale-110 transition ease-in-out delay-150">Home</NavLink>
                                    </small>
                                </List>
                            </ul>
                        </div>
                        <div className={`hamburger lg:hidden flex delay-100 text-white cursor-pointer ${navBarColor ? '' : "w3-animate-right"}`} onClick={handleToggle}>
                            <CirclesFour size={30} color="currentColor" weight="light" />
                        </div>
                    </nav>

                    {/* Mobile Nav  */}
                    <nav className={`flex justify-end lg:hidden z-40 h-screen w-full bg-gray-950/90 fixed top-0 ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
                        <div className={`w-full md:w-[50%] h-screen bg-zinc-900 flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out delay-300`}>
                            <section className="w-full px-4 py-1 flex flex-col gap-16">
                                <div className="w-full flex pt-5 px-4 justify-between items-center">
                                    <div className="font-extrabold text-2xl cursor-pointer">
                                    </div>
                                    <div className="hamburger text-white cursor-pointer" onClick={handleToggle}>
                                        <ArrowCircleRight size={25} color="currentColor" weight="light" />
                                    </div>
                                </div>
                                <ul className="flex flex-col gap-3 pl-5">
                                    <List className="w-full text-base">
                                        <h1 onClick={() => navigate('/plans')} className={`cursor-pointer relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 hover:scale-110 transition ease-in-out delay-50 before:ease-in hover:before:left-0 `}>
                                            Explore Plans
                                        </h1>
                                    </List>
                                    <List className="w-full text-base">
                                        <h1 onClick={() => navigate('/home')} className={`cursor-pointer relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 hover:scale-110 transition ease-in-out delay-50 before:ease-in hover:before:left-0 `}>
                                            Home
                                        </h1>
                                    </List>
                                    <List className="w-full text-base">
                                        <h1 onClick={(e) => { e.preventDefault(); handleToggle(); handleLogout() }} className={`cursor-pointer relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 hover:scale-110 transition ease-in-out delay-50 before:ease-in hover:before:left-0 `}>
                                            Logout
                                        </h1>
                                    </List>
                                </ul>
                            </section>
                            <div onClick={handleToggle} as="span" className="w-28 mb-10 md:left-5 left-3">
                                <img src={navbarIcon} alt="" />
                            </div>
                        </div>
                    </nav>
                </header>
            </>
        );
    };

    export default NavBar;
