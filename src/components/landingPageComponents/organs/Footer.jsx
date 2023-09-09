import React from "react";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  

  return (
    <footer className="w-full bg-zinc-950 flex flex-col">
      <div className="text-center py-3 bg-gradient-to-r from-black to-gray-900">
      <FooterLogo/>
      </div>
    </footer>
  );
};

export default Footer;
