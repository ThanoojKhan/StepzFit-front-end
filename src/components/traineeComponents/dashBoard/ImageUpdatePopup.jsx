import React, { useState } from 'react';
import Modal from 'react-modal';

const ImageUpdatePopup = ({ isOpen, onClose, onUpdate, existingImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);
  };

  const handleImageUpdate = () => {
    // Call the update function with the selected image
    onUpdate(selectedImage);
    setSelectedImage(null); // Clear the selected image
    onClose(); // Close the modal
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            background: 'white',
          },
        }}
      >
        <h2 className="text-black">Update Image</h2>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className="w-full mt-4"
          />
        ) : (
          <img
            src={existingImage}
            alt="Existing Image"
            className="w-full mt-4"
          />
        )}
        {/* File input for selecting a new image */}
        <input type="file" onChange={handleFileInputChange} />
        {/* Button to update the image */}
        <button
          onClick={handleImageUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Update
        </button>
        {/* Button to close the popup */}
        <button
          onClick={onClose}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mt-2"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ImageUpdatePopup;
