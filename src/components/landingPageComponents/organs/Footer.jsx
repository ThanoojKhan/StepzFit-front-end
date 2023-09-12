import React from "react";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  

  return (
    <footer className="w-full flex flex-col delay-75">
      <div className="text-center bg-gradient-to-r from-black to-transparent">
      <FooterLogo/>
      </div>
    </footer>
  );
};

export default Footer;
