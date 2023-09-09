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
                <button onClick={toggleIcons} className="fixed lg:bottom-28 bottom-1/2 left-0 transform rotate-90 text-zinc-100 hover:text-zinc-400 flex flex-col justify-center items-center">
                <span className=" font-light">Follow Us</span>
            </button>
            
            )}

            {isOpen ? (
                <aside className={`fixed lg:bottom-0 bottom-1/2 left-0 flex flex-col gap-5 items-center bg-gray-800 rounded-e-lg py-3 px-2`}>
                    <p onClick={toggleIcons} className="text-zinc-100 -mt-10 cursor-pointer hover:text-zinc-900">x</p>

                    <a href="/" className="text-zinc-100 hover:text-zinc-900">
                        <FacebookLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="/" className="text-zinc-100 hover:text-zinc-900">
                        <TwitterLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="/" className="text-zinc-100 hover:text-zinc-900">
                        <YoutubeLogo size={15} color="currentColor" weight="fill" />
                    </a>
                    <a href="/" className="text-zinc-100 hover:text-zinc-900">
                        <InstagramLogo size={15} color="currentColor" weight="fill" />
                    </a>
                </aside>
            ) : (
                <aside className={`fixed lg:bottom-0 bottom-1/2 left-0 flex-col gap-5 items-center bg-gray-800 rounded-e-lg py-3 px-2 hidden`}>
                    <p onClick={toggleIcons} className="text-zinc-100 -mt-10 cursor-pointer hover:text-zinc-900">Follow us</p>
                </aside>
            )}
        </>
    );
};

export default StickyIcons;
