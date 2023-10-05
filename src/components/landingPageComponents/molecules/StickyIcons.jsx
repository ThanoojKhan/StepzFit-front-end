import React, { useState } from "react";
import {
    FacebookLogo,
    InstagramLogo,
    TwitterLogo,
    YoutubeLogo,
} from "@phosphor-icons/react";

const StickyIcons = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIcons = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isOpen && (
                <button onClick={toggleIcons} className="fixed z-50 bottom-32 left-0 transform rotate-90 text-zinc-100 hover:text-zinc-400 flex flex-col justify-center items-center w3-animate-left delay-75">
                    <span className="font-light">Follow Us</span>
                </button>
            )}
            {isOpen ? (
                <aside className={`fixed z-50 lg:bottom-0 bottom-0 mb-5 left-0 ms-4 flex flex-col gap-5 items-center bg-transparent rounded-e-lg py-3 px-2 w3-animate-left delay-75`}>

                    <p onClick={toggleIcons} className="text-zinc-100 cursor-pointer hover:text-zinc-900 delay-75 ">x</p>
                    <a href="https://www.instagram.com/thanoojkhan/" className="text-zinc-100 hover:text-zinc-900" target="_blank">
                        <FacebookLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="https://www.instagram.com/thanoojkhan/" className="text-zinc-100 hover:text-zinc-900" target="_blank">
                        <TwitterLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="https://www.instagram.com/thanoojkhan/" className="text-zinc-100 hover:text-zinc-900" target="_blank">
                        <YoutubeLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="https://www.instagram.com/thanoojkhan/" className="text-zinc-100 hover:text-zinc-900" target="_blank">
                        <InstagramLogo size={15} color="currentColor" weight="fill" />
                    </a>
                </aside>
            ) : (
                <aside className={`fixed lg:bottom-0 bottom-1/2 left-0 flex-col gap-5 items-center bg-gray-800 rounded-e-lg py-3 px-2 hidden`}>
                    <p onClick={toggleIcons} className="text-zinc-100 -mt-10 cursor-pointer hover:text-zinc-900 w3-animate-left delay-75">Follow us</p>
                </aside>
            )}
        </>
    );
};

export default StickyIcons;
