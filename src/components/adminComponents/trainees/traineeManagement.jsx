import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { toast } from 'react-hot-toast';
import SearchBox from '../../traineeComponents/search';
import errorFunction from '../../../services/errorHandling';
import { useNavigate } from 'react-router-dom';
import PlanDetailsPopup from './planDetailsPopup';

const itemsPerPage = 10;

function UserManagement() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/admin/users')
      .then((res) => {
        setUsers(res?.data?.users);
        setIsLoading(false);
      })
      .catch((err) => {
        errorFunction(err, navigate);
        setIsLoading(false);
      });
  }, [reload]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const statusChange = (userId, blocked) => {
    axiosInstance
      .patch('/admin/userStatus', { userId, blocked })
      .then((res) => {
        toast.success(res?.data?.message);
        setReload(!reload);
      })
      .catch((err) => {
        errorFunction(err, navigate);
      });
  };

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderSkeleton = () => {
    return (
      <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap px-6 py-4 animate-pulse">
          <div className="cell-content w-16 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 animate-pulse">
          <div className="cell-content w-32 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 animate-pulse">
          <div className="cell-content w-24 h-4 bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap flex justify-between px-6 py-4 animate-pulse">
          <div className="cell-content w-20 h-4 bg-gray-300 rounded"></div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div style={{ width: '95%' }} className="ms-5 mt-5 sm:w-auto">
        <div className="flex justify-end m-2">
          <SearchBox search={search} setSearch={setSearch} />
        </div>
        <div className="grid grid-cols-1 ">
          <div className="inline-block py-2 pe-4">
            <div className="overflow-auto">
              <table className="w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Mail
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: itemsPerPage }).map((_, index) =>
                      renderSkeleton()
                    )
                    : users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search)
                      )
                      .slice(startIndex, endIndex)
                      .map((user) => (
                        <tr
                          key={user?._id}
                          className="border-b dark:border-neutral-500 "
                        >
                          <td
                            onClick={() => openModal(user._id)}
                            className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform"
                          >
                            <div className="cell-content">{user?.name}</div>
                          </td>
                          <td
                            onClick={() => openModal(user._id)}
                            className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform"
                          >
                            <div className="cell-content">{user?.email}</div>
                          </td>
                          <td
                            onClick={() => openModal(user._id)}
                            className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform"
                          >
                            <div className="cell-content">
                              {user?.phone || 'Not Provided'}
                            </div>
                          </td>
                          <td
                            onClick={() =>
                              statusChange(user._id, user.isBlocked)
                            }
                            className="whitespace-nowrap flex justify-between px-6 py-4"
                          >
                            {user?.isBlocked ? (
                              <span className="text-green-600 me-1 hover:cursor-pointer">
                                Unblock
                              </span>
                            ) : (
                              <span className="text-red-700 px-4 me-1 hover:cursor-pointer">
                                Block
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
          <PlanDetailsPopup
            isOpen={isOpen}
            onClose={closeModal}
            axiosInstance={axiosInstance}
            userId={selectedUserId}
          />
        </div>
        <div className="pagination flex items-center justify-center gap-5 mt-4">
          <button
            className="hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage}</span>
          <button
            className="hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < Math.ceil(users.length / itemsPerPage)
                  ? prevPage + 1
                  : prevPage
              )
            }
            disabled={
              currentPage === Math.ceil(users.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default UserManagement;
