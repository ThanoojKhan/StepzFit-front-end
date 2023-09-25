import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import SearchBox from '../../traineeComponents/search';
import { useNavigate } from 'react-router-dom';
import ConfirmPopup from './confirmPopUp';
import errorFunction from '../../../services/errorHandling';

function TrainerManagement() {
  const { token } = useSelector((state) => state.Admin);
  const [search, setSearch] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [reload, setReload] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/admin/trainers', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrainers(res?.data?.trainers);
      })
      .then((err) => {
        errorFunction(err, navigate)
      });
  }, [reload]);


  const handleDelete = (trainerId) => {
    setSelectedTrainer(trainerId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTrainer) {
      axiosInstance
        .delete(`/admin/deleteTrainer/${selectedTrainer}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success(res?.data?.message);
          setReload(!reload);
        })
        .catch((err) => {
          errorFunction(err, navigate)
        });
    }
    setConfirmOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <>
      <div style={{ width: '95%' }} className=' ms-5 me sm:w-auto mt-20'>
        <ConfirmPopup
          isOpen={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
        <div className="flex justify-end m-2 ">
          <p className="align-text-bottom cursor-pointer px-3" onClick={() => navigate('/admin/assignTrainer')} >
            Assign Trainer
          </p>
          <p className="align-text-bottom cursor-pointer px-3" onClick={() => navigate('/admin/addTrainer')} >
            Add Trainer
          </p>

          <SearchBox search={search} setSearch={setSearch} />
        </div>
        <div className='grid grid-cols-1 '>
          <div className="inline-block py-2 pe-4">
            <div className="overflow-auto">
              <table className="w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Trainer
                    </th>
                    <th scope="col" className="px-6 py-4">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Password
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainers
                    ? trainers
                      .filter(
                        (user) =>
                          user.firstName.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search)
                      )
                      .map((trainer) => (
                        <tr key={trainer._id} className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium"><p className="cursor-pointer" onClick={() => navigate(`/admin/trainerDetails/${trainer._id}`)} >{trainer.firstName}</p> </td>
                          <td className="whitespace-nowrap px-6 py-4">{trainer.userName}</td>
                          <td className="whitespace-nowrap px-6 py-4">{trainer.password}</td>
                          <td className="whitespace-nowrap px-6 py-4">{trainer.phone || 'Not Provided'}</td>
                          <td><p className="underline align-text-bottom cursor-pointer" onClick={() => navigate(`/admin/updateTrainer/${trainer._id}`)}>Update Trainer</p></td>
                          <td onClick={() => handleDelete(trainer._id)} className="whitespace-nowrap flex justify-between px-6 py-4">
                            <span className='text-red-700 px-4 me-1 hover:cursor-pointer'>Delete</span>
                          </td>
                        </tr>
                      ))
                    : (
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">-</td>
                        <td className="whitespace-nowrap px-6 py-4">-</td>
                        <td className="whitespace-nowrap px-6 py-4">-</td>
                        <td className="whitespace-nowrap px-6 py-4">-</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainerManagement