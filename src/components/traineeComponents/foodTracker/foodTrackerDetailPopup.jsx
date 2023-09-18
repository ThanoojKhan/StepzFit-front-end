import React, { useEffect } from 'react';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    backdropFilter: 'blur(15px)',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: 'black',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    color: '#FFFFFF', 
  },
};

const FoodIntakeDetailsModal = ({ isOpen, onRequestClose, selectedEntryDetails }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.classList.contains('modal-overlay')) {
        onRequestClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay " style={modalStyles.overlay}>
        <div className="modal-content text-lg w3-animate-zoom" style={modalStyles.content}>
          {selectedEntryDetails && (
            <div>
              <h1 className='text-lg text-green-400 font-semibold mb-4'>Nutrient Facts</h1>
              <div className='text-sm'>Per <span className='text-xl'>{selectedEntryDetails?.food?.serving}</span>mg Serving</div>
              <div className='mt-4'>Food Name: <span className='text-lg font-bold'>{selectedEntryDetails?.food?.name}</span></div>
              <div className='mt-2'>Calories: <span className='text-lg font-bold'>{selectedEntryDetails?.food?.calories * 100}</span> cal</div>
              <div className='mt-2'>Protein: <span className='text-lg font-bold'>{selectedEntryDetails?.food?.proteins / 10000}</span> gm</div>
              <div className='mt-2'>Carbohydrate: <span className='text-lg font-bold'>{selectedEntryDetails?.food?.carbohydrates / 10000}</span> gm</div>
              <div className='mt-2'>Fat: <span className='text-lg font-bold'>{selectedEntryDetails?.food?.fat / 10000}</span> gm</div>
              <div className='mt-6 flex justify-center'>
                <button className='text-red-600 hover:scale-105 transition-transform' onClick={onRequestClose}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodIntakeDetailsModal;
