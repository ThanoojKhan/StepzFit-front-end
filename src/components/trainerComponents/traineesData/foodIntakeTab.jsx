import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import errorFunction from '../../../services/errorHandling';
import { useNavigate } from 'react-router-dom';

const FoodIntakeTab = ({ traineeId }) => {
  const [foodIntake, setFoodIntake] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainee, setTrainee] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    handleFetchFoodIntake();
  }, [reload]);

  const handleFetchFoodIntake = () => {
    axiosInstance
      .get(`/trainer/getFoodIntake/${traineeId}`)
      .then((response) => {
        setFoodIntake(response?.data?.foodIntake);
        setTrainee(response?.data?.trainee)
        setReload(false);
      })
      .catch((err) => {
        errorFunction(err, navigate)
      });
  };

  const handleShowDetails = (entry) => {
    setSelectedEntryDetails(entry);
    setIsModalOpen(true);
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


        <div className="overflow-x-auto mt-10 mb-5">
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold">Food Tracker of {trainee?.name}</div>
              <div className='mb-4'>
                {selectedDate}
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
      </div>
    </>
  );
};

export default FoodIntakeTab;
