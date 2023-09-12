import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../../../assets/images/logo/StepzFit-Logo-png.png';

function FooterLogo() {
  const [navBarColor, setNavBarColor] = useState(false);

  const listenScrollEvent = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight < documentHeight) {
      setNavBarColor(true);
    } else {
      setNavBarColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const headerClasses = `w-full h-auto ${navBarColor ? "bg-gradient-to-b from-transparent to-black w3-animate-opacity" : "bg-transparent w3-animate-bottom"} overflow-x-hidden z-50 bottom-0 `;

  return (
    <header className={headerClasses}>
      <nav className="w-full lg:h-20 md:h-20 h-20 lg:px-16 md:px-9 px-8 flex justify-center items-center">
        <div className="flex-r justify-center items-center gap-6 w-screen">

          <Link to={'/home'} className="flex justify-center items-center h-8 mb-1">
            <img
              src={footerLogo}
              alt=""
              className="max-h-full max-w-full"
              style={{ width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%' }}
            />
          </Link>

          <div className="flex justify-center text-xs font-light items-center -mb-2">Copyright @ StepzFit Wellness</div>
        </div>
      </nav>
    </header>
  );
}

export default FooterLogo;
