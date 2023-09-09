import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';
import errorFunction from '../../../services/errorHandling';

function TraineesDataTab() {
  const { token } = useSelector((state) => state.Trainer);
  const [reload, setReload] = useState(false);
  const [trainees, setTrainees] = useState([{}]);
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get('/trainer/getTrainees', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrainees(res?.data?.trainee);
      })
      .catch((err) => {
        errorFunction(err,navigate)
      });
  }, [reload]);

  return (
    <div className="min-h-screen w-full ">
      <Toaster toastOptions={3000} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900">Trainees Datas</h2>
              <div className="mt-4">
                {trainees.length === 0 ? (
                  <p className="text-gray-500">No trainee data available</p>
                ) : (
                  <ul className="space-y-4">
                    {trainees.map((trainee,traineeId) => (
                      <li
                        key={traineeId}
                        className="border border-gray-300 p-4 rounded-md shadow-md"
                      >
                        <div>
                          <p className="text-lg font-semibold">{trainee.name}</p>
                          <p className="text-gray-600">{trainee.email}</p>
                          <Link
                            to={`/trainer/bodyMetrics/${trainee._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Show Body Metrics
                          </Link>
                        </div>
                          
                        <div>
                          <Link
                            to={`/trainer/foodIntake/${trainee._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Show Food Intake
                          </Link></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default TraineesDataTab;
