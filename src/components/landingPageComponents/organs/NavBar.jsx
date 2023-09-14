import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../../../store/slice/user';
import List from "../atoms/List";

const NavBar = () => {
    const { token } = useSelector((state) => state.User);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [navBarColor, setNavBarColor] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

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


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsHidden(true);
        }, 15000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0 w3-animate-top delay-75">
                <nav className={`w-full lg:h-28 md:h-24 h-20 ${navBarColor ? "bg-gradient-to-b from-black w3-animate-top" : "bg-transparent"} lg:px-16 md:px-9 px-8 flex justify-between items-center`}>
                    <Link to={`/home`} className={`font-extrabold flex items-center relative md:text-2xl text-lg ${navBarColor ? '' : "w3-animate-left"} delay-100`}>
                        <div as="span" className="animate-pulse w-32 md:left-5 left-3 ">
                            <img src="\src\assets\images\logo\StepzFit-Logowhite-nobg-png.png" alt="" />
                        </div>
                    </Link>
                    <div className={`lg:flex hidden items-center delay-100 h-full gap-5 ${navBarColor ? '' : "w3-animate-right"}`}>
                        {token ?
                            <>
                                <ul className="flex items-center justify-center h-full relative ">
                                    <List className="w-full text-base">
                                        <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                            <NavLink to='/dashboard' as="span" className="text-zinc-100 group-hover:text-amber-500 text-sm hover:scale-110 transition ease-in-out delay-150">My StepzFit</NavLink>
                                        </small>
                                    </List>
                                </ul>
                                <ul className="flex items-center justify-center h-full relative ">
                                    <List className="w-full text-base">
                                        <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                            <h1 onClick={handleLogout} as="span" className="text-zinc-100 group-hover:text-amber-500 text-sm hover:scale-110 transition ease-in-out delay-150">Log Out</h1>
                                        </small>
                                    </List>
                                </ul>
                            </>
                            :
                            <>
                                <ul className="flex items-center justify-center h-full relative ">

                                    <List className="w-full text-base gap-5">
                                        <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                            <NavLink to='/login' as="span" className="text-zinc-100 group-hover:text-amber-500 uppercase text-xs hover:scale-110 transition ease-in-out delay-50">Login</NavLink>
                                        </small>
                                    </List>
                                    <List className="w-full text-base ms-5">
                                        <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                            <NavLink to='/register' as="span" className="text-zinc-100 group-hover:text-amber-500 uppercase text-xs hover:scale-110 transition ease-in-out delay-50">Register</NavLink>
                                        </small>
                                    </List>
                                </ul>
                            </>
                        }
                        <ul className={`flex items-center justify-center h-full relative ${isHidden ? 'hidden' : ''}`}>
                            <List className="w-full text-base">
                                <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                    <h1 as="span" className="text-zinc-100 group-hover:text-amber-500 text-sm ">Install</h1>
                                </small>
                            </List>
                        </ul>
                    </div>
                    <div className={`hamburger lg:hidden flex delay-100 text-white cursor-pointer ${navBarColor ? '' : "w3-animate-right"}`} onClick={handleToggle}>
                        <CirclesFour size={30} color="currentColor" weight="light" />
                    </div>
                </nav>

                {/* Mobile Nav  */}
                <nav className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0 ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
                    <div className={`w-full md:w-[50%] h-screen bg-zinc-900 flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out delay-300`}>
                        <section className="w-full px-4 py-6 flex flex-col gap-16">
                            <div className="w-full flex pt-5 px-4 justify-between items-center">
                                <div className="font-extrabold text-2xl cursor-pointer">
                                    <div onClick={handleToggle} as="span" className="w-28 md:left-5 left-3">
                                        <img src="\src\assets\images\logo\StepzFit-Logowhite-nobg-png.png" alt="" />
                                    </div>
                                </div>
                                <div className="hamburger text-white cursor-pointer" onClick={handleToggle}>
                                    <ArrowCircleRight size={25} color="currentColor" weight="light" />
                                </div>
                            </div>
                            <ul className="flex flex-col gap-3 pl-5">
                                {token ?
                                    <>
                                        <List className="w-full text-base">
                                            <NavLink to='/dashboard' onClick={handleToggle} className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 hover:scale-110 transition ease-in-out delay-50 before:ease-in hover:before:left-0 `}>
                                                My StepzFit
                                            </NavLink>
                                        </List>
                                        <List className="w-full text-base">
                                            <h1 onClick={(e) => { e.preventDefault(); handleToggle(); handleLogout() }} className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 hover:scale-110 transition ease-in-out delay-50 before:ease-in hover:before:left-0 cursor-pointer `}>
                                                Logout
                                            </h1>
                                        </List>
                                    </>
                                    :
                                    <>
                                        <List className="w-full text-base">
                                            <NavLink to='/login' onClick={handleToggle} className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:scale-110 transition ease-in-out delay-50 hover:before:left-0 `}>
                                                Login
                                            </NavLink>
                                        </List>
                                        <List className="w-full text-base">
                                            <NavLink to='/register' onClick={handleToggle} className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:scale-110 transition ease-in-out delay-50 hover:before:left-0 `}>
                                                Register
                                            </NavLink>
                                        </List>
                                    </>
                                }
                                <List className="w-full text-base">
                                    <NavLink to='' onClick={handleToggle} className={`${isHidden ? 'hidden' : ''} relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0 hover:scale-110 transition ease-in-out delay-50`}>
                                        Install
                                    </NavLink>
                                </List>
                            </ul>
                        </section>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavBar;
