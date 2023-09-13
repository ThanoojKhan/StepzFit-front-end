import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import errorFunction from '../../../services/errorHandling';
import { useNavigate } from 'react-router-dom';

function TrainerDetailTab() {
  const { token } = useSelector((state) => state.Trainer);
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get('/trainer/trainerDetails', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrainerDetails(res?.data?.details);
      })
      .catch((error) => {
        errorFunction(error, navigate)
      });
  }, [token]);

  const handleProfileImageChange = () => {
    // Implement logic to change the profile picture using axiosInstance
    // ...

    // After successful update, refresh the trainer details
    // You can update the `trainerDetails` state here with the new profile image URL
    // setTrainerDetails({ ...trainerDetails, profileImage: newImageUrl });
  };

  if (!trainerDetails) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-90">
        <div className="w-full max-w-3xl mx-auto overflow-y-auto bg-transparent rounded-lg max-h-screen">
          <div className="p-5 bg-black text-white rounded-t flex justify-center">
            <h3 className="text-3xl font-semibold">Trainer Details</h3>
          </div>
          <div className="p-6 bg-black text-white rounded-b-lg">
            <div className="flex justify-center mb-8">
              <img
                src={trainerDetails.profileImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                alt="...."
                className="w-40 h-40 rounded-full object-cover"
              />
            </div>
            {/* Button to change profile picture */}
            <div className="flex justify-center mt-5">
              <button
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded focus:outline-none"
                onClick={handleProfileImageChange}
              >
                Change Profile Picture
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailCard label="First Name" value={trainerDetails.firstName} />
              <DetailCard label="Last Name" value={trainerDetails.secondName} />
              <DetailCard label="Gender" value={trainerDetails.gender} />
              <DetailCard label="Department" value={trainerDetails.department} />
              <DetailCard label="Certification" value={trainerDetails.certification} />
              <DetailCard label="Email" value={trainerDetails.email} />
              <DetailCard label="Joining Date" value={trainerDetails.addedDate} />
              <DetailCard label="Username" value={trainerDetails.userName} />
              <DetailCard label="Password" value={trainerDetails.password} />
            </div>
            <div className="flex justify-center mt-5">
              <span className="text-red-700">{err}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// A reusable component to display a detail card
function DetailCard({ label, value }) {
  return (
    <div className="p-3 border rounded-lg border-gray-300">
      <label className="block text-sm font-medium text-white">{label}</label>
      <p className="text-gray-300">{value}</p>
    </div>
  );
}

export default TrainerDetailTab;
