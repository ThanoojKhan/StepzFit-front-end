import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmPopup from '../plans/confirmPopUp';
import errorFunction from '../../../services/errorHandling';

function PlansTab() {
  const { token } = useSelector((state) => state.Admin);
  const [plans, setPlans] = useState([]);
  const [reload, setReload] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/admin/plans', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPlans(res?.data?.plans);
      })
      .catch((err) => {
        errorFunction(err, navigate)
      });
  }, [token, reload]);

  const handleDelete = (planId) => {
    setSelectedPlan(planId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlan) {
      axiosInstance
        .delete(`/admin/deletePlan/${selectedPlan}`, {
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
    setSelectedPlan(null);
  };

  const statusChange = (planId, status) => {
    axiosInstance.patch('/admin/planStatus', { planId, status }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success(res?.data?.message)
      setReload(!reload)
    }).catch((err) => {
      errorFunction(err, navigate)
    })
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <Toaster toastOptions={3000} />
        <div className="flex justify-end mt-2">
          <ConfirmPopup
            isOpen={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
          />
          <p className="underline cursor-pointer" onClick={() => navigate('/admin/addPlan')}>Add Plan</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-4">
          {plans.map((plan) => (
            <div key={plan._id} className="p-4 card bg-base-100 shadow-xl">
              <figure><img src={plan.imageSrc} alt="Plans" /></figure>
              <div className="card-body">
                <h2 className="card-title">
                  {plan.name}
                  {plan.isNew && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p>{plan.description}</p>
                <div className='flex justify-between'>
                  <div className="card-actions ">
                    <div onClick={() => statusChange(plan._id, plan.isActive)} className={`badge cursor-pointer ${plan.isActive ? 'text-green-500' : 'text-red-500'}`} >Status :{plan.isActive ? <span className='text-green-500 ms-2' > Active</span> : <span className='text-red-600 ms-2' >In-Active</span>}</div>
                  </div>
                  <div className="card-actions">
                    <div className="badge badge-outline cursor-pointer" onClick={() => navigate(`/admin/updatePlan/${plan._id}`)}>Update</div>
                    <div className="badge badge-outline cursor-pointer" onClick={() => handleDelete(plan._id)}>Delete</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlansTab;
