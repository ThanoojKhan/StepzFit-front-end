import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorFunction from '../../../services/errorHandling';

function TaskSchedulerTrainer() {
  const { traineeId } = useParams();
  const { token } = useSelector((state) => state.Trainer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [trainee, setTrainee] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [traineeId, token]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/trainer/getTasks/${traineeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response?.data?.tasks);
      setTrainee(response?.data?.trainee);
    } catch (error) {
      errorFunction(error, navigate)
    }
  };

  const handleAddTask = async () => {
    if (!newTask || !selectedDate) {
      toast.error('Please enter a task and select a date.');
      return;
    }

    const currentDate = new Date();
    const selectedTaskDate = new Date(selectedDate);

    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);

    if (selectedTaskDate < startOfDay) {
      toast.error('Please select a date that is today or in the future.');
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post(
        `/trainer/scheduleTask/${traineeId}`,
        { task: newTask, date: selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewTask('');
      setSelectedDate('');
      toast.success('Task added successfully');
      await fetchTasks();
    } catch (error) {
      errorFunction(error, navigate)
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (taskId, currentTask) => {
    setEditingTask({ id: taskId, task: currentTask });
  };

  const handleDeleteTask = (taskId) => {
    setEditingTask(null);
    setShowDeleteConfirmation(true);
    setTaskToDelete(taskId);
  };

  const handleSaveEdit = async () => {
    if (!editingTask.task) {
      toast.error('Please enter the edited task.');
      return;
    }
    try {
      setIsLoading(true);
      await axiosInstance.put(
        `/trainer/editTask/${editingTask.id}`,
        { task: editingTask.task },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditingTask(null);
      toast.success('Task updated successfully');
      await fetchTasks();
    } catch (error) {
      errorFunction(error, navigate)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setShowDeleteConfirmation(false);
      await axiosInstance.delete(`/trainer/deleteTask/${taskToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete));
      toast.success('Task deleted successfully');
    } catch (error) {
      errorFunction(error, navigate)
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isPastDate = (date) => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    return new Date(date) < yesterday;
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <header className="bg-white ps-5 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Scheduler</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900">Scheduler</h2>
                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      type="date"
                      className="border rounded-md p-2 mr-2"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter task..."
                      className="border rounded-md p-2 flex-grow"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={handleAddTask}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Adding...' : 'Add Task'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <main className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900">{trainee.name}'s Tasks List</h2>
                {tasks.length === 0 ? (
                  <p className="text-gray-900">No tasks scheduled for today.</p>
                ) : (
                  <ul className="space-y-4">
                    {tasks
                      .slice()
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((task, index) => (
                        <li
                          key={index}
                          className="border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
                        >
                          <div className="flex-grow">
                            <p className="text-lg font-semibold">{formatDateString(task.date)}</p>
                            <p className="text-gray-900 mt-2">Task: {task.task}</p>
                            <p className="text-gray-900 mt-2">
                              Status: {task.isDone ? 'Task Completed' : 'Task Pending'}
                            </p>
                          </div>
                          {!isPastDate(task.date) && (
                            <div className="flex items-center">
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                                onClick={() => handleEditTask(task._id, task.task)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={() => handleDeleteTask(task._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
        {editingTask && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Edit Task</h3>
              <textarea
                className="border rounded-md p-2 w-full"
                value={editingTask.task}
                onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
              />
              <div className="mt-3 flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Confirm Deletion</h3>
              <p className="mb-3">Are you sure you want to delete this task?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskSchedulerTrainer;
