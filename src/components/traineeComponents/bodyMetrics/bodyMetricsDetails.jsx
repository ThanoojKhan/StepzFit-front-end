import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';

const DetailsPopup = ({ visible, onClose, data, onDelete }) => {
  const modalRef = useRef(null);
  const { token } = useSelector((state) => state.User);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };


  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <>
      <div className={`fixed inset-0 z-50 ${visible ? 'block' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-md shadow-md max-w-md flex flex-col"
          >
            {data && (
              <div>
                <p className="text-lg font-semibold">
                  Date: {new Date(data.date).toLocaleDateString('en-GB')}
                </p>
                <p className="text-gray-600">
                  <span className="metric-label">Weight:</span> {data.bodyWeight} kg |
                  <span className="metric-label"> Height:</span> {data.height} cm

                </p>
                <p className="text-gray-600">
                  <span className="metric-label">Waist:</span> {data.waist} cm |
                  <span className="metric-label"> Hip:</span> {data.hip} cm
                </p>
                <p className="text-gray-600">
                  <span className="metric-label">Chest:</span> {data.chest} cm |
                  <span className="metric-label"> Arm:</span> {data.arm} cm
                </p>
                <p className="text-gray-600">
                  <span className="metric-label">Forearm:</span> {data.forearm} cm |
                  <span className="metric-label"> Calf:</span> {data.calf} cm
                </p>
                <p className="text-gray-600">
                  <span className="metric-label">Thighs:</span> {data.thighs} cm |
                  <span className="metric-label"> BMI:</span> {data.bmi}
                </p>
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
    </>
  );
};

export default DetailsPopup;
