import React, { useState, useEffect } from "react";
import List from "../atoms/List";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { token } = useSelector((state) => state.Admin);
    const [open, setOpen] = useState(false);
    const [navBarColor, setNavBarColor] = useState(false);

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

    return (
        <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
            <nav className={`w-full lg:h-28 md:h-24 h-20 ${navBarColor ? "bg-gradient-to-b from-black " : "bg-transparent"} lg:px-16 md:px-9 px-8 flex justify-between items-center`}>
                <Link to={`/home`} className="font-extrabold flex items-center relative md:text-2xl text-lg">
                    <div as="span" className="w-32 md:left-5 left-3">
                        <img src="\src\assets\images\logo\StepzFit-Logowhite-nobg-png.png" alt="" />
                    </div>
                </Link>
                <div className="lg:flex hidden items-center h-full gap-5">
                    <ul className="flex items-center justify-center h-full relative ">
                        {token ? 
                        <List className="w-full text-base">
                            <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                <NavLink to='/login' as="span" className="text-zinc-100 group-hover:text-amber-500  text-sm">My StepzFit</NavLink>
                            </small>
                        </List>
                        :
                        <List className="w-full text-base">
                            <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                <NavLink to='/login' as="span" className="text-zinc-100 group-hover:text-amber-500 uppercase text-xs">Login</NavLink>
                            </small>
                        </List>
                        }
                    </ul>
                    <ul className="flex items-center justify-center h-full relative ">
                        <List className="w-full text-base">
                            <small className="flex items-center gap-2 text-red-500 hover:text-amber-500 group cursor-pointer">
                                <h1 as="span" className="text-zinc-100 group-hover:text-amber-500 text-sm">Install</h1>
                            </small>
                        </List>
                    </ul>
                </div>
                <div className="hamburger lg:hidden flex text-white cursor-pointer" onClick={handleToggle}>
                    <CirclesFour size={30} color="currentColor" weight="light" />
                </div>
            </nav>

            {/* Mobile Nav  */}
            <nav className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0  ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
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
                            {[1, 2, 3].map((navlink, index) => (
                                <List className="w-full text-base" key={index}>
                                    <NavLink to={navlink.url} onClick={handleToggle} className={`relative overflow-hidden inline-block text-white before:w-full before:h-0.5 before:bg-color2 before:absolute before:bottom-0 before:-left-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0 `}>
                                        {navlink.name}nav
                                    </NavLink>
                                </List>
                            ))}
                        </ul>
                    </section>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
