import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import BodyMetricsDetails from './bodyMetricsDetails'
import Loader from '../../loader';
import Modal from 'react-modal';

function BodyMetricsTab() {
  const { token } = useSelector((state) => state.User);
  const [bodyMetricsData, setBodyMetricsData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const [showToaster, setShowToaster] = useState(false)

  const sortedBodyMetricsData = bodyMetricsData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentBodyMetricsData = sortedBodyMetricsData.slice(0, 10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetchBodyMetricsData();
  }, []);

  const fetchBodyMetricsData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/user/bodyMetrics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBodyMetricsData(response.data.bodyMetrics);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
      setShowToaster(true)
      toast.error('An error occurred while fetching data.');
    }
  };

  const handleTabClick = (data) => {
    setShowToaster(true)
    setSelectedData(data);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedData(null);
  };

  const handleDelete = (id) => {
    setIsLoading(true)
    axiosInstance
      .delete(`/user/deleteBodyMetrics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setShowToaster(true)
        fetchBodyMetricsData();
        setIsLoading(false)
        toast.success('Body metrics deleted successfully.');
      })
      .catch((err) => {
        if (err?.response?.data?.errMsg) {
          setShowToaster(true)
          setIsLoading(false)
          toast.error(err?.response?.data?.errMsg);
        }
      });
  };

  const openDeleteConfirmation = (data) => {
    setDeletingItemId(data);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItemId) {
      handleDelete(deletingItemId);
      setDeletingItemId(null);
      setIsDeleteModalOpen(false)
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {isLoading ? <Loader /> : ''}
      {showToaster && <Toaster toastOptions={3000} />}
      <div style={{ width: '95%' }} className=" mt-40 mx-10 md:mx-25 sm:w-auto">
        <h1 className="text-zinc-200 mb-4 w-3/4 cursor-default text-xl w3-animate-left">Effortlessly track and record your body metrics, such as weight, BMI, body fat percentage, and measurements, to monitor your progress accurately.</h1>
        <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>
        <div className="overflow-x-auto mt-10 mb-5">
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold">Body Metrics Tracker</div>
              <div className='mb-4 w3-animate-zoom'>
                {currentDateTime.toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </div>
            </div>
            <div className="mb-4 self-center w3-animate-zoom">
              <Link to="/addBodyMetrics" className="text-blue-500 w3-animate-zoom hover:underline">
                Add Body Metrics
              </Link>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>Height</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentBodyMetricsData.map((entry, index) => (
                <tr key={index} className='hover:text-green-400 cursor-default'>
                  <td>
                    <div className="flex items-center my-4 space-x-3">
                      <div>
                        <div className="font-bold w3-animate-zoom ">{formatDate(entry.date)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center my-4 space-x-3">
                      <div>
                        <div className="font-bold w3-animate-zoom ">Weight: {entry.bodyWeight}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold w3-animate-zoom ">Height: {entry.height}</div>
                      </div>
                    </div>
                  </td>
                  <th className='flex items-center'>
                    <div className='w3-animate-zoom'>
                      <button className="btn btn-ghost btn-xs mb-2" onClick={() => handleTabClick(entry)}>
                        Details
                      </button>
                    </div>
                    {new Date(entry.date).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB') && (
                      <div className="flex flex-col items-centre mx-5  ">
                        <Link
                          to={`/editBodyMetrics/${entry._id}`}
                          className="text-blue-700 rounded-md hover:underline w3-animate-zoom "
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-700 rounded-md hover:underline mt-2 w3-animate-zoom"
                          onClick={() => openDeleteConfirmation(entry._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </th>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupVisible && (
        <BodyMetricsDetails
          isOpen={isPopupVisible}
          onClose={handleClosePopup}
          selectedData={selectedData}
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(15px)',
            zIndex: 1000,
          },
          content: {
            margin: 'auto',
            borderColor: 'transparent',
            background: 'transparent',
            overflowY: 'auto',
          },
        }}
        contentLabel="Delete Confirmation"
      >
        <div className="fixed top-0 left-0 px-10 w-full h-full flex items-center justify-center z-50 w3-animate-zoom">
          <div className="bg-transparent p-10 rounded-lg border border-zinc-800 shadow-md">
            <h2 className="text-white text-2xl mb-4">Confirm Deletion</h2>
            {deletingItemId && (
              <p className="text-white">
                Are you sure you want to delete the entry ?
              </p>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-red mr-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-green" onClick={handleConfirmDelete}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BodyMetricsTab;
