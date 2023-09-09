import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import errorFunction from '../../../services/errorHandling';
import { useNavigate } from 'react-router-dom';

function AssignTrainerTab() {
  const { token } = useSelector((state) => state.Admin);
  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get('/admin/assignTrainer', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrainers(res?.data?.trainers);
        setTrainees(res?.data?.trainees);
      })
      .catch((err) => {
        errorFunction(err,navigate)
      });
  }, []);

  const handleAssignTrainer = () => {
    if (!selectedTrainer || !selectedTrainee) {
      toast.error('Select both trainer and trainee.');
      return;
    }

    const existingTrainer = trainees.find(trainee => trainee._id === selectedTrainee);

    if (existingTrainer && existingTrainer.trainerId) {
      const confirmChange = window.confirm('The selected trainee already has a trainer assigned. Are you sure you want to change it?');
      if (!confirmChange) {
        return;
      }
    }

    try {
      axiosInstance.post('/admin/assignTrainer', { selectedTrainee, selectedTrainer }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          const updatedTrainees = trainees.map(trainee => {
            if (trainee._id === selectedTrainee) {
              return {
                ...trainee,
                trainerId: selectedTrainer,
              };
            }
            return trainee;
          });
          setTrainees(updatedTrainees);
          setSelectedTrainer('');
          setSelectedTrainee('');
        }
      }).catch((err) => {
        errorFunction(err,navigate)
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={{ width: '95%' }} className="ms-5 mt-5 me sm:w-auto">
      <h2 className="text-2xl font-semibold mb-4">Assign Trainer to Trainee</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Select Trainer</label>
          <select
            value={selectedTrainer}
            onChange={(e) => setSelectedTrainer(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select a Trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.name || trainer.firstName + ' ' + trainer.secondName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Trainee</label>
          <select
            value={selectedTrainee}
            onChange={(e) => setSelectedTrainee(e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select a Trainee</option>
            {trainees.map((trainee) => (
              <option key={trainee._id} value={trainee._id}>
                {trainee.name || trainee.firstName + ' ' + trainee.secondName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleAssignTrainer}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
      >
        Assign Trainer
      </button>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Assigned Trainers</h3>
        <ul className="list-disc pl-6">
          {trainees.map((trainee) => (
            <li key={trainee._id}>
              <strong>{trainee.name}</strong> -{' '}
              {trainee.trainerId ? (
                <span>
                  Trainer: {trainers.find(trainer => trainer._id === trainee.trainerId)?.firstName || 'Unknown Trainer'}
                </span>
              ) : (
                <span>No Trainer Assigned</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AssignTrainerTab;
