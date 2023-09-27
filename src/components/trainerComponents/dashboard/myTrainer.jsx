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
          <h4 className="text-gray-200 font-semibold mb-2 text-center text-2xl my-5">{trainer?.firstName} {trainer?.secondName}</h4>
          <div className="relative overflow-hidden">
            <img
              src={trainer?.profileImage ? trainer?.profileImage : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
              alt="Trainer's Image"
              className="w-full mt-4 rounded-lg w3-animate-zoom cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center justify-center my-10">
            <div className="text-center">
              <p className="text-gray-500"><span className='text-gray-200'>Department:</span> {trainer?.department}</p>
              <p className="text-gray-500 capitalize"><span className='text-gray-200'>Gender:</span> {trainer?.gender}</p>
              <p className="text-gray-500"><span className='text-gray-200'> Certifications:</span> {trainer?.certification}</p>
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
