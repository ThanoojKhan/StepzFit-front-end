import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import FoodIntakeDetailsModal from '../foodTracker/foodTrackerDetailPopup';
import Modal from 'react-modal';

const FoodTrackerTab = () => {
  const { token } = useSelector((state) => state.User);
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodIntake, setFoodIntake] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetchFoodOptions();
    handleFetchFoodIntake();
  }, [reload]);

  const fetchFoodOptions = () => {
    axiosInstance
      .get('/user/foodDB', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFoodOptions(response?.data?.foods);
      })
      .catch((error) => {
        console.error('Error fetching food options:', error);
      });
  };

  const handleFoodChange = (event) => {
    setSelectedFood(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  const handleAmPmChange = (event) => {
    setSelectedAmPm(event.target.value);
  };

  const handleAddFood = () => {
    const selectedHourWithZero = selectedHour < 10 ? `0${selectedHour}` : selectedHour;
    const selectedMinuteWithZero = selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute;
    const selectedTime = `${selectedHourWithZero}:${selectedMinuteWithZero} ${selectedAmPm}`;

    if (selectedFood && selectedQuantity && selectedTime) {
      axiosInstance
        .post('/user/addFood', {
          food: selectedFood,
          quantity: selectedQuantity,
          time: selectedTime,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success('Food added successfully');
          setReload(true);
          setSelectedFood('')
          setSelectedQuantity('')
          setSelectedHour('')
          setSelectedMinute('')
          setSelectedDate(new Date().toISOString().split('T')[0])
        })
        .catch((error) => {
          console.error('Error adding food:', error);
          toast.error('An error occurred while adding food.');
        });
    } else {
      toast.error('Please select food, quantity, and time.');
    }
  };

  const handleFetchFoodIntake = () => {
    axiosInstance
      .get('/user/getFoodIntake', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFoodIntake(response?.data?.foodIntake);
        setReload(false);
      })
      .catch((error) => {
        console.error('Error fetching food intake:', error);
        toast.error('An error occurred while fetching food intake.');
      });
  };

  const handleShowDetails = (entry) => {
    setSelectedEntryDetails(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEntryDetails(null);
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredFoodIntake = foodIntake.filter(
    (entry) => formatDate(entry.date) === selectedDate
  );

  const totalCaloriesSum = filteredFoodIntake.reduce(
    (total, entry) =>
      total +
      Math.floor(
        ((entry?.food?.calories) / entry?.food?.serving) * entry?.quantity * 100
      ),
    0
  );

  const handleDeleteEntry = () => {
    axiosInstance
      .delete(`/user/deleteFoodIntake/${entryToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Food intake entry deleted successfully');
        setIsDeleteModalOpen(false);

        setFoodIntake((prevFoodIntake) =>
          prevFoodIntake.filter((entry) => entry?._id !== entryToDelete?._id)
        );
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div style={{ width: '95%' }} className=" mt-40 mx-10 md:mx-25 sm:w-auto">
        <Toaster toastOptions={3000} />

        <div className='flex-col justify-center items-center'>
          <h2 className="text-2xl font-semibold mb-4">Add Food to your Food Tracker</h2>
          <div className="grid grid-cols-1  gap-4">
            <div>
              <label className="block font-medium mb-1">Select Food</label>
              <select
                value={selectedFood}
                onChange={handleFoodChange}
                className="block w-1/2 p-2  rounded"
              >
                <option value="">Select food</option>
                {foodOptions?.map((foodOption, index) => (
                  <option key={index} value={foodOption._id}>
                    {foodOption.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Enter Quantity (gms)</label>
              <input
                type="number"
                min="50"
                step="50"
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="block w-1/2 p-2 rounded"
                placeholder="Quantity (gms)"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1">Select Time</label>
            <div className="flex">
              <input
                type="number"
                min="01"
                max="12"
                value={selectedHour}
                onChange={handleHourChange}
                className="w-16 p-2  rounded-l"
                placeholder="HH"
              />
              <span className="w-8 flex justify-center items-center">:</span>
              <input
                type="number"
                min="01"
                max="59"
                value={selectedMinute}
                onChange={handleMinuteChange}
                className="w-16 p-2  rounded-r"
                placeholder="MM"
              />
              <select
                value={selectedAmPm}
                onChange={handleAmPmChange}
                className="w-16 p-2 rounded ml-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddFood}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Add Food
          </button>
        </div>

        <div className="overflow-x-auto mt-10 mb-5">
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold">Food Tracker</div>
              <div className='mb-4'>
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
            <div className="flex justify-end mt-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className=" p-2 me-4 rounded"
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Food</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            {filteredFoodIntake?.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="4" >
                    <div className="flex justify-center items-center space-x-3">
                      No Data
                    </div>
                  </td>

                </tr>
              </tbody>
            ) : (
              filteredFoodIntake?.map((entry, index) => (
                <tbody key={index} className='hover:text-green-400 cursor-default '>
                  <tr>
                    <td>{entry?.time}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{entry?.food?.name}</div>
                          <div className="text-sm opacity-50">Calories per {entry?.food?.serving} gm: {(entry?.food?.calories) * 100} cal </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {entry?.quantity} gms
                      <br />
                      <span className="text-sm opacity-50">Total Calories: {Math.floor(((entry?.food?.calories) / (entry?.food?.serving)) * (entry?.quantity) * 100)}</span>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(entry)}>Details</button>
                      <button className="btn btn-ghost btn-xs text-red-500" onClick={() => { setEntryToDelete(entry); setIsDeleteModalOpen(true); }}>
                        Delete
                      </button>
                    </th>
                  </tr>
                </tbody>
              ))
            )}
            {filteredFoodIntake?.length !== 0 ? (
              <tfoot>
                <tr>
                  <th colSpan="2" className='text-lg text-white' >Total Calories</th>
                  <td className='text-lg text-white'>{totalCaloriesSum}</td>
                  <td></td>
                </tr>
              </tfoot>)
              : ''}
          </table>
        </div>
        {isModalOpen && (
          <FoodIntakeDetailsModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            selectedEntryDetails={selectedEntryDetails}
          />
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
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
        <div className="fixed top-0 left-0 px-10 w-full h-full flex items-center justify-center z-50">
          <div className="bg-transparent p-10 rounded-lg shadow-md">
            <h2 className="text-white text-2xl mb-4">Confirm Deletion</h2>
            {entryToDelete && (
              <p className="text-white">
                Are you sure you want to delete the food intake entry for{' '}
                {entryToDelete?.food?.name} at {entryToDelete?.time} ?
              </p>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-red mr-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-green" onClick={handleDeleteEntry}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default FoodTrackerTab;
