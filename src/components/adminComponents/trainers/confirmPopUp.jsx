import React from 'react';

const ConfirmPopup = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-full max-w-md mx-auto px-6 py-4 rounded shadow-md text-black">
          <h1 className="mb-4 text-2xl text-center">Confirm Deletion</h1>
          <p className="mb-4 text-center">Are you sure you want to delete this trainer?</p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 text-gray-600 border border-gray-400 rounded hover:text-gray-800 focus:outline-none"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
