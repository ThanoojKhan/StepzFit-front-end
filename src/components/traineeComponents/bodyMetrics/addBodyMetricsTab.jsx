import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import NavBar from '../NavBar';
import BMIMeter from '../bodyMetrics/bmiMetre';
import SideBar from '../sideBar';


const InputField = ({ label, name, type, value, onChange, max, disabled }) => (
  <div className="p-3 border rounded-lg border-gray-300">
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
      type={type}
      className="text-gray-300 bg-transparent w-full"
      name={name}
      value={value}
      onChange={onChange}
      max={max}
      disabled={disabled}
    />
  </div>
);

function addBodyMetricsTab() {
  const { token } = useSelector((state) => state.User);
  const currentDate = new Date().toISOString().split('T')[0];
  const [showToaster, setShowToaster] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialFormData = {
    date: currentDate,
    trainee_id: '',
    bodyWeight: '',
    height: '',
    waist: '',
    hip: '',
    chest: '',
    arm: '',
    forearm: '',
    calf: '',
    thighs: '',
    bmi: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'trainee_id' || value === '' || /^[0-9]+$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.bodyWeight);
    const height = parseFloat(formData.height) / 100;
    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      setFormData((prevData) => ({
        ...prevData,
        bmi: bmi,
      }));
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [formData.bodyWeight, formData.height]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToaster(true)

    if (formData.bodyWeight == '') {
      toast.error('Add Body Weight.');
      return;
    }
    if (formData.height == '') {
      toast.error('Add Height');
      return;
    }
    if (formData.waist == '') {
      toast.error('Add Waist Measurement');
      return;
    }
    if (formData.hip == '') {
      toast.error('Add Hip Measurement');
      return;
    }
    if (formData.chest == '') {
      toast.error('Add Chest Measurement');
      return;
    }
    if (formData.arm == '') {
      toast.error('Add Arm Measurement');
      return;
    } if (formData.forearm == '') {
      toast.error('Add Forearm Measurement');
      return;
    } if (formData.calf == '') {
      toast.error('Add Calf Measurement');
      return;
    }
    if (formData.thighs == '') {
      toast.error('Add Thighs Measurement');
      return;
    }

    try {
      setIsLoading(true)
      const response = await axiosInstance.post('/user/addBodyMetrics', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowToaster(true)
      toast.success(response.data.message);
      setFormData(initialFormData);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errMsg) {
        setIsLoading(false)
        toast.error(error.response.data.errMsg);
      } else {
        setShowToaster(true)
        setIsLoading(false)
        toast.error('An error occurred while processing your request.');
      }
    }
  };

  return (
    <>
      <div className='flex'>
        <NavBar></NavBar>
        <SideBar></SideBar>
        <div style={{ width: '95%' }} className="w3-animate-zoom mx-10 md:mx-25 sm:w-auto flex justify-center items-center">
          <div className="bg-zinc-400 flex-col my-24 justify-center items-center overflow-hidden w-full md:max-w-5xl shadow-xl rounded-2xl">
            {isLoading ? <Loader /> : ''}
            {showToaster && <Toaster toastOptions={3000} />}
            <div className="p-6 bg-zinc-600 text-white">
              <div className="flex flex-col sm:flex-row m-5 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-100">Add Body Metrics</h2>
                <h3 className="font-bold text-gray-900">{formData.date}</h3>
                <BMIMeter bmi={formData.bmi} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InputField label="Body Weight (Kg)" name="bodyWeight" value={formData.bodyWeight} onChange={handleChange} />
                  <InputField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                  <InputField label="Waist (cm)" name="waist" value={formData.waist} onChange={handleChange} />
                  <InputField label="Hip (cm)" name="hip" value={formData.hip} onChange={handleChange} />
                  <InputField label="Chest (cm)" name="chest" value={formData.chest} onChange={handleChange} />
                  <InputField label="Arm (cm)" name="arm" value={formData.arm} onChange={handleChange} />
                  <InputField label="Forearm (cm)" name="forearm" value={formData.forearm} onChange={handleChange} />
                  <InputField label="Calf (cm)" name="calf" value={formData.calf} onChange={handleChange} />
                  <InputField label="Thighs (cm)" name="thighs" value={formData.thighs} onChange={handleChange} />
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end p-6 bg-black rounded-b">
              <button
                className="w-full hover:scale-105 transition-transform text-center py-3 rounded text-red-700 hover:bg-green-dark focus:outline-none my-1"
                type="button"
                onClick={() => {
                  window.history.back();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default addBodyMetricsTab;
