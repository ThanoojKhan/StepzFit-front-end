import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown === 1) {
        clearInterval(timer);
        navigate('/myPlan');
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-white p-6 md:mx-auto rounded-md max-w-md w-full">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-2xl text-gray-900 font-semibold">Payment Done!</h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className='text-red-800'>Redirecting in {countdown} seconds...</p>
          <div className="py-10 text-center">
            <p onClick={() => navigate('/myPlan')}
              className="px-12 bg-black hover:bg-gray-600 text-white font-semibold py-3 rounded-full inline-block"
            >
              GO BACK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
