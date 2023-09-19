import React, { useEffect, useRef } from 'react';


const popupStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  },
  content: {
    margin: 'auto',
    borderColor: 'transparent',
    background: 'transparent',
    overflowY: 'auto',
  },
};

const DetailsPopup = ({ isOpen, onClose, selectedData }) => {
  const data = selectedData;
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('blurred-background'); 
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('blurred-background'); 
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('blurred-background'); 
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div id="popup-overlay" className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div style={popupStyles.overlay} className="flex items-center justify-center min-h-screen">
            <div ref={popupRef} className="w3-animate-zoom bg-transparent p-10 rounded-lg border border-zinc-800 shadow-md flex flex-col">
              {data && (
                <div className="w-full flex flex-col items-center">
                  <p className="text-lg font-semibold mb-4">
                    Date: {new Date(data.date).toLocaleDateString('en-GB')}
                  </p>
                  <div className="text-gray-200">
                    <p className="mb-2">
                      <span className="metric-label">Weight:</span> {data.bodyWeight} kg |
                      <span className="metric-label ml-2">Height:</span> {data.height} cm
                    </p>
                    <p className="mb-2">
                      <span className="metric-label">Waist:</span> {data.waist} cm |
                      <span className="metric-label ml-2">Hip:</span> {data.hip} cm
                    </p>
                    <p className="mb-2">
                      <span className="metric-label">Chest:</span> {data.chest} cm |
                      <span className="metric-label ml-2">Arm:</span> {data.arm} cm
                    </p>
                    <p className="mb-2">
                      <span className="metric-label">Forearm:</span> {data.forearm} cm |
                      <span className="metric-label ml-2">Calf:</span> {data.calf} cm
                    </p>
                    <p className="mb-2">
                      <span className="metric-label">Thighs:</span> {data.thighs} cm |
                      <span className="metric-label ml-2">BMI:</span> {data.bmi}
                    </p>
                  </div>
                </div>

              )}
              <button
                className="mt-4 bg-gray-300 align-middle text-gray-700 alig px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsPopup;
