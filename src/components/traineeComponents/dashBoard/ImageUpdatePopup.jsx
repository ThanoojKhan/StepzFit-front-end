import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import footerLogo from '../../../assets/images/logo/StepzFit-Logo-png.png';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../../loader';

Modal.setAppElement('#root');

const ImageUpdatePopup = ({ isOpen, onClose, onUpdate, existingImage }) => {
  const [selectedImage, setSelectedImage] = useState(existingImage);
  const { token } = useSelector((state) => state.User);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClose = () => {
    setSelectedImage(existingImage);
    onClose();
  };

  const handleImageUpdate = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.post('/user/setDashImage', { selectedImage }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(selectedImage);
      setIsLoading(false)
      onClose();
      toast.success('Image updated successfully', {
        duration: 2000,
      });
    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.errMsg, {
        duration: 1000,
      })
    }
  };

  function isValidImage(fileName) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const extension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(extension);
  }

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (isValidImage(selectedFile.name)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    } else {
      toast.error('Unsupported Format');
    }
  };

  useEffect(() => {
    setSelectedImage(existingImage);
  }, [existingImage]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? <Loader /> : ''}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            zIndex: 990,
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
        <h4 className="text-zinc-300 ms-5 my-10 w3-animate-top">Update Dash Image</h4>
        <div className="relative">
          <img
            src={selectedImage}
            alt="Selected Image"
            className="w-full mt-4 rounded-lg w3-animate-zoom cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="absolute top-0 left-0 bg-black opacity-50 hover:opacity-60 w-full h-full flex justify-center items-center pointer-events-none">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageChange}
              className="cursor-pointer rounded-lg pointer-events-auto opacity-0  absolute inset-0"
            />
            Select Image
          </div>
        </div>

        <div className="flex-col">
          <div className="flex justify-center gap-5 my-10">
            <button
              onClick={handleImageUpdate}
              className="bg-zinc-400 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg"
            >
              Update
            </button>
            <button
              onClick={handleClose}
              className="bg-transparent hover:text-red-700 text-zinc-300 font-semibold py-2 px-4 rounded-full"
            >
              Close
            </button>
          </div>
          <nav className="w-full lg:h-20 md:h-20 h-20 lg:px-16 md:px-9 px-8 flex justify-center items-end">
            <div className="flex-r justify-center items-center gap-6 w-screen">
              <Link to={'/home'} className="flex justify-center items-center h-8 mb-1">
                <img
                  src={footerLogo}
                  alt=""
                  className="max-h-full max-w-full"
                  style={{ width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                />
              </Link>
              <div className="flex justify-center text-xs font-light items-center">
                Copyright @ StepzFit Wellness
              </div>
            </div>
          </nav>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUpdatePopup;
