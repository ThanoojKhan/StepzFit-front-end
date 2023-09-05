import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import BMIMeter from '../bodyMetrics/bmiMetre';

const InputField = ({ label, name, type, value, onChange }) => (
  <div className="p-3 border rounded-lg border-gray-300">
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
      type={type}
      className="text-gray-300 bg-transparent w-full"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

function EditBodyMetrics() {
  const { bodyMetricsId } = useParams();
  const { token } = useSelector((state) => state.User);
  

  const [formData, setFormData] = useState({
    bodyWeight: '',
    date: '',
    height: '',
    waist: '',
    hip: '',
    chest: '',
    arm: '',
    forearm: '',
    calf: '',
    thighs: '',
    bmi: '',
  });

  useEffect(() => {
    fetchExistingBodyMetrics();
  }, []);

  const fetchExistingBodyMetrics = async () => {
    try {
      const response = await axiosInstance.get(`/user/bodyMetricsDetails/${bodyMetricsId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bodyMetrics = response.data.bodyMetrics;

      const parsedDate = new Date(bodyMetrics.date);
      const formattedDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString('default', { month: 'short' })} ${parsedDate.getFullYear()}`;

      setFormData({
        ...bodyMetrics,
        date: formattedDate,
      });
    } catch (error) {
      console.error(error.response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.bodyWeight=='') {
      toast.error('Add Body Weight.');
      return;
    }
    if (formData.height=='') {
      toast.error('Add Height');
      return;
    }
    if (formData.waist=='') {
      toast.error('Add Waist Measurement');
      return;
    }
    if (formData.hip=='') {
      toast.error('Add Hip Measurement');
      return;
    }
    if (formData.chest=='') {
      toast.error('Add Chest Measurement');
      return;
    }
    if (formData.arm=='') {
      toast.error('Add Arm Measurement');
      return;
    }if (formData.forearm=='') {
      toast.error('Add Forearm Measurement');
      return;
    }if (formData.calf=='') {
      toast.error('Add Calf Measurement');
      return;
    }
    if (formData.thighs=='') {
      toast.error('Add Thighs Measurement');
      return;
    }
    try {
      const response = await axiosInstance.patch(`/user/editBodyMetrics/${bodyMetricsId}`, formData ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="capitalize min-h-screen w-full">
        <Toaster toastOptions={3000} />
        <main className="overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Add Body Metrics </h2>
                  <h3 className="font-bold text-gray-900">{formData.date} </h3>
                  <BMIMeter bmi={formData.bmi} />
                </div>
              </div>
              <div className="p-6 bg-black text-white rounded-b-lg">
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
                  className="w-full text-center py-3 rounded text-red-700 hover:bg-green-dark focus:outline-none my-1"
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
        </main>
      </div>
    </>
  );
}

export default EditBodyMetrics;
