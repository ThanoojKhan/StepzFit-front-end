import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PayFail() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown === 1) {
        clearInterval(timer);
        navigate('/plans'); 
      } else {
        setCountdown(countdown - 1); 
      }
    }, 1000); 

    return () => {
      clearInterval(timer); 
    };
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-white p-6 rounded-md md:w-96 w3-animate-zoom">
        <div className="text-center">
          <div className='h-28'>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/payment-failed-9633733-7882967.png?f=webp"
              alt=""
              className="w-24 h-24 mx-auto"
            />
          </div>

          <h3 className="text-2xl text-gray-900 font-semibold">
            Payment Failed
          </h3>
          <p className="text-gray-600 mt-3">
            We're sorry, but there was an issue with your payment.
          </p>
          <p>Please try again or contact customer support for assistance.</p>
          <div className="">
            <p className="text-red-800 w3-animate-zoom mb-5">
              Redirecting in {countdown} seconds...
            </p>
            <p
              onClick={() => navigate('/plans')}
              className="px-12 bg-black w3-animate-zoom hover:bg-gray-600 cursor-pointer text-white font-semibold py-3 rounded-full inline-block"
            >
              GO BACK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayFail;
