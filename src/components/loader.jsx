import React from 'react';
import stepzfitImage from '../assets/images/logo/StepzFit-Logo-png.png';

const loaderContainerStyle = {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(5px)',
  zIndex: '1000',
};

const loaderImageStyle = {
  animation: 'spin 1.5s linear infinite',
};

const Loader = () => {
  return (
    <div style={loaderContainerStyle} className=''>
      <div style={{ textAlign: 'center' }} className='animate-pulse '>
        <img src={stepzfitImage} className='w-24' alt="StepzFit Logo" style={loaderImageStyle} />
      </div>
    </div>
  );
};

export default Loader;
