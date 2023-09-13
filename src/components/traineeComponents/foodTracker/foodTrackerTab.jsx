import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import FoodIntakeDetailsModal from '../foodTracker/foodTrackerDetailPopup';

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

  return (
    <>
      <div style={{ width: '95%' }} className="ms-5 mt-5 me sm:w-auto">
        <Toaster toastOptions={3000} />
        <h2 className="text-2xl font-semibold mb-4">Add Food to your Food Tracker</h2>
        <div className="grid grid-cols-1  gap-4">
          <div>
            <label className="block font-medium mb-1">Select Food</label>
            <select
              value={selectedFood}
              onChange={handleFoodChange}
              className="block w-1/2 p-2 border rounded"
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
              className="block w-1/2 p-2 border rounded"
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
              className="w-16 p-2 border rounded-l"
              placeholder="HH"
            />
            <span className="w-8 flex justify-center items-center bg-gray-600">:</span>
            <input
              type="number"
              min="01"
              max="59"
              value={selectedMinute}
              onChange={handleMinuteChange}
              className="w-16 p-2 border rounded-r"
              placeholder="MM"
            />
            <select
              value={selectedAmPm}
              onChange={handleAmPmChange}
              className="w-16 p-2 border rounded ml-2"
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
                className=" p-2 me-4 border rounded"
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
            {filteredFoodIntake?.map((entry, index) => (
              <tbody key={index}>
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
                    {entry?.quantity}
                    <br />
                    <span className="badge badge-ghost badge-sm">Total Calories: {Math.floor(((entry?.food?.calories) / (entry?.food?.serving)) * (entry?.quantity) * 100)}</span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(entry)}>Details</button>
                  </th>
                </tr>

              </tbody>
            ))}
            <tfoot>
              <tr>
                <th colSpan="2" className='text-lg text-white' >Total Calories</th>
                <td className='text-lg text-white' c>{totalCaloriesSum}</td>
                <td></td>
              </tr>
            </tfoot>
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
    </>
  );
};

export default FoodTrackerTab;
