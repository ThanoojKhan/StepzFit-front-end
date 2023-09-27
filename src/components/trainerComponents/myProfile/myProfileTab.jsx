import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import errorFunction from '../../../services/errorHandling';
import Loader from '../../loader';
import { useNavigate } from 'react-router-dom';

function TrainerDetailTab() {
  const { token } = useSelector((state) => state.Trainer);
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [showToaster, setShowToaster] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrainerDetails();
  }, [token]);

  const fetchTrainerDetails = () => {
    setIsLoading(true)
    axiosInstance
      .get('/trainer/trainerDetails')
      .then((res) => {
        setTrainerDetails(res?.data?.details);
        setNewProfile(res?.data?.details?.profileImage)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        errorFunction(error, navigate)
      });
  };

  const handleProfileImageChange = (img) => {
    if (isValidImage(img.target.files[0].name)) {
      let reader = new FileReader();
      reader.readAsDataURL(img.target.files[0]);
      reader.onload = () => {
        imageUpdate(reader.result);
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    } else {
      toast.error('Add a valid image');
    }
  };

  const imageUpdate = (imageData) => {
    setIsLoading(true)
    axiosInstance
      .post('/trainer/profileImageChange', { profileImage: imageData })
      .then(() => {
        setNewProfile(imageData)
        setIsLoading(false)
        toast.success('Profile image updated successfully');

      })
      .catch((error) => {
        setIsLoading(false)
        errorFunction(error, navigate)
      });
  };

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(extension);
  }



  return (
    <>
      <Toaster toastOptions={3000} />
      {isLoading ? <Loader /> : ''}
      <div className="fixed inset-0 z-40 flex items-center justify-center  bg-opacity-90">
        <div className="w-full max-w-3xl mx-auto overflow-y-auto bg-white rounded-lg max-h-screen">
          <div className="p-5 bg-black text-white rounded-t flex justify-center">
            <h3 className="text-3xl font-semibold">Trainer Details</h3>
          </div>
          <div className="p-6 bg-gray-800 rounded-b-lg">
            <div className="mb-5 sm:col-span-6">
              <div className="flex items-center justify-center">
                <div className="relative w-80 h-80 rounded-full overflow-hidden">
                  <img
                    src={newProfile || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                    alt="Profile"
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <input
                  type="file"
                  name="photo"
                  accept=".jpg, .jpeg, .png"
                  id="file"
                  onChange={(e) => handleProfileImageChange(e)}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  Update Profile Picture
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailCard label="First Name" value={trainerDetails?.firstName} />
              <DetailCard label="Last Name" value={trainerDetails?.secondName} />
              <DetailCard label="Gender" value={trainerDetails?.gender} />
              <DetailCard label="Department" value={trainerDetails?.department} />
              <DetailCard label="Email" value={trainerDetails?.email} />
              <DetailCard label="Joining Date" value={trainerDetails?.addedDate} />
            </div>
              <DetailCard label="Certification" value={trainerDetails?.certification} />
          </div>
        </div>
      </div>
    </>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="p-3 border rounded-lg my-5 border-gray-300">
      <label className="block text-sm font-medium text-white">{label}</label>
      <p className="text-gray-300">{value}</p>
    </div>
  );
}

export default TrainerDetailTab;
