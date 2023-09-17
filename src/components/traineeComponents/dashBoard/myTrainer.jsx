import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MyTrainerPopup = ({ isOpen, onClose, trainer }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
          },
          content: {
            maxWidth: '800px',
            margin: 'auto',
            padding: '20px',
            borderColor: 'black',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            background: 'black',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <div>
          <h4 className="text-white text-2xl my-5">My Trainer</h4>
          <div className="relative overflow-hidden">
            <img
              src={trainer?.picture ? trainer?.picture : 'https://tecdn.b-cdn.net/img/new/avatars/5.webp'}
              alt="Trainer's Image"
              className="w-full mt-4 rounded-lg w3-animate-zoom cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center justify-center my-10">
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-2">{trainer?.firstName} {trainer?.secondName}</p>
              <p className="text-gray-600">{trainer?.department}</p>
              <p className="text-gray-600">{trainer?.gender}</p>
              <p className="text-gray-600">{trainer?.certification}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 hover:text-red-700 text-red-300 font-semibold rounded-full focus:outline-none"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyTrainerPopup;
