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
    backdropFilter: 'blur(5px)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: 'black',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const TaskDetailsModal = ({ isOpen, onRequestClose, selectedEntryDetails }) => {
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
      <div className="modal-overlay text-zinc-300 " style={modalStyles.overlay}>
        <div className="modal-content my-10 w3-animate-zoom " style={modalStyles.content}>
          {selectedEntryDetails && (
            <div>
              <h1 className='text-lg text-white my-6'>Task Details</h1>
              <div className='text-sm'>Date:  <span className='text-xl'>
                {formatDate(selectedEntryDetails?.date)}
              </span></div>
              <div className='mt-6'>Task: <h4 className='text-lg capitalize'> {selectedEntryDetails?.task}</h4></div>
              <div className='mt-6'>Status: <span className='text-lg'>
                {selectedEntryDetails?.isDone
                  ? 'Task Completed'
                  : selectedEntryDetails.date <= new Date().toISOString().split('T')[0]
                    ? 'Task Missed'
                    : 'Task Pending'}
              </span>
              </div>

              <div className=' mt-6 flex justify-center'>
                <button className='text-red-600 my-4' onClick={onRequestClose}>Close</button>
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetailsModal;
