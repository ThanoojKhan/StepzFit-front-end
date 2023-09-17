import React from 'react';
import successImage from '../assets/images/success1.gif'; 
import errorImage from '../assets/images/fail.webp'; 

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


const messageStyle = {
  fontSize: '1.5rem',
  color: 'white',
  marginTop: '1rem',
  textAlign: 'center',
};

const successTextStyle = {
  color: 'green',
};

const errorTextStyle = {
  color: 'red',
};

const Toaster = ({ type, message }) => {
  const imageUrl = type === 'success' ? successImage : errorImage;
  const textStyle = type === 'success' ? successTextStyle : errorTextStyle;

  return (
    <div style={loaderContainerStyle}>
      <div style={{ textAlign: 'center' }}>
      <img src={imageUrl} className={` ${type === 'success' ? '' : 'rounded-full'}`} alt="Status"/>
        <div style={{ ...messageStyle, ...textStyle }}>{message}</div>
      </div>
    </div>
  );
};

export default Toaster;
