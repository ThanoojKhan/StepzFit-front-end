import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import FoodIntakeDetailsModal from '../foodTracker/foodTrackerDetailPopup';
import Modal from 'react-modal';
import Loader from '../../loader';
import Loading from '../../loading'
import RoundProgressBar from '../roundProgress';

const FoodTrackerTab = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedHour, setSelectedHour] = useState('0');
  const [selectedMinute, setSelectedMinute] = useState('0');
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
  const [isLoading, setIsLoading] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [showToaster, setShowToaster] = useState(false)


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
    setIsLoading(true);
    const cachedData = localStorage.getItem('foodOptions');
    if (cachedData) {
      setFoodOptions(JSON.parse(cachedData));
      setIsLoading(false);
    }
    axiosInstance.get('/user/foodDB')
      .then((response) => {
        const data = response?.data?.foods;
        setFoodOptions(data);
        localStorage.setItem('foodOptions', JSON.stringify(data));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
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
    setIsAdding(true)
    setShowToaster(true)
    const selectedHourWithZero = selectedHour < 10 ? `0${selectedHour}` : selectedHour;
    const selectedMinuteWithZero = selectedMinute == 0 ? "00" : selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute;
    const selectedTime = `${selectedHourWithZero}:${selectedMinuteWithZero} ${selectedAmPm}`;

    if (selectedFood && selectedQuantity && selectedHourWithZero != 0 && selectedHourWithZero < 13 && selectedMinuteWithZero < 60) {
      axiosInstance.post('/user/addFood', {
        food: selectedFood,
        quantity: selectedQuantity,
        time: selectedTime,
      })
        .then(() => {
          toast.success('Food added successfully')
          setFoodIntake((prevFoodIntake) => {
            return [...prevFoodIntake, {
              food: selectedFood,
              quantity: selectedQuantity,
              time: selectedTime,
            }]
          })
          setReload(true)
          setSelectedFood('')
          setSelectedQuantity('')
          setSelectedHour('')
          setSelectedMinute('')
          setSelectedDate(new Date().toISOString().split('T')[0])
          setIsAdding(false)
        })
        .catch((error) => {
          console.error('Error adding food:', error);
          setShowToaster(true)
          toast.error('An error occurred while adding food.');
          setIsAdding(false)
        });
    } else {
      setShowToaster(true)
      setIsAdding(false)
      toast.error('Please select food, quantity, and proper time of intake.');
    }
  };

  const STORAGE_KEY = 'foodIntakeData';

  const handleFetchFoodIntake = () => {
    try {
      setIsLoad(true);
      const cachedData = localStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData && Array.isArray(parsedData.foodIntake)) {
          setFoodIntake(parsedData.foodIntake);
          setIsLoad(false);
        } else {
          console.error('Error parsing cached data:', cachedData);
          setIsLoad(false);
        }
      }
      axiosInstance.get('/user/getFoodIntake')
        .then((response) => {
          const data = response?.data?.foodIntake;
          setFoodIntake(data);
          const updatedCachedData = {
            foodIntake: data,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCachedData));
          setReload(false);
          setIsLoad(false);
        })
        .catch((error) => {
          console.error('Error fetching food intake:', error);
          setShowToaster(true);
          toast.error('An error occurred while fetching food intake.');
          setIsLoad(false);
        });
    } catch (error) {
      console.error('Error handling food intake:', error);
      setShowToaster(true);
      toast.error('An error occurred while handling food intake.');
      setIsLoad(false);
    }
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

  const filteredFoodIntake = Array.isArray(foodIntake)
    ? foodIntake.filter((entry) => formatDate(entry.date) === selectedDate)
    : [];

  const totalCaloriesSum = filteredFoodIntake?.reduce(
    (total, entry) =>
      total +
      Math.floor(
        ((entry?.food?.calories) / entry?.food?.serving) * entry?.quantity * 100
      ),
    0
  );

  const handleDeleteEntry = () => {
    setShowToaster(true)
    setIsDeleteModalOpen(false);
    setIsLoading(true)
    axiosInstance.delete(`/user/deleteFoodIntake/${entryToDelete._id}`)
      .then(() => {
        setFoodIntake((prevFoodIntake) =>
          prevFoodIntake.filter((entry) => entry?._id !== entryToDelete?._id)
        );
        setIsLoading(false)
        toast.success('Food intake entry deleted successfully');
      })
      .catch((error) => {
        setIsLoading(false)
        setShowToaster(true)
        toast.error(error);
      });
  };

  return (
    <>
      {showToaster && <Toaster toastOptions={3000} />}
      {isLoading ? <Loader /> : ''}
      <div style={{ width: '95%' }} className=" mt-40 px-10 mx-auto  md:mx-25 sm:w-auto">
        <h1 className="text-zinc-200 mb-4 cursor-default text-xl w3-animate-left">Simplify your food tracking with our user-friendly interface, making it effortless to monitor your daily nutrition intake.</h1>
        <p className="text-3xl font-extralight mt-2 border-b-2 mb-8 border-zinc-500"></p>
        <div className="w-full flex justify-center flex-col my-10 gap-4 w3-animate-top">
          <div className='flex justify-center mx-5 items-center '>
            <div className="mt-4 mx-5 w-full md:w-1/3">
              <label className="font-medium mb-1">Select Food</label>
              <select
                value={selectedFood}
                onChange={handleFoodChange}
                className="block w-full p-2 my-4 rounded"
              >
                <option value="">Select food</option>
                {foodOptions?.map((foodOption, index) => (
                  <option key={index} value={foodOption._id}>
                    {foodOption.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div className="mt-4 mx-5">
              <label className="font-medium mb-1">Enter Quantity (gms)</label>
              <div className="flex">
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                  className="p-2 my-4  rounded"
                  placeholder="Quantity (gms)"
                />
              </div>
            </div>

            <div className="mt-4 mx-5">
              <label className="font-medium mb-1">Select Time</label>
              <div className="flex">
                <input
                  type="number"
                  min="00"
                  max="12"
                  value={selectedHour}
                  onChange={handleHourChange}
                  className="w-16 p-2 my-4 rounded-l"
                  placeholder="HH"
                />
                <span className="flex justify-center items-center">:</span>
                <input
                  type="number"
                  min="01"
                  max="59"
                  value={selectedMinute}
                  onChange={handleMinuteChange}
                  className="w-16 p-2 my-4 rounded-r"
                  placeholder="MM"
                />
                <select
                  value={selectedAmPm}
                  onChange={handleAmPmChange}
                  className="w-16 p-2 my-4 rounded ml-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

          </div>
          <div className='flex justify-center'>
            <button
              onClick={isAdding ? null : handleAddFood}
              className={`${isAdding ? 'opacity-50 cursor-not-allowed' : ''} mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none`}
              disabled={isAdding}
            >
              {isAdding ? <Loading /> : 'Add to Tracker'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-10 mb-5">

          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold ">Food Tracker</div>
              <div className='mb-4 w3-animate-zoom'>
                {currentDateTime.toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
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
                className=" p-2 me-4 rounded w3-animate-zoom"
              />
            </div>
          </div>

          <table className="table ">
            <thead>
              <tr>
                <th>Time</th>
                <th>Food</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            {isLoad ? (
              <>
                <tbody className="hover:text-green-400 cursor-default animate-pulse">
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="w3-animate-zoom">
                          <div className="font-bold bg-gray-300 h-4 w-20"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="w3-animate-zoom">
                          <div className="font-bold bg-gray-300 h-4 w-20"></div>
                          <div className="text-sm opacity-50 bg-gray-300 h-3 w-32 mt-1"></div>
                        </div>
                      </div>
                    </td>
                    <td className="w3-animate-zoom">
                      <div className="flex items-center space-x-3">
                        <div className="w3-animate-zoom">
                          <div className="font-bold bg-gray-300 h-4 w-20"></div>
                          <div className="text-sm opacity-50 bg-gray-300 h-3 w-32 mt-1"></div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs bg-gray-300 h-6 w-12"></button>
                      <button className="btn btn-ghost btn-xs text-red-500 bg-gray-300 h-6 w-16 ml-2"></button>
                    </th>
                  </tr>
                </tbody>
              </>
            ) :
              filteredFoodIntake?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="4" >
                      <div className="flex w3-animate-zoom justify-center items-center space-x-3">
                        No Data
                      </div>
                    </td>

                  </tr>
                </tbody>
              ) : (
                filteredFoodIntake?.sort((a, b) => {
                  const convertToSortableTime = (timeStr) => {
                    const [hourMinute, amPm] = timeStr.split(' ');
                    const [hour, minute] = hourMinute.split(':');
                    let sortableHour = parseInt(hour);
                    if (amPm === 'PM' && sortableHour !== 12) {
                      sortableHour += 12;
                    } else if (amPm === 'AM' && sortableHour === 12) {
                      sortableHour = 0;
                    }
                    return sortableHour * 60 + parseInt(minute);
                  };
                  const timeA = convertToSortableTime(a.time);
                  const timeB = convertToSortableTime(b.time);
                  return timeB - timeA;
                })
                  .map((entry, index) => (

                    <tbody key={index} className='hover:text-green-400 cursor-default '>
                      <tr>
                        <td className='w3-animate-zoom '>{entry?.time}</td>
                        <td>
                          <div className="flex items-center space-x-3 ">
                            <div className='w3-animate-zoom '>
                              <div className="font-bold">{entry?.food?.name}</div>
                              <div className="text-sm opacity-50">Calories per {entry?.food?.serving} gm: {(entry?.food?.calories) * 100} cal </div>
                            </div>
                          </div>
                        </td>
                        <td className='w3-animate-zoom '>
                          {entry?.quantity} gms
                          <br />
                          <span className="text-sm opacity-50">Total Calories: {Math.floor(((entry?.food?.calories) / (entry?.food?.serving)) * (entry?.quantity) * 100)}</span>
                        </td>
                        <th className='w3-animate-zoom '>
                          <button className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(entry)}>Details</button>
                          {new Date(entry.date).toDateString() === new Date().toDateString() && (
                            <button
                              className="btn btn-ghost btn-xs text-red-500"
                              onClick={() => {
                                setEntryToDelete(entry);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              Delete
                            </button>
                          )}
                        </th>
                      </tr>
                    </tbody>
                  ))
              )}
            {filteredFoodIntake?.length !== 0 && (

              <tfoot className='w3-animate-zoom'>

                <tr>
                  <td></td>
                  <th colSpan="" className='text-lg text-white' >Total Day Intake </th>
                  <td className='text-lg text-white'>{totalCaloriesSum} Calories</td>

                  <td></td>
                </tr>
              </tfoot>)
            }
          </table>
        </div>
        {isModalOpen && (
          <FoodIntakeDetailsModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            selectedEntryDetails={selectedEntryDetails}
          />
        )}
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
            <div className="bg-transparent p-10 rounded-lg border border-zinc-800 shadow-md">
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
      </div>



    </>
  );
};

export default FoodTrackerTab;
