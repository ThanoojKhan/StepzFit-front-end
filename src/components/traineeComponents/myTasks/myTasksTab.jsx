import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import TaskDetailsModal from './taskDetailPopup';

function MyTaskTab() {
  const { token } = useSelector((state) => state.User);
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToMarkAsDone, setTaskIdToMarkAsDone] = useState('');
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAllTasks, setShowAllTasks] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const handleShowDetails = (task) => {
    setSelectedEntryDetails(task);
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

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/user/getTasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response?.data?.tasks);
      setIsLoading(false)

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.errMsg);
      setIsLoading(false)
    }
  };

  const markTaskAsDone = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.post(
        `/user/markTaskAsDone/${taskIdToMarkAsDone._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Task marked as done.');
      fetchTasks();
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while marking the task as done.');
      setIsLoading(false)
    } finally {
      setTaskIdToMarkAsDone('');
      setShowConfirmation(false);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => formatDate(task.date) === selectedDate
  );

  return (
    <>
        <Toaster toastOptions={3000} />
      {isLoading ? <Loader /> : ''}
      <div style={{ width: '95%' }} className="mt-40 mx-10 md:mx-25 sm:w-auto">
        <h1 className="text-zinc-200 mb-4 cursor-default text-xl">Daily fitness and nutrition tasks are essential components of a well-rounded and healthy lifestyle. These tasks focus on promoting physical activity, balanced eating, and overall well-being.</h1>
        <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p><div className="overflow-x-auto mt-10 mb-5">
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="p-3 me-4 rounded"
              />
              <button
                className="btn btn-blue"
                onClick={() => setShowAllTasks(!showAllTasks)}
              >
                {showAllTasks ? 'Show Filtered Tasks' : 'Show All Tasks'}
              </button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          {showAllTasks ? (
            tasks.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="5">
                    <div className="flex justify-center w3-animate-zoom items-center my-5 space-x-3">
                      No Data
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              tasks.sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((task, index) => (
                  <tbody key={index} className='hover:text-zinc-400  cursor-default '>
                    <tr>
                      <td>
                        <div className="flex items-center my-3 space-x-3">
                          <div>
                            <div className="font-bold w3-animate-zoom">{formatDate(task.date)}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center my-3 space-x-3">
                          <div>
                            <div className="font-bold w3-animate-zoom">{task.task}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center my-3 space-x-3">
                          <div>
                            <div className={`font-bold w3-animate-zoom ${task.isDone ? 'text-green-500 ' : task.date <= new Date().toISOString().split('T')[0] ? 'text-red-500' : 'text-yellow-500'}`}>
                              {task.isDone ? 'Task Completed' : task.date <= new Date().toISOString().split('T')[0] ? 'Task Missed' : 'Task Pending'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th>
                        <div className='flex '>
                          <button className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(task)}>Details</button>
                          {new Date(task.date).toDateString() === new Date().toDateString() && (!task.isDone) && (
                            <button
                              className="btn btn-ghost btn-xs text-green-600"
                              onClick={() => {
                                setTaskIdToMarkAsDone(task);
                                setShowConfirmation(true);
                              }}
                            >
                              Mark as Done
                            </button>
                          )}
                        </div>
                      </th>
                    </tr>
                  </tbody>
                ))
            )
          ) : (
            filteredTasks.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="5">
                    <div className="flex justify-center w3-animate-zoom items-center my-5 space-x-3">
                      No Filtered Data
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              filteredTasks.map((task, index) => (
                <tbody key={index} className='hover:text-zinc-400  cursor-default '>
                  <tr >
                    <td>
                      <div className="flex items-center my-3 space-x-3">
                        <div>
                          <div className="font-bold w3-animate-zoom">{formatDate(task.date)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center my-3 space-x-3">
                        <div>
                          <div className="font-bold w3-animate-zoom">{task.task}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center my-3 space-x-3">
                        <div>
                          <div className={`font-bold w3-animate-zoom ${task.isDone ? 'text-green-500 ' : task.date <= new Date().toISOString().split('T')[0] ? 'text-red-500' : 'text-yellow-500'}`}>
                            {task.isDone ? 'Task Completed' : task.date <= new Date().toISOString().split('T')[0] ? 'Task Missed' : 'Task Pending'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td >
                      <div className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(task)}>Details</div>
                      {new Date(task.date).toDateString() === new Date().toDateString() && (!task.isDone) && (
                        <button
                          className="btn btn-ghost btn-xs text-green-600"
                          onClick={() => {
                            setTaskIdToMarkAsDone(task);
                            setShowConfirmation(true);
                          }}
                        >
                          Mark as Done
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))
            )
          )}
        </table>

        {isModalOpen && (
          <TaskDetailsModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            selectedEntryDetails={selectedEntryDetails}
          />
        )}
      </div>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
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
          <div className="bg-transparent w3-animate-zoom p-10 rounded-lg border border-zinc-800 shadow-md">
            <h2 className="text-white text-2xl mb-4">Confirm Completion of Task.</h2>
            {taskIdToMarkAsDone && (
              <div className="text-white">
                Are you sure you want to mark the task:<h4 className='font-bold capitalize my-3'>'{taskIdToMarkAsDone.task}'</h4> as Task completed ?
              </div>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-red mr-2"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button className="btn btn-green" onClick={markTaskAsDone}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MyTaskTab;
