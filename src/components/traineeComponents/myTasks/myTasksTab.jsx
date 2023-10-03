import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Modal from 'react-modal';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import TaskDetailsModal from './taskDetailPopup';

function MyTaskTab() {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToMarkAsDone, setTaskIdToMarkAsDone] = useState('');
  const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAllTasks, setShowAllTasks] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [showToaster, setShowToaster] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedtasks = tasks.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedtasks.slice(startIndex, endIndex);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowAllTasks(false)
  };

  const fetchTasks = async () => {
    setIsLoading(true);

    const cachedTasks = localStorage.getItem('tasks');
    const cachedVersion = localStorage.getItem('tasksVersion');

    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
      setIsLoading(false);
    }

    try {
      const response = await axiosInstance.get('/user/getTasks');
      const data = response?.data?.tasks;
      const currentVersion = response?.data?.version;

      if (!cachedTasks || JSON.parse(cachedTasks).length !== data.length || cachedVersion !== currentVersion) {
        setTasks(data);
        localStorage.setItem('tasks', JSON.stringify(data));
        localStorage.setItem('tasksVersion', currentVersion);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error(error.response.data.errMsg);
    }
  };


  const markTaskAsDone = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.post(
        `/user/markTaskAsDone/${taskIdToMarkAsDone._id}`);
      setShowToaster(true)
      toast.success('Task marked as done.');
      fetchTasks();
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setShowToaster(true)
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
      {showToaster && <Toaster toastOptions={3000} />}
      {isLoading ? <Loader /> : ''}
      <div style={{ width: '95%' }} className="mt-40 px-8 mx-auto md:mx-25 sm:w-auto">
        <h1 className="text-zinc-200 mb-4 w-3/4 cursor-default text-xl w3-animate-left">Daily fitness and nutrition tasks are essential components of a well-rounded and healthy lifestyle. These tasks focus on promoting physical activity, balanced eating, and overall well-being.</h1>
        <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>

        <div className="overflow-x-auto mt-10 mb-5">
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold ">My Tasks</div>
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
            <div className="flex flex-col items-center w3-animate-zoom">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-3 me-4 rounded"
              />
              <button
                className=" text-zinc-300 mt-2 hover:underline"
                onClick={() => setShowAllTasks(true)}
              >Show All
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
              <th></th>
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
              <>
                {currentItems.map((task, index) => (
                  <tbody key={index} className='hover:text-zinc-400 cursor-default'>
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
                      <th className='flex items-center'>
                        <div className='w3-animate-zoom'>
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
                ))}


              </>

            )
          ) : (
            filteredTasks.length === 0 ? (
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

        </table >
        {isModalOpen && (
          <TaskDetailsModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            selectedEntryDetails={selectedEntryDetails}
          />
        )
        }
        {showAllTasks ? (<div className="pagination flex items-center justify-center gap-5 mt-4">
          <button
            className="hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-gray-500">{currentPage}</span>
          <button
            className="hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= sortedtasks.length}
          >
            Next
          </button>
        </div>) : ''}
      </div >
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
          <div className="bg-transparent flex-col justify-center items-center w3-animate-zoom p-10 rounded-lg border border-zinc-800 shadow-md">
            <h2 className="text-white text-2xl mb-4">Confirm Completion of Task.</h2>
            {taskIdToMarkAsDone && (
              <div className="text-white flex flex-col gap-4 items-center justify-center">
                Are you sure you want to mark the task:
                <h4 className='font-bold capitalize'>
                  ' {taskIdToMarkAsDone.task} '
                </h4>
                as Task completed ?
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
                Mark as Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MyTaskTab;
