import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

function MyTaskTab() {
  const { token } = useSelector((state) => state.User);
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToMarkAsDone, setTaskIdToMarkAsDone] = useState('');


  function formatDateString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/user/getTasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response?.data?.tasks);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching tasks.');
    }
  };

  const markTaskAsDone = async () => {
    try {
      await axiosInstance.post(
        `/user/markTaskAsDone/${taskIdToMarkAsDone}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Task marked as done.');
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while marking the task as done.');
    } finally {
      setTaskIdToMarkAsDone('');
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Toaster toastOptions={3000} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
              <ul className="space-y-4">
                {tasks
                  .slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((task) => (
                    <li
                      key={task._id}
                      className="border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
                    >
                      <div className="flex-grow">
                        <p className="text-lg font-semibold">
                          {formatDateString(task.date)}
                        </p>
                        <p className="text-gray-900">Task: {task.task}</p>
                        <p className="text-gray-900 mt-2">
                          Status: {task.isDone ? (
                            'Task Completed'
                          ) : task.date <= new Date().toISOString().split('T')[0] ? (
                            'Task Missed'
                          ) : (
                            'Task Pending'
                          )}
                        </p>
                      </div>
                      {new Date(task.date).toDateString() === new Date().toDateString() && (
                        task.isDone ? (
                          <span className="text-green-600">Task Completed</span>
                        ) : (
                          <div>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                              onClick={() => {
                                setTaskIdToMarkAsDone(task._id);
                                setShowConfirmation(true);
                              }}
                            >
                              Mark as Done
                            </button>
                            {showConfirmation && taskIdToMarkAsDone === task._id && (
                              <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                                  <p className="text-gray-700 mb-2">Have you completed the task: "{task.task}"?</p>
                                  <div className="flex justify-end">
                                    <button
                                      className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 mr-2"
                                      onClick={markTaskAsDone}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
                                      onClick={() => setShowConfirmation(false)}
                                    >
                                      No
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        )
                      )}
                    </li>
                  ))}

              </ul>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}


export default MyTaskTab;
