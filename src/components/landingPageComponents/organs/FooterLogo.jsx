import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../../../assets/images/logo/StepzFit-Logo-png.png';

function FooterLogo() {
  return (
    <header className="w-full h-auto bg-transparent overflow-x-hidden z-50 bottom-0 left-0">
      <nav className={`w-full lg:h-24 md:h-24 h-20 bg-transparent lg:px-16 md:px-9 px-8 flex justify-center items-center`}>
        <div className="flex-r justify-center items-center gap-6">

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



  )
}

export default FooterLogo
