import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axios'
import { toast } from 'react-hot-toast'
import SearchBox from '../../traineeComponents/search'
import errorFunction from '../../../services/errorHandling'
import { useNavigate } from 'react-router-dom'
import PlanDetailsPopup from './planDetailsPopup'

function UserManagement() {

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get('/admin/users').then((res) => {
      setUsers(res?.data?.users)
    }).catch((err) => {
      errorFunction(err, navigate)
    })
  }, [reload])


  const statusChange = (userId, blocked) => {
    axiosInstance.patch('/admin/userStatus', { userId, blocked }).then((res) => {
      toast.success(res?.data?.message)
      setReload(!reload)
    }).catch((err) => {
      errorFunction(err, navigate)
    })
  }
  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div style={{ width: '95%' }} className=' ms-5 mt-5 sm:w-auto'>
        <div className="flex justify-end m-2">
          <SearchBox search={search} setSearch={setSearch} />

        </div>
        <div className='grid grid-cols-1 '>
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
                  {users
                    ? users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search)
                      )
                      .map((user) => (
                        <tr key={user?._id} className="border-b dark:border-neutral-500 ">
                          <td onClick={() => openModal(user._id)} className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform">
                            <div className="cell-content">{user?.name}</div>
                          </td>
                          <td onClick={() => openModal(user._id)} className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform">
                            <div className="cell-content">{user?.email}</div>
                          </td>
                          <td onClick={() => openModal(user._id)} className="whitespace-nowrap px-6 py-4 cursor-pointer hover:font-bold transition-transform">
                            <div className="cell-content">{user?.phone || 'Not Provided'}</div>
                          </td>
                          <td onClick={() => statusChange(user._id, user.isBlocked)} className="whitespace-nowrap flex justify-between px-6 py-4">
                            {user?.isBlocked ? <span className='text-green-600 me-1 hover:cursor-pointer'>Unblock</span> : <span className='text-red-700 px-4 me-1 hover:cursor-pointer'>Block</span>}
                          </td>
                        </tr>
                      ))
                    : (
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">No Trainees</td>
                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <PlanDetailsPopup isOpen={isOpen} onClose={closeModal} axiosInstance={axiosInstance} userId={selectedUserId} />
        </div>
      </div>
    </>
  )
}

export default UserManagement