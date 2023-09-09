import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';
import errorFunction from '../../../services/errorHandling';
import { useNavigate } from 'react-router-dom';

function BodyMetricsTab({ traineeId }) {
  const { token } = useSelector((state) => state.Trainer);
  const [bodyMetrics, setBodyMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainee, setTrainee] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/trainer/bodyMetrics/${traineeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBodyMetrics(res?.data?.bodyMetrics);
        setTrainee(res?.data?.trainee)
      })
      .catch((err) => {
        errorFunction(err,navigate)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [traineeId, token]);

  

  return (
    <div className="min-h-screen w-full">
      <Toaster toastOptions={3000} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900">Body Metrics of {trainee?.name}</h2>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : bodyMetrics.length === 0 ? (
                <p className="text-gray-600">No data found</p>
              ) : (
                <ul className="space-y-4">
                  {bodyMetrics.map((data) => (
                    <li
                      key={data._id}
                      className="border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
                    >
                      <div className="flex-grow">
                        <p
                          className="text-lg font-semibold"
                        >
                          {new Date(data.date).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-gray-900">
                          Weight: {data.bodyWeight}, Height: {data.height}, Waist: {data.waist}, Hip: {data.hip},
                          Chest: {data.chest}, Arm: {data.arm}, Forearm: {data.forearm}, Calf: {data.calf}, Thighs: {data.thighs},
                          BMI: {data.bmi}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BodyMetricsTab;
