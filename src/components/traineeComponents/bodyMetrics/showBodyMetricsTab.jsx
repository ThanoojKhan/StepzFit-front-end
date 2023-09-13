import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import DetailsPopup from './bodyMetricsDetails';

function BodyMetricsTab() {
  const { token } = useSelector((state) => state.User);
  const [bodyMetricsData, setBodyMetricsData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    fetchBodyMetricsData();
  }, []);

  const fetchBodyMetricsData = async () => {
    try {
      const response = await axiosInstance.get('/user/bodyMetrics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBodyMetricsData(response.data.bodyMetrics);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data.');
    }
  };

  const handleTabClick = (data) => {
    setSelectedData(data);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedData(null);
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/user/deleteBodyMetrics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchBodyMetricsData();
        handleClosePopup();
        toast.success('Body metrics deleted successfully.');
      })
      .catch((err) => {
        if (err?.response?.data?.errMsg) {
          toast.error(err?.response?.data?.errMsg);
        }
      });
  };

  const openDeleteConfirmation = (id) => {
    setDeletingItemId(id);

  };

  const handleConfirmDelete = () => {
    if (deletingItemId) {

      handleDelete(deletingItemId);
      setDeletingItemId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <Toaster toastOptions={3000} />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900">Body Metrics</h2>
                <div className="mb-4">
                  <Link to="/addBodyMetrics" className="text-blue-500 hover:underline">
                    Add Body Metrics
                  </Link>
                </div>
                <ul className="space-y-4">
                  {bodyMetricsData
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((data) => (
                      <li
                        key={data._id}
                        className="border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
                      >
                        <div className="flex-grow">
                          <p
                            className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
                            onClick={() => handleTabClick(data)}
                          >
                            {new Date(data.date).toLocaleDateString('en-GB')}
                          </p>
                          <p className="text-gray-900">
                            Weight: {data.bodyWeight}, Height: {data.height}, Waist: {data.waist}, Hip: {data.hip},
                            Chest: {data.chest}, Arm: {data.arm}, Forearm: {data.forearm}, Calf: {data.calf}, Thighs: {data.thighs},
                            BMI: {data.bmi}
                          </p>
                        </div>
                        {new Date(data.date).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB') ?
                          <div>
                            <Link
                              to={`/editBodyMetrics/${data._id}`}
                              className="text-blue-700 px-2 rounded-md hover:underline"
                            >
                              Edit
                            </Link>
                            <button
                              className="text-red-700 py-2 rounded-md hover:underline"
                              onClick={() => openDeleteConfirmation(data._id)}
                            >
                              Delete
                            </button>
                          </div> : ''
                        }
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
        <DetailsPopup
          visible={isPopupVisible}
          onClose={handleClosePopup}
          data={selectedData}
        />
        {deletingItemId && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-800 mb-4">
                Are you sure you want to delete this entry?
              </p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 text-red-700 hover:underline"
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 text-gray-500 hover:underline ml-4"
                  onClick={() => setDeletingItemId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BodyMetricsTab;
